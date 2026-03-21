const mongoose = require('mongoose');
const Draw = require('./models/Draw');
require('dotenv').config();

const draws = [
  {
    monthYear: 'March 2026',
    winningNumbers: [0, 0, 0, 0, 0], // Not drawn yet
    status: 'Simulated',
    prizePoolTotal: 500.00,
    match5Pool: 200,
    match4Pool: 175,
    match3Pool: 125
  },
  {
    monthYear: 'February 2026',
    winningNumbers: [38, 41, 35, 39, 42],
    status: 'Published',
    prizePoolTotal: 420.00,
    match5Pool: 168,
    match4Pool: 147,
    match3Pool: 105
  },
  {
    monthYear: 'January 2026',
    winningNumbers: [36, 40, 34, 38, 44],
    status: 'Published',
    prizePoolTotal: 380.00,
    match5Pool: 152,
    match4Pool: 133,
    match3Pool: 95
  },
  {
    monthYear: 'December 2025',
    winningNumbers: [39, 43, 37, 41, 45],
    status: 'Published',
    prizePoolTotal: 510.00,
    match5Pool: 204,
    match4Pool: 178.5,
    match3Pool: 127.5
  }
];

const seedDraws = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas...');

    await Draw.deleteMany();
    console.log('Cleared existing draws.');

    await Draw.insertMany(draws);
    console.log('Seeded 4 draws successfully.');

    process.exit();
  } catch (error) {
    console.error('Error seeding draws:', error);
    process.exit(1);
  }
};

seedDraws();
