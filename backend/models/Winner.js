const mongoose = require('mongoose');

const winnerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  draw: { type: mongoose.Schema.Types.ObjectId, ref: 'Draw', required: true },
  matchTier: { type: Number, required: true },
  payoutAmount: { type: Number, required: true },
  proofImageUrl: { type: String },
  status: { type: String, enum: ['Pending', 'Verified', 'Paid'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Winner', winnerSchema);
