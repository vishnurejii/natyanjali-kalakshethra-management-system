import React, { useState, useEffect } from 'react';
import { Users, UserCheck, BookOpen, IndianRupee } from 'lucide-react';
import api from '../../api';
import AdminStatsTable from '../../components/admin/AdminStatsTable';

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

  if (loading) return <div className="p-8 text-center text-slate-500 font-sans">Updating overview...</div>;

  const tableColumns = [
    { header: "Student Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Joined Date", accessor: "createdAt", render: (row) => new Date(row.createdAt).toLocaleDateString() },
    { header: "Status", accessor: "status", render: () => <span className="text-emerald-600 font-bold text-xs tracking-wider uppercase">Active</span> }
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bento-card p-6 border-l-4 border-l-primary">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 text-sm font-medium tracking-tight">Total Students</h3>
            <div className="p-2 bg-slate-50 text-primary rounded-lg"><Users size={20} /></div>
          </div>
          <p className="text-3xl font-serif text-primary">{stats.totalStudents}</p>
        </div>
        <div className="bento-card p-6 border-l-4 border-l-accent">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 text-sm font-medium tracking-tight">Total Teachers</h3>
            <div className="p-2 bg-amber-50 text-accent rounded-lg"><UserCheck size={20} /></div>
          </div>
          <p className="text-3xl font-serif text-primary">{stats.totalTeachers}</p>
        </div>
        <div className="bento-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 text-sm font-medium tracking-tight">Active Courses</h3>
            <div className="p-2 bg-slate-50 text-slate-600 rounded-lg"><BookOpen size={20} /></div>
          </div>
          <p className="text-3xl font-serif text-primary">{stats.totalCourses}</p>
        </div>
        <div className="bento-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 text-sm font-medium tracking-tight">Monthly Revenue</h3>
            <div className="p-2 bg-slate-50 text-slate-600 rounded-lg"><IndianRupee size={20} /></div>
          </div>
          <p className="text-3xl font-serif text-primary">{stats.monthlyRevenue || "₹ 0"}</p>
        </div>
      </div>

      <div className="mb-8">
        <AdminStatsTable 
          title="Recent Enrollments" 
          columns={tableColumns} 
          data={stats.recentEnrollments} 
        />
      </div>
    </>
  );
};

export default AdminOverview;
