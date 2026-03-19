import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api.js';
import { ageGroupLabel } from '../utils/ageGroup.js';

export default function Profile({ user, setUser }) {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const {t} = useTranslation();

  const [form, setForm] = useState({
    name:       user?.name       || '',
    age:        user?.age        || '',
    bio:        user?.bio        || '',
    phone:      user?.phone      || '',
    location:   user?.location   || '',
    occupation: user?.occupation || '',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });

  const [activeTab,  setActiveTab]  = useState('personal');
  const [loading,    setLoading]    = useState(false);
  const [avatarLoading, setAvatarLoading]= useState(false);
  const [success,    setSuccess]    = useState('');
  const [error,      setError]      = useState('');
  const [previewAvatar, setPreviewAvatar] = useState(user?.avatar || null);
  const [moodCount,     setMoodCount]     = useState(user?.moodCount || 0);
  const [freshBadges,   setFreshBadges]   = useState(user?.badges   || []);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/auth/profile');

        // Count moods separately
        const moodRes = await api.get('/mood/history');
        const count   = moodRes.data.length;

        setMoodCount(count);
        setFreshBadges(data.badges || []);

        // Sync localStorage
        const stored = JSON.parse(localStorage.getItem('user') || '{}');
        stored.moodCount = count;
        stored.badges    = data.badges;
        localStorage.setItem('user', JSON.stringify(stored));
        setUser(prev => ({ ...prev, moodCount: count, badges: data.badges }));
      } catch (err) {
        console.log('Profile fetch error:', err.message);
      }
    };
    fetchProfile();
  }, []);

   const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview immediately
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewAvatar(ev.target.result);
    reader.readAsDataURL(file);

    // Upload to backend
    setAvatarLoading(true);
    setError(''); setSuccess('');
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const { data } = await api.post('/auth/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const updated = { ...user, avatar: data.avatar };
      localStorage.setItem('user', JSON.stringify(updated));
      setUser(updated);
      setPreviewAvatar(data.avatar);
      setSuccess('Profile picture updated! ✅');
    } catch (err) {
      setError(err.response?.data?.message || t('profile.photo_failed'));
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');

    // Validate password change if attempted
   if (passwords.newPass || passwords.current) {
      if (!passwords.current)            { setLoading(false); return setError(t('profile.current_password') + ' required'); }
      if (passwords.newPass.length < 6)  { setLoading(false); return setError(t('profile.new_password_length')); }
      if (passwords.newPass !== passwords.confirm) { setLoading(false); return setError(t('profile.passwords_no_match')); }
    }

    try {
      const payload = { ...form };
      if (passwords.current && passwords.newPass) {
        payload.password    = passwords.current;
        payload.newPassword = passwords.newPass;
      }

      const { data } = await api.put('/auth/profile', payload);

      // Update localStorage and parent state
      const updated = { ...data, token: data.token || user.token, moodCount };
      localStorage.setItem('user',  JSON.stringify(updated));
      localStorage.setItem('token', updated.token);
      setUser(updated);

      setSuccess('Profile updated successfully! ✅');
      setPasswords({ current: '', newPass: '', confirm: '' });
    } catch (err) {
      setError(err.response?.data?.message || t('profile.update_failed'));
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) =>
    name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';

  const tabs = [
    { id: 'personal',  label:t('profile.personal_info' )},
    { id: 'security',  label:t('profile.password')},
    { id: 'stats',     label:t('profile.my_stats')},
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 fade-in">

      {/* Header */}
      <div className="card bg-gradient-to-r from-bloom-green/30 to-bloom-lavender/30 mb-6">
        <div className="flex items-center gap-5 flex-wrap">

          {/* Avatar */}
          <div className="relative group cursor-pointer" onClick={() =>fileRef.current.click()}>
            {previewAvatar ? (
              <img src={previewAvatar} alt={user?.name}
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-bloom-lavender flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg">
                {getInitials(user?.name)}
              </div>
            )}
             {/* Hover overlay */}
            <div className="absolute inset-0 rounded-full bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {avatarLoading
                ? <span className="text-white text-xs">⏳</span>
                : <><span className="text-white text-lg">📷</span><span className="text-white text-xs mt-0.5">Change</span></>
              }
            </div>

            {/* Hidden file input */}
            <input ref={fileRef} type="file" accept="image/*" className="hidden"
              onChange={handleAvatarChange} />
            {user?.googleId && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Name & Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{user?.email}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-bloom-green/20 text-green-700 dark:text-green-300 px-3 py-0.5 rounded-full text-xs font-semibold">
                {t(`ageGroups.${user?.ageGroup}`) || 'Young Adult'}
              </span>
              {user?.occupation && (
                <span className="bg-bloom-blue/20 text-blue-700 dark:text-blue-300 px-3 py-0.5 rounded-full text-xs font-semibold">
                  💼 {user.occupation}
                </span>
              )}
              {user?.location && (
                <span className="bg-bloom-pink/20 text-pink-700 dark:text-pink-300 px-3 py-0.5 rounded-full text-xs font-semibold">
                  📍 {user.location}
                </span>
              )}
            </div>
            {user?.bio && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 italic">"{user.bio}"</p>
            )}
             <p className="text-xs text-gray-400 mt-2">{t('📷 profile.click_photo')}</p>
          </div>

          {/* Streak badge */}
          <div className="text-center bg-white/60 dark:bg-gray-700/60 rounded-2xl px-5 py-3">
            <div className="text-3xl font-bold text-bloom-green">{user?.streak || 0}</div>
            <div className="text-xs text-gray-500">🔥{t('profile.day_streak')}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map(t => (
          <button key={t.id} onClick={() => { setActiveTab(t.id); setError(''); setSuccess(''); }}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${activeTab === t.id ? 'bg-bloom-lavender text-white shadow-md' : 'bg-white dark:bg-gray-700 hover:bg-bloom-lavender/20'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Alerts */}
      {error   && <div className="bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl mb-4 text-sm">{error}</div>}
      {success && <div className="bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 px-4 py-3 rounded-xl mb-4 text-sm">{success}</div>}

      <form onSubmit={handleUpdate}>

        {/* ── Tab: Personal Info ───────────────────────────────── */}
        {activeTab === 'personal' && (
          <div className="card space-y-4 fade-in">
            <h2 className="font-bold text-lg mb-2">{t('profile.personal_info')}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('profile.full_name')} <span className="text-red-400">*</span></label>
                <input type="text" className="input-field" placeholder="your name" required
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('profile.age')}</label>
                <input type="number" className="input-field" placeholder="your age" min="5" max="100"
                  value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('profile.phone')}</label>
                <input type="tel" className="input-field" placeholder="+91 9876543210"
                  value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('profile.location')}</label>
                <input type="text" className="input-field" placeholder="City, Country"
                  value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">{t('profile.occupation')}</label>
                <input type="text" className="input-field" placeholder="e.g. Student, Engineer, Teacher"
                  value={form.occupation} onChange={e => setForm({ ...form, occupation: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  {t('profile.bio')} <span className="text-gray-400 text-xs">(max 200 characters)</span>
                </label>
                <textarea className="input-field resize-none" rows={3}
                  placeholder="Tell us a little about yourself..."
                  maxLength={200}
                  value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
                <p className="text-xs text-gray-400 text-right mt-1">{form.bio.length}/200</p>
              </div>
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="block text-sm font-medium mb-1">{t('profile.email')} <span className="text-gray-400 text-xs">{t('profile.cannot_change')}</span></label>
              <input type="email" className="input-field opacity-60 cursor-not-allowed" value={user?.email} disabled />
            </div>

            {/* Age group preview */}
            {form.age && (
              <div className="bg-bloom-soft dark:bg-gray-700/60 rounded-xl px-4 py-3 text-sm">
                <span className="font-medium">{t('profile.your_zone')}: </span>
                <span className="text-bloom-lavender font-bold">
                  {ageGroupLabel[
                    form.age >= 8  && form.age <= 12 ? 'kids' :
                    form.age >= 13 && form.age <= 18 ? 'teens' :
                    form.age >= 19 && form.age <= 30 ? 'young_adults' : 'adults'
                  ]}
                </span>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full !py-3">
              {loading ? t('profile.saving') : t('profile.save_changes')}
            </button>
          </div>
        )}

        {/* ── Tab: Password ────────────────────────────────────── */}
        {activeTab === 'security' && (
          <div className="card space-y-4 fade-in">
            <h2 className="font-bold text-lg mb-2">{t('🔒profile.password')}</h2>

            {user?.googleId && (
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-3 text-sm text-blue-700 dark:text-blue-300">
                ℹ️ You signed in with Google. You can still set a password to enable email login too.
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">{t('profile.current_password')}</label>
              <input type="password" className="input-field" placeholder="Enter current password"
                value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('profile.new_password')}</label>
              <input type="password" className="input-field" placeholder="At least 6 characters"
                value={passwords.newPass} onChange={e => setPasswords({ ...passwords, newPass: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('profile.confirm_password')}</label>
              <input type="password" className="input-field" placeholder="Repeat new password"
                value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} />
              {passwords.newPass && passwords.confirm && passwords.newPass !== passwords.confirm && (
                <p className="text-red-500 text-xs mt-1">❌{t('profile.passwords_no_match')}</p>
              )}
              {passwords.newPass && passwords.confirm && passwords.newPass === passwords.confirm && (
                <p className="text-green-500 text-xs mt-1">✅ {t('profile.passwords_match')}</p>
              )}
            </div>

            <button type="submit" disabled={loading || !passwords.current || !passwords.newPass}
              className="btn-primary w-full !py-3 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? t('⏳ profile.saving') : t('🔒 profile.update_password')}
            </button>
          </div>
        )}
      </form>

      {/* ── Tab: Stats (read-only, no form) ──────────────────── */}
      {activeTab === 'stats' && (
        <div className="space-y-4 fade-in">

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: t('profile.day_streak'),    value: user?.streak || 0,         icon:'🔥', color:'bg-orange-100 dark:bg-orange-900/30' },
              { label: t('profile.mood_logs'),     value: moodCount,                 icon:'📊', color:'bg-blue-100 dark:bg-blue-900/30'    },
              { label: t('profile.badges_earned'), value: freshBadges.length,        icon:'🏅', color:'bg-yellow-100 dark:bg-yellow-900/30' },
            ].map(s => (
              <div key={s.label} className={`card text-center ${s.color}`}>
                <div className="text-3xl mb-1">{s.icon}</div>
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="card">
            <h3 className="font-bold text-lg mb-4">{t('profile.your_badges')}</h3>
            <p className="text-xs text-gray-400 mb-4">Badges are earned by logging moods and maintaining streaks.</p>

            {/* How to earn */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { badge:'🌱 First Mood Log',  hint:'Log your first mood'       },
                { badge:'📅 7 Moods Logged',  hint:'Log 7 moods total'         },
                { badge:'🌟 30 Moods Logged', hint:'Log 30 moods total'        },
                { badge:'💯 100 Moods Logged',hint:'Log 100 moods total'       },
                { badge:'🔥 7-Day Streak',    hint:'Login 7 days in a row'     },
                { badge:'🏆 30-Day Streak',   hint:'Login 30 days in a row'    },
              ].map(b => {
                const earned = freshBadges.includes(b.badge);
                return (
                  <div key={b.badge}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${earned ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 font-semibold' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 opacity-60'}`}>
                    <span className="text-lg">{b.badge.split(' ')[0]}</span>
                    <div>
                      <div className="font-medium text-xs leading-tight">{b.badge.substring(2)}</div>
                      <div className="text-xs opacity-70">{earned ? '✅ Earned!' : b.hint}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Member since */}
          <div className="card">
            <h3 className="font-bold text-lg mb-3"> {t('profile.account_info')}</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: t('profile.member_since'),   value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en', {year:'numeric',month:'long',day:'numeric'}) : 'N/A' },
                 { label: t('profile.age_zone'),       value: t(`ageGroups.${user?.ageGroup}`) || 'Young Adults' },
                { label: t('profile.signin_method'), value: user?.googleId ? '🔵 Google' : '📧 Email' },
              ].map(r => (
                <div key={r.label} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <span className="text-gray-500">{r.label}</span>
                  <span className="font-medium">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}