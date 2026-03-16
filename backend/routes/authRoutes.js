import express from 'express';
import multer  from 'multer';
import path from 'path';
import { register, login, googleAuth, getProfile, updateProfile, uploadAvatar} from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
   filename:    (req, file, cb) => cb(null, `avatar_${req.user?._id}_${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    allowed.test(path.extname(file.originalname).toLowerCase())
      ? cb(null, true)
      : cb(new Error('Only image files allowed'));
  },
});

router.post('/register', register);
router.post('/login',    login);
router.post('/google',  googleAuth);
router.get('/profile',   protect, getProfile);
router.put('/profile',  protect, updateProfile);
router.post('/avatar',  protect, upload.single('avatar'), uploadAvatar);

export default router;
