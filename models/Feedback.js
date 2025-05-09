//feedback
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  description: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);