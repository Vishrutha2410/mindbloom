import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar({ user, logout, dark, setDark }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = user ? [
    { to:'/dashboard',  label:'🏠 Home'    },
    { to:'/mood',       label:'😊 Mood'    },
    { to:'/games',      label:'🎮 Games'   },
    { to:'/draw',       label:'🎨 Draw'    },
    { to:'/reading',    label:'📚 Read'    },
    { to:'/meditation', label:'🧘 Meditate'},
  ] : [];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-bold text-bloom-green tracking-tight">🌸 MindBloom</Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${pathname===l.to ? 'bg-bloom-green text-white shadow' : 'hover:bg-bloom-green/20'}`}>
              {l.label}
            </Link>
          ))}
          {user ? (
            <button onClick={logout} className="ml-2 btn-secondary !py-1.5 !px-4 text-sm">Logout</button>
          ) : (
            <>
              <Link to="/login"    className="px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-bloom-lavender/20">Login</Link>
              <Link to="/register" className="btn-primary !py-1.5 !px-4 text-sm">Sign Up</Link>
            </>
          )}
          <button onClick={() => setDark(!dark)} className="ml-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-lg transition">
            {dark ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 rounded-lg text-xl" onClick={() => setOpen(!open)}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass px-4 pb-4 flex flex-col gap-2 border-t border-white/20">
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${pathname===l.to ? 'bg-bloom-green text-white' : 'hover:bg-bloom-green/20'}`}>
              {l.label}
            </Link>
          ))}
          {user ? (
            <button onClick={logout} className="btn-secondary text-sm">Logout</button>
          ) : (
            <>
              <Link to="/login"    onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm hover:bg-bloom-lavender/20">Login</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="btn-primary text-sm">Sign Up</Link>
            </>
          )}
          <button onClick={() => setDark(!dark)} className="text-left px-3 py-2 text-sm">
            {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      )}
    </nav>
  );
}
