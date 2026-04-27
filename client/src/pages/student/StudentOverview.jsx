import React, { useState, useEffect } from 'react';
import api from '../../api';
import { BookOpen, BarChart2, CreditCard, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const StudentOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    api.get('/dashboard-stats/student')
      .then(r => setStats(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 space-y-4">
      <div className="w-12 h-12 border-4 border-brand-100 border-t-brand-600 rounded-full animate-spin"></div>
      <p className="text-slate-400 font-medium animate-pulse font-serif italic">Gathering your progress...</p>
    </div>
  );

  const statCards = [
    { label: 'Learning Path', value: stats?.ongoingCourses ?? 0, sub: 'Active Courses', icon: BookOpen, accent: 'brand' },
    { label: 'Consistency', value: `${stats?.attendancePercentage ?? 100}%`, sub: 'Attendance Rate', icon: BarChart2, accent: 'emerald' },
    { label: 'Investment', value: `₹${(stats?.totalPaidFees || 0).toLocaleString('en-IN')}`, sub: 'Fees Contributed', icon: CreditCard, accent: 'amber' },
  ];

  const accentMap = {
    brand: { bg: 'bg-brand-50', text: 'text-brand-600', shadow: 'shadow-brand-500/10' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', shadow: 'shadow-emerald-500/10' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', shadow: 'shadow-amber-500/10' },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-[1px] bg-brand-400"></span>
            <span className="text-[10px] font-black text-brand-500 uppercase tracking-[0.3em]">Student Portal</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif tracking-tight">
            Welcome, <span className="italic font-light text-slate-500">{user?.name?.split(' ')[0]}</span>.
          </h2>
          <p className="text-slate-500 font-medium mt-2">Your artistic growth continues today.</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Academic Year</p>
          <p className="text-sm font-bold text-slate-900 font-serif italic">2024-25 session</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map(({ label, value, sub, icon: Icon, accent }) => (
          <motion.div 
            key={label} 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bento-card p-8 group relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${accentMap[accent].bg} opacity-30 rounded-bl-full translate-x-12 -translate-y-12 transition-transform duration-700 group-hover:translate-x-8 group-hover:-translate-y-8`} />
            
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1">{label}</span>
                <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">{sub}</p>
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${accentMap[accent].shadow} ${accentMap[accent].bg} ${accentMap[accent].text} group-hover:rotate-6 transition-transform duration-500`}>
                <Icon size={28} strokeWidth={1.5} />
              </div>
            </div>
            <p className="text-5xl font-bold text-slate-900 tracking-tighter font-serif">{value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upcoming Classes */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bento-card overflow-hidden border-none bg-white shadow-premium">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 font-serif">Your Schedule</h3>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Upcoming Sessions</p>
            </div>
            <Calendar className="text-slate-200" size={32} strokeWidth={1} />
          </div>
          
          {!stats?.schedule?.length ? (
            <div className="p-20 text-center space-y-6">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-5xl mx-auto shadow-inner grayscale opacity-60">📅</div>
              <div>
                <p className="text-slate-900 font-bold text-xl font-serif">No upcoming classes</p>
                <p className="text-slate-400 text-sm max-w-xs mx-auto">Your schedule is currently clear. Enjoy the pause.</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {stats.schedule.map((entry, idx) => (
                <div key={entry._id} className="flex items-center gap-8 p-8 hover:bg-slate-50/80 transition-all group cursor-pointer">
                  <div className="w-24 px-4 py-5 rounded-3xl text-center bg-slate-900 text-white shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:bg-brand-600">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{entry.day}</p>
                    <p className="text-base font-black font-serif">{entry.startTime}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-2xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors leading-tight mb-2 font-serif">{entry.course?.name || 'Academic Class'}</p>
                    <div className="flex items-center gap-6">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2">
                        <span className="text-brand-500">📍</span>
                        {entry.location || 'Main Studio'}
                      </p>
                    </div>
                  </div>
                  <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600 transition-all duration-500">
                    <ArrowRight size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Learning Insight */}
        <motion.div variants={itemVariants} className="bento-card p-8 bg-brand-600 text-white relative overflow-hidden flex flex-col justify-between border-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="text-brand-200" size={20} />
              <h3 className="text-xl font-bold font-serif italic">Student Insight</h3>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-sm">
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-100 mb-2">Pro Tip</p>
                <p className="text-sm font-medium leading-relaxed">
                  "Perfecting a mudra takes 1000 repetitions. Start your 10-minute daily practice today."
                </p>
              </div>
              
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-100 opacity-60">Quick Links</p>
                {['View My Profile', 'Fee Statements', 'Notification Center'].map(link => (
                  <button key={link} className="w-full text-left flex items-center justify-between group py-1">
                    <span className="text-sm font-bold tracking-tight hover:translate-x-1 transition-transform">{link}</span>
                    <ArrowRight size={14} className="opacity-40 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-widest">
              Level: Intermediate
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StudentOverview;

