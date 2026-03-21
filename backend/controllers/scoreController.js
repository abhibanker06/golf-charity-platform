const Score = require('../models/Score');

// @desc    Add a new score
// @route   POST /api/scores
// @access  Private (Subscriber)
const addScore = async (req, res) => {
  const { points, date } = req.body;

  try {
    if (points < 1 || points > 45) {
      return res.status(400).json({ message: 'Points must be between 1 and 45' });
    }

    const userScores = await Score.find({ user: req.user._id }).sort({ date: 1 });

    if (userScores.length >= 5) {
      await Score.findByIdAndDelete(userScores[0]._id);
    }

    const score = await Score.create({
      user: req.user._id,
      points,
      date: date || Date.now()
    });

    res.status(201).json(score);
  } catch (error) {
    res.status(500).json({ message: 'Server error adding score' });
  }
};

// @desc    Get user's scores
// @route   GET /api/scores
// @access  Private
const getMyScores = async (req, res) => {
  try {
    const scores = await Score.find({ user: req.user._id }).sort({ date: -1 });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching scores' });
  }
};

// @desc    Update a score
// @route   PUT /api/scores/:id
// @access  Private
const updateScore = async (req, res) => {
  const { points } = req.body;
  try {
    const score = await Score.findById(req.params.id);
    if (!score) return res.status(404).json({ message: 'Score not found' });
    if (score.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });

    score.points = points || score.points;
    const updatedScore = await score.save();
    res.json(updatedScore);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating score' });
  }
};

// @desc    Delete a score
// @route   DELETE /api/scores/:id
// @access  Private
const deleteScore = async (req, res) => {
  try {
    const score = await Score.findById(req.params.id);
    if (!score) return res.status(404).json({ message: 'Score not found' });
    if (score.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });

    await score.deleteOne();
    res.json({ message: 'Score removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting score' });
  }
};

module.exports = { addScore, getMyScores, updateScore, deleteScore };
