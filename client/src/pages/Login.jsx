import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate(`/${res.data.user.role}`);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-slate-50">
      {/* Decorative background blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-200/50 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse delay-700" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-50/30 rounded-full blur-[120px] pointer-events-none" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md glass-panel rounded-[2.5rem] p-10 md:p-12 overflow-hidden">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block text-4xl mb-6 hover:scale-110 transition-transform duration-300">🎭</Link>
          <h2 className="text-3xl font-bold text-slate-900 font-serif tracking-tight mb-2">Welcome Back</h2>
          <p className="text-slate-500 font-medium">Sign in to your account</p>
        </div>

        {error && <div className="bg-rose-50/80 backdrop-blur-sm text-rose-600 p-4 rounded-2xl mb-8 text-sm font-bold text-center border border-rose-100 animate-in fade-in slide-in-from-top-4">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              placeholder="you@email.com"
              className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all duration-300" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center pl-1 pr-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
              <Link to="/forgot-password" title="Forgot Password?" className="text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors">Forgot Password?</Link>
            </div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              placeholder="••••••••"
              className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all duration-300" />
          </div>
          <button type="submit" className="w-full py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center bg-brand-600 hover:bg-brand-700 shadow-xl shadow-brand-500/20 hover:shadow-brand-500/40 transition-all duration-300 mt-8 active:scale-[0.98]">
            Sign In
          </button>
        </form>

        <p className="mt-10 text-center text-slate-500 font-medium">
          Don't have an account? <Link to="/signup" className="text-brand-600 font-bold hover:text-brand-700 transition-colors underline-offset-4 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
