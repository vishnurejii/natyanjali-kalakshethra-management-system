import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Calendar, Clock, MapPin } from 'lucide-react';

const TeacherTimetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const { data } = await api.get('/timetable');
        // In a real app, this would be filtered by teacher ID on backend
        setTimetable(data);
      } catch (error) {
        console.error('Error fetching timetable:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTimetable();
  }, []);

  if (loading) return <div className="p-4">Loading your schedule...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">My Class Schedule</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {timetable.map(item => (
          <div key={item._id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-indigo-300 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded uppercase mb-2 inline-block">
                  {item.day}
                </span>
                <h3 className="text-xl font-bold text-gray-900">{item.course?.name}</h3>
              </div>
              <div className="p-3 bg-slate-50 rounded-full text-slate-400">
                <Calendar size={24} />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Clock size={18} className="text-indigo-400" />
                <span>{item.startTime} - {item.endTime}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin size={18} className="text-indigo-400" />
                <span>Room No: {item.roomNo || 'Main Hall'}</span>
              </div>
            </div>
            <button className="mt-6 w-full py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium">
              View Student List
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherTimetable;
