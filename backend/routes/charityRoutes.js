const express = require('express');
const router = express.Router();
const { getCharities, createCharity } = require('../controllers/charityController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getCharities)
  .post(protect, admin, createCharity);

module.exports = router;
