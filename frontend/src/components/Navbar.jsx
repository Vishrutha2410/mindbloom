import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export default function Navbar({ user, logout, dark, setDark }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = user ? [
    { to: '/dashboard',  label: t('nav.home'),     emoji: '🏠' },
    { to: '/mood',       label: t('nav.mood'),     emoji: '😊' },
    { to: '/games',      label: t('nav.games'),    emoji: '🎮' },
    { to: '/draw',       label: t('nav.draw'),     emoji: '🎨' },
    { to: '/reading',    label: t('nav.read'),     emoji: '📚' },
    { to: '/meditation', label: t('nav.meditate'), emoji: '🧘' },
  ] : [];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-bloom-green tracking-tight">
          🌸 MindBloom
        </Link>

        {/* ── Desktop Nav Links ─────────────────────────────── */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                pathname === l.to
                  ? 'bg-bloom-green text-white shadow'
                  : 'hover:bg-bloom-green/20'
              }`}>
              {l.emoji} {l.label}
            </Link>
          ))}
        </div>

        {/* ── Desktop Right Side ────────────────────────────── */}
        <div className="hidden md:flex items-center gap-2">

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Dark Mode */}
          <button onClick={() => setDark(!dark)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-lg transition">
            {dark ? '☀️' : '🌙'}
          </button>

          {/* ✅ Only logout button — NO name/avatar here */}
          {user ? (
            <button onClick={logout}
              className="btn-secondary !py-1.5 !px-4 text-sm">
              {t('nav.logout')}
            </button>
          ) : (
            <>
              <Link to="/login"
                className="px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-bloom-lavender/20">
                {t('auth.login_link')}
              </Link>
              <Link to="/register" className="btn-primary !py-1.5 !px-4 text-sm">
                {t('auth.signup_free')}
              </Link>
            </>
          )}
        </div>

        {/* ── Mobile Toggle ─────────────────────────────────── */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button className="p-2 rounded-lg text-xl" onClick={() => setOpen(!open)}>
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ───────────────────────────────────────── */}
      {open && (
        <div className="md:hidden glass px-4 pb-4 flex flex-col gap-2 border-t border-white/20">

          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                pathname === l.to
                  ? 'bg-bloom-green text-white'
                  : 'hover:bg-bloom-green/20'
              }`}>
              {l.emoji} {l.label}
            </Link>
          ))}

          {user ? (
            <>
              {/* Profile link in mobile menu only */}
              <Link to="/profile" onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-bloom-green/20 transition-all">
                <div className="w-8 h-8 rounded-full bg-bloom-lavender flex items-center justify-center text-white text-xs font-bold">
                  {user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{user.name?.split(' ')[0]}</p>
                  <p className="text-xs text-gray-400">{t('nav.profile')}</p>
                </div>
              </Link>
              <button onClick={() => { logout(); setOpen(false); }}
                className="btn-secondary !py-1.5 !px-4 text-sm w-full text-left">
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-lg text-sm hover:bg-bloom-lavender/20">
                {t('auth.login_link')}
              </Link>
              <Link to="/register" onClick={() => setOpen(false)}
                className="btn-primary text-sm">
                {t('auth.signup_free')}
              </Link>
            </>
          )}

          <button onClick={() => setDark(!dark)}
            className="text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      )}
    </nav>
  );
}