const Attendance = require('../models/Attendance');

exports.getAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find().populate('student', 'name').populate('timetable');
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.markAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.create(req.body);
        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStudentAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find({ student: req.user.id }).populate('timetable');
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
