import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Bell } from 'lucide-react';

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/notifications')
      .then(r => setNotifications(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const recipientColor = { All: '#4f46e5', student: '#059669', teacher: '#d97706' };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
        <p className="text-gray-500 text-sm mt-1">{notifications.length} announcements</p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading notifications...</div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <div className="text-5xl mb-3">🔔</div>
          <p className="text-gray-500">No notifications yet. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(n => (
            <div key={n._id} className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-4 hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: '#ede9fe' }}>
                <Bell size={18} style={{ color: '#6d28d9' }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                    style={{ background: recipientColor[n.recipient] || '#6b7280' }}>
                    {n.recipient === 'All' ? 'Everyone' : n.recipient === 'student' ? 'Students' : n.recipient}
                  </span>
                  {n.sender && (
                    <span className="text-xs text-gray-400">from {n.sender.name} ({n.sender.role})</span>
                  )}
                </div>
                <p className="text-gray-800">{n.message}</p>
                <p className="text-gray-400 text-xs mt-2">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentNotifications;
