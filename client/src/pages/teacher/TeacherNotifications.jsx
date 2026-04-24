import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Send, Trash2, Bell, X } from 'lucide-react';

const TeacherNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ message: '', recipient: 'student' });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/notifications');
      setNotifications(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchNotifications(); }, []);

  const handleSend = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      await api.post('/notifications', form);
      showToast('✅ Notification sent!');
      setShowForm(false); setForm({ message: '', recipient: 'student' }); fetchNotifications();
    } catch (err) { showToast('❌ Failed to send.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      fetchNotifications();
    } catch (err) { showToast('❌ Delete failed.'); }
  };

  const recipientBadge = { All: 'bg-brand-600', student: 'bg-emerald-600', teacher: 'bg-amber-600' };

  return (
    <div className="space-y-8">
      {toast && (
        <div className={`fixed top-10 right-10 z-50 px-6 py-4 rounded-2xl shadow-2xl text-white text-sm font-bold flex items-center gap-3 animate-in slide-in-from-right-10 duration-300 ${toast.startsWith('✅') ? 'bg-emerald-600' : 'bg-rose-600'}`}>
          <span>{toast.startsWith('✅') ? '✨' : '⚠️'}</span>
          {toast}
        </div>
      )}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 font-serif tracking-tight">Announcements</h2>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
            Broadcast to your students
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className={`btn-premium flex items-center gap-2 group ${showForm ? 'bg-slate-900 shadow-none' : ''}`}>
          {showForm ? <X size={18} /> : <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
          <span>{showForm ? 'Close Editor' : 'New Notification'}</span>
        </button>
      </div>

      {/* Compose form */}
      {showForm && (
        <div className="bento-card p-8 bg-brand-50/50 border-brand-100 animate-in zoom-in-95 duration-500">
          <form onSubmit={handleSend} className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="md:col-span-1 space-y-2">
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Target Audience</label>
                <select value={form.recipient} onChange={e => setForm({ ...form, recipient: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all appearance-none cursor-pointer">
                  <option value="student">All Students</option>
                  <option value="All">Everyone</option>
                </select>
              </div>
              <div className="md:col-span-3 space-y-2">
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Your Message</label>
                <textarea required rows={1} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Share important updates, class changes, or notes..."
                  className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all resize-none min-h-[58px]" />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" disabled={saving} className="btn-premium px-10">
                {saving ? 'Sending...' : 'Post Announcement'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="w-12 h-12 border-4 border-brand-100 border-t-brand-600 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse">Loading feed...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {notifications.map(n => (
            <div key={n._id} className="bento-card p-6 flex items-start justify-between gap-6 hover:border-brand-100 group transition-all">
              <div className="flex items-start gap-6 flex-1">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500">
                  <Bell size={24} className="group-hover:rotate-12 transition-transform" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg text-white uppercase tracking-widest shadow-sm ${recipientBadge[n.recipient] || 'bg-slate-500'}`}>
                      {n.recipient === 'All' ? 'Everyone' : 'Students'}
                    </span>
                    {n.sender && <span className="text-xs font-bold text-slate-400">by {n.sender.name}</span>}
                  </div>
                  <p className="text-slate-700 text-lg leading-relaxed font-medium">{n.message}</p>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    {new Date(n.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <button onClick={() => handleDelete(n._id)} className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-all duration-300">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="bento-card py-24 flex flex-col items-center justify-center text-center space-y-6 bg-slate-50/50">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-4xl shadow-sm">📭</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Feed is empty</h3>
                <p className="text-slate-500 mt-1 max-w-xs">You haven't posted any announcements yet. Use the editor above to start.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherNotifications;
