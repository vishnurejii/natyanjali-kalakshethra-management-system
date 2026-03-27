const express = require('express');
const router = express.Router();
const {
    createUser, getUsers, getUserById, updateUser, deleteUser
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Admin-only: create user with email notification
router.post('/create', protect, authorize('admin'), createUser);

// Admin: get all users (with optional ?role=student|teacher filter)
router.get('/', protect, authorize('admin'), getUsers);

// Admin: get, update, delete user by ID
router.get('/:id', protect, authorize('admin'), getUserById);
router.put('/:id', protect, authorize('admin'), updateUser);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
