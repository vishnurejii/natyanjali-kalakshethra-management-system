const express = require('express');
const { getTimetables, createTimetable, updateTimetable, deleteTimetable } = require('../controllers/timetableController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .get(getTimetables)
    .post(protect, authorize('admin'), createTimetable);

router.route('/:id')
    .put(protect, authorize('admin'), updateTimetable)
    .delete(protect, authorize('admin', 'teacher'), deleteTimetable);

module.exports = router;
