import express from 'express';
import { logMood, getMoodHistory, getWeeklyMoods } from '../controllers/moodController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/',       protect, logMood);
router.get('/history', protect, getMoodHistory);
router.get('/weekly',  protect, getWeeklyMoods);
export default router;
