import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api.js';

export default function Register({ setUser }) {
  const [form, setForm]   = useState({ name:'', email:'', password:'', age:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const { data } = await api.post('/auth/register', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user',  JSON.stringify(data));
      setUser(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 fade-in">
      <div className="card w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-2">🌱</div>
          <h1 className="text-3xl font-bold">Join MindBloom</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Start your wellness journey today — it's free</p>
        </div>

        {error && <div className="bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input type="text" required className="input-field" placeholder="Your name"
              value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" required className="input-field" placeholder="you@example.com"
              value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" required className="input-field" placeholder="At least 6 characters"
              value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Age <span className="text-gray-400">(optional)</span></label>
            <input type="number" className="input-field" placeholder="Your age" min="5" max="100"
              value={form.age} onChange={e => setForm({...form, age: e.target.value})} />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full !py-3 text-base">
            {loading ? '⏳ Creating account...' : 'Create Account 🌸'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-bloom-lavender font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
