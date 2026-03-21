const express = require('express');
const { getNotifications, createNotification } = require('../controllers/notificationController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .get(protect, getNotifications)
    .post(protect, authorize('admin', 'teacher'), createNotification);

module.exports = router;
