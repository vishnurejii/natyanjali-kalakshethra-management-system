const express = require('express');
const { getAdminStats, getTeacherStats, getStudentStats } = require('../controllers/statsController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/admin', protect, authorize('admin'), getAdminStats);
router.get('/teacher', protect, authorize('teacher'), getTeacherStats);
router.get('/student', protect, authorize('student'), getStudentStats);

module.exports = router;
