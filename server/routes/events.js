const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Fetch approved and posted events for students
router.get('/browse', async (req, res) => {
    try {
        const events = await Event.find({ status: 'approved', isPosted: true });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch events' });
    }
});

// Get single event by ID
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch event' });
    }
});

// Create a new event (Club)
router.post('/create', async (req, res) => {
    try {
        console.log("------------------- NEW EVENT REQUEST -------------------");
        console.log("Received data for event:", req.body.title);
        console.log("Organizing Club:", req.body.organizingClub);
        console.log("Payload size:", JSON.stringify(req.body).length, "bytes");

        const eventData = req.body;
        const newEvent = new Event(eventData);
        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully and sent for approval', event: newEvent });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create event' });
    }
});

// Get events for a specific club
router.get('/club/:clubId', async (req, res) => {
    try {
        const events = await Event.find({ 'organizingClub.id': req.params.clubId });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch club events' });
    }
});

// Update event (Reposting a rejected event)
router.put('/update/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { ...req.body, status: 'pending', rejectionReason: '', isPosted: false },
            { new: true }
        );
        res.json({ message: 'Event updated and reposted for approval', event: updatedEvent });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update event' });
    }
});

// Post an approved event
router.put('/post/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { isPosted: true },
            { new: true }
        );
        res.json({ message: 'Event posted successfully!', event });
    } catch (err) {
        res.status(500).json({ message: 'Failed to post event' });
    }
});


module.exports = router;
