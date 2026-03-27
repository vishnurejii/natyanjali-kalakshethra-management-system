import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import TeacherOverview from './teacher/TeacherOverview';
import TeacherTimetable from './teacher/TeacherTimetable';
import AttendanceMarking from './teacher/AttendanceMarking';
import TeacherNotifications from './teacher/TeacherNotifications';

const TeacherDashboard = () => {
  return (
    <DashboardLayout role="teacher">
      <Routes>
        <Route path="/" element={<TeacherOverview />} />
        <Route path="/classes" element={<TeacherTimetable />} />
        <Route path="/attendance" element={<AttendanceMarking />} />
        <Route path="/notifications" element={<TeacherNotifications />} />
      </Routes>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
