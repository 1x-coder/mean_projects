const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  // existing fields
  title: String,
  description: String,
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
