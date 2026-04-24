import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Calendar, Users, BarChart2, Bell } from 'lucide-react';

const TeacherOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    api.get('/dashboard-stats/teacher')
      .then(r => setStats(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-16 text-gray-400">Loading dashboard...</div>;

  const statCards = [
    { label: 'Assigned Classes', value: stats?.assignedClasses ?? 0, icon: Calendar, accent: 'brand' },
    { label: 'Total Students', value: stats?.totalStudents ?? 0, icon: Users, accent: 'emerald' },
    { label: 'Avg. Attendance', value: stats?.avgAttendance ?? '—', icon: BarChart2, accent: 'amber' },
  ];

  const accentMap = {
    brand: { bg: 'bg-brand-50', text: 'text-brand-600' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600' },
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 font-serif tracking-tight">Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
          <p className="text-slate-500 font-medium mt-1">Here's your teaching summary for today.</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Current Session</p>
          <p className="text-sm font-bold text-slate-900">Summer Term 2024</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map(({ label, value, icon: Icon, accent }) => (
          <div key={label} className="bento-card p-6 group">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{label}</span>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500 ${accentMap[accent].bg} ${accentMap[accent].text}`}>
                <Icon size={24} />
              </div>
            </div>
            <p className="text-4xl font-bold text-slate-900 tracking-tight">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bento-card overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 font-serif">Today's Teaching Schedule</h3>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-tight">Real-time</span>
          </div>
          {stats?.todaySchedule?.length === 0 ? (
            <div className="p-16 text-center space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">📚</div>
              <div>
                <p className="text-slate-900 font-bold text-lg">No classes today</p>
                <p className="text-slate-400 text-sm">Take this time to prepare for your next sessions.</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {stats?.todaySchedule?.map(entry => (
                <div key={entry._id} className="flex items-center gap-6 p-6 hover:bg-slate-50 transition-colors group">
                  <div className="w-24 px-4 py-3 rounded-2xl text-center bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-tighter opacity-70 mb-0.5">Time</p>
                    <p className="text-sm font-black">{entry.startTime}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors leading-tight mb-1">{entry.course?.name || 'Classical Dance'}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Room: {entry.location || 'Studio A'}
                    </p>
                  </div>
                  <button className="btn-outline py-2 px-4 text-xs">Manage</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links/Recent Activity */}
        <div className="bento-card p-6 bg-brand-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          <h3 className="text-lg font-bold mb-6 relative z-10 font-serif">Teacher Actions</h3>
          <div className="space-y-3 relative z-10">
            {['Mark Attendance', 'Add Student Note', 'Update Syllabus', 'Message Admin'].map(link => (
              <button key={link} className="w-full text-left px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/5 transition-all text-sm font-bold flex items-center justify-between group">
                {link}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
            ))}
          </div>
          <div className="mt-12 p-4 rounded-2xl bg-brand-800/50 border border-brand-700 relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-60 text-brand-300">Teaching Tip</p>
            <p className="text-xs italic text-brand-100 font-medium">"Consistent practice is the key to mastering any mudra. Encourage students to repeat movements daily."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherOverview;
