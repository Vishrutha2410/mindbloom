import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  type:        { type: String, required: true },
  title:       { type: String, required: true },
  description: { type: String, required: true },
  forMoods:    [{ type: String }],
  ageGroups:   [{type: String, enum: ['kids', 'teens', 'young_adults', 'adults'] }],
  icon:        { type: String, default: '🌸' },
  duration:    { type: String, default: '5 min' },
  route:       { type: String, default: '/' },
});

export default mongoose.model('Activity', activitySchema);
