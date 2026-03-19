import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api          from './utils/api.js';
import Navbar       from './components/Navbar.jsx';
import Home         from './pages/Home.jsx';
import Login        from './pages/Login.jsx';
import Register     from './pages/Register.jsx';
import Dashboard    from './pages/Dashboard.jsx';
import MoodTracker  from './pages/MoodTracker.jsx';
import Games        from './pages/Games.jsx';
import DrawingBoard from './pages/DrawingBoard.jsx';
import ReadingZone  from './pages/ReadingZone.jsx';
import Meditation   from './pages/Meditation.jsx';
import Profile      from './pages/Profile.jsx';

const PrivateRoute = ({ children, user }) => user ? children : <Navigate to="/login" />;

export default function App() {
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (saved) setUser(JSON.parse(saved));
    if (token) {
      api.get('/auth/profile')
        .then(({ data }) => {
          const existing = JSON.parse(localStorage.getItem('user') || '{}');
          // Merge fresh data with existing (keep token)
          const merged = {
            ...existing,
            ...data,
            token: existing.token,
          };
          localStorage.setItem('user', JSON.stringify(merged));
          setUser(merged);
        })
        .catch(() => {
          // Token expired or invalid — log out
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          setUser(null);
        });
    }
    if (localStorage.getItem('theme') === 'dark') setDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar user={user} logout={logout} dark={dark} setDark={setDark} />
        <main className="pt-16">
          <Routes>
            <Route path="/"           element={<Home user={user} />} />
            <Route path="/login"      element={<Login setUser={setUser} />} />
            <Route path="/register"   element={<Register setUser={setUser} />} />
            <Route path="/dashboard"  element={<PrivateRoute user={user}><Dashboard user={user} /></PrivateRoute>} />
            <Route path="/mood"       element={<PrivateRoute user={user}><MoodTracker /></PrivateRoute>} />
            <Route path="/games"      element={<PrivateRoute user={user}><Games /></PrivateRoute>} />
            <Route path="/draw"       element={<PrivateRoute user={user}><DrawingBoard /></PrivateRoute>} />
            <Route path="/reading"    element={<PrivateRoute user={user}><ReadingZone /></PrivateRoute>} />
            <Route path="/meditation" element={<PrivateRoute user={user}><Meditation /></PrivateRoute>} />
            <Route path="/profile"    element={<PrivateRoute user={user}><Profile user={user} setUser={setUser} /></PrivateRoute>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
