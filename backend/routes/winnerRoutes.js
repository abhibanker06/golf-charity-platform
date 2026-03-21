const express = require('express');
const router = express.Router();
const { submitProof, verifyWinner, getWinners, getMyWinners } = require('../controllers/winnerController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getWinners);
router.route('/my-wins').get(protect, getMyWinners);
router.route('/:id/proof').post(protect, submitProof);
router.route('/:id/verify').put(protect, admin, verifyWinner);

module.exports = router;
