const express = require('express');
const router = express.Router();
const Club = require('../models/Club');

// Get all pending clubs
router.get('/pending-clubs', async (req, res) => {
    try {
        const pendingClubs = await Club.find({ isApproved: false });
        res.json(pendingClubs);
    } catch (err) {
        res.status(500).json({ message: 'Server error fetching clubs' });
    }
});

// Approve a club
router.put('/approve-club/:id', async (req, res) => {
    try {
        const club = await Club.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
        if (!club) return res.status(404).json({ message: 'Club not found' });
        res.json({ message: 'Club approved successfully', club });
    } catch (err) {
        res.status(500).json({ message: 'Server error approving club' });
    }
});

// Reject (Delete) a club
router.delete('/reject-club/:id', async (req, res) => {
    try {
        const { reason } = req.body;
        const club = await Club.findByIdAndDelete(req.params.id);
        if (!club) return res.status(404).json({ message: 'Club not found' });
        res.json({ message: 'Club rejected and removed. Reason: ' + (reason || 'No reason provided') });
    } catch (err) {
        res.status(500).json({ message: 'Server error rejecting club' });
    }
});

/* ── EVENT MANAGEMENT ────────────────────────────────────── */
const Event = require('../models/Event');

// Get all pending events
router.get('/pending-events', async (req, res) => {
    try {
        const pendingEvents = await Event.find({ status: 'pending' });
        res.json(pendingEvents);
    } catch (err) {
        res.status(500).json({ message: 'Server error fetching pending events' });
    }
});

// Approve an event
router.put('/approve-event/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event approved successfully', event });
    } catch (err) {
        res.status(500).json({ message: 'Server error approving event' });
    }
});

// Reject an event
router.put('/reject-event/:id', async (req, res) => {
    try {
        const { reason } = req.body;
        const event = await Event.findByIdAndUpdate(req.params.id, {
            status: 'rejected',
            rejectionReason: reason || 'No reason provided'
        }, { new: true });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event rejected. Reason: ' + (reason || 'No reason provided'), event });
    } catch (err) {
        res.status(500).json({ message: 'Server error rejecting event' });
    }
});

// Get all conducted events (posted events)
router.get('/conducted-events', async (req, res) => {
    try {
        const conductedEvents = await Event.find({ isPosted: true });
        res.json(conductedEvents);
    } catch (err) {
        res.status(500).json({ message: 'Server error fetching conducted events' });
    }
});

module.exports = router;
