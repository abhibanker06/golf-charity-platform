const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  points: {
    type: Number,
    required: true,
    min: 1,
    max: 45
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
}, { timestamps: true });

scoreSchema.index({ user: 1 });

module.exports = mongoose.model('Score', scoreSchema);
