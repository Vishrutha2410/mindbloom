import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MoodSelector from '../components/MoodSelector.jsx';
import ActivityCard from '../components/ActivityCard.jsx';
import api from '../utils/api.js';

export default function MoodTracker() {
  const [selected,   setSelected]   = useState('');
  const [note,       setNote]       = useState('');
  const [activities, setActivities] = useState([]);
  const [submitted,  setSubmitted]  = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  // ✅ Mood tips use t() — translates with language
  const moodTips = {
    happy:    t('mood.tips.happy'),
    calm:     t('mood.tips.calm'),
    stressed: t('mood.tips.stressed'),
    angry:    t('mood.tips.angry'),
    sad:      t('mood.tips.sad'),
    tired:    t('mood.tips.tired'),
  };

  const handleMoodSelect = async (mood) => {
    setSelected(mood);
    setError('');
    try {
      const { data } = await api.get(`/activities/mood/${mood}`);
      setActivities(data);
    } catch (err) {
      console.log('Activity fetch error:', err.message);
    }
  };

  const handleSubmit = async () => {
    if (!selected) return;
    setLoading(true);
    setError('');  // ✅ Fixed: was ' ' (space) before — caused ghost error div
    try {
      const { data } = await api.post('/mood', { mood: selected, note });

      const stored = JSON.parse(localStorage.getItem('user') || '{}');
      stored.moodCount = (stored.moodCount || 0) + 1;
      if (data.badges)    stored.badges    = data.badges;
      if (data.moodCount) stored.moodCount = data.moodCount;
      localStorage.setItem('user', JSON.stringify(stored));

      setSubmitted(true);
    } catch (err) {
      setError(t('mood.error') || 'Failed to save mood. Please try again.');
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

      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-2">😊</div>
        {/* ✅ Translated */}
        <h1 className="text-3xl font-bold">{t('mood.title')}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{t('mood.subtitle')}</p>
      </div>

      {!submitted ? (
        <>
          {/* Error */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Mood Selector */}
          <div className="card mb-6">
            <MoodSelector selected={selected} onSelect={handleMoodSelect} />
          </div>

          {/* Mood Tip */}
          {selected && (
            <div className="card mb-6 bg-bloom-lavender/10 border border-bloom-lavender/30 fade-in">
              {/* ✅ Translated tip */}
              <p className="text-center font-medium text-gray-700 dark:text-gray-200">
                {moodTips[selected]}
              </p>
            </div>
          )}

          {/* Note */}
          <div className="card mb-6">
            {/* ✅ Translated label and placeholder */}
            <label className="block text-sm font-medium mb-2">
              {t('mood.add_note')} <span className="text-gray-400 font-normal">{t('mood.optional')}</span>
            </label>
            <textarea className="input-field resize-none" rows={3}
              placeholder={t('mood.note_placeholder')}
              value={note} onChange={e => setNote(e.target.value)} />
          </div>

          {/* Submit */}
          <button onClick={handleSubmit} disabled={!selected || loading}
            className="btn-primary w-full !py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed">
            {/* ✅ Translated button */}
            {loading ? t('mood.saving') : t('mood.save')}
          </button>

          {/* Activity suggestions */}
          {activities.length > 0 && (
            <div className="mt-8 fade-in">
              {/* ✅ Translated */}
              <h2 className="text-xl font-bold mb-4">{t('mood.recommended')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activities.map(a => <ActivityCard key={a._id} activity={a} />)}
              </div>
            </div>
          )}
        </>
      ) : (
        /* Success screen */
        <div className="card text-center fade-in">
          <div className="text-6xl mb-4">🎉</div>
          {/* ✅ Translated */}
          <h2 className="text-2xl font-bold mb-2">{t('mood.logged_title')}</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">{t('mood.logged_subtitle')}</p>

          {activities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-6">
              {activities.map(a => <ActivityCard key={a._id} activity={a} />)}
            </div>
          ) : (
            <div className="text-gray-400 mb-6 py-4">
              <div className="text-4xl mb-2">🌿</div>
              {/* ✅ Translated */}
              <p className="text-sm">{t('mood.no_activities')}</p>
            </div>
          )}

          <div className="flex gap-3 justify-center flex-wrap">
            {/* ✅ Translated buttons */}
            <button onClick={handleReset} className="btn-secondary">
              {t('mood.log_again')}
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn-primary">
              {t('mood.view_dashboard')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}