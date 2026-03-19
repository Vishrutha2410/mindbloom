import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import {useTranslation} from 'react-i18next';
import api from '../utils/api.js';
import AgeZoneBanner from  '../components/AgeZoneBanner.jsx';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const moodToNum = { happy:5, calm:4, tired:3, sad:2, stressed:2, angry:1 };
const moodEmoji = { happy:'😊', calm:'😌', stressed:'😓', angry:'😡', sad:'😢', tired:'😴' };

export default function Dashboard({ user }) {
  const [history, setHistory] = useState([]);
  const [weekly,  setWeekly]  = useState([]);
  const [loading, setLoading] = useState(true);
  const {t} = useTranslation();

  useEffect(() => {
    const load = async () => {
      try {
        const [h, w] = await Promise.all([
          api.get('/mood/history'),
          api.get('/mood/weekly'),
        ]);
        setHistory(h.data);
        setWeekly(w.data);
      } catch {} finally { setLoading(false); }
    };
    load();
  }, []);

  const chartData = {
    labels: weekly.map(m => new Date(m.date).toLocaleDateString('en', { weekday:'short', month:'short', day:'numeric' })),
    datasets: [{
      label: 'Mood Score',
      data: weekly.map(m => moodToNum[m.mood] || 3),
      borderColor: '#6BCB77',
      backgroundColor: 'rgba(107,203,119,0.15)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#A78BFA',
      pointRadius: 6,
    }]
  };

  const chartOptions = {
    responsive: true,
    scales: { y: { min: 0, max: 6, ticks: { stepSize: 1 } } },
    plugins: { legend: { display: false } }
  };

  <AgeZoneBanner ageGroup={user?.ageGroup || 'young_adults'} />
  const shortcuts = [
     { to: '/mood',        icon: '😊', label: t('dashboard.log_mood')   },
    { to: '/games',       icon: '🎮', label: t('dashboard.play_games') },
    { to: '/draw',        icon: '🎨', label: t('dashboard.drawing')    },
    { to: '/reading',     icon: '📚', label: t('dashboard.read')       },
    { to: '/meditation',  icon: '🧘', label: t('dashboard.meditate')   },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 fade-in">
      {/* Welcome */}
      <div className="card bg-gradient-to-r from-bloom-green/30 to-bloom-lavender/30 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{t('dashboard.hello')}{' '} <Link to="/profile" classname="hover:text-bloom-lavender underline underline-offset-4 decoration-dotted transition-colors cursor-pointer"> 
            {user?.name?.split(' ')[0]}</Link>{' '} 👋</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{t('dashboard.subtitle')}</p>
          </div>
          <div className="flex gap-4 text-center">
            <div className="bg-white/60 dark:bg-gray-700/60 rounded-2xl px-5 py-3">
              <div className="text-3xl font-bold text-bloom-green">{user?.streak || 0}</div>
              <div className="text-xs text-gray-500">{t('dashboard.day_streak')} </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-700/60 rounded-2xl px-5 py-3">
              <div className="text-3xl font-bold text-bloom-lavender">{history.length}</div>
              <div className="text-xs text-gray-500">{t('dashboard.mood_logs')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      {user?.badges?.length > 0 && (
        <div className="card mb-6">
          <h2 className="font-bold text-lg mb-3"> {t('profile.your_badges')}</h2>
          <div className="flex flex-wrap gap-2">
            {user.badges.map(b => (
              <span key={b} className="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 px-4 py-1.5 rounded-full text-sm font-semibold">{b}</span>
            ))}
          </div>
        </div>
      )}

      {/* Quick Access */}
      <div className="card mb-6">
        <h2 className="font-bold text-lg mb-4"> {t('dashboard.quick_access')}</h2>
        <div className="flex flex-wrap gap-3">
          {shortcuts.map(s => (
            <Link key={s.to} to={s.to}
              className="flex items-center gap-2 bg-bloom-soft dark:bg-gray-700 hover:bg-bloom-green/20 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105">
              <span className="text-xl">{s.icon}</span> {s.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Mood Chart */}
        <div className="card">
          <h2 className="font-bold text-lg mb-4"> {t('dashboard.weekly_chart')}</h2>
          {loading ? (
            <div className="h-48 flex items-center justify-center text-gray-400">{t('common.loading')}</div>
          ) : weekly.length ? (
            <Line data={chartData} options={chartOptions} />
          ) : (
            <div className="h-48 flex flex-col items-center justify-center text-gray-400 gap-2">
              <span className="text-4xl">📭</span>
              <p className="text-sm">No mood data yet. <Link to="/mood" className="text-bloom-lavender underline">Log your first mood!</Link></p>
            </div>
          )}
        </div>

        {/* Recent Mood History */}
        <div className="card">
          <h2 className="font-bold text-lg mb-4"> {t('dashboard.recent_history')}</h2>
          {loading ? (
            <div className="h-48 flex items-center justify-center text-gray-400">{t('common.loading')}</div>
          ) : history.length ? (
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {history.slice(0, 10).map(m => (
                <div key={m._id} className="flex items-center justify-between bg-bloom-soft dark:bg-gray-700/60 px-4 py-2.5 rounded-xl">
                  <span className="text-lg">{moodEmoji[m.mood]} <span className="text-sm font-medium capitalize ml-1">{t(`mood.moods.${m.mood}`) || m.mood}</span></span>
                  <span className="text-xs text-gray-400">{new Date(m.date).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-48 flex flex-col items-center justify-center text-gray-400 gap-2">
              <span className="text-4xl">📭</span>
              <p className="text-sm">No history yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
