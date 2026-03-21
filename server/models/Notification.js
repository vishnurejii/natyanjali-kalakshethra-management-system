const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: { type: String, default: 'All' }, // 'All', 'Admin', 'Teacher', 'Student', or User ID
    message: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
