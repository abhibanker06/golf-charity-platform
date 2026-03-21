const Charity = require('../models/Charity');

// @desc    Get all charities
// @route   GET /api/charities
// @access  Public
const getCharities = async (req, res) => {
  try {
    const charities = await Charity.find({});
    res.json(charities);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching charities' });
  }
};

// @desc    Create a new charity
// @route   POST /api/charities
// @access  Private/Admin
const createCharity = async (req, res) => {
  try {
    const { name, description, imageUrl, website } = req.body;
    const charity = await Charity.create({
      name,
      description,
      imageUrl,
      website
    });
    res.status(201).json(charity);
  } catch (error) {
    res.status(400).json({ message: 'Invalid charity data' });
  }
};

module.exports = { getCharities, createCharity };
