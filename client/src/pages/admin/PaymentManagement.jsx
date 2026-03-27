import React, { useState, useEffect } from 'react';
import api from '../../api';
import { CreditCard, Filter } from 'lucide-react';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/payments');
      setPayments(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchPayments(); }, []);

  const filtered = filter === 'All' ? payments : payments.filter(p => p.status === filter);
  const totalRevenue = payments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0);

  const statusStyle = {
    Completed: { bg: '#d1fae5', color: '#065f46' },
    Pending: { bg: '#fef3c7', color: '#92400e' },
    Failed: { bg: '#fee2e2', color: '#991b1b' },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Management</h2>
          <p className="text-gray-500 text-sm mt-1">{payments.length} total transactions</p>
        </div>
        <div className="px-5 py-2.5 rounded-xl text-white font-semibold text-sm"
          style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}>
          💰 Total: ₹{totalRevenue.toLocaleString('en-IN')}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {['Completed', 'Pending', 'Failed'].map(status => {
          const count = payments.filter(p => p.status === status).length;
          const amount = payments.filter(p => p.status === status).reduce((s, p) => s + p.amount, 0);
          const s = statusStyle[status];
          return (
            <div key={status} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{status}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: s.bg, color: s.color }}>{count}</span>
              </div>
              <p className="text-xl font-bold text-gray-900">₹{amount.toLocaleString('en-IN')}</p>
            </div>
          );
        })}
      </div>

      {/* Filter + Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex items-center gap-3">
          <Filter size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600">Filter:</span>
          {['All', 'Completed', 'Pending', 'Failed'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === f ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {f}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading payments...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="px-6 py-3 font-semibold">Student</th>
                  <th className="px-6 py-3 font-semibold">Amount</th>
                  <th className="px-6 py-3 font-semibold">Method</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(p => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{p.student?.name || 'Unknown'}</td>
                    <td className="px-6 py-4 font-semibold text-gray-800">₹{p.amount?.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{p.paymentMethod || '—'}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: statusStyle[p.status]?.bg, color: statusStyle[p.status]?.color }}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{new Date(p.date).toLocaleDateString()}</td>
                  </tr>
                ))}
                {filtered.length === 0 && <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-400">No payments found.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentManagement;
