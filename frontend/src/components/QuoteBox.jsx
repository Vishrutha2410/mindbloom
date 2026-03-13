import { useState } from 'react';

const quotes = [
  "You are stronger than you think. 💪",
  "Take a deep breath — everything will be okay. 🌿",
  "Today is another chance to bloom. 🌸",
  "Your feelings are valid. Be kind to yourself. 💛",
  "Small steps still move you forward. 🐾",
  "You don't have to be perfect to be amazing. ✨",
  "Rest is productive. You deserve peace. 🕊️",
  "Every storm runs out of rain. ☀️",
  "You are not alone in this journey. 🤝",
  "Breathe in courage, breathe out fear. 🌬️",
  "Growth happens one day at a time. 🌱",
  "You have survived every hard day so far. 🏆",
];

export default function QuoteBox() {
  const [idx, setIdx] = useState(Math.floor(Math.random() * quotes.length));

  return (
    <div className="card text-center bg-gradient-to-br from-bloom-lavender/20 to-bloom-blue/20">
      <div className="text-4xl mb-3">💬</div>
      <p className="text-lg font-medium italic text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
        "{quotes[idx]}"
      </p>
      <button onClick={() => setIdx((idx + 1) % quotes.length)}
        className="btn-primary !px-4 !py-2 text-sm">
        Next Quote ✨
      </button>
    </div>
  );
}
