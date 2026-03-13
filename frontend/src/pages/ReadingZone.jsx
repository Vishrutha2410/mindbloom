import { useState } from 'react';

const content = {
  motivation: [
    {
      title: "The Bamboo Tree",
      time: "2 min read",
      emoji: "🎋",
      body: `A farmer planted a bamboo seed and watered it faithfully every day. For five years, nothing appeared above the ground. His neighbors laughed, but he kept watering.

In the sixth year, the bamboo shot up 90 feet in just six weeks.

People asked: "Did it grow in six weeks?"

The farmer smiled. "No. It grew in six years. All those years of watering built a root system strong enough to support its growth."

Your hard work is never wasted. You are building roots. Keep going. 🌱`
    },
    {
      title: "You Are Enough",
      time: "1 min read",
      emoji: "💛",
      body: `On the days when nothing goes right — when you feel invisible, exhausted, or like you're falling behind — remember this:

You don't have to earn your rest. You don't have to justify your existence. You don't have to fix everything today.

You are allowed to be a work in progress and still be worthy of love and kindness — especially from yourself.

Today, just breathe. Just be. That is enough. 💛`
    },
    {
      title: "The Jar of Rocks",
      time: "2 min read",
      emoji: "🪨",
      body: `A professor placed large rocks into a jar and asked students, "Is it full?" They said yes.

He poured in small pebbles. "Now is it full?" Again they said yes.

He added sand. It filled every gap.

"This is your life," he said. "The rocks are the important things — family, health, dreams. The pebbles are your job and daily tasks. The sand is everything else.

If you fill your jar with sand first, there's no room for the rocks."

Put the big things first. Everything else will find its place. 🌿`
    },
  ],
  quotes: [
    { text: "You don't have to be perfect to be amazing.", author: "Unknown" },
    { text: "Every day is a second chance.", author: "Unknown" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "You are braver than you believe, stronger than you seem.", author: "A.A. Milne" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "The only way out is through.", author: "Robert Frost" },
    { text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi" },
    { text: "Small steps every day lead to big change.", author: "Unknown" },
    { text: "You owe yourself the love you so freely give others.", author: "Unknown" },
    { text: "Rest is not a reward — it is a right.", author: "Unknown" },
  ],
  mindfulness: [
    {
      title: "The 5-4-3-2-1 Grounding Technique",
      time: "2 min read",
      emoji: "🌿",
      body: `When anxiety or stress feels overwhelming, grounding yourself in the present moment can help.

Try this simple technique:

👀 Name 5 things you can SEE right now.
✋ Name 4 things you can TOUCH (feel their texture).
👂 Name 3 things you can HEAR.
👃 Name 2 things you can SMELL.
👅 Name 1 thing you can TASTE.

This exercise pulls your mind from anxious thoughts and anchors it in the present. Do it slowly, breathing deeply between each sense.

You are here. You are safe. You are okay. 🌿`
    },
    {
      title: "What Mindfulness Actually Means",
      time: "2 min read",
      emoji: "🧘",
      body: `Mindfulness doesn't mean sitting in silence for hours. It doesn't mean emptying your mind.

It simply means paying attention to the present moment — without judgment.

You can be mindful while washing dishes, feeling the warmth of the water.
While eating, truly tasting each bite.
While walking, noticing the ground beneath your feet.

The mind wanders — that's normal. Mindfulness is gently bringing it back, every time, without frustration.

One breath. One moment. That's all it takes to begin. 🌸`
    },
    {
      title: "The Power of a Pause",
      time: "1 min read",
      emoji: "⏸️",
      body: `Between every stimulus and response, there is a space.

In that space lies your power — the power to choose how you react, instead of simply reacting.

Next time you feel triggered, overwhelmed, or reactive — pause for just three seconds.

Breathe in.
Breathe out.
Then choose your response.

That tiny pause is where emotional strength lives. Practice it daily, and it will change your life. 💪`
    },
  ]
};

const tabs = [
  { id:'motivation',  label:'📖 Stories',      emoji:'📖' },
  { id:'quotes',      label:'✨ Quotes',        emoji:'✨' },
  { id:'mindfulness', label:'🌿 Mindfulness',   emoji:'🌿' },
];

export default function ReadingZone() {
  const [tab,      setTab]      = useState('motivation');
  const [openIdx,  setOpenIdx]  = useState(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 fade-in">
      <div className="text-center mb-8">
        <div className="text-5xl mb-2">📚</div>
        <h1 className="text-3xl font-bold">MindBloom Reading Zone</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Short reads for a calmer, happier mind.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 justify-center mb-8 flex-wrap">
        {tabs.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setOpenIdx(null); }}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${tab === t.id ? 'bg-bloom-green text-white shadow-md' : 'bg-white dark:bg-gray-700 hover:bg-bloom-green/20'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Stories */}
      {tab === 'motivation' && (
        <div className="space-y-4">
          {content.motivation.map((s, i) => (
            <div key={i} className="card fade-in">
              <button className="w-full text-left" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{s.emoji}</span>
                    <div>
                      <h3 className="font-bold text-lg">{s.title}</h3>
                      <span className="text-xs text-gray-400">⏱ {s.time}</span>
                    </div>
                  </div>
                  <span className="text-xl text-gray-400">{openIdx === i ? '▲' : '▼'}</span>
                </div>
              </button>
              {openIdx === i && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line fade-in text-sm">
                  {s.body}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Quotes */}
      {tab === 'quotes' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {content.quotes.map((q, i) => (
            <div key={i} className="card fade-in bg-gradient-to-br from-bloom-lavender/10 to-bloom-blue/10 border border-bloom-lavender/20">
              <p className="text-gray-700 dark:text-gray-200 font-medium italic mb-3 leading-relaxed">"{q.text}"</p>
              <p className="text-sm text-bloom-lavender font-semibold">— {q.author}</p>
            </div>
          ))}
        </div>
      )}

      {/* Mindfulness */}
      {tab === 'mindfulness' && (
        <div className="space-y-4">
          {content.mindfulness.map((s, i) => (
            <div key={i} className="card fade-in">
              <button className="w-full text-left" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{s.emoji}</span>
                    <div>
                      <h3 className="font-bold text-lg">{s.title}</h3>
                      <span className="text-xs text-gray-400">⏱ {s.time}</span>
                    </div>
                  </div>
                  <span className="text-xl text-gray-400">{openIdx === i ? '▲' : '▼'}</span>
                </div>
              </button>
              {openIdx === i && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line fade-in text-sm">
                  {s.body}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
