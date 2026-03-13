import Mood from '../models/Mood.js';

export const logMood = async (req, res) => {
  try {
    const { mood, note } = req.body;
    const entry = await Mood.create({ userId: req.user._id, mood, note });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMoodHistory = async (req, res) => {
  try {
    const logs = await Mood.find({ userId: req.user._id }).sort({ date: -1 }).limit(30);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getWeeklyMoods = async (req, res) => {
  try {
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const logs  = await Mood.find({ userId: req.user._id, date: { $gte: since } }).sort({ date: 1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
