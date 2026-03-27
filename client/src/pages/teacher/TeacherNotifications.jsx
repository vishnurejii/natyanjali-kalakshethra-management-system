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

  const recipientColor = { All: '#4f46e5', student: '#059669', teacher: '#d97706' };

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${toast.startsWith('✅') ? 'bg-green-600' : 'bg-red-600'}`}>{toast}</div>
      )}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <p className="text-gray-500 text-sm mt-1">Post announcements to students</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm"
          style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
          {showForm ? <X size={16} /> : <Send size={16} />}
          {showForm ? 'Cancel' : 'New Notification'}
        </button>
      </div>

      {/* Compose form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-indigo-100 p-6 shadow-sm">
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Send To</label>
              <select value={form.recipient} onChange={e => setForm({ ...form, recipient: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="student">All Students</option>
                <option value="All">Everyone</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
              <textarea required rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Write your announcement..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
            </div>
            <button type="submit" disabled={saving}
              className="px-6 py-2.5 rounded-xl text-white font-semibold text-sm disabled:opacity-60 flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
              <Send size={15} /> {saving ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : (
        <div className="space-y-3">
          {notifications.map(n => (
            <div key={n._id} className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-4 hover:shadow-sm">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#ede9fe' }}>
                <Bell size={18} style={{ color: '#6d28d9' }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                    style={{ background: recipientColor[n.recipient] || '#6b7280' }}>
                    To: {n.recipient}
                  </span>
                  {n.sender && <span className="text-xs text-gray-400">by {n.sender.name}</span>}
                </div>
                <p className="text-gray-800 text-sm">{n.message}</p>
                <p className="text-gray-400 text-xs mt-1">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => handleDelete(n._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 flex-shrink-0"><Trash2 size={16} /></button>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-3">🔔</div>
              <p>No notifications yet. Create the first one!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherNotifications;
