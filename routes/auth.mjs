import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.mjs';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

// Register
// router.post('/register', async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
//     res.status(201).json({ token });
//   } catch (err) {
//     console.error('Register Error', err.message)
//     res.status(400).json({ error: 'Username already taken or invalid input.' });
//   }
// });
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Check if a user with this username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken.' });
    }

    // 2. Create the new user
    const user = await User.create({ username, password });

    // 3. Generate a token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    // 4. Send back the token
    return res.status(201).json({ token });
  } catch (err) {
    console.error('Register Error:', err);
    return res.status(500).json({ error: 'Server error during registration.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

export default router;