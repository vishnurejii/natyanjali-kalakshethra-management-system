import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, CreditCard, Bell } from 'lucide-react';
import api from '../../api';

const StudentOverview = () => {
  const [stats, setStats] = useState({
    ongoingCourses: 0,
    attendancePercentage: 0,
    pendingFees: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard-stats/student');
        console.log('Student Stats Received:', response.data);
        setStats({
          ongoingCourses: response.data.ongoingCourses || 0,
          attendancePercentage: response.data.attendancePercentage || 0,
          pendingFees: response.data.pendingFees || 0
        });
      } catch (error) {
        console.error('Error fetching student stats:', error);
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
            <h3 className="text-gray-500 text-sm font-medium">Ongoing Courses</h3>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><BookOpen size={20} /></div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.ongoingCourses}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Attendance</h3>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><CheckCircle size={20} /></div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.attendancePercentage}%</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-rose-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Pending Fees</h3>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><CreditCard size={20} /></div>
          </div>
          <p className="text-2xl font-bold text-rose-600">₹ {stats.pendingFees}</p>
        </div>
      </div>

      <div className="bg-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">Practice Session Today?</h3>
          <p className="text-indigo-200 mb-6 max-w-md">Your instructor has added new practice materials for the Bharatanatyam Beginners course. Check them out in your course materials.</p>
          <button className="bg-white text-indigo-900 px-6 py-2 rounded-lg font-bold hover:bg-indigo-50 transition-colors">View Materials</button>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
          <BookOpen size={200} />
        </div>
      </div>
    </div>
  );
};

export default StudentOverview;
