import React, { useState, useEffect } from 'react';
import api from '../../api';
import { UserPlus, Search, Edit2, Trash2, X, Mail } from 'lucide-react';

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
      <div className="flex items-center justify-between p-6 border-b">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"><X size={20} /></button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

const UserForm = ({ initial, onSubmit, loading, label }) => {
  const [form, setForm] = useState(initial || { name: '', email: '', phone: '', address: '' });
  const handleChange = (e) => { const { name, value } = e.target; setForm(f => ({ ...f, [name]: value })); };
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(form); };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
        <input name="name" required value={form.name} onChange={handleChange} placeholder="Student's full name"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
        <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="student@email.com"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Address</label>
          <input name="address" value={form.address} onChange={handleChange} placeholder="City, State"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>
      {!initial && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-700">
          <Mail size={14} className="mt-0.5 flex-shrink-0" />
          <span>Login credentials will be auto-generated and sent to the student's email.</span>
        </div>
      )}
      <button type="submit" disabled={loading}
        className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
        {loading ? 'Saving...' : label}
      </button>
    </form>
  );
};

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | 'add' | { type: 'edit', student } | { type: 'delete', student } | { type: 'credentials', data }
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/users?role=student');
      setStudents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchStudents(); }, []);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async (form) => {
    setSaving(true);
    try {
      await api.post('/users/create', { ...form, role: 'student' });
      showToast('✅ Student created! Login credentials sent to their email.');
      setModal(null);
      fetchStudents();
    } catch (err) {
      showToast(`❌ ${err.response?.data?.message || 'Failed to create student'}`);
    } finally { setSaving(false); }
  };

  const handleEdit = async (form) => {
    setSaving(true);
    try {
      await api.put(`/users/${modal.student._id}`, form);
      showToast('✅ Student updated successfully.');
      setModal(null);
      fetchStudents();
    } catch (err) {
      showToast(`❌ ${err.response?.data?.message || 'Update failed'}`);
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await api.delete(`/users/${modal.student._id}`);
      showToast('✅ Student deleted.');
      setModal(null);
      fetchStudents();
    } catch (err) {
      showToast(`❌ Failed to delete student.`);
    } finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${toast.startsWith('✅') ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
          <p className="text-gray-500 text-sm mt-1">{students.length} students enrolled</p>
        </div>
        <button onClick={() => setModal('add')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
          <UserPlus size={18} /> Add Student
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading students...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="px-6 py-3 font-semibold">Name</th>
                  <th className="px-6 py-3 font-semibold">Email</th>
                  <th className="px-6 py-3 font-semibold">Phone</th>
                  <th className="px-6 py-3 font-semibold">Joined</th>
                  <th className="px-6 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(student => (
                  <tr key={student._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                          style={{ background: '#ede9fe', color: '#6d28d9' }}>
                          {student.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{student.email}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{student.phone || '—'}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{new Date(student.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setModal({ type: 'edit', student })}
                          className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-600 transition-colors"><Edit2 size={16} /></button>
                        <button onClick={() => setModal({ type: 'delete', student })}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-400">No students found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {modal === 'add' && (
        <Modal title="Add New Student" onClose={() => setModal(null)}>
          <UserForm onSubmit={handleAdd} loading={saving} label="Create Student & Send Credentials" />
        </Modal>
      )}

      {/* Edit Modal */}
      {modal?.type === 'edit' && (
        <Modal title="Edit Student" onClose={() => setModal(null)}>
          <UserForm initial={modal.student} onSubmit={handleEdit} loading={saving} label="Save Changes" />
        </Modal>
      )}

      {/* Delete Confirm */}
      {modal?.type === 'delete' && (
        <Modal title="Delete Student" onClose={() => setModal(null)}>
          <p className="text-gray-600 mb-6">Are you sure you want to delete <strong>{modal.student.name}</strong>? This action cannot be undone.</p>
          <div className="flex gap-3">
            <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
            <button onClick={handleDelete} disabled={saving}
              className="flex-1 py-2.5 rounded-xl text-white font-semibold text-sm bg-red-600 hover:bg-red-700 disabled:opacity-60">
              {saving ? 'Deleting...' : 'Delete Student'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StudentManagement;
