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
    { label: 'Assigned Classes', value: stats?.assignedClasses ?? 0, icon: Calendar, color: '#4f46e5', bg: '#ede9fe' },
    { label: 'Total Students', value: stats?.totalStudents ?? 0, icon: Users, color: '#059669', bg: '#d1fae5' },
    { label: 'Avg. Attendance', value: stats?.avgAttendance ?? '—', icon: BarChart2, color: '#d97706', bg: '#fef3c7' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
        <p className="text-gray-500 mt-1">Here's your teaching summary for today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">{label}</span>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                <Icon size={20} style={{ color }} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold text-gray-900">My Classes</h3>
        </div>
        {stats?.todaySchedule?.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <div className="text-4xl mb-3">📚</div>
            <p>No classes assigned yet.</p>
          </div>
        ) : (
          <div className="divide-y">
            {stats?.todaySchedule?.map(entry => (
              <div key={entry._id} className="flex items-center gap-4 p-5 hover:bg-gray-50">
                <div className="px-3 py-2 rounded-xl text-center" style={{ background: '#ede9fe' }}>
                  <p className="text-xs font-semibold" style={{ color: '#6d28d9' }}>{entry.startTime}</p>
                  <p className="text-xs" style={{ color: '#7c3aed' }}>{entry.endTime}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{entry.course?.name || 'Course'}</p>
                  <p className="text-sm text-gray-500">{entry.day} · {entry.location || 'Online'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherOverview;
