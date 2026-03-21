const mongoose = require('mongoose');

const charitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  website: { type: String },
  totalContributed: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Charity', charitySchema);
