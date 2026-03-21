const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    if (user) {
      const populatedUser = await User.findById(user._id).populate('selectedCharity');
      const token = generateToken(user._id);
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

      res.status(201).json({
        _id: populatedUser._id,
        name: populatedUser.name,
        email: populatedUser.email,
        role: populatedUser.role,
        subscriptionStatus: populatedUser.subscriptionStatus,
        plan: populatedUser.plan,
        selectedCharity: populatedUser.selectedCharity,
        paymentMethod: populatedUser.paymentMethod
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate('selectedCharity');

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscriptionStatus: user.subscriptionStatus,
        plan: user.plan,
        selectedCharity: user.selectedCharity,
        paymentMethod: user.paymentMethod
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }
      
      // Handle subscription/payment updates
      if (req.body.subscriptionStatus) user.subscriptionStatus = req.body.subscriptionStatus;
      if (req.body.plan) user.plan = req.body.plan;
      if (req.body.paymentMethod) user.paymentMethod = req.body.paymentMethod;
      if (req.body.selectedCharity !== undefined) user.selectedCharity = req.body.selectedCharity;
      if (req.body.charityPercentage) user.charityPercentage = req.body.charityPercentage;

      await user.save();
      const updatedUser = await User.findById(user._id).populate('selectedCharity');
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        subscriptionStatus: updatedUser.subscriptionStatus,
        plan: updatedUser.plan,
        selectedCharity: updatedUser.selectedCharity,
        charityPercentage: updatedUser.charityPercentage,
        paymentMethod: updatedUser.paymentMethod
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('selectedCharity');
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscriptionStatus: user.subscriptionStatus,
        plan: user.plan,
        selectedCharity: user.selectedCharity,
        charityPercentage: user.charityPercentage,
        paymentMethod: user.paymentMethod
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser, logoutUser, updateProfile, getUserProfile };
