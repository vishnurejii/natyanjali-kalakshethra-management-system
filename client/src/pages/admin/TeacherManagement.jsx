import React, { useState, useEffect } from 'react';
import api from '../../api';
import { UserPlus, Search, Edit2, Trash2, X, Mail } from 'lucide-react';

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

// ✅ Defined OUTSIDE TeacherManagement to prevent re-mount on every keystroke
const TeacherForm = ({ form, setForm, onSubmit, saving, isAdd }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
      <input
        required
        value={form.name}
        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        placeholder="Teacher's full name"
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
      <input
        type="email"
        required
        value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        placeholder="teacher@email.com"
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
        <input
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          placeholder="+91 00000 00000"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Address</label>
        <input
          value={form.address}
          onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
          placeholder="City"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
    {isAdd && (
      <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-700">
        <Mail size={14} className="mt-0.5 flex-shrink-0" />
        <span>Login credentials will be generated and emailed to the teacher automatically.</span>
      </div>
    )}
    <button
      type="submit"
      disabled={saving}
      className="w-full py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60"
      style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}
    >
      {saving ? 'Saving...' : isAdd ? 'Create Teacher & Send Credentials' : 'Save Changes'}
    </button>
  </form>
);

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/users?role=teacher');
      setTeachers(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchTeachers(); }, []);

  const openAdd = () => { setForm({ name: '', email: '', phone: '', address: '' }); setModal('add'); };
  const openEdit = (t) => {
    setForm({ name: t.name, email: t.email, phone: t.phone || '', address: t.address || '' });
    setModal({ type: 'edit', id: t._id });
  };

  const filtered = teachers.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      await api.post('/users/create', { ...form, role: 'teacher' });
      showToast('✅ Teacher created! Login credentials sent to their email.');
      setModal(null); fetchTeachers();
    } catch (err) { showToast(`❌ ${err.response?.data?.message || 'Failed to create'}`); }
    finally { setSaving(false); }
  };

  const handleEdit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      await api.put(`/users/${modal.id}`, form);
      showToast('✅ Teacher updated.'); setModal(null); fetchTeachers();
    } catch (err) { showToast('❌ Update failed.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await api.delete(`/users/${modal.id}`);
      showToast('✅ Teacher deleted.'); setModal(null); fetchTeachers();
    } catch (err) { showToast('❌ Delete failed.'); }
    finally { setSaving(false); }
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
          <h2 className="text-2xl font-bold text-gray-900">Teacher Management</h2>
          <p className="text-gray-500 text-sm mt-1">{teachers.length} teachers on staff</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm"
          style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}>
          <UserPlus size={18} /> Add Teacher
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search teachers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading teachers...</div>
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
                {filtered.map(t => (
                  <tr key={t._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                          style={{ background: '#d1fae5', color: '#065f46' }}>{t.name.charAt(0)}</div>
                        <span className="font-medium text-gray-900">{t.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{t.email}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{t.phone || '—'}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{new Date(t.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-600"><Edit2 size={16} /></button>
                        <button onClick={() => setModal({ type: 'delete', id: t._id, name: t.name })} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-400">No teachers found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal === 'add' && (
        <Modal title="Add New Teacher" onClose={() => setModal(null)}>
          <TeacherForm form={form} setForm={setForm} onSubmit={handleAdd} saving={saving} isAdd />
        </Modal>
      )}

      {modal?.type === 'edit' && (
        <Modal title="Edit Teacher" onClose={() => setModal(null)}>
          <TeacherForm form={form} setForm={setForm} onSubmit={handleEdit} saving={saving} />
        </Modal>
      )}

      {modal?.type === 'delete' && (
        <Modal title="Delete Teacher" onClose={() => setModal(null)}>
          <p className="text-gray-600 mb-6">Delete <strong>{modal.name}</strong>? This cannot be undone.</p>
          <div className="flex gap-3">
            <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border text-sm font-semibold">Cancel</button>
            <button onClick={handleDelete} disabled={saving} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm disabled:opacity-60">
              {saving ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default TeacherManagement;
