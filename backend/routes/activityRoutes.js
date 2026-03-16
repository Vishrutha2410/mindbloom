import express from 'express';
import { getActivities, getByMood, getByAgeGroup } from '../controllers/activityController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/',           protect, getActivities);
router.get('/age-group', protect, getByAgeGroup);
router.get('/mood/:mood', protect, getByMood);
export default router;
