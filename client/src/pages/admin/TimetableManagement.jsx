import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Calendar, Plus, Clock } from 'lucide-react';

const TimetableManagement = () => {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimetables = async () => {
      try {
        const { data } = await api.get('/timetable');
        setTimetables(data);
      } catch (error) {
        console.error('Error fetching timetables:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTimetables();
  }, []);

  if (loading) return <div className="p-4">Loading Timetables...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Timetable Management</h2>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus size={18} />
          Add Schedule
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-3 font-medium">Course</th>
                <th className="px-6 py-3 font-medium">Teacher</th>
                <th className="px-6 py-3 font-medium">Day</th>
                <th className="px-6 py-3 font-medium">Time</th>
                <th className="px-6 py-3 font-medium">Room</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {timetables.map(item => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.course?.name || 'Unknown'}</td>
                  <td className="px-6 py-4 text-gray-600">{item.assignedTeacher?.name || 'TBA'}</td>
                  <td className="px-6 py-4 text-gray-600 font-bold">{item.day}</td>
                  <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                    <Clock size={16} className="text-indigo-400" />
                    {item.startTime} - {item.endTime}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.roomNo || 'Main Hall'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimetableManagement;
