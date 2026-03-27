const Timetable = require('../models/Timetable');

exports.getTimetables = async (req, res) => {
    try {
        const timetables = await Timetable.find()
            .populate({ path: 'course', select: 'name teacher' })
            .populate('assignedTeacher', 'name');
        res.json(timetables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTimetable = async (req, res) => {
    try {
        const timetable = await Timetable.create(req.body);
        res.status(201).json(timetable);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTimetable = async (req, res) => {
    try {
        const timetable = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!timetable) return res.status(404).json({ message: 'Timetable not found' });
        res.json(timetable);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTimetable = async (req, res) => {
    try {
        const timetable = await Timetable.findByIdAndDelete(req.params.id);
        if (!timetable) return res.status(404).json({ message: 'Timetable not found' });
        res.json({ message: 'Timetable deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
