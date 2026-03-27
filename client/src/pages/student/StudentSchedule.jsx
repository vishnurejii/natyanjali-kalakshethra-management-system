import React, { useState, useEffect } from 'react';
import api from '../../api';

const StudentSchedule = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/timetable')
      .then(r => setTimetable(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const colorPalette = ['#ede9fe', '#d1fae5', '#fef3c7', '#fee2e2', '#dbeafe', '#fce7f3'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Class Schedule</h2>
        <p className="text-gray-500 text-sm mt-1">Your weekly timetable</p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading schedule...</div>
      ) : timetable.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <div className="text-5xl mb-3">📅</div>
          <p className="text-gray-500">No classes scheduled yet. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {DAYS.map((day, dayIdx) => {
            const dayClasses = timetable.filter(e => e.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime));
            if (dayClasses.length === 0) return null;
            return (
              <div key={day} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-3 border-b" style={{ background: colorPalette[dayIdx % colorPalette.length] }}>
                  <h3 className="font-semibold text-gray-700">{day}</h3>
                </div>
                <div className="divide-y">
                  {dayClasses.map(entry => (
                    <div key={entry._id} className="flex items-center gap-4 p-5">
                      <div className="px-3 py-2 rounded-xl text-center flex-shrink-0" style={{ background: colorPalette[dayIdx % colorPalette.length] }}>
                        <p className="text-xs font-bold text-gray-700">{entry.startTime}</p>
                        <p className="text-xs text-gray-500">→ {entry.endTime}</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{entry.course?.name || 'Class'}</p>
                        <div className="flex gap-4 text-sm text-gray-500 mt-1">
                          {entry.location && <span>📍 {entry.location}</span>}
                          {entry.assignedTeacher && <span>👤 {entry.assignedTeacher.name}</span>}
                        </div>
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

export default StudentSchedule;
