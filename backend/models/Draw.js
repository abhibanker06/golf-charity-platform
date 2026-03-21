const mongoose = require('mongoose');

const drawSchema = new mongoose.Schema({
  monthYear: { type: String, required: true },
  winningNumbers: {
    type: [Number],
    required: true
  },
  status: {
    type: String,
    enum: ['Simulated', 'Published'],
    default: 'Simulated'
  },
  prizePoolTotal: { type: Number, default: 0 },
  match5Pool: { type: Number, default: 0 },
  match4Pool: { type: Number, default: 0 },
  match3Pool: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Draw', drawSchema);
