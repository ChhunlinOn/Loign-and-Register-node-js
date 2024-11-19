const User = require('../models/User');
const jwt = require('jsonwebtoken');

const secretCode = process.env.SECRET_CODE;

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({
      email,
      password
    });

    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Generate JWT token using the secret from .env
    const token = jwt.sign({ userId: user._id }, secretCode, { expiresIn: '1h' });
    res.json({email, token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
