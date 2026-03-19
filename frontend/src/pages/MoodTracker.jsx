import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MoodSelector  from '../components/MoodSelector.jsx';
import ActivityCard  from '../components/ActivityCard.jsx';
import api from '../utils/api.js';

const moodTips = {
  happy:    "You're in a great mood! Channel this energy into something creative. 🌟",
  calm:     "Beautiful! A calm mind is a clear mind. Perfect time to read or meditate. 📖",
  stressed: "It's okay — take it one breath at a time. Try a breathing exercise. 🌬️",
  angry:    "Your feelings are valid. Let's redirect that energy into something helpful. 🎨",
  sad:      "You're not alone. A little positivity can go a long way. Be gentle with yourself. 💛",
  tired:    "Rest is important. But a light activity might help energise you gently. 💤",
};

export default function MoodTracker() {
  const [selected, setSelected]   = useState('');
  const [note, setNote]           = useState('');
  const [activities, setActivities] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error,  setError] = useState('');

  const navigate = useNavigate();

  const handleMoodSelect = async (mood) => {
    setSelected(mood);
    setError('');
    try {
      const { data } = await api.get(`/activities/mood/${mood}`);
      setActivities(data);
    } catch(err){
      console.log('Activity fetch error:', err.message);
    }
  };

  const handleSubmit = async () => {
    if (!selected) return;
    setLoading(true);
    setError(' ');
    try {
      const { data } = await api.post('/mood', {mood: selected, note });

      const stored = JSON.parse(localStorage.getItem('user') || '{}');
      stored.moodCount = (stored.moodCount || 0) + 1;
      if (data.badges)   stored.badges   = data.badges;
      if (data.moodCount) stored.moodCount = data.moodCount;
      localStorage.setItem('user', JSON.stringify(stored));

      setSubmitted(true);
    } catch (err){
      setError('Failed to save mood. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSelected('');
    setNote('');
    setActivities([]);
    setError('');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 fade-in">
      <div className="text-center mb-8">
        <div className="text-5xl mb-2">😊</div>
        <h1 className="text-3xl font-bold">How Are You Feeling?</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Select your mood and we'll suggest the best activities for you.</p>
      </div>

      {!submitted ? (
        <>
        {/* Error */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="card mb-6">
            <MoodSelector selected={selected} onSelect={handleMoodSelect} />
          </div>

          {selected && (
            <div className="card mb-6 bg-bloom-lavender/10 border border-bloom-lavender/30 fade-in">
              <p className="text-center font-medium text-gray-700 dark:text-gray-200">{moodTips[selected]}</p>
            </div>
          )}

          <div className="card mb-6">
            <label className="block text-sm font-medium mb-2">Add a note (optional)</label>
            <textarea className="input-field resize-none" rows={3} placeholder="What's on your mind today?"
              value={note} onChange={e => setNote(e.target.value)} />
          </div>

          <button onClick={handleSubmit} disabled={!selected || loading}
            className="btn-primary w-full !py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? '⏳ Saving...' : 'Save My Mood 💾'}
          </button>

          {activities.length > 0 && (
            <div className="mt-8 fade-in">
              <h2 className="text-xl font-bold mb-4">✨ Recommended for You</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activities.map(a => <ActivityCard key={a._id} activity={a} />)}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="card text-center fade-in">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2">Mood Logged!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Great job checking in. Here are your personalised activities:</p>
          {activities.length>0? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-6">
              {activities.map(a => <ActivityCard key={a._id} activity={a} />)}
            </div>
          ) : (
            <div className="text-gray-400 mb-6 py-4">
              <div className="text-4xl mb-2">🌿</div>
              <p className="text-sm">No specific activities recommended at the moment.</p>
              </div>
          )}
          <div className="flex gap-3 justify-center flex-wrap">
            <button onClick={handleReset} className="btn-secondary">Log Again</button>
            <button onClick={() => navigate('/dashboard')} className="btn-primary">View Dashboard 📊</button>
          </div>
        </div>
      )}
    </div>
  );
}
