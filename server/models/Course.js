const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fee: { type: Number, default: 0 },
    image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
