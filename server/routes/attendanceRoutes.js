const express = require('express');
const router = express.Router();
const { getAttendance, markAttendance, getStudentAttendance, deleteAttendance } = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('admin'), getAttendance);
router.get('/my', protect, authorize('student'), getStudentAttendance);
router.post('/', protect, authorize('teacher', 'admin'), markAttendance);
router.delete('/:id', protect, authorize('admin', 'teacher'), deleteAttendance);

module.exports = router;
