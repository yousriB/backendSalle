const mongoose = require('mongoose');

const entertainmentOptionSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
   price: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model('EntertainmentOption', entertainmentOptionSchema);
