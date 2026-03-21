const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Subscriber', 'Admin'],
    default: 'Subscriber'
  },
  selectedCharity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Charity'
  },
  charityPercentage: {
    type: Number,
    min: 10,
    max: 100,
    default: 10
  },
  subscriptionStatus: {
    type: String,
    enum: ['Inactive', 'Active', 'Lapsed'],
    default: 'Inactive'
  },
  plan: {
    type: String,
    enum: ['None', 'Monthly', 'Yearly'],
    default: 'None'
  },
  paymentMethod: {
    last4: String,
    brand: String,
    expiry: String
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
