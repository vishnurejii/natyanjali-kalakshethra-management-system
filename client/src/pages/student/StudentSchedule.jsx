import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Calendar, Clock, User } from 'lucide-react';

const StudentSchedule = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const { data } = await api.get('/timetable');
        // Filter logic would be: check which courses the student is enrolled in
        setTimetable(data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTimetable();
  }, []);

  if (loading) return <div className="p-4">Loading your schedule...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">My Weekly Schedule</h2>
      <div className="space-y-4">
        {timetable.map(item => (
          <div key={item._id} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-all">
            <div className="flex items-center gap-6 mb-4 md:mb-0">
              <div className="w-16 h-16 bg-slate-50 text-indigo-600 rounded-xl flex flex-col items-center justify-center font-bold">
                <span className="text-xs uppercase">{item.day.substring(0, 3)}</span>
                <Calendar size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{item.course?.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <User size={14} />
                  <span>Instructor: {item.assignedTeacher?.name || 'TBA'}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <div className="flex items-center gap-2 font-bold text-gray-900">
                  <Clock size={16} className="text-indigo-400" />
                  {item.startTime} - {item.endTime}
                </div>
                <div className="text-xs text-gray-400 mt-1">Room: {item.roomNo || 'Hall A'}</div>
              </div>
              <button className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-bold text-sm hover:bg-indigo-100 transition-colors">Join Class</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentSchedule;
