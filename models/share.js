const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
  },
  real: {
    type: String,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '5m' },
  }
});

module.exports = mongoose.model('Share', notesSchema);
