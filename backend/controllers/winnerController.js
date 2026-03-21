const Winner = require('../models/Winner');

const submitProof = async (req, res) => {
  const { proofImageUrl } = req.body;
  try {
    const winner = await Winner.findById(req.params.id);
    if (!winner) {
      return res.status(404).json({ message: 'Winner record not found' });
    }
    if (winner.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    winner.proofImageUrl = proofImageUrl;
    winner.status = 'Pending';
    await winner.save();

    res.json(winner);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating proof' });
  }
};

const verifyWinner = async (req, res) => {
  const { status } = req.body;
  try {
    const winner = await Winner.findById(req.params.id);
    if (!winner) {
      return res.status(404).json({ message: 'Winner not found' });
    }

    winner.status = status;
    await winner.save();
    
    res.json(winner);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getWinners = async (req, res) => {
  try {
    const winners = await Winner.find({}).populate('user', 'email').populate('draw', 'monthYear');
    res.json(winners);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyWinners = async (req, res) => {
  try {
    const winners = await Winner.find({ user: req.user._id }).populate('draw', 'monthYear prizePoolTotal');
    res.json(winners);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitProof, verifyWinner, getWinners, getMyWinners };
