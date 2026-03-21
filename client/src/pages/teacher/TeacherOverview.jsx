import React, { useState, useEffect } from 'react';
import { Users, Calendar, Clock, Bell } from 'lucide-react';
import api from '../../api';

const TeacherOverview = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    assignedClasses: 0,
    todaySchedule: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard-stats/teacher');
        console.log('Teacher Stats Received:', response.data);
        setStats({
          totalStudents: response.data.totalStudents || 0,
          assignedClasses: response.data.assignedClasses || 0,
          todaySchedule: response.data.todaySchedule || []
        });
      } catch (error) {
        console.error('Error fetching teacher stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Updating overview...</div>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-indigo-600">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Assigned Classes</h3>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Calendar size={20} /></div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.assignedClasses}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Students</h3>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Users size={20} /></div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-amber-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Notifications</h3>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Bell size={20} /></div>
          </div>
          <p className="text-2xl font-bold text-gray-900">3 New</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold text-gray-900">Today's Schedule</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {(stats.todaySchedule || []).map((item) => (
              <div key={item._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center font-bold">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.course?.name}</h4>
                    <p className="text-sm text-gray-500">{item.startTime} - {item.endTime} | Room: {item.roomNo}</p>
                  </div>
                </div>
                <button className="text-indigo-600 font-bold text-sm hover:underline">Mark Attendance</button>
              </div>
            ))}
            {stats.todaySchedule.length === 0 && (
              <p className="text-center text-gray-400 italic py-4">No classes scheduled for today.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherOverview;
