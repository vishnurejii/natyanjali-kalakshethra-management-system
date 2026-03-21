const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
    try {
        const query = {
            $or: [
                { recipient: 'All' },
                { recipient: req.user.role },
                { recipient: req.user.id }
            ]
        };
        const notifications = await Notification.find(query).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createNotification = async (req, res) => {
    try {
        const notification = await Notification.create({
            ...req.body,
            sender: req.user.id
        });
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
