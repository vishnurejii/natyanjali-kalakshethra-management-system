import React, { useState, useEffect } from 'react';
import api from '../../api';
import { CreditCard, CheckCircle, Clock, AlertCircle, IndianRupee } from 'lucide-react';

const StudentFees = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await api.get('/payments/my');
        setPayments(data);
      } catch (error) {
        console.error('Error fetching fees:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const totalPaid = payments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0);

  if (loading) return <div className="p-4 text-center">Loading fee details...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Fee Status & Payments</h2>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-2">
          <CreditCard size={20} />
          Pay Pending Fees
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-900 p-8 rounded-2xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-indigo-200 font-medium mb-1">Total Fees Paid</h3>
            <p className="text-4xl font-bold">₹ {totalPaid}</p>
            <div className="mt-8 flex items-center gap-2 text-indigo-300 text-sm">
              <CheckCircle size={16} />
              All current settlements are up to date.
            </div>
          </div>
          <IndianRupee size={150} className="absolute right-[-40px] top-[-40px] opacity-10" />
        </div>
        <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
          <div className="p-4 bg-slate-50 rounded-full text-slate-400 mb-4">
            <Clock size={32} />
          </div>
          <h3 className="font-bold text-gray-900">Next Payment Due</h3>
          <p className="text-sm text-gray-500 mt-1">Your next installment of ₹ 2,500 is due on April 1st, 2026.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-bold text-gray-900">Transaction History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-gray-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-3 font-medium">Transaction ID</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {payments.map(payment => (
                <tr key={payment._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono text-gray-500">{payment.transactionId || '---'}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">₹ {payment.amount}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(payment.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full text-xs font-bold">
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-400 italic font-sans">No transactions recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentFees;
