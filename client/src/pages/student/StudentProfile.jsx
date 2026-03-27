import React, { useState } from 'react';
import api from '../../api';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';

const StudentProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [form, setForm] = useState({ name: user?.name || '', phone: '', address: '' });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const { data } = await api.put(`/users/${user._id}`, form);
      const updated = { ...user, name: data.name };
      localStorage.setItem('user', JSON.stringify(updated));
      showToast('✅ Profile updated successfully!');
    } catch (err) {
      showToast('❌ ' + (err.response?.data?.message || 'Update failed.'));
    } finally { setSaving(false); }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${toast.startsWith('✅') ? 'bg-green-600' : 'bg-red-600'}`}>{toast}</div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
        <p className="text-gray-500 text-sm mt-1">Manage your personal information</p>
      </div>

      {/* Avatar section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-5">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold"
          style={{ background: 'linear-gradient(135deg, #ede9fe, #c7d2fe)', color: '#4f46e5' }}>
          {user?.name?.charAt(0)}
        </div>
        <div>
          <p className="text-xl font-bold text-gray-900">{user?.name}</p>
          <p className="text-gray-500">{user?.email}</p>
          <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: '#ede9fe', color: '#6d28d9' }}>
            🎓 Student
          </span>
        </div>
      </div>

      {/* Edit form */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-5">Update Information</h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
              <User size={14} /> Full Name
            </label>
            <input name="name" value={form.name} onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
              <Mail size={14} /> Email
            </label>
            <input value={user?.email} disabled
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 text-gray-400 cursor-not-allowed" />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed here. Contact admin.</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
              <Phone size={14} /> Phone Number
            </label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
              <MapPin size={14} /> Address
            </label>
            <input name="address" value={form.address} onChange={handleChange} placeholder="City, State"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-semibold text-sm disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
            <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;
