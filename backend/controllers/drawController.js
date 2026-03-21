const Draw = require('../models/Draw');
const User = require('../models/User');
const Score = require('../models/Score');
const Winner = require('../models/Winner');

const runDraw = async (req, res) => {
  const { monthYear, mode } = req.body;

  try {
    // 1. Generate Random Winning Numbers (Range 30-45)
    // Stableford high scores are typically in this narrow range
    const winningNumbers = [];
    while (winningNumbers.length < 5) {
      const num = Math.floor(Math.random() * (45 - 30 + 1)) + 30;
      if (!winningNumbers.includes(num)) {
        winningNumbers.push(num);
      }
    }
    
    // 2. Set Prize Pool ($500 for demo)
    const prizePoolTotal = 500;
    
    // 3. Create the Draw record
    const draw = await Draw.create({
      monthYear,
      winningNumbers,
      status: mode || 'Simulated',
      prizePoolTotal,
      match5Pool: prizePoolTotal * 0.40,
      match4Pool: prizePoolTotal * 0.35,
      match3Pool: prizePoolTotal * 0.25
    });

    // 4. FIND WINNERS
    // Only active subscribers
    const activeSubscribers = await User.find({ subscriptionStatus: 'Active' });
    const winnersFound = [];

    for (const subscriber of activeSubscribers) {
      // Get their 5 latest scores for this month (simplified for demo)
      const userScores = await Score.find({ user: subscriber._id })
        .sort({ createdAt: -1 })
        .limit(5);

      if (userScores.length === 5) {
        const subscriberNumbers = userScores.map(s => s.points);
        
        // Count matches (Intersection)
        const matchCount = subscriberNumbers.filter(n => winningNumbers.includes(n)).length;

        if (matchCount >= 3) {
          let payout = 0;
          if (matchCount === 5) payout = draw.match5Pool;
          if (matchCount === 4) payout = draw.match4Pool;
          if (matchCount === 3) payout = draw.match3Pool;

          const newWinner = await Winner.create({
            user: subscriber._id,
            draw: draw._id,
            matchTier: matchCount,
            payoutAmount: payout,
            status: 'Verified'
          });
          winnersFound.push({ subscriber: subscriber.name, matchCount, payout });
        }
      }
    }

    res.status(201).json({ draw, winnersFound });
  } catch (error) {
    console.error('CRITICAL DRAW ERROR:', error.message);
    res.status(500).json({ message: error.message || 'Error running draw logic' });
  }
};

const getDraws = async (req, res) => {
  try {
    const draws = await Draw.find({}).sort({ createdAt: -1 });
    res.json(draws);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { runDraw, getDraws };
