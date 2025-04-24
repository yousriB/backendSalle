const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  foodType: {
    type: String,
    required: true
  },
  decorationType: {
    type: String,
    required: true
  },
  numberOfSeats: {
    type: Number,
    required: true
  },
  typeEvent: {
    type: String,
    enum: ['birthday', 'marriage'], 
    required: true
  },
  local: {
    type: String,
    enum: ['salle 1', 'salle2', 'home'],
    required: true
  },
  transport: {
    type: Boolean,
    default: false
  },
  security: {
    type: Boolean,
    default: false
  },
  entertainment: {
    type: [String],
    enum: ['dj', 'magic show', 'fire work', 'dancer'], 
    default: []
  }
});

module.exports = mongoose.model('Event', eventSchema);
