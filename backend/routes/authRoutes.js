import express from 'express';
import { register, login, googleAuth, getProfile, updateProfile, uploadAvatar} from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';
import {upload} from '../config/cloudinary.js';

const router = express.Router();

router.post('/register', register);
router.post('/login',    login);
router.post('/google',  googleAuth);
router.get('/profile',   protect, getProfile);
router.put('/profile',  protect, updateProfile);
router.post('/avatar',  protect, upload.single('avatar'), uploadAvatar);

export default router;
