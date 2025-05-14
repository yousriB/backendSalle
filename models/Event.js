const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
 foodType: {
    type: [String],
    default: []
  },
  decorationType: {
    type: [String],
    default: []
  },
  numberOfSeats: {
    type: Number,
    required: true,
    min: 1
  },
  typeEvent: {
    type: String,
    required: true
  },
  local: {
    type: String,
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
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
 entertainment: {
    type: [String],
    default: []
  },
   others: {
    type: [String],
    default: []
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  totalPrice: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Event', eventSchema);
