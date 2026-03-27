const User = require('../models/User');
const Course = require('../models/Course');
const Timetable = require('../models/Timetable');
const Attendance = require('../models/Attendance');
const Payment = require('../models/Payment');

exports.getAdminStats = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalTeachers = await User.countDocuments({ role: 'teacher' });
        const totalCourses = await Course.countDocuments();

        // Real monthly revenue from completed payments
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const monthPayments = await Payment.aggregate([
            { $match: { status: 'Completed', date: { $gte: startOfMonth } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const monthlyRevenue = monthPayments.length > 0 ? `₹${monthPayments[0].total.toLocaleString('en-IN')}` : '₹0';

        const recentEnrollments = await User.find({ role: 'student' })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name email createdAt');

        res.json({ totalStudents, totalTeachers, totalCourses, monthlyRevenue, recentEnrollments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTeacherStats = async (req, res) => {
    try {
        const allTimetables = await Timetable.find().populate('course', 'name teacher');
        const timetable = allTimetables.filter(t => 
            (t.assignedTeacher && t.assignedTeacher.toString() === req.user.id) || 
            (t.course && t.course.teacher && t.course.teacher.toString() === req.user.id)
        );
        const totalStudents = await User.countDocuments({ role: 'student' });

        const allAttendance = await Attendance.find();
        const presentCount = allAttendance.filter(a => a.status === 'Present').length;
        const avgAttendance = allAttendance.length > 0
            ? Math.round((presentCount / allAttendance.length) * 100)
            : 100;

        res.json({
            assignedClasses: timetable.length,
            totalStudents,
            avgAttendance: `${avgAttendance}%`,
            todaySchedule: timetable
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStudentStats = async (req, res) => {
    try {
        const enrolledCourses = await Course.countDocuments();

        const attendance = await Attendance.find({ student: req.user.id });
        const presentCount = attendance.filter(a => a.status === 'Present').length;
        const attendanceRate = attendance.length > 0
            ? Math.round((presentCount / attendance.length) * 100)
            : 100;

        // Real pending fees (total paid vs some fixed expected amount — kept simple)
        const payments = await Payment.find({ student: req.user.id, status: 'Completed' });
        const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

        const schedule = await Timetable.find().populate('course', 'name').limit(5);

        res.json({
            ongoingCourses: enrolledCourses,
            attendancePercentage: attendanceRate,
            totalPaidFees: totalPaid,
            notifications: 0,
            schedule
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
