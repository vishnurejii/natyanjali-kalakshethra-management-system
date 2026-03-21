import React, { useState, useEffect } from 'react';
import { Users, UserCheck, BookOpen, IndianRupee } from 'lucide-react';
import api from '../../api';

const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
    monthlyRevenue: "₹ 0",
    recentEnrollments: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard-stats/admin');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Updating overview...</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-indigo-600">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Students</h3>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Users size={20} /></div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Teachers</h3>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><UserCheck size={20} /></div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalTeachers}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-cyan-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Active Courses</h3>
            <div className="p-2 bg-cyan-50 text-cyan-600 rounded-lg"><BookOpen size={20} /></div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-rose-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Monthly Revenue</h3>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><IndianRupee size={20} /></div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.monthlyRevenue || "₹ 0"}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Recent Enrollments</h3>
          <button className="text-sm font-bold text-indigo-600 hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans">
            <thead className="bg-slate-50 text-gray-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-3 font-medium">Student Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Joined Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm text-gray-700">
              {stats.recentEnrollments.map((student) => (
                <tr key={student._id}>
                  <td className="px-6 py-4">{student.name}</td>
                  <td className="px-6 py-4">{student.email}</td>
                  <td className="px-6 py-4">{new Date(student.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-emerald-600 font-bold text-xs">Active</td>
                </tr>
              ))}
              {stats.recentEnrollments.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-400 italic">No recent enrollments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminOverview;
