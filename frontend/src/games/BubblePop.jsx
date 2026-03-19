import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const COLORS = ['#6BCB77','#A78BFA','#93C5FD','#F9A8D4','#FCD34D','#FB923C'];
const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const makeBubble = (id) => ({
  id, x: rand(5, 85), y: rand(10, 85),
  size: rand(50, 90),
  color: COLORS[rand(0, COLORS.length)],
  popped: false,
});

const initBubbles = () => Array.from({ length: 15 }, (_, i) => makeBubble(i));

export default function BubblePop({ onBack }) {
  const [bubbles, setBubbles] = useState(initBubbles);
  const [score,   setScore]   = useState(0);
  const [popping, setPopping] = useState(new Set());
  const {t} = useTranslation();

  const pop = useCallback((id) => {
    setPopping(p => new Set(p).add(id));
    setScore(s => s + 1);
    setTimeout(() => {
      setBubbles(b => b.map(x => x.id === id ? { ...x, popped: true } : x));
      setPopping(p => { const n = new Set(p); n.delete(id); return n; });
    }, 500);
  }, []);

  const allPopped = bubbles.every(b => b.popped);

  const reset = () => { setBubbles(initBubbles()); setScore(0); };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 fade-in">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="btn-secondary !px-4 !py-2 text-sm">{t('←games.back')}</button>
        <h1 className="text-2xl font-bold">🫧 Bubble Pop</h1>
        <span className="bg-bloom-green text-white px-4 py-2 rounded-xl font-bold">Score: {score}</span>
      </div>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-4">Tap all the bubbles to pop them!</p>

      <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-3xl overflow-hidden border-2 border-bloom-blue/30">
        {bubbles.map(b => !b.popped && (
          <button key={b.id} onClick={() => pop(b.id)}
            style={{ left:`${b.x}%`, top:`${b.y}%`, width:b.size, height:b.size, background:b.color }}
            className={`absolute rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-75 flex items-center justify-center text-white font-bold text-xl border-4 border-white/40 ${popping.has(b.id) ? 'bubble-float' : ''}`}>
            🫧
          </button>
        ))}
        {allPopped && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 fade-in">
            <div className="text-5xl mb-3">🎉</div>
            <p className="text-xl font-bold mb-1">All bubbles popped!</p>
            <p className="text-gray-500 mb-4">Score: {score}</p>
            <button onClick={reset} className="btn-primary">Play Again 🫧</button>
          </div>
        )}
      </div>
    </div>
  );
}
