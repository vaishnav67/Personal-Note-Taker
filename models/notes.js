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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: String,
  },
});

module.exports = mongoose.model('Note', notesSchema);
