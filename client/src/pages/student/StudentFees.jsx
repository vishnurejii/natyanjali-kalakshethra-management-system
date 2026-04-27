import React, { useState, useEffect } from 'react';
import api from '../../api';
import { CreditCard, CheckCircle, Clock, X, ArrowRight, ShieldCheck, History, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ title, onClose, children }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.9, y: 20, opacity: 0 }}
      className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden border border-white/20"
    >
      <div className="flex items-center justify-between p-8 border-b border-slate-50 bg-slate-50/30">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 font-serif">{title}</h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Secure Transaction</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-xl hover:bg-white hover:shadow-sm transition-all text-slate-400 hover:text-slate-900"><X size={24} /></button>
      </div>
      <div className="p-8">{children}</div>
    </motion.div>
  </motion.div>
);

const StudentFees = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ amount: '', paymentMethod: 'Online', transactionId: '' });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => { 
    setToast({ msg, type }); 
    setTimeout(() => setToast(null), 3000); 
  };

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
      showToast('Payment recorded successfully!', 'success');
      setModal(false); setForm({ amount: '', paymentMethod: 'Online', transactionId: '' }); fetchPayments();
    } catch (err) { showToast(err.response?.data?.message || 'Payment failed.', 'error'); }
    finally { setSaving(false); }
  };

  const statusMap = {
    Completed: { 
      icon: <CheckCircle size={14} />, 
      bg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      shadow: 'shadow-emerald-500/10'
    },
    Pending: { 
      icon: <Clock size={14} />, 
      bg: 'bg-amber-50 text-amber-700 border-amber-100',
      shadow: 'shadow-amber-500/10'
    },
    Failed: { 
      icon: <X size={14} />, 
      bg: 'bg-rose-50 text-rose-700 border-rose-100',
      shadow: 'shadow-rose-500/10'
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-10 left-1/2 z-50 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border flex items-center gap-3 min-w-[320px] ${
              toast.type === 'success' ? 'bg-emerald-600/90 text-white border-emerald-500/50' : 'bg-rose-600/90 text-white border-rose-500/50'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              {toast.type === 'success' ? <CheckCircle size={18} /> : <X size={18} />}
            </div>
            <p className="font-bold tracking-tight text-sm">{toast.msg}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Landmark className="text-brand-500" size={16} />
            <span className="text-[10px] font-black text-brand-500 uppercase tracking-[0.3em]">Financial Desk</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 font-serif tracking-tight">Fee Management</h2>
          <p className="text-slate-500 font-medium mt-1">Transparency in your artistic investment.</p>
        </div>
        <button 
          onClick={() => setModal(true)}
          className="btn-premium px-8 py-4 flex items-center gap-3 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <CreditCard size={18} className="relative z-10" /> 
          <span className="relative z-10">Make a Payment</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bento-card p-8 flex items-center gap-8 bg-white border-none shadow-premium relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="w-20 h-20 rounded-3xl bg-brand-600 text-white flex items-center justify-center text-4xl shadow-xl shadow-brand-500/20 relative z-10">
            ₹
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Contribution</p>
            <p className="text-5xl font-black text-slate-900 tracking-tighter font-serif italic">
              ₹{totalPaid.toLocaleString('en-IN')}
            </p>
            <div className="flex items-center gap-2 mt-2 text-emerald-600 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck size={14} /> Account in Good Standing
            </div>
          </div>
        </div>
        <div className="bento-card p-8 bg-slate-900 text-white border-none flex flex-col justify-center text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-600/10 blur-3xl rounded-full" />
          <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.2em] mb-2 relative z-10">Last Transaction</p>
          <p className="text-2xl font-bold font-serif italic relative z-10">
            {payments[0] ? `₹${payments[0].amount.toLocaleString('en-IN')}` : '—'}
          </p>
          <p className="text-[10px] opacity-40 mt-1 uppercase tracking-widest relative z-10">
            {payments[0] ? new Date(payments[0].date).toLocaleDateString() : 'No history'}
          </p>
        </div>
      </div>

      {/* Payment History */}
      <div className="bento-card overflow-hidden border-none shadow-premium bg-white">
        <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-serif tracking-tight">Registry of Payments</h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">Historical record of all transactions</p>
          </div>
          <History className="text-slate-200" size={32} strokeWidth={1} />
        </div>
        
        {loading ? (
          <div className="p-24 text-center">
            <div className="w-10 h-10 border-4 border-brand-100 border-t-brand-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400 font-serif italic">Accessing the ledger...</p>
          </div>
        ) : payments.length === 0 ? (
          <div className="p-24 text-center space-y-6">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-5xl mx-auto shadow-inner grayscale opacity-50">💳</div>
            <div>
              <p className="text-slate-900 font-bold text-xl font-serif">Empty ledger</p>
              <p className="text-slate-400 text-sm max-w-xs mx-auto">Your payment history will appear here once you initiate your first transaction.</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {payments.map((p, idx) => (
              <motion.div 
                key={p._id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between p-8 hover:bg-slate-50/50 transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-brand-50 transition-colors duration-500 shadow-sm border border-slate-100">
                    <CreditCard size={24} className="text-slate-400 group-hover:text-brand-600 transition-colors" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 font-serif tracking-tight group-hover:text-brand-600 transition-colors">
                      ₹{p.amount?.toLocaleString('en-IN')}
                    </p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">
                      {p.paymentMethod} <span className="opacity-30 mx-2">|</span> {new Date(p.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border flex items-center gap-2 shadow-sm ${statusMap[p.status].bg} ${statusMap[p.status].shadow}`}>
                  {statusMap[p.status].icon} {p.status}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Pay Modal */}
      <AnimatePresence>
        {modal && (
          <Modal title="Initiate Payment" onClose={() => setModal(false)}>
            <form onSubmit={handlePay} className="space-y-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Investment Amount (₹)</label>
                  <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-serif text-slate-300 group-focus-within:text-brand-600 transition-colors">₹</div>
                    <input 
                      type="number" 
                      required 
                      value={form.amount} 
                      onChange={e => setForm({ ...form, amount: e.target.value })} 
                      placeholder="3,000"
                      className="w-full pl-12 pr-6 py-5 rounded-[1.5rem] bg-slate-50 border-none text-xl font-bold text-slate-900 placeholder:text-slate-200 focus:ring-2 focus:ring-brand-500/20 transition-all" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Method</label>
                    <select 
                      value={form.paymentMethod} 
                      onChange={e => setForm({ ...form, paymentMethod: e.target.value })}
                      className="w-full px-5 py-4 rounded-[1.5rem] bg-slate-50 border-none text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-500/20 transition-all appearance-none cursor-pointer"
                    >
                      <option>Online</option>
                      <option>UPI</option>
                      <option>Bank Transfer</option>
                      <option>Cash / Check</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Transaction Ref</label>
                    <input 
                      value={form.transactionId} 
                      onChange={e => setForm({ ...form, transactionId: e.target.value })} 
                      placeholder="Optional"
                      className="w-full px-5 py-4 rounded-[1.5rem] bg-slate-50 border-none text-sm font-bold text-slate-900 placeholder:text-slate-200 focus:ring-2 focus:ring-brand-500/20 transition-all" 
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={saving}
                  className="w-full py-5 rounded-[1.5rem] bg-slate-900 text-white font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-slate-900/20 hover:bg-brand-600 transition-all duration-500 disabled:opacity-60 active:scale-95"
                >
                  <CreditCard size={18} /> {saving ? 'Securing Funds...' : 'Authorize Payment'}
                </button>
                <div className="flex items-center justify-center gap-2 mt-6 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-emerald-500" /> End-to-end Encrypted
                </div>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentFees;

