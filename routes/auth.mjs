import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

// Register
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: 'Username already taken or invalid input.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

export default router;