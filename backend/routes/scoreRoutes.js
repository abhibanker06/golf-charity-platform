const express = require('express');
const router = express.Router();
const { addScore, getMyScores, updateScore, deleteScore } = require('../controllers/scoreController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getMyScores)
  .post(protect, addScore);

router.route('/:id')
  .put(protect, updateScore)
  .delete(protect, deleteScore);

module.exports = router;
