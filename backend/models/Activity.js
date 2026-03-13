import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  type:        { type: String, required: true },
  title:       { type: String, required: true },
  description: { type: String, required: true },
  forMoods:    [{ type: String }],
  icon:        { type: String, default: '🌸' },
  duration:    { type: String, default: '5 min' },
  route:       { type: String, default: '/' },
});

export default mongoose.model('Activity', activitySchema);
