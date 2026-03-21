import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Calendar, Bell, CreditCard, User, LogOut, Users, BookOpen, CheckSquare } from 'lucide-react';

const DashboardLayout = ({ children, role }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'User' };

  const handleLogout = () => {
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

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold font-serif border-b border-indigo-800">
          Natyanjali
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems[role]?.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-800 transition-colors"
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-indigo-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-red-600 transition-colors text-indigo-200 hover:text-white"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-gray-800 capitalize">{role} Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
            <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
