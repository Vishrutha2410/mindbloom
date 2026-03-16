import Mood from '../models/Mood.js';
import User from '../models/User.js';

export const logMood = async (req, res) => {
  try {
    const { mood, note } = req.body;
    if(!mood) return res.status(400).json({message: 'Mood is required'});
    const entry = await Mood.create({ userId: req.user._id, mood, note });
    const moodCount = await Mood.countDocuments({userId: req.user._id});
    const user = await User.findById(req.user._id);
    const awardBadge = (badge) => {
      if(!user.badges.includes(badge)) user.badges.push(badge);
    };
    if (moodCount >= 1)   awardBadge('🌱 First Mood Log');
    if (moodCount >= 7)   awardBadge('📅 7 Moods Logged');
    if (moodCount >= 30)  awardBadge('🌟 30 Moods Logged');
    if (moodCount >= 100) awardBadge('💯 100 Moods Logged');

    await user.save();

    res.status(201).json({entry, moodCount, badges:user.badges});
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
