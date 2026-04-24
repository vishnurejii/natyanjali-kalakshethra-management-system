import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, Bell, CreditCard, User, LogOut,
  Users, BookOpen, CheckSquare, Menu, X, ClipboardList
} from 'lucide-react';
import api from '../api';

const DashboardLayout = ({ children, role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'User', role };
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = async () => {
    try { await api.post('/auth/logout'); } catch (_) {}
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = {
    admin: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
      { name: 'Students', icon: Users, path: '/admin/students' },
      { name: 'Teachers', icon: User, path: '/admin/teachers' },
      { name: 'Courses', icon: BookOpen, path: '/admin/courses' },
      { name: 'Timetable', icon: Calendar, path: '/admin/timetable' },
      { name: 'Payments', icon: CreditCard, path: '/admin/payments' },
      { name: 'Notifications', icon: Bell, path: '/admin/notifications' },
      { name: 'Attendance', icon: CheckSquare, path: '/admin/attendance' },
    ],
    teacher: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/teacher' },
      { name: 'My Classes', icon: Calendar, path: '/teacher/classes' },
      { name: 'Attendance', icon: CheckSquare, path: '/teacher/attendance' },
      { name: 'Notifications', icon: Bell, path: '/teacher/notifications' },
    ],
    student: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/student' },
      { name: 'My Schedule', icon: Calendar, path: '/student/schedule' },
      { name: 'Fees', icon: CreditCard, path: '/student/fees' },
      { name: 'Notifications', icon: Bell, path: '/student/notifications' },
      { name: 'Profile', icon: User, path: '/student/profile' },
    ]
  };

  const Sidebar = () => (
    <aside className="flex flex-col h-full bg-slate-900 text-slate-300 relative overflow-hidden border-r border-slate-800 shadow-2xl">
      {/* Subtle background glow */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="p-8 border-b border-white/5 flex items-center gap-4 relative z-10">
        <span className="text-3xl drop-shadow-lg">🎭</span>
        <div>
          <p className="text-white font-bold text-xl font-serif tracking-tight">Natyanjali</p>
          <p className="text-brand-400 font-bold text-[10px] uppercase tracking-widest leading-none mt-1">{role} Portal</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto relative z-10 custom-scrollbar">
        {menuItems[role]?.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== `/${role}` && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-500 group ${
                isActive 
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30 font-bold translate-x-1' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5 font-medium hover:translate-x-1'
              }`}>
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className={`${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-300`} />
              <span className="text-sm tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5 relative z-10">
        <div className="flex items-center gap-3 p-4 mb-4 rounded-2xl bg-white/5 border border-white/10 group cursor-pointer hover:bg-white/[0.08] transition-colors">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white flex items-center justify-center font-bold text-lg shadow-xl shadow-brand-600/20 group-hover:scale-105 transition-transform">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-bold truncate">{user.name}</p>
            <p className="text-brand-400 text-[10px] font-bold uppercase tracking-wider truncate opacity-70">Member since 2024</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-300 font-bold text-xs uppercase tracking-widest">
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-bg-subtle overflow-hidden font-sans">
      {/* Desktop sidebar */}
      <div className="hidden md:flex w-[300px] flex-col flex-shrink-0 z-20">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-[280px] flex-col flex shadow-[20px_0_60px_rgba(0,0,0,0.3)]">
            <Sidebar />
          </div>
          <div className="flex-1 bg-slate-900/60 backdrop-blur-md" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="bg-white/70 backdrop-blur-2xl border-b border-slate-100 h-20 flex items-center justify-between px-10 flex-shrink-0 z-10 sticky top-0 shadow-sm shadow-slate-100">
          <div className="flex items-center gap-6">
            <button className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Natyanjali Management</p>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-serif capitalize">
                {location.pathname.split('/').pop() || 'Overview'}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button className="p-2.5 rounded-xl text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-all">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-none mb-1">{user.name}</p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-brand-50 text-brand-600 uppercase tracking-tight">{user.role}</span>
              </div>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-lg bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600 border border-brand-200/50 shadow-sm hover:scale-105 transition-transform cursor-pointer">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 lg:p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
