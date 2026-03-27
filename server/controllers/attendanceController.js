const Attendance = require('../models/Attendance');

// @desc  Get all attendance records (admin)
exports.getAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find()
            .populate('student', 'name email')
            .populate({ path: 'timetable', populate: { path: 'course', select: 'name' } })
            .sort({ date: -1 });
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc  Mark attendance (teacher/admin)
exports.markAttendance = async (req, res) => {
    try {
        const { records } = req.body; // array of { student, timetable, status, date }
        if (Array.isArray(records)) {
            const created = await Attendance.insertMany(records);
            return res.status(201).json(created);
        }
        const attendance = await Attendance.create(req.body);
        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc  Get attendance for the logged-in student
exports.getStudentAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find({ student: req.user.id })
            .populate({ path: 'timetable', populate: { path: 'course', select: 'name' } })
            .sort({ date: -1 });
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc  Delete an attendance record
exports.deleteAttendance = async (req, res) => {
    try {
        const record = await Attendance.findByIdAndDelete(req.params.id);
        if (!record) return res.status(404).json({ message: 'Record not found' });
        res.json({ message: 'Attendance record deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
