const Payment = require('../models/Payment');

exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('student', 'name email');
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStudentPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ student: req.user.id });
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPayment = async (req, res) => {
    try {
        const { amount, paymentMethod, transactionId } = req.body;
        const payment = await Payment.create({
            student: req.user.id,
            amount,
            paymentMethod,
            transactionId,
            status: 'Completed' // Mocking successful payment
        });
        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
