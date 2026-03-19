import { useState, useEffect, use } from 'react';
import { useTranslation } from 'react-i18next';
import AgeZoneBanner from '../components/AgeZoneBanner.jsx';

const allContent = {
  kids: {
    stories: [
      { title:"The Little Star Who Was Afraid", emoji:"⭐", time:"2 min",
        body:`Once there was a little star who was afraid to shine because other stars were brighter.

One night, a child looked up and said, "I can only see YOU — you're my favourite star."

The little star realized: you don't have to be the biggest to matter. You just have to shine.

You matter, just as you are. 🌟` },
      { title:"The Brave Little Cloud", emoji:"☁️", time:"2 min",
        body:`A little cloud was scared of storms. Every time thunder came, it would hide.

One day it learned: clouds don't cause storms — they bring rain that grows flowers.

Its "scary" parts were actually giving life to the world below.

Your feelings — even the big scary ones — have a purpose. 🌧️🌸` },
    ],
    affirmations: [
      "I am kind, clever, and full of ideas! 💡",
      "I can do hard things — one step at a time! 🌈",
      "My feelings are important and valid! 💛",
      "I am loved just the way I am! 🤗",
      "Every day I grow a little stronger! 💪",
      "It's okay to make mistakes — that's how I learn! 🌱",
    ],
  },
  teens: {
    stories: [
      { title:"Study Motivation: The 1% Rule", emoji:"📈", time:"2 min",
        body:`If you improve just 1% every day, after one year you'll be 37 times better.

That's the compound effect. Tiny consistent effort = massive results.

Don't compare yourself to others. Compare yourself to who you were yesterday.

You don't need to be perfect. You need to be consistent. 📚` },
      { title:"When Stress Feels Overwhelming", emoji:"🌊", time:"2 min",
        body:`Every student feels it — the wave of stress before exams, deadlines, expectations.

Here's the truth: stress means you care. And caring is not a weakness.

But when the wave gets too big:
→ Step away for 10 minutes
→ Take 5 deep breaths
→ Write down ONE thing to do next

You can't control everything. Focus only on what's in front of you. 🌿` },
    ],
    tips: [
      { title:"3 Ways to Beat Exam Stress", emoji:"✏️", time:"2 min",
        body:`1. STUDY IN BLOCKS: 25 minutes study, 5 minutes break (Pomodoro technique). Your brain needs rest to retain information.

2. SLEEP MATTERS: Staying up all night before an exam backfires. Sleep consolidates memory — 7-8 hours is your superpower.

3. TALK IT OUT: If anxiety is overwhelming, talk to a friend, parent, or counsellor. You don't have to carry it alone.` },
    ],
  },
  young_adults: {
    stories: [
      { title:"The Productivity Trap", emoji:"⚡", time:"3 min",
        body:`We live in a world that glorifies being busy. "I'm so busy" has become a badge of honour.

But busyness is not the same as productivity.

Research shows our best work comes in focused 90-minute blocks, not 14-hour grinds.

The most successful people protect their energy, not just their time.

Do less. Do it better. Rest without guilt. 🌿` },
      { title:"You Are Not Behind", emoji:"🛤️", time:"2 min",
        body:`There's no universal timeline for life.

Some people graduate at 22 and feel lost at 30.
Some find their passion at 35.
Some build their best career at 40.

Social media shows highlights — not the full story.

Your path is yours alone. There is no "behind". There is only forward. 🚀` },
    ],
    tips: [
      { title:"5 Mindfulness Habits for Busy People", emoji:"🌸", time:"3 min",
        body:`1. MORNING INTENTION: Before checking your phone, ask "How do I want to feel today?"

2. MINDFUL EATING: Eat one meal a day without screens. Taste it.

3. THE 3-BREATH RULE: Before any stressful meeting or task, take 3 deep breaths.

4. DIGITAL SUNSET: No screens 30 minutes before bed. Read or journal instead.

5. GRATITUDE DUMP: Each night, write 3 things that went well — no matter how small.` },
    ],
  },
  adults: {
    stories: [
      { title:"Work-Life Balance Is a Daily Practice", emoji:"⚖️", time:"3 min",
        body:`Balance doesn't mean equal time. It means intentional time.

Some weeks, work needs 80% of you. Other weeks, family does.

The goal isn't perfect split — it's that neither area is always neglected.

Three questions to ask yourself weekly:
→ Did I do meaningful work?
→ Did I connect with people I love?
→ Did I take care of my body?

If yes to all three — you're in balance. 🌿` },
      { title:"It's Okay to Rest", emoji:"🌙", time:"2 min",
        body:`We were never designed to produce endlessly.

Nature doesn't run 24/7. Flowers close at night. Rivers rest in pools.

Rest is not a reward for finishing work. It is a biological necessity.

When you rest, your brain consolidates memories, repairs cells, and recharges creativity.

Resting is productive. You are allowed to stop. 💛` },
    ],
    tips: [
      { title:"Managing Stress as an Adult", emoji:"💚", time:"3 min",
        body:`Chronic stress is the silent driver of most adult health problems. Here's what actually works:

1. MOVEMENT: 20 minutes of walking reduces cortisol by 15%. You don't need a gym.

2. CONNECTION: Loneliness is as harmful as smoking. Call someone you've been meaning to reach out to.

3. BOUNDARIES: Learn to say "I can't take that on right now." It is a complete sentence.

4. SLEEP: Non-negotiable. 7 hours minimum. Your brain detoxes itself during sleep.

5. PROFESSIONAL SUPPORT: Therapy is not weakness — it's the most intelligent form of self-care.` },
    ],
  },
};

const tabs = [
  { id:'stories', label:'📖 Stories'      },
  { id:'tips',    label:'💡 Tips'          },
  { id:'affirmations', label:'✨ Affirmations' },
];

export default function ReadingZone() {
  const [ageGroup, setAgeGroup] = useState('young_adults');
  const [tab,      setTab]      = useState('stories');
  const [openIdx,  setOpenIdx]  = useState(null);
  const {t} = useTranslation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.ageGroup) setAgeGroup(user.ageGroup);
  }, []);

  const content  = allContent[ageGroup] || allContent.young_adults;
  const stories  = content.stories  || [];
  const tips     = content.tips     || [];
  const affirm   = content.affirmations || [];

  const tabs = [
    { id:'stories',      label: t('reading.stories')      },
    { id:'tips',         label: t('reading.tips')         },
    { id:'affirmations', label: t('reading.affirmations') },
  ];

  // Filter tabs to what this age group has
  const availableTabs = tabs.filter(tab => {
    if (tab.id === 'stories')       return stories.length > 0;
    if (tab.id === 'tips')          return tips.length > 0;
    if (tab.id === 'affirmations')  return affirm.length > 0;
    return false;
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 fade-in">
      <div className="text-center mb-6">
        <div className="text-5xl mb-2">📚</div>
        <h1 className="text-3xl font-bold">{t('reading.title')}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{t('reading.subtitle')}</p>
      </div>

      <AgeZoneBanner ageGroup={ageGroup} />

      {/* Tabs */}
      <div className="flex gap-2 justify-center mb-6 flex-wrap">
        {availableTabs.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setOpenIdx(null); }}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${tab === t.id ? 'bg-bloom-green text-white shadow-md' : 'bg-white dark:bg-gray-700 hover:bg-bloom-green/20'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Stories & Tips (accordion) */}
      {(tab === 'stories' ? stories : tips).map((s, i) => (
        <div key={i} className="card mb-4 fade-in">
          <button className="w-full text-left" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{s.emoji}</span>
                <div>
                  <h3 className="font-bold text-lg">{s.title}</h3>
                  <span className="text-xs text-gray-400">⏱ {s.time}</span>
                </div>
              </div>
              <span className="text-gray-400 text-xl">{openIdx === i ? '▲' : '▼'}</span>
            </div>
          </button>
          {openIdx === i && (
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm fade-in">
              {s.body}
            </div>
          )}
        </div>
      ))}

      {/* Affirmations grid */}
      {tab === 'affirmations' && affirm.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {affirm.map((a, i) => (
            <div key={i} className="card fade-in bg-gradient-to-br from-bloom-lavender/10 to-bloom-blue/10 border border-bloom-lavender/20 text-center">
              <p className="font-medium italic text-gray-700 dark:text-gray-200 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}