import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Filter } from 'lucide-react';

const AttendanceManagement = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/attendance');
      setRecords(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchRecords(); }, []);

  const filtered = filter === 'All' ? records : records.filter(r => r.status === filter);
  const presentCount = records.filter(r => r.status === 'Present').length;
  const attendanceRate = records.length > 0 ? Math.round((presentCount / records.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Attendance Records</h2>
          <p className="text-gray-500 text-sm mt-1">{records.length} records · {attendanceRate}% overall attendance</p>
        </div>
        <div className="px-5 py-2.5 rounded-xl text-white font-semibold text-sm"
          style={{ background: attendanceRate >= 75 ? 'linear-gradient(135deg, #059669, #047857)' : 'linear-gradient(135deg, #dc2626, #b91c1c)' }}>
          📊 {attendanceRate}% Attendance
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-sm text-gray-500 mb-1">Present</p>
          <p className="text-3xl font-bold" style={{ color: '#059669' }}>{presentCount}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-sm text-gray-500 mb-1">Absent</p>
          <p className="text-3xl font-bold" style={{ color: '#dc2626' }}>{records.length - presentCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex items-center gap-3">
          <Filter size={16} className="text-gray-400" />
          {['All', 'Present', 'Absent'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === f ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {f}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading records...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="px-6 py-3 font-semibold">Student</th>
                  <th className="px-6 py-3 font-semibold">Course</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(r => (
                  <tr key={r._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{r.student?.name || '—'}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{r.timetable?.course?.name || '—'}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{new Date(r.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${r.status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && <tr><td colSpan="4" className="px-6 py-12 text-center text-gray-400">No records found.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceManagement;
