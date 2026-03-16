import Activity from '../models/Activity.js';

const seed = [
  // ── KIDS (8-12) ───────────────────────────────────────────
  { type:'game',       title:'Emoji Matching',        description:'Match the emoji pairs — fun and colourful!',               forMoods:['happy','calm'],            ageGroups:['kids'],                                icon:'😄', duration:'3 min',  route:'/games' },
  { type:'game',       title:'Memory Card Game',      description:'Flip and match cards to sharpen your memory.',             forMoods:['tired','sad'],             ageGroups:['kids','teens'],                        icon:'🃏', duration:'5 min',  route:'/games' },
  { type:'game',       title:'Color Puzzle',          description:'Arrange the colors into the right pattern.',               forMoods:['stressed','calm'],         ageGroups:['kids'],                                icon:'🎨', duration:'4 min',  route:'/games' },
  { type:'meditation', title:'1-Min Breathing',       description:'A short, fun breathing animation just for kids.',          forMoods:['stressed','angry'],        ageGroups:['kids'],                                icon:'🌬️', duration:'1 min',  route:'/meditation' },
  { type:'reading',    title:'Positive Affirmations', description:'Short, cheerful phrases to make you smile.',               forMoods:['sad','tired'],             ageGroups:['kids','teens'],                        icon:'⭐', duration:'2 min',  route:'/reading' },
  { type:'reading',    title:'Fun Learning Stories',  description:'Short stories that teach something new and fun.',          forMoods:['happy','calm'],            ageGroups:['kids'],                                icon:'📖', duration:'3 min',  route:'/reading' },

  // ── TEENS (13-18) ─────────────────────────────────────────
  { type:'game',       title:'Reaction Speed Test',   description:'Test how fast your brain reacts — beat your high score!', forMoods:['tired','stressed'],        ageGroups:['teens'],                               icon:'⚡', duration:'3 min',  route:'/games' },
  { type:'game',       title:'Typing Speed Challenge',description:'Race against the clock to type as fast as you can.',      forMoods:['stressed','calm'],         ageGroups:['teens','young_adults'],                icon:'⌨️', duration:'5 min',  route:'/games' },
  { type:'game',       title:'Puzzle Slider',         description:'Rearrange the tiles into the correct order.',              forMoods:['stressed','sad'],          ageGroups:['teens','young_adults','adults'],       icon:'🧩', duration:'10 min', route:'/games' },
  { type:'meditation', title:'5-Min Breathing',       description:'Box breathing to handle exam stress and anxiety.',         forMoods:['stressed','angry'],        ageGroups:['teens'],                               icon:'🧘', duration:'5 min',  route:'/meditation' },
  { type:'meditation', title:'Focus Timer (Pomodoro)',description:'25-minute focus session with 5-minute breaks.',            forMoods:['tired','calm'],            ageGroups:['teens','young_adults'],                icon:'⏱️', duration:'25 min', route:'/meditation' },
  { type:'reading',    title:'Study Motivation Tips', description:'Quick tips to stay motivated and ace your exams.',         forMoods:['tired','stressed'],        ageGroups:['teens'],                               icon:'📚', duration:'3 min',  route:'/reading' },
  { type:'reading',    title:'Stress Management Tips',description:'Easy techniques to manage stress at school and home.',    forMoods:['stressed','angry'],        ageGroups:['teens'],                               icon:'💡', duration:'2 min',  route:'/reading' },
  { type:'reading',    title:'Inspirational Stories', description:'True stories of people who overcame tough times.',         forMoods:['sad','tired'],             ageGroups:['teens','young_adults'],                icon:'🌟', duration:'4 min',  route:'/reading' },

  // ── YOUNG ADULTS (19-30) ──────────────────────────────────
  { type:'game',       title:'Brain Teaser Puzzles',  description:'Challenge your mind with lateral thinking puzzles.',       forMoods:['stressed','calm'],         ageGroups:['young_adults'],                        icon:'🧠', duration:'8 min',  route:'/games' },
  { type:'game',       title:'Logic Puzzles',         description:'Solve logic grids and sharpen analytical thinking.',       forMoods:['calm','tired'],            ageGroups:['young_adults','adults'],               icon:'🔢', duration:'10 min', route:'/games' },
  { type:'meditation', title:'4-7-8 Breathing',       description:'Inhale 4s, hold 7s, exhale 8s. Natural tranquilizer.',    forMoods:['stressed','angry'],        ageGroups:['young_adults'],                        icon:'🌿', duration:'10 min', route:'/meditation' },
  { type:'meditation', title:'Stress Reduction Breathing', description:'Proven breathing patterns to reduce cortisol.',      forMoods:['stressed','angry'],        ageGroups:['young_adults','adults'],               icon:'💨', duration:'7 min',  route:'/meditation' },
  { type:'reading',    title:'Productivity Articles', description:'Science-backed tips to do more in less time.',             forMoods:['tired','calm'],            ageGroups:['young_adults'],                        icon:'🚀', duration:'4 min',  route:'/reading' },
  { type:'reading',    title:'Career Motivation',     description:'Stay motivated and find purpose in your work.',            forMoods:['sad','tired'],             ageGroups:['young_adults'],                        icon:'💼', duration:'3 min',  route:'/reading' },
  { type:'reading',    title:'Mindfulness Tips',      description:'Simple mindfulness practices for a busy lifestyle.',       forMoods:['stressed','calm'],         ageGroups:['young_adults','adults'],               icon:'🌸', duration:'3 min',  route:'/reading' },

  // ── ADULTS (30+) ──────────────────────────────────────────
  { type:'game',       title:'Word Puzzles',          description:'Expand vocabulary with calming word games.',               forMoods:['calm','tired'],            ageGroups:['adults'],                              icon:'📝', duration:'8 min',  route:'/games' },
  { type:'game',       title:'Memory Recall Game',    description:'Keep your memory sharp with recall challenges.',           forMoods:['tired','sad'],             ageGroups:['adults'],                              icon:'🔍', duration:'6 min',  route:'/games' },
  { type:'meditation', title:'Guided Relaxation',     description:'Full body scan and relaxation for deep calm.',             forMoods:['stressed','tired'],        ageGroups:['adults'],                              icon:'☁️', duration:'12 min', route:'/meditation' },
  { type:'meditation', title:'Sleep Meditation',      description:'Gentle meditation to prepare your mind for sleep.',        forMoods:['tired','stressed'],        ageGroups:['adults'],                              icon:'🌙', duration:'10 min', route:'/meditation' },
  { type:'reading',    title:'Mental Health Awareness',description:'Understanding and caring for your mental wellbeing.',     forMoods:['sad','stressed'],          ageGroups:['adults'],                              icon:'💚', duration:'4 min',  route:'/reading' },
  { type:'reading',    title:'Work-Life Balance',     description:'Practical advice to balance career and personal life.',    forMoods:['stressed','tired'],        ageGroups:['adults'],                              icon:'⚖️', duration:'3 min',  route:'/reading' },
  { type:'reading',    title:'Stress Relief Articles',description:'Evidence-based strategies to reduce daily stress.',        forMoods:['stressed','angry'],        ageGroups:['adults'],                              icon:'🍃', duration:'3 min',  route:'/reading' },

  // ── ALL AGES ──────────────────────────────────────────────
  { type:'game',       title:'Bubble Pop',            description:'Pop bubbles to release tension. Works for everyone!',     forMoods:['stressed','angry'],        ageGroups:['kids','teens','young_adults','adults'], icon:'🫧', duration:'3 min',  route:'/games' },
  { type:'game',       title:'Color Match',           description:'Match calming colors — a gentle brain workout.',          forMoods:['stressed','calm'],         ageGroups:['kids','teens','young_adults','adults'], icon:'🌈', duration:'5 min',  route:'/games' },
  { type:'drawing',    title:'Free Drawing',          description:'Express yourself freely on the canvas.',                  forMoods:['angry','sad','stressed'],  ageGroups:['kids','teens','young_adults','adults'], icon:'🎨', duration:'10 min', route:'/draw' },
];

// ── Auto-seed if collection is empty ──────────────────────────────
const ensureSeeded = async () => {
  const count = await Activity.countDocuments();
  if (count === 0) {
    await Activity.insertMany(seed);
    console.log('🌱 Activities auto-seeded successfully');
  }
};

// GET /api/activities — all activities
export const getActivities = async (req, res) => {
  try {
    await ensureSeeded();
    const list = await Activity.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/activities/mood/:mood — filtered by mood + ageGroup
export const getByMood = async (req, res) => {
  try {
    await ensureSeeded();
    const { mood }   = req.params;
    const ageGroup   = req.user?.ageGroup || 'young_adults';
    const list       = await Activity.find({ forMoods: mood, ageGroups: ageGroup });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/activities/age-group — filtered by ageGroup only
export const getByAgeGroup = async (req, res) => {
  try {
    await ensureSeeded();
    const ageGroup = req.user?.ageGroup || 'young_adults';
    const list     = await Activity.find({ ageGroups: ageGroup });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
