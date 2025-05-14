const mongoose = require('mongoose');

const otherOptionSchema = new mongoose.Schema({
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
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('OtherOption', otherOptionSchema);
