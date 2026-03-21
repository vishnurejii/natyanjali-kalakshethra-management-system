const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    transactionId: { type: String },
    date: { type: Date, default: Date.now },
    paymentMethod: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
