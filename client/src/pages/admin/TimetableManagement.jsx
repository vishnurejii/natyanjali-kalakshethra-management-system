import React, { useState, useEffect } from 'react';
import api from '../../api';
import { PlusCircle, Edit2, Trash2, X } from 'lucide-react';

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-screen overflow-y-auto">
      <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={20} /></button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const TimetableManagement = () => {
  const [entries, setEntries] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ course: '', day: 'Monday', startTime: '', endTime: '', location: '', assignedTeacher: '' });
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ttRes, cRes, tRes] = await Promise.all([api.get('/timetable'), api.get('/courses'), api.get('/users?role=teacher')]);
      setEntries(ttRes.data);
      setCourses(cRes.data);
      setTeachers(tRes.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchData(); }, []);

  const dayEntries = entries.filter(e => e.day === selectedDay);

  const openAdd = () => {
    setForm({ course: courses[0]?._id || '', day: selectedDay, startTime: '09:00', endTime: '10:00', location: '', assignedTeacher: '' });
    setModal('add');
  };
  const openEdit = (entry) => {
    setForm({
      course: entry.course?._id || '', day: entry.day, startTime: entry.startTime,
      endTime: entry.endTime, location: entry.location || '', assignedTeacher: entry.assignedTeacher?._id || ''
    });
    setModal({ type: 'edit', id: entry._id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (modal === 'add') await api.post('/timetable', form);
      else await api.put(`/timetable/${modal.id}`, form);
      showToast(`✅ Timetable ${modal === 'add' ? 'entry added' : 'updated'}.`);
      setModal(null); fetchData();
    } catch (err) { showToast('❌ Failed to save.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await api.delete(`/timetable/${modal.id}`);
      showToast('✅ Entry deleted.'); setModal(null); fetchData();
    } catch (err) { showToast('❌ Delete failed.'); }
    finally { setSaving(false); }
  };

  const TimetableForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Course *</label>
        <select name="course" required value={form.course} onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
          <option value="">Select course</option>
          {courses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Day *</label>
        <select name="day" value={form.day} onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
          {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Start Time *</label>
          <input name="startTime" type="time" required value={form.startTime} onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">End Time *</label>
          <input name="endTime" type="time" required value={form.endTime} onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location / Hall</label>
        <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Dance Hall A"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Assign Teacher</label>
        <select name="assignedTeacher" value={form.assignedTeacher} onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
          <option value="">-- Unassigned --</option>
          {teachers.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
        </select>
      </div>
      <button type="submit" disabled={saving}
        className="w-full py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg, #d97706, #b45309)' }}>
        {saving ? 'Saving...' : modal === 'add' ? 'Add Entry' : 'Save Changes'}
      </button>
    </form>
  );

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${toast.startsWith('✅') ? 'bg-green-600' : 'bg-red-600'}`}>{toast}</div>
      )}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Timetable Management</h2>
          <p className="text-gray-500 text-sm mt-1">{entries.length} total scheduled classes</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm"
          style={{ background: 'linear-gradient(135deg, #d97706, #b45309)' }}>
          <PlusCircle size={18} /> Add Class
        </button>
      </div>

      {/* Day selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {DAYS.map(day => (
          <button key={day} onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedDay === day ? 'text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
            style={selectedDay === day ? { background: 'linear-gradient(135deg, #d97706, #b45309)' } : {}}>
            {day}
          </button>
        ))}
      </div>

      {/* Timetable for selected day */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b bg-amber-50">
          <h3 className="font-semibold text-gray-700">{selectedDay} — {dayEntries.length} classes</h3>
        </div>
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading timetable...</div>
        ) : dayEntries.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <div className="text-4xl mb-3">📅</div>
            <p>No classes scheduled for {selectedDay}</p>
            <button onClick={openAdd} className="mt-4 text-sm text-amber-600 font-semibold hover:underline">+ Add a class</button>
          </div>
        ) : (
          <div className="divide-y">
            {dayEntries.sort((a, b) => a.startTime.localeCompare(b.startTime)).map(entry => (
              <div key={entry._id} className="flex items-center justify-between p-5 hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="text-center px-3 py-2 rounded-xl min-w-[70px]" style={{ background: '#fef3c7' }}>
                    <p className="text-xs text-amber-600 font-semibold">{entry.startTime}</p>
                    <p className="text-xs text-amber-500">— {entry.endTime}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{entry.course?.name || 'Unknown Course'}</p>
                    <p className="text-sm text-gray-500">
                      {entry.location && `📍 ${entry.location}`}
                      {entry.assignedTeacher && ` · 👤 ${entry.assignedTeacher.name}`}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(entry)} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-600"><Edit2 size={16} /></button>
                  <button onClick={() => setModal({ type: 'delete', id: entry._id, name: entry.course?.name })} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {(modal === 'add' || modal?.type === 'edit') && (
        <Modal title={modal === 'add' ? 'Add Class to Timetable' : 'Edit Timetable Entry'} onClose={() => setModal(null)}>
          <TimetableForm />
        </Modal>
      )}
      {modal?.type === 'delete' && (
        <Modal title="Remove Entry" onClose={() => setModal(null)}>
          <p className="text-gray-600 mb-6">Remove <strong>{modal.name}</strong> from the timetable?</p>
          <div className="flex gap-3">
            <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border text-sm font-semibold">Cancel</button>
            <button onClick={handleDelete} disabled={saving} className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-sm disabled:opacity-60">
              {saving ? 'Removing...' : 'Remove'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TimetableManagement;
