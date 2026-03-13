import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import moodRoutes from './routes/moodRoutes.js';
import activityRoutes from './routes/activityRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => res.json({ message: '🌸 MindBloom API running' }));
app.use('/api/auth',       authRoutes);
app.use('/api/mood',       moodRoutes);
app.use('/api/activities', activityRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌸 Server running on port ${PORT}`));
