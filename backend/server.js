import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import moodRoutes from './routes/moodRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import {fileURLToPath} from 'url';
import {dirname, join } from 'path';
import fs from 'fs';

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadsDir = join(__dirname, 'uploads');
if(!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
app.use('/uploads', express.static(join(__dirname, 'uploads')));

app.get('/', (req, res) => res.json({ message: '🌸 MindBloom API running' }));
app.use('/api/auth',       authRoutes);
app.use('/api/mood',       moodRoutes);
app.use('/api/activities', activityRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🌸 Server running on port ${PORT}`));
