import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/forgot-password', { email });
      setStatus(data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-slate-50">
      {/* Decorative background blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-200/50 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse delay-700" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-50/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md glass-panel rounded-[2.5rem] p-10 md:p-12 overflow-hidden">
        <div className="text-center mb-10">
          <div className="text-4xl mb-6 hover:scale-110 transition-transform duration-300">🔐</div>
          <h2 className="text-3xl font-bold text-slate-900 font-serif tracking-tight mb-2">Reset Password</h2>
          <p className="text-slate-500 font-medium">Enter your email to receive a reset link</p>
        </div>

        {status ? (
          <div className="p-6 rounded-2xl bg-green-50/80 backdrop-blur-sm border border-green-100 text-green-700 text-sm font-medium text-center mb-6 animate-in zoom-in-95 duration-500">
            <p className="text-xl mb-2">📩</p>
            {status}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-rose-50/80 backdrop-blur-sm text-rose-600 p-4 rounded-2xl mb-8 text-sm font-bold text-center border border-rose-100 animate-in fade-in slide-in-from-top-4">
                ⚠️ {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all duration-300" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center bg-brand-600 hover:bg-brand-700 shadow-xl shadow-brand-500/20 hover:shadow-brand-500/40 transition-all duration-300 mt-8 active:scale-[0.98] disabled:opacity-60">
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <div className="mt-10 text-center">
          <Link to="/login" className="text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors flex items-center justify-center gap-2">
            <span>←</span> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
