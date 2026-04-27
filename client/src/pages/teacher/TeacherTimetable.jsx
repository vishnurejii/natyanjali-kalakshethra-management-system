import React, { useState, useEffect } from 'react';
import api from '../../api';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';

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
    { bg: 'bg-brand-50', text: 'text-brand-600', border: 'border-brand-100', icon: '🎨' },
    { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', icon: '🎭' },
    { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', icon: '✨' },
    { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100', icon: '🌸' },
    { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', icon: '🌊' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12 max-w-6xl mx-auto"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-[1px] bg-brand-400"></span>
            <span className="text-[10px] font-black text-brand-500 uppercase tracking-[0.3em]">Artisan Schedule</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 font-serif tracking-tight">Academic Timeline</h2>
          <p className="text-slate-500 font-medium mt-1 italic">Sculpting the path for future masters.</p>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Teaching Load</p>
          <p className="text-lg font-bold text-slate-900 font-serif">{timetable.length} <span className="text-sm font-normal text-slate-400 italic">sessions / week</span></p>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="w-12 h-12 border-4 border-brand-100 border-t-brand-600 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse font-serif italic">Arranging the stars...</p>
        </div>
      ) : timetable.length === 0 ? (
        <motion.div variants={itemVariants} className="bento-card py-24 flex flex-col items-center justify-center text-center space-y-6 bg-slate-50/30 border-dashed">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-5xl shadow-sm grayscale opacity-50">📅</div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-serif">A Clear Horizon</h3>
            <p className="text-slate-500 mt-2 max-w-xs mx-auto">No sessions are currently assigned to your profile. A perfect time for creative exploration.</p>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-12">
          {DAYS.map((day, dayIdx) => {
            const dayClasses = timetable.filter(e => e.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime));
            if (dayClasses.length === 0) return null;
            return (
              <motion.div key={day} variants={itemVariants} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                    {day}
                  </div>
                  <div className="flex-1 h-[1px] bg-slate-100"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {dayClasses.map((entry, idx) => {
                    const style = courseColors[idx % courseColors.length];
                    return (
                      <motion.div 
                        key={entry._id} 
                        whileHover={{ y: -4 }}
                        className="bento-card p-8 group relative bg-white border-none shadow-premium overflow-hidden"
                      >
                        <div className={`absolute top-0 right-0 w-32 h-32 ${style.bg} opacity-20 rounded-bl-full translate-x-16 -translate-y-16 group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform duration-700`} />
                        
                        <div className="flex items-start gap-8 relative z-10">
                          <div className={`w-24 flex-shrink-0 px-4 py-6 rounded-[2.5rem] text-center border-2 transition-all duration-700 group-hover:scale-105 ${style.bg} ${style.text} ${style.border} shadow-sm`}>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Time</p>
                            <p className="text-lg font-black font-serif leading-none">{entry.startTime}</p>
                            <div className="w-8 h-[1px] bg-current opacity-20 mx-auto my-3"></div>
                            <p className="text-[10px] font-bold opacity-60">{entry.endTime}</p>
                          </div>
                          
                          <div className="flex-1 pt-2">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">{style.icon}</span>
                              <h4 className="text-2xl font-bold text-slate-900 font-serif tracking-tight group-hover:text-brand-600 transition-colors">{entry.course?.name || 'Art Session'}</h4>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 mt-6">
                              {entry.location && (
                                <div className="flex items-center gap-2 text-slate-400">
                                  <MapPin size={14} className="text-brand-500" />
                                  <span className="text-xs font-bold uppercase tracking-widest">{entry.location}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2 text-slate-400">
                                <Clock size={14} className="text-brand-500" />
                                <span className="text-xs font-bold uppercase tracking-widest">Active Session</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <Sparkles className={style.text} size={20} />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default TeacherTimetable;

