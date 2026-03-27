const express = require('express');
const router = express.Router();
const { getNotifications, createNotification, deleteNotification } = require('../controllers/notificationController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, getNotifications);
router.post('/', protect, authorize('admin', 'teacher'), createNotification);
router.delete('/:id', protect, authorize('admin', 'teacher'), deleteNotification);

module.exports = router;
