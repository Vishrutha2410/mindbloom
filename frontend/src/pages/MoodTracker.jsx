import { useState, useEffect } from 'react';
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
  const navigate = useNavigate();

  const handleMoodSelect = async (mood) => {
    setSelected(mood);
    try {
      const { data } = await api.get(`/activities/mood/${mood}`);
      setActivities(data);
    } catch {}
  };

  const handleSubmit = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      await api.post('/mood', { mood: selected, note });
      setSubmitted(true);
    } catch {} finally {
      setLoading(false);
    }
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-6">
            {activities.map(a => <ActivityCard key={a._id} activity={a} />)}
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            <button onClick={() => { setSubmitted(false); setSelected(''); setNote(''); setActivities([]); }}
              className="btn-secondary">Log Again</button>
            <button onClick={() => navigate('/dashboard')} className="btn-primary">View Dashboard 📊</button>
          </div>
        </div>
      )}
    </div>
  );
}
