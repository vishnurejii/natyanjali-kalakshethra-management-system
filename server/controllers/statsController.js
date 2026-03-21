const User = require('../models/User');
const Course = require('../models/Course');
const Timetable = require('../models/Timetable');
const Attendance = require('../models/Attendance');

exports.getAdminStats = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalTeachers = await User.countDocuments({ role: 'teacher' });
        const totalCourses = await Course.countDocuments();
        
        const recentEnrollments = await User.find({ role: 'student' })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name email createdAt');

        res.json({
            totalStudents,
            totalTeachers,
            totalCourses,
            monthlyRevenue: "₹ 4.2L", // Placeholder for now or calculate from Payments
            recentEnrollments
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTeacherStats = async (req, res) => {
    try {
        const timetable = await Timetable.find({ assignedTeacher: req.user.id }).populate('course');
        
        res.json({
            assignedClasses: timetable.length,
            totalStudents: 35, // Mocked or fetch from specific enrollments
            avgAttendance: "94%",
            newMessages: 3,
            todaySchedule: timetable
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStudentStats = async (req, res) => {
    try {
        const ongoingCourses = 1;
        const attendance = await Attendance.find({ student: req.user.id });
        const attendanceRate = attendance.length > 0 
            ? Math.round((attendance.filter(a => a.status === 'Present').length / attendance.length) * 100) 
            : 100;
            
        const schedule = await Timetable.find().populate('course').limit(3);

        res.json({
            ongoingCourses,
            attendancePercentage: attendanceRate,
            pendingFees: 5000,
            notifications: 2,
            schedule
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
