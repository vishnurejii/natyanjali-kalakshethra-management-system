const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    day: { type: String, required: true }, // e.g., 'Monday'
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String },
    assignedTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Timetable', timetableSchema);
