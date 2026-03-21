import React, { useState, useEffect } from 'react';
import api from '../../api';
import { CreditCard, Search, Download, CheckCircle, AlertCircle } from 'lucide-react';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await api.get('/payments');
        setPayments(data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  if (loading) return <div className="p-4">Loading Payments...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Payment Oversight</h2>
        <button className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition-colors">
          <Download size={18} />
          Export Report
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-slate-50 relative">
          <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-slate-500 outline-none bg-white"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-3 font-medium">Student</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Method</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {payments.map(payment => (
                <tr key={payment._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{payment.student?.name}</div>
                    <div className="text-xs text-gray-500">{payment.student?.email}</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">₹ {payment.amount}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(payment.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full w-fit ${
                      payment.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {payment.status === 'Completed' ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-xs">{payment.paymentMethod || 'Online'}</td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-400 italic">No payment records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;
