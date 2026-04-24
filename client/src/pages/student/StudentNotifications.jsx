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

  const recipientBadge = { All: 'bg-brand-600', student: 'bg-emerald-600', teacher: 'bg-amber-600' };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 font-serif tracking-tight">Recent Announcements</h2>
          <p className="text-slate-500 font-medium mt-1">Stay updated with the latest from Natyanjali</p>
        </div>
        <div className="hidden md:block">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Status</p>
          <p className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Up to date
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="w-12 h-12 border-4 border-brand-100 border-t-brand-600 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse">Fetching latest updates...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="bento-card py-24 flex flex-col items-center justify-center text-center space-y-6 bg-slate-50/50">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-4xl shadow-sm">🔔</div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">No notifications yet</h3>
            <p className="text-slate-500 mt-1 max-w-xs">We'll notify you here when there's an announcement for you.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-5">
          {notifications.map(n => (
            <div key={n._id} className="bento-card p-6 flex items-start gap-6 hover:border-brand-100 group transition-all">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500">
                <Bell size={24} className="group-hover:rotate-12 transition-transform" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg text-white uppercase tracking-widest shadow-sm ${recipientBadge[n.recipient] || 'bg-slate-500'}`}>
                    {n.recipient === 'All' ? 'Everyone' : 'Students'}
                  </span>
                  {n.sender && (
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      from {n.sender.name}
                    </span>
                  )}
                </div>
                <p className="text-slate-700 text-lg leading-relaxed font-medium">{n.message}</p>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  {new Date(n.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentNotifications;
