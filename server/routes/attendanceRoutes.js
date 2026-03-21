const express = require('express');
const { getAttendance, markAttendance, getStudentAttendance } = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .get(protect, authorize('admin', 'teacher'), getAttendance)
    .post(protect, authorize('admin', 'teacher'), markAttendance);

router.route('/my')
    .get(protect, getStudentAttendance);

module.exports = router;
