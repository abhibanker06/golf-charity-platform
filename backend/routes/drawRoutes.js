const express = require('express');
const router = express.Router();
const { runDraw, getDraws } = require('../controllers/drawController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getDraws);
router.route('/run').post(protect, runDraw);

module.exports = router;
