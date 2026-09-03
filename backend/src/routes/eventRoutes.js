const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent
} = require('../controllers/eventController');
const {
  validateEvent,
  validateEventUpdate
} = require('../middleware/validateEvent');

router.route('/')
  .get(getEvents)
  .post(validateEvent, createEvent);

router.route('/:id')
  .get(getEventById)
  .put(validateEventUpdate, updateEvent)
  .delete(deleteEvent);

router.route('/:id/register')
  .post(registerForEvent);

module.exports = router;
