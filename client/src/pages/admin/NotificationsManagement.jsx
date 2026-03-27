import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Send, Trash2, X, Bell } from 'lucide-react';

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
      <div className="flex items-center justify-between p-6 border-b">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={20} /></button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

const NotificationsManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ message: '', recipient: 'All' });
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
      setModal(false); setForm({ message: '', recipient: 'All' }); fetchNotifications();
    } catch (err) { showToast('❌ Failed to send.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this notification?')) return;
    try {
      await api.delete(`/notifications/${id}`);
      fetchNotifications();
    } catch (err) { showToast('❌ Delete failed.'); }
  };

  const recipientBadge = { All: '#4f46e5', student: '#059669', teacher: '#d97706' };

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${toast.startsWith('✅') ? 'bg-green-600' : 'bg-red-600'}`}>{toast}</div>
      )}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <p className="text-gray-500 text-sm mt-1">{notifications.length} announcements</p>
        </div>
        <button onClick={() => setModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm"
          style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
          <Send size={18} /> Send Notification
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading notifications...</div>
      ) : (
        <div className="space-y-3">
          {notifications.map(n => (
            <div key={n._id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start justify-between gap-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: '#ede9fe' }}>
                  <Bell size={18} style={{ color: '#6d28d9' }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                      style={{ background: recipientBadge[n.recipient] || '#6b7280' }}>
                      To: {n.recipient}
                    </span>
                    {n.sender && <span className="text-xs text-gray-400">by {n.sender.name}</span>}
                  </div>
                  <p className="text-gray-800 text-sm">{n.message}</p>
                  <p className="text-gray-400 text-xs mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(n._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 flex-shrink-0"><Trash2 size={16} /></button>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-3">🔔</div>
              <p>No notifications yet. Send the first one!</p>
            </div>
          )}
        </div>
      )}

      {modal && (
        <Modal title="Send Notification" onClose={() => setModal(false)}>
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Send To</label>
              <select value={form.recipient} onChange={e => setForm({ ...form, recipient: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="All">Everyone</option>
                <option value="student">All Students</option>
                <option value="teacher">All Teachers</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
              <textarea required rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Type your announcement here..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
            </div>
            <button type="submit" disabled={saving}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
              <Send size={16} /> {saving ? 'Sending...' : 'Send Notification'}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default NotificationsManagement;
