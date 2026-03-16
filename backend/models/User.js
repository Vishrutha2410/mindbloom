import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const getAgeGroup = (age) => {
  if (age>=8 && age <= 12) return 'kids';
  if (age >=13 && age <=18) return 'teens';
  if( age>=19 && age<=30) return 'young_adults';
  if(age>30) return 'adults';
  return 'young_adults'; 
}

const userSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true, minlength: 6 },
  age:       { type: Number },
  ageGroup:  { type: String, enum: ['kids', 'teens', 'young_adults', 'adults'], default: 'young_adults' },
  googleId:  { type: String, default: null },
  avatar:    { type: String, default: null },
  cloudinaryId: { type: String, default: null },
  // ── New profile fields ──────────────────────────────────────────
  bio:            { type: String, default: '', maxlength: 200 },
  phone:          { type: String, default: '' },
  location:       { type: String, default: '' },
  occupation:     { type: String, default: '' },

  streak:    { type: Number, default: 0 },
  lastLogin: { type: Date },
  badges:    [{ type: String }],
  activitiesDone: { type: Number, default: 0 },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (this.isModified('age') && this.age) {
    this.ageGroup = getAgeGroup(this.age);
  }
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (entered) {
  return bcrypt.compare(entered, this.password);
};

export default mongoose.model('User', userSchema);
