import React, { useState, useEffect } from 'react';
import api from '../../api';
import { PlusCircle, Edit2, Trash2, X, BookOpen } from 'lucide-react';

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
      <div className="flex items-center justify-between p-6 border-b">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={20} /></button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', duration: '', fee: '', teacher: '' });
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cRes, tRes] = await Promise.all([api.get('/courses'), api.get('/users?role=teacher')]);
      setCourses(cRes.data);
      setTeachers(tRes.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setForm({ name: '', description: '', duration: '', fee: '', teacher: '' }); setModal('add'); };
  const openEdit = (c) => {
    setForm({ name: c.name, description: c.description, duration: c.duration, fee: c.fee, teacher: c.teacher?._id || '' });
    setModal({ type: 'edit', id: c._id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (modal === 'add') await api.post('/courses', form);
      else await api.put(`/courses/${modal.id}`, form);
      showToast(`✅ Course ${modal === 'add' ? 'created' : 'updated'}.`);
      setModal(null); fetchData();
    } catch (err) { showToast('❌ Failed to save course.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await api.delete(`/courses/${modal.id}`);
      showToast('✅ Course deleted.'); setModal(null); fetchData();
    } catch (err) { showToast('❌ Delete failed.'); }
    finally { setSaving(false); }
  };

  const emojiMap = { 'Classical Dance': '🩰', 'Vocal Music': '🎵', 'Instrumental Music': '🎺', 'Drawing & Arts': '🎨' };

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${toast.startsWith('✅') ? 'bg-green-600' : 'bg-red-600'}`}>{toast}</div>
      )}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
          <p className="text-gray-500 text-sm mt-1">{courses.length} courses available</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm"
          style={{ background: 'linear-gradient(135deg, #0891b2, #0e7490)' }}>
          <PlusCircle size={18} /> Add Course
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading courses...</div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {courses.map(course => (
            <div key={course._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{emojiMap[course.name] || '📚'}</div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(course)} className="p-1.5 rounded-lg hover:bg-cyan-50 text-cyan-600"><Edit2 size={15} /></button>
                  <button onClick={() => setModal({ type: 'delete', id: course._id, name: course.name })} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={15} /></button>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{course.name}</h3>
              <p className="text-gray-500 text-sm mb-3 line-clamp-2">{course.description}</p>
              <div className="flex justify-between text-xs text-gray-400 pt-3 border-t">
                <span>⏱ {course.duration}</span>
                <span className="font-semibold text-gray-600">₹{course.fee?.toLocaleString('en-IN')}/mo</span>
              </div>
              {course.teacher && (
                <p className="text-xs text-cyan-600 mt-2">👤 {course.teacher.name}</p>
              )}
            </div>
          ))}
          {courses.length === 0 && <p className="text-gray-400 col-span-3 text-center py-12">No courses yet. Add one!</p>}
        </div>
      )}

      {(modal === 'add' || modal?.type === 'edit') && (
        <Modal title={modal === 'add' ? 'Add New Course' : 'Edit Course'} onClose={() => setModal(null)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Course Name *</label>
              <input name="name" required value={form.name} onChange={handleChange} placeholder="e.g. Classical Dance"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description *</label>
              <textarea name="description" required rows={2} value={form.description} onChange={handleChange} placeholder="Brief description..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Duration *</label>
                <input name="duration" required value={form.duration} onChange={handleChange} placeholder="e.g. 1 year"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Monthly Fee (₹)</label>
                <input name="fee" type="number" value={form.fee} onChange={handleChange} placeholder="3000"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Assign Teacher</label>
              <select name="teacher" value={form.teacher} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500">
                <option value="">-- No teacher assigned --</option>
                {teachers.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
            </div>
            <button type="submit" disabled={saving}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #0891b2, #0e7490)' }}>
              {saving ? 'Saving...' : modal === 'add' ? 'Create Course' : 'Save Changes'}
            </button>
          </form>
        </Modal>
      )}

      {modal?.type === 'delete' && (
        <Modal title="Delete Course" onClose={() => setModal(null)}>
          <p className="text-gray-600 mb-6">Delete <strong>{modal.name}</strong>? This cannot be undone.</p>
          <div className="flex gap-3">
            <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border text-sm font-semibold">Cancel</button>
            <button onClick={handleDelete} disabled={saving} className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-sm disabled:opacity-60">
              {saving ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CourseManagement;
