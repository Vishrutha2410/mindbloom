import Activity from '../models/Activity.js';

const seed = [
  { type:'breathing',  title:'Box Breathing',        description:'Inhale 4s, Hold 4s, Exhale 4s. Calms the nervous system instantly.',  forMoods:['stressed','angry','tired'], icon:'🌬️', duration:'5 min',  route:'/meditation' },
  { type:'game',       title:'Bubble Pop',            description:'Pop bubbles to release tension. Satisfying and calming.',              forMoods:['stressed','angry'],          icon:'🫧', duration:'3 min',  route:'/games' },
  { type:'game',       title:'Memory Card Game',      description:'Match cards to sharpen focus and distract from stress.',              forMoods:['tired','sad'],               icon:'🃏', duration:'5 min',  route:'/games' },
  { type:'game',       title:'Puzzle Game',           description:'Rearrange tiles to solve the puzzle. Great for distraction.',         forMoods:['stressed','sad'],            icon:'🧩', duration:'10 min', route:'/games' },
  { type:'game',       title:'Color Match',           description:'Match calming colors — a gentle brain workout.',                      forMoods:['stressed','calm'],           icon:'🌈', duration:'5 min',  route:'/games' },
  { type:'reading',    title:'Daily Motivation',      description:'Read an uplifting story to reset your perspective.',                  forMoods:['sad','tired'],               icon:'📖', duration:'2 min',  route:'/reading' },
  { type:'reading',    title:'Positive Affirmations', description:'Powerful affirmations to lift your spirit and build confidence.',     forMoods:['sad','calm'],                icon:'✨', duration:'2 min',  route:'/reading' },
  { type:'drawing',    title:'Free Drawing',          description:'Express your feelings through colors and shapes on the canvas.',      forMoods:['angry','sad','stressed'],    icon:'🎨', duration:'10 min', route:'/draw' },
  { type:'meditation', title:'Guided Meditation',     description:'Follow a calm guided session to restore inner peace.',                forMoods:['stressed','angry','tired'],  icon:'🧘', duration:'7 min',  route:'/meditation' },
  { type:'breathing',  title:'Deep Breathing',        description:'5 slow deep breaths — in through nose, out through mouth.',          forMoods:['angry','stressed'],          icon:'💨', duration:'3 min',  route:'/meditation' },
];

export const getActivities = async (req, res) => {
  try {
    let list = await Activity.find();
    if (!list.length) list = await Activity.insertMany(seed);
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getByMood = async (req, res) => {
  try {
    let list = await Activity.find({ forMoods: req.params.mood });
    if (!list.length) {
      await Activity.insertMany(seed);
      list = await Activity.find({ forMoods: req.params.mood });
    }
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
