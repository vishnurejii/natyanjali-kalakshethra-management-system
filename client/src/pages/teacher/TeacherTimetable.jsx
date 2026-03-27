import React, { useState, useEffect } from 'react';
import api from '../../api';

const TeacherTimetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    api.get('/timetable')
      .then(r => setTimetable(r.data.filter(e => 
        e.assignedTeacher?._id === user?._id || e.course?.teacher === user?._id
      )))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const courseColors = ['#ede9fe', '#d1fae5', '#fef3c7', '#fee2e2', '#dbeafe', '#fce7f3'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">My Timetable</h2>
        <p className="text-gray-500 text-sm mt-1">{timetable.length} assigned sessions</p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading timetable...</div>
      ) : timetable.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <div className="text-5xl mb-3">📅</div>
          <p className="text-gray-500">No classes assigned to you yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {DAYS.map(day => {
            const dayClasses = timetable.filter(e => e.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime));
            if (dayClasses.length === 0) return null;
            return (
              <div key={day} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-3 border-b bg-gray-50">
                  <h3 className="font-semibold text-gray-700">{day}</h3>
                </div>
                <div className="divide-y">
                  {dayClasses.map((entry, idx) => (
                    <div key={entry._id} className="flex items-center gap-4 p-5">
                      <div className="w-2 h-12 rounded-full flex-shrink-0" style={{ background: courseColors[idx % courseColors.length] }} />
                      <div className="px-3 py-2 rounded-xl text-center flex-shrink-0" style={{ background: courseColors[idx % courseColors.length] }}>
                        <p className="text-xs font-bold text-gray-700">{entry.startTime}</p>
                        <p className="text-xs text-gray-500">{entry.endTime}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{entry.course?.name || 'Class'}</p>
                        {entry.location && <p className="text-sm text-gray-500">📍 {entry.location}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TeacherTimetable;
