import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('user', JSON.stringify(data));
      if (data.role === 'admin') navigate('/admin');
      else if (data.role === 'teacher') navigate('/teacher');
      else navigate('/student');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%)' }}>
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.2)' }} />
        <div className="relative z-10 text-center">
          <div className="text-7xl mb-6 animate-bounce">🎭</div>
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}>
            Natyanjali
          </h1>
          <p className="text-2xl font-light text-purple-200 mb-2">Kalakshetra</p>
          <p className="text-purple-300 mt-6 max-w-sm text-lg leading-relaxed">
            "Where art meets excellence — nurturing the classical traditions of dance, music, and fine arts"
          </p>
          <div className="flex gap-8 mt-12 text-center">
            {[['🩰', 'Dance'], ['🎵', 'Music'], ['🎨', 'Arts']].map(([emoji, label]) => (
              <div key={label}>
                <div className="text-3xl mb-2">{emoji}</div>
                <p className="text-purple-200 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Glassmorphism card */}
          <div className="rounded-3xl p-8 shadow-2xl" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)' }}>
            <div className="text-center mb-8">
              <div className="text-4xl mb-3 lg:hidden">🎭</div>
              <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                Welcome Back
              </h2>
              <p className="text-gray-500 mt-2">Sign in to your account</p>
            </div>

            {error && (
              <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ focusRingColor: '#4f46e5' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                />
                <div className="text-right mt-2">
                  <Link to="/forgot-password" className="text-sm font-medium" style={{ color: '#4f46e5' }}>
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl text-white font-semibold text-base transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: loading ? '#818cf8' : 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <Link to="/" className="text-sm font-medium" style={{ color: '#4f46e5' }}>
                ← Back to Home
              </Link>
            </div>
          </div>

          <p className="text-center text-purple-200 text-xs mt-6">
            © 2025 Natyanjali Kalakshetra. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
