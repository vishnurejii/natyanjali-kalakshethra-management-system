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
    <aside className="flex flex-col h-full" style={{ background: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 100%)' }}>
      <div className="p-6 border-b border-indigo-800/50 flex items-center gap-3">
        <span className="text-2xl">🎭</span>
        <div>
          <p className="text-white font-bold" style={{ fontFamily: 'Georgia, serif' }}>Natyanjali</p>
          <p className="text-indigo-300 text-xs capitalize">{role} Portal</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems[role]?.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== `/${role}` && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${isActive ? 'text-white' : 'text-indigo-300 hover:text-white hover:bg-white/10'}`}
              style={isActive ? { background: 'rgba(255,255,255,0.15)', boxShadow: '0 0 0 1px rgba(255,255,255,0.1)' } : {}}>
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.name}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-indigo-800/50">
        <div className="flex items-center gap-3 p-3 mb-2 rounded-xl bg-white/10">
          <div className="w-8 h-8 rounded-full bg-indigo-300 text-indigo-900 flex items-center justify-center font-bold text-sm">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{user.name}</p>
            <p className="text-indigo-300 text-xs capitalize">{user.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-xl text-indigo-300 hover:text-white hover:bg-red-500/20 transition-all duration-200">
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex w-64 flex-col flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-64 flex-col flex">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu size={22} className="text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 capitalize">
              {location.pathname.split('/').pop() || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-400 capitalize">{user.role}</p>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ background: '#ede9fe', color: '#6d28d9' }}>
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
