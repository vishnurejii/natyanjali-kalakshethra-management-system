import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import StudentOverview from './student/StudentOverview';
import StudentSchedule from './student/StudentSchedule';
import StudentFees from './student/StudentFees';
import StudentNotifications from './student/StudentNotifications';
import StudentProfile from './student/StudentProfile';

const StudentDashboard = () => {
  return (
    <DashboardLayout role="student">
      <Routes>
        <Route path="/" element={<StudentOverview />} />
        <Route path="/schedule" element={<StudentSchedule />} />
        <Route path="/fees" element={<StudentFees />} />
        <Route path="/notifications" element={<StudentNotifications />} />
        <Route path="/profile" element={<StudentProfile />} />
      </Routes>
    </DashboardLayout>
  );
};

export default StudentDashboard;
