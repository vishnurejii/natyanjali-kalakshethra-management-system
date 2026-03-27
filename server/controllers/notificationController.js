const Notification = require('../models/Notification');

// @desc  Get notifications relevant to the logged-in user
exports.getNotifications = async (req, res) => {
    try {
        const query = {
            $or: [
                { recipient: 'All' },
                { recipient: req.user.role },
                { recipient: req.user.id.toString() }
            ]
        };
        const notifications = await Notification.find(query)
            .populate('sender', 'name role')
            .sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc  Create a notification (admin/teacher)
exports.createNotification = async (req, res) => {
    try {
        const notification = await Notification.create({
            ...req.body,
            sender: req.user.id
        });
        const populated = await Notification.findById(notification._id).populate('sender', 'name role');
        res.status(201).json(populated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc  Delete a notification
exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) return res.status(404).json({ message: 'Notification not found' });
        res.json({ message: 'Notification deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
