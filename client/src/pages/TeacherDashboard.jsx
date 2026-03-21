import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import TeacherOverview from './teacher/TeacherOverview';
import TeacherTimetable from './teacher/TeacherTimetable';
import AttendanceMarking from './teacher/AttendanceMarking';

const TeacherDashboard = () => {
  return (
    <DashboardLayout role="teacher">
      <Routes>
        <Route path="/" element={<TeacherOverview />} />
        <Route path="/classes" element={<TeacherTimetable />} />
        <Route path="/attendance" element={<AttendanceMarking />} />
        <Route path="/notifications" element={<div className="p-4 bg-white rounded-xl shadow-sm">No new notifications for instructors.</div>} />
      </Routes>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
