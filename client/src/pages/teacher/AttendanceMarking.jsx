import React, { useState, useEffect } from 'react';
import api from '../../api';
import { CheckSquare, XSquare, Save } from 'lucide-react';

const AttendanceMarking = () => {
  const [timetable, setTimetable] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

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
      showToast('✅ Attendance marked successfully!');
    } catch (err) {
      showToast('❌ Failed to save attendance.' );
    } finally { setSaving(false); }
  };

  const presentCount = Object.values(attendance).filter(v => v === 'Present').length;

  if (loading) return <div className="text-center py-16 text-gray-400">Loading...</div>;

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${toast.startsWith('✅') ? 'bg-green-600' : 'bg-red-600'}`}>{toast}</div>
      )}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mark Attendance</h2>
          <p className="text-gray-500 text-sm mt-1">{students.length} students · {presentCount} present</p>
        </div>
        <button onClick={handleSubmit} disabled={saving || !selectedClass}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}>
          <Save size={16} /> {saving ? 'Saving...' : 'Submit Attendance'}
        </button>
      </div>

      {timetable.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <div className="text-5xl mb-3">📋</div>
          <p className="text-gray-500">No classes assigned to you yet.</p>
        </div>
      ) : (
        <>
          {/* Class selector */}
          <div className="flex gap-2 flex-wrap">
            {timetable.map(cls => (
              <button key={cls._id} onClick={() => handleClassSelect(cls)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${selectedClass?._id === cls._id ? 'text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                style={selectedClass?._id === cls._id ? { background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' } : {}}>
                {cls.course?.name} · {cls.day}
              </button>
            ))}
          </div>

          {/* Student list */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-5 border-b bg-gray-50 flex justify-between items-center">
              <h3 className="font-semibold text-gray-700">
                {selectedClass?.course?.name} — {new Date().toLocaleDateString()}
              </h3>
              <div className="text-sm text-gray-500">
                <span className="text-green-600 font-semibold">{presentCount}P </span>/
                <span className="text-red-500 font-semibold"> {students.length - presentCount}A</span>
              </div>
            </div>
            <div className="divide-y">
              {students.map(student => {
                const isPresent = attendance[student._id] === 'Present';
                return (
                  <div key={student._id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                        style={{ background: isPresent ? '#d1fae5' : '#fee2e2', color: isPresent ? '#065f46' : '#991b1b' }}>
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{student.name}</span>
                    </div>
                    <button onClick={() => toggle(student._id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isPresent ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}>
                      {isPresent ? <CheckSquare size={16} /> : <XSquare size={16} />}
                      {isPresent ? 'Present' : 'Absent'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceMarking;
