import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import StudentOverview from './student/StudentOverview';
import StudentSchedule from './student/StudentSchedule';
import StudentFees from './student/StudentFees';

const StudentDashboard = () => {
  return (
    <DashboardLayout role="student">
      <Routes>
        <Route path="/" element={<StudentOverview />} />
        <Route path="/schedule" element={<StudentSchedule />} />
        <Route path="/fees" element={<StudentFees />} />
        <Route path="/notifications" element={<div className="p-4 bg-white rounded-xl shadow-sm">Your course notifications will appear here.</div>} />
        <Route path="/profile" element={<div className="p-4 bg-white rounded-xl shadow-sm">Profile implementation coming soon.</div>} />
      </Routes>
    </DashboardLayout>
  );
};

export default StudentDashboard;
