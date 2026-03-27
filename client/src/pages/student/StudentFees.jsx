import React, { useState, useEffect } from 'react';
import api from '../../api';
import { CreditCard, CheckCircle, Clock, X } from 'lucide-react';

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
      <div className="flex items-center justify-between p-6 border-b">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={20} /></button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

const StudentFees = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ amount: '', paymentMethod: 'Online', transactionId: '' });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/payments/my');
      setPayments(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchPayments(); }, []);

  const totalPaid = payments.filter(p => p.status === 'Completed').reduce((s, p) => s + p.amount, 0);

  const handlePay = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      await api.post('/payments/pay', form);
      showToast('✅ Payment recorded successfully!');
      setModal(false); setForm({ amount: '', paymentMethod: 'Online', transactionId: '' }); fetchPayments();
    } catch (err) { showToast('❌ ' + (err.response?.data?.message || 'Payment failed.')); }
    finally { setSaving(false); }
  };

  const statusIcon = { Completed: <CheckCircle size={14} className="text-green-600" />, Pending: <Clock size={14} className="text-amber-500" />, Failed: <X size={14} className="text-red-500" /> };
  const statusBg = { Completed: 'bg-green-100 text-green-700', Pending: 'bg-amber-100 text-amber-700', Failed: 'bg-red-100 text-red-700' };

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${toast.startsWith('✅') ? 'bg-green-600' : 'bg-red-600'}`}>{toast}</div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fee Management</h2>
          <p className="text-gray-500 text-sm mt-1">{payments.length} transactions</p>
        </div>
        <button onClick={() => setModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm"
          style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}>
          <CreditCard size={16} /> Pay Fees
        </button>
      </div>

      {/* Total paid summary */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: '#d1fae5' }}>💰</div>
        <div>
          <p className="text-sm text-gray-500">Total Fees Paid</p>
          <p className="text-3xl font-bold text-gray-900">₹{totalPaid.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Payment history */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="font-bold text-gray-900">Payment History</h3>
        </div>
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading payments...</div>
        ) : payments.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <div className="text-4xl mb-3">💳</div>
            <p>No payment history yet. Make your first payment!</p>
          </div>
        ) : (
          <div className="divide-y">
            {payments.map(p => (
              <div key={p._id} className="flex items-center justify-between p-5 hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#f0fdf4' }}>
                    <CreditCard size={18} style={{ color: '#059669' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">₹{p.amount?.toLocaleString('en-IN')}</p>
                    <p className="text-sm text-gray-500">{p.paymentMethod} · {new Date(p.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${statusBg[p.status]}`}>
                    {statusIcon[p.status]} {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pay modal */}
      {modal && (
        <Modal title="Make a Payment" onClose={() => setModal(false)}>
          <form onSubmit={handlePay} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Amount (₹) *</label>
              <input type="number" required value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="3000"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Payment Method</label>
              <select value={form.paymentMethod} onChange={e => setForm({ ...form, paymentMethod: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Online</option>
                <option>Cash</option>
                <option>Cheque</option>
                <option>UPI</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Transaction ID</label>
              <input value={form.transactionId} onChange={e => setForm({ ...form, transactionId: e.target.value })} placeholder="Optional reference number"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <button type="submit" disabled={saving}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}>
              <CreditCard size={16} /> {saving ? 'Processing...' : 'Confirm Payment'}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default StudentFees;
