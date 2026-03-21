import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import AdminOverview from './admin/AdminOverview';
import StudentManagement from './admin/StudentManagement';
import TeacherManagement from './admin/TeacherManagement';
import CourseManagement from './admin/CourseManagement';
import TimetableManagement from './admin/TimetableManagement';
import PaymentManagement from './admin/PaymentManagement';

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <Routes>
        <Route path="/" element={<AdminOverview />} />
        <Route path="/students" element={<StudentManagement />} />
        <Route path="/teachers" element={<TeacherManagement />} />
        <Route path="/courses" element={<CourseManagement />} />
        <Route path="/timetable" element={<TimetableManagement />} />
        <Route path="/payments" element={<PaymentManagement />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard;
