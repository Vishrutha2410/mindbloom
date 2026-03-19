import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const COLORS = [
  { name:'Red',    hex:'#EF4444' },
  { name:'Blue',   hex:'#3B82F6' },
  { name:'Green',  hex:'#22C55E' },
  { name:'Yellow', hex:'#EAB308' },
  { name:'Purple', hex:'#A855F7' },
  { name:'Orange', hex:'#F97316' },
  { name:'Pink',   hex:'#EC4899' },
  { name:'Teal',   hex:'#14B8A6' },
];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

const makeRound = () => {
  const correct = rand(COLORS);
  const distractors = COLORS.filter(c => c.name !== correct.name).sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [...distractors, correct].sort(() => Math.random() - 0.5);
  const displayColor = Math.random() > 0.5 ? correct : rand(distractors); // sometimes show mismatched color name
  return { correct, options, displayColor };
};

export default function ColorMatch({ onBack }) {
  const [round,    setRound]    = useState(makeRound);
  const [score,    setScore]    = useState(0);
  const [total,    setTotal]    = useState(0);
  const [feedback, setFeedback] = useState(null);
  const {t} = useTranslation();

  const answer = useCallback((name) => {
    const correct = name === round.correct.name;
    setFeedback(correct ? '✅ Correct!' : `❌ Wrong! It was ${round.correct.name}`);
    if (correct) setScore(s => s + 1);
    setTotal(t => t + 1);
    setTimeout(() => { setFeedback(null); setRound(makeRound()); }, 900);
  }, [round]);

  return (
    <div className="max-w-md mx-auto px-4 py-8 fade-in">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="btn-secondary !px-4 !py-2 text-sm">{t('←games.back')}</button>
        <h1 className="text-2xl font-bold">🌈 Color Match</h1>
        <span className="bg-bloom-pink text-white px-4 py-2 rounded-xl font-bold text-sm">{score}/{total}</span>
      </div>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-6 text-sm">
        What color is this text written in? (Ignore what the word says!)
      </p>

      <div className="card text-center mb-6">
        <p className="text-5xl font-extrabold mb-2" style={{ color: round.displayColor.hex }}>
          {round.correct.name}
        </p>
        <p className="text-sm text-gray-400">Select the COLOR of the text above</p>
      </div>

      {feedback && (
        <div className={`text-center font-bold text-lg py-3 rounded-xl mb-4 fade-in ${feedback.startsWith('✅') ? 'bg-green-100 dark:bg-green-900/30 text-green-700' : 'bg-red-100 dark:bg-red-900/30 text-red-700'}`}>
          {feedback}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {round.options.map(opt => (
          <button key={opt.name} onClick={() => answer(opt.name)}
            className="py-4 rounded-2xl font-bold text-white text-lg transition-all hover:scale-105 active:scale-95 shadow-md border-4 border-white/30"
            style={{ backgroundColor: opt.hex }}>
            {opt.name}
          </button>
        ))}
      </div>
    </div>
  );
}
