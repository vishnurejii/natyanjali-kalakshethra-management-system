const express = require('express');
const { getPayments, getStudentPayments, createPayment } = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, authorize('admin'), getPayments);
router.get('/my', protect, authorize('student'), getStudentPayments);
router.post('/pay', protect, authorize('student'), createPayment);

module.exports = router;
