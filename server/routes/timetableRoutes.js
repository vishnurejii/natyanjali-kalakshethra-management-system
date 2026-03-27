const express = require('express');
const router = express.Router();
const { getTimetables, createTimetable, updateTimetable, deleteTimetable } = require('../controllers/timetableController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, getTimetables); // any logged-in user
router.post('/', protect, authorize('admin'), createTimetable);
router.put('/:id', protect, authorize('admin'), updateTimetable);
router.delete('/:id', protect, authorize('admin'), deleteTimetable);

module.exports = router;
