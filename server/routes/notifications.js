const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get notifications for a student
router.get('/:studentId', async (req, res) => {
    try {
        const notifications = await Notification.find({ student: req.params.studentId })
            .sort({ createdAt: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch notifications' });
    }
});

// Mark notification as read
router.put('/read/:id', async (req, res) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, { read: true });
        res.json({ message: 'Notification marked as read' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update notification' });
    }
});

module.exports = router;
