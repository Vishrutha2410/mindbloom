import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mood:   { type: String, required: true, enum: ['happy','calm','stressed','angry','sad','tired'] },
  note:   { type: String, default: '' },
  date:   { type: Date, default: Date.now },
});

export default mongoose.model('Mood', moodSchema);
