import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Log to confirm env vars are loaded (remove after testing)
console.log('☁️ Cloudinary config:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '❌ MISSING',
  api_key:    process.env.CLOUDINARY_API_KEY    ? '✅ loaded' : '❌ MISSING',
  api_secret: process.env.CLOUDINARY_API_SECRET ? '✅ loaded' : '❌ MISSING',
});

// Storage config — saves directly to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file)=>{
    return{
      folder:         'mindbloom/avatars',   // folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 300, height: 300, crop: 'fill', gravity: 'face' }],
    public_id:       `avatar_${req.user?._id}_${Date.now()}`,
    };
  },
});
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  if (allowed.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpg, png, gif, webp)'), false);
  }
};
export const upload  = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter });
export default cloudinary;