import React, { useState, useEffect } from 'react';
import api from '../../api';
import { CheckSquare, XSquare, Save, Users, Calendar, ArrowLeft, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AttendanceMarking = () => {
  const [timetable, setTimetable] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  const showToast = (msg, type = 'success') => { 
    setToast({ msg, type }); 
    setTimeout(() => setToast(null), 3000); 
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ttRes, studRes] = await Promise.all([api.get('/timetable'), api.get('/users?role=student')]);
        const myClasses = ttRes.data.filter(e => 
          e.assignedTeacher?._id === user?._id || e.course?.teacher === user?._id
        );
        setTimetable(myClasses);
        setStudents(studRes.data);
        if (myClasses.length > 0) {
          setSelectedClass(myClasses[0]);
          const init = {};
          studRes.data.forEach(s => { init[s._id] = 'Present'; });
          setAttendance(init);
        }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const handleClassSelect = (cls) => {
    setSelectedClass(cls);
    const init = {};
    students.forEach(s => { init[s._id] = 'Present'; });
    setAttendance(init);
  };

  const toggle = (studentId) => {
    setAttendance(prev => ({ ...prev, [studentId]: prev[studentId] === 'Present' ? 'Absent' : 'Present' }));
  };

  const handleSubmit = async () => {
    if (!selectedClass) return;
    setSaving(true);
    try {
      const records = students.map(s => ({
        student: s._id,
        timetable: selectedClass._id,
        status: attendance[s._id] || 'Present',
        date: new Date()
      }));
      await api.post('/attendance', { records });
      showToast('Attendance recorded for ' + selectedClass.course?.name, 'success');
    } catch (err) {
      showToast('Failed to save records. Please try again.', 'error');
    } finally { setSaving(false); }
  };

  const presentCount = Object.values(attendance).filter(v => v === 'Present').length;

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 space-y-4">
      <div className="w-12 h-12 border-4 border-brand-100 border-t-brand-600 rounded-full animate-spin"></div>
      <p className="text-slate-400 font-medium animate-pulse font-serif">Syncing class records...</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-10 left-1/2 z-50 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border flex items-center gap-3 min-w-[320px] ${
              toast.type === 'success' ? 'bg-emerald-600/90 text-white border-emerald-500/50' : 'bg-rose-600/90 text-white border-rose-500/50'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              {toast.type === 'success' ? <Check size={18} /> : <X size={18} />}
            </div>
            <p className="font-bold tracking-tight text-sm">{toast.msg}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="text-brand-500" size={16} />
            <span className="text-[10px] font-black text-brand-500 uppercase tracking-[0.3em]">Artisan Portal</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 font-serif tracking-tight">Attendance Marking</h2>
          <p className="text-slate-500 font-medium mt-1">Refining the legacy. {students.length} students currently enrolled.</p>
        </div>
        <button 
          onClick={handleSubmit} 
          disabled={saving || !selectedClass}
          className="btn-premium px-8 py-4 flex items-center gap-3 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <Save size={18} className="relative z-10" /> 
          <span className="relative z-10">{saving ? 'Preserving...' : 'Finalize Attendance'}</span>
        </button>
      </div>

      {timetable.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bento-card py-24 text-center space-y-6"
        >
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-5xl mx-auto shadow-inner opacity-50">📋</div>
          <div>
            <p className="text-slate-900 font-bold text-xl font-serif">No classes found</p>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">It seems you don't have any classes assigned for today's session.</p>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-8">
          {/* Class selector */}
          <div className="flex gap-3 flex-wrap p-2 bg-slate-50 rounded-[2rem] border border-slate-100">
            {timetable.map(cls => (
              <button 
                key={cls._id} 
                onClick={() => handleClassSelect(cls)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-500 ${
                  selectedClass?._id === cls._id 
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30' 
                    : 'bg-transparent text-slate-500 hover:bg-white hover:text-brand-600'
                }`}
              >
                {cls.course?.name} <span className="opacity-50 mx-1">·</span> {cls.day}
              </button>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bento-card p-6 border-none bg-white/50 backdrop-blur-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
              <p className="text-xl font-bold text-emerald-600 flex items-center gap-2 font-serif italic">
                <Check size={18} /> Present
              </p>
              <p className="text-3xl font-black mt-2">{presentCount}</p>
            </div>
            <div className="bento-card p-6 border-none bg-white/50 backdrop-blur-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
              <p className="text-xl font-bold text-rose-600 flex items-center gap-2 font-serif italic">
                <X size={18} /> Absent
              </p>
              <p className="text-3xl font-black mt-2">{students.length - presentCount}</p>
            </div>
            <div className="col-span-2 bento-card p-6 border-none bg-brand-600 text-white shadow-xl shadow-brand-500/20">
              <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">Current Session</p>
              <h3 className="text-xl font-bold font-serif">{selectedClass?.course?.name}</h3>
              <p className="text-xs opacity-80 mt-1 uppercase tracking-widest font-bold">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Student list */}
          <div className="bento-card overflow-hidden border-none shadow-premium">
            <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-serif">Enrollment Registry</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Tap to toggle attendance</p>
              </div>
              <div className="flex -space-x-2">
                {students.slice(0, 5).map((s, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-brand-100 flex items-center justify-center text-[10px] font-bold text-brand-600">
                    {s.name.charAt(0)}
                  </div>
                ))}
                {students.length > 5 && (
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                    +{students.length - 5}
                  </div>
                )}
              </div>
            </div>
            <div className="divide-y divide-slate-50">
              {students.map((student, idx) => {
                const isPresent = attendance[student._id] === 'Present';
                return (
                  <motion.div 
                    key={student._id} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="flex items-center justify-between p-6 hover:bg-slate-50/80 transition-all group"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl font-serif transition-all duration-500 ${
                        isPresent ? 'bg-emerald-50 text-emerald-600 shadow-sm' : 'bg-rose-50 text-rose-600 shadow-sm'
                      }`}>
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <span className="text-lg font-bold text-slate-900 font-serif group-hover:text-brand-600 transition-colors">{student.name}</span>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Student ID: ...{student._id.slice(-4)}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => toggle(student._id)}
                      className={`relative flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.15em] transition-all duration-500 overflow-hidden ${
                        isPresent 
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' 
                          : 'bg-white text-slate-400 border border-slate-100 hover:border-rose-300 hover:text-rose-600'
                      }`}
                    >
                      {isPresent ? <Check size={16} /> : <X size={16} />}
                      {isPresent ? 'Marked Present' : 'Marked Absent'}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceMarking;

