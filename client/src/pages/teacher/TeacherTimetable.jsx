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
  const courseColors = [
    'bg-brand-50 text-brand-600 border-brand-100',
    'bg-emerald-50 text-emerald-600 border-emerald-100',
    'bg-amber-50 text-amber-600 border-amber-100',
    'bg-rose-50 text-rose-600 border-rose-100',
    'bg-blue-50 text-blue-600 border-blue-100',
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 font-serif tracking-tight">Academic Schedule</h2>
          <p className="text-slate-500 font-medium mt-1">Manage and view your assigned teaching hours</p>
        </div>
        <div className="hidden md:block">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Load</p>
          <p className="text-sm font-bold text-slate-900">{timetable.length} sessions / week</p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="w-12 h-12 border-4 border-brand-100 border-t-brand-600 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse">Organizing your schedule...</p>
        </div>
      ) : timetable.length === 0 ? (
        <div className="bento-card py-24 flex flex-col items-center justify-center text-center space-y-6 bg-slate-50/50">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-4xl shadow-sm">📅</div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">No classes assigned</h3>
            <p className="text-slate-500 mt-1 max-w-xs">Your timetable is currently empty. Contact the administrator if this is unexpected.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-8">
          {DAYS.map(day => {
            const dayClasses = timetable.filter(e => e.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime));
            if (dayClasses.length === 0) return null;
            return (
              <div key={day} className="space-y-4">
                <div className="flex items-center gap-3 ml-2">
                  <div className="w-1.5 h-6 rounded-full bg-brand-600"></div>
                  <h3 className="text-xl font-bold text-slate-900 font-serif">{day}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {dayClasses.map((entry, idx) => {
                    const colorStyle = courseColors[idx % courseColors.length];
                    return (
                      <div key={entry._id} className="bento-card p-6 flex items-center gap-6 group transition-all hover:bg-white active:scale-[0.99]">
                        <div className={`w-20 px-3 py-4 rounded-2xl text-center border shadow-sm transition-all duration-500 group-hover:scale-105 ${colorStyle}`}>
                          <p className="text-[10px] font-black uppercase tracking-tighter opacity-70 mb-0.5">Time</p>
                          <p className="text-sm font-black leading-none">{entry.startTime}</p>
                          <div className="w-full h-[1px] bg-current opacity-10 my-1.5"></div>
                          <p className="text-[10px] font-bold opacity-60">{entry.endTime}</p>
                        </div>
                        <div className="flex-1">
                          <p className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-1">{entry.course?.name || 'Academic Class'}</p>
                          <div className="flex items-center gap-4">
                            {entry.location && (
                              <p className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                                <span className="text-brand-500 opacity-60">📍</span>
                                {entry.location}
                              </p>
                            )}
                            <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                            <p className="text-[10px] font-black text-brand-500 uppercase tracking-widest">Active</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
