import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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
 
// ── Google OAuth ──────────────────────────────────────────────────
export const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential)
      return res.status(400).json({ message: 'Google credential missing' });

    // Step 1: Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken:  credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // Step 2: Extract user info from Google
    const { name, email, picture, sub: googleId } = ticket.getPayload();
 // Step 3: Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      // ── Existing user — just log them in ────────────────────────
      if (!user.googleId) {
        // Link Google to their existing email account
        user.googleId = googleId;
        user.avatar   = picture;
      }

      // Streak logic
      const today     = new Date().toDateString();
      const last      = user.lastLogin ? new Date(user.lastLogin).toDateString() : null;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (last === yesterday)  user.streak += 1;
      else if (last !== today) user.streak  = 1;
        // Badge awards
      if (user.streak >= 7  && !user.badges.includes('🔥 7-Day Streak'))  user.badges.push('🔥 7-Day Streak');
      if (user.streak >= 30 && !user.badges.includes('🏆 30-Day Streak')) user.badges.push('🏆 30-Day Streak');
      user.lastLogin = new Date();
      await user.save();

    } else {
      // ── New user — create account from Google profile ────────────
      // Generate a random secure password (they won't use it — login is via Google)
      const randomPassword = googleId + Math.random().toString(36).slice(-8) + 'Aa1!';
       user = await User.create({
        name,
        email,
        password:  randomPassword,
        googleId,
        avatar:    picture,
        age:       20,             // default age — user can update from profile
        lastLogin: new Date(),
        streak:    1,
      });
    }
 // Step 4: Return same response shape as normal login
    res.json({
      _id:            user._id,
      name:           user.name,
      email:          user.email,
      avatar:         user.avatar,
      age:            user.age,
      ageGroup:       user.ageGroup,
      streak:         user.streak,
      badges:         user.badges,
      activitiesDone: user.activitiesDone,
      isGoogleUser:   true,
      token:          genToken(user._id),
    });

  } catch (err) {
    console.error('Google auth error:', err.message);
    res.status(401).json({ message: 'Google sign-in failed. Please try again.' });
  }
};

export const getProfile = async (req, res) => {
  try{
    const Mood = (await import('../models/Mood.js')).default;
    const moodCount=await Mood.countDocuments({ userId: req.user._id});
    res.json({ ...req.user.toObject(), moodCount});
  }catch(err){
    res.status(500).json({message: err.message});
  }
};

// ── Update Profile ────────────────────────────────────────────────
export const updateProfile = async (req, res) => {
  try {
    const { name, age, bio, phone, location, occupation, password, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update basic fields if provided
    if (name)                   user.name       = name.trim();
    if (age)                    user.age        = Number(age);
    if (bio!==undefined)        user.bio        = bio;
    if (phone!==undefined)      user.phone      = phone;
    if (location!==undefined)   user.location   = location;
    if (occupation!==undefined) user.occupation = occupation;

    // Password change — only if both fields provided
    if (password && newPassword) {
      const isMatch = await user.matchPassword(password);
      if (!isMatch)
        return res.status(400).json({ message: 'Current password is incorrect' });
      if(newPassword.length <6)
        return res.ststus(400).json({message: 'New password must be at least 6 charcters'});
      user.password = newPassword;
    }

    const updated = await user.save();

    const Mood = (await import('../models/Mood.js')).default;
    const moodCount = await Mood.countDocuments({userId: updated._id});

    res.json({
      _id:            updated._id,
      name:           updated.name,
      email:          updated.email,
      age:            updated.age,
      ageGroup:       updated.ageGroup,
      bio:            updated.bio,
      phone:          updated.phone,
      location:       updated.location,
      occupation:     updated.occupation,
      avatar:         updated.avatar,
      googleId:       updated.googleId,
      streak:         updated.streak,
      badges:         updated.badges,
      activitiesDone: updated.activitiesDone,moodCount,
      createdAt:      updated.createdAt,
      token:          genToken(updated._id),
    });
  } catch (err) {
    console.error('Updated profile error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

// ── Upload Avatar ─────────────────────────────────────────────────
export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: 'No file uploaded' });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Build public URL
    const avatarUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    user.avatar = avatarUrl;
    await user.save();

    res.json({ avatar: avatarUrl, message: 'Profile picture updated!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

