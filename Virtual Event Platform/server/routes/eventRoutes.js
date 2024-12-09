// C:\virtual-event-platform\server\routes\eventRoutes.js
const express = require('express');
const router = express.Router();
const { getEvents, createEvent, updateEvent, deleteEvent , joinEvent} = require('../controllers/eventController');

// Define routes
router.get('/', getEvents);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.post('/join/:eventId', joinEvent);

module.exports = router;
