import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Please fill all required fields' });

    if (await User.findOne({ email }))
      return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({ name, email, password, age: age || 20 });
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, age: user.age, ageGroup: user.ageGroup, streak: 0, badges: [], token: genToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid email or password' });

    // Streak logic
    const today = new Date().toDateString();
    const last  = user.lastLogin ? new Date(user.lastLogin).toDateString() : null;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (last === yesterday)     user.streak += 1;
    else if (last !== today)    user.streak  = 1;

    // Badge awards
    if (user.streak >= 7  && !user.badges.includes('🔥 7-Day Streak'))  user.badges.push('🔥 7-Day Streak');
    if (user.streak >= 30 && !user.badges.includes('🏆 30-Day Streak')) user.badges.push('🏆 30-Day Streak');
    user.lastLogin = new Date();
    await user.save();

    res.json({ _id: user._id, name: user.name, email: user.email, age: user.age, ageGroup: user.ageGroup, streak: user.streak, badges: user.badges, activitiesDone: user.activitiesDone, token: genToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProfile = async (req, res) => res.json(req.user);
