import React, { useState, useEffect } from 'react';
import api from '../../api';
import { UserPlus, Search, Edit2, Trash2 } from 'lucide-react';

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { data } = await api.get('/users');
        setTeachers(data.filter(u => u.role === 'teacher'));
      } catch (error) {
        console.error('Error fetching teachers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  if (loading) return <div className="p-4">Loading Teachers...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Teacher Management</h2>
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
          <UserPlus size={18} />
          Add Teacher
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
        <div className="p-4 border-b bg-slate-50 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search teachers..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Specialization</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {teachers.map(teacher => (
                <tr key={teacher._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{teacher.name}</td>
                  <td className="px-6 py-4 text-gray-600">{teacher.email}</td>
                  <td className="px-6 py-4 text-gray-600">Classical Dance</td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <button className="text-indigo-600 hover:text-indigo-900"><Edit2 size={18} /></button>
                    <button className="text-rose-600 hover:text-rose-900"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherManagement;
