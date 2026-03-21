const express = require('express');
const { getCourses, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .get(getCourses)
    .post(protect, authorize('admin'), createCourse);

router.route('/:id')
    .put(protect, authorize('admin'), updateCourse)
    .delete(protect, authorize('admin'), deleteCourse);

module.exports = router;
