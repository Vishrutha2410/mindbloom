import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const WORDS_BY_LEVEL = [
  ['calm', 'breathe', 'peace', 'bloom', 'relax', 'smile', 'happy', 'focus', 'sleep', 'rest'],
  ['mindful', 'wellness', 'balance', 'harmony', 'serene', 'clarity', 'growth', 'nature', 'gentle', 'joyful'],
  ['meditation', 'positivity', 'resilience', 'tranquil', 'flourish', 'gratitude', 'compassion', 'strength'],
];

const getWords = () => {
  const lvl = WORDS_BY_LEVEL[Math.floor(Math.random() * WORDS_BY_LEVEL.length)];
  return [...lvl].sort(() => Math.random() - 0.5).slice(0, 8);
};

export default function TypingGame({ onBack }) {
  const [words,    setWords]    = useState(getWords);
  const [idx,      setIdx]      = useState(0);
  const [input,    setInput]    = useState('');
  const [correct,  setCorrect]  = useState(0);
  const [wrong,    setWrong]    = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [started,  setStarted]  = useState(false);
  const [done,     setDone]     = useState(false);
  const inputRef = useRef(null);
  const {t} = useTranslation();

  useEffect(() => {
    if (!started || done) return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(t); setDone(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [started, done]);

  const handleInput = (e) => {
    const val = e.target.value;
    if (!started) setStarted(true);
    if (val.endsWith(' ')) {
      const typed = val.trim();
      if (typed === words[idx]) setCorrect(c => c + 1);
      else                      setWrong(w => w + 1);
      setIdx(i => i + 1);
      setInput('');
      if (idx + 1 >= words.length) {
        setWords(getWords());
        setIdx(0);
      }
    } else {
      setInput(val);
    }
  };

  const reset = () => {
    setWords(getWords()); setIdx(0); setInput('');
    setCorrect(0); setWrong(0); setTimeLeft(30);
    setStarted(false); setDone(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const currentWord = words[idx] || '';
  const isCorrectSoFar = currentWord.startsWith(input);

  return (
    <div className="max-w-xl mx-auto px-4 py-8 fade-in">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="btn-secondary !px-4 !py-2 text-sm">{t('←games.back')}</button>
        <h1 className="text-2xl font-bold">⌨️ Typing Speed</h1>
        <span className={`px-4 py-2 rounded-xl font-bold text-sm text-white ${timeLeft <= 10 ? 'bg-red-500' : 'bg-bloom-green'}`}>
          ⏱ {timeLeft}s
        </span>
      </div>

      {done ? (
        <div className="card text-center fade-in">
          <div className="text-5xl mb-3">🏆</div>
          <h2 className="text-2xl font-bold mb-4">Time's Up!</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-100 dark:bg-green-900/30 rounded-2xl p-4">
              <div className="text-3xl font-bold text-green-600">{correct}</div>
              <div className="text-sm text-gray-500">✅ Correct</div>
            </div>
            <div className="bg-red-100 dark:bg-red-900/30 rounded-2xl p-4">
              <div className="text-3xl font-bold text-red-500">{wrong}</div>
              <div className="text-sm text-gray-500">❌ Wrong</div>
            </div>
          </div>
          <p className="text-gray-500 mb-4">Accuracy: {correct + wrong > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0}%</p>
          <button onClick={reset} className="btn-primary">Play Again ⌨️</button>
        </div>
      ) : (
        <>
          <div className="card mb-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {words.map((w, i) => (
                <span key={i}
                  className={`px-3 py-1 rounded-lg text-sm font-mono font-medium transition-all ${
                    i < idx  ? 'bg-green-100 dark:bg-green-900/30 text-green-600 line-through opacity-50' :
                    i === idx ? 'bg-bloom-lavender text-white scale-110 shadow' :
                               'bg-gray-100 dark:bg-gray-700 text-gray-500'
                  }`}>{w}</span>
              ))}
            </div>
            <input ref={inputRef} value={input} onChange={handleInput}
              disabled={done}
              placeholder={started ? '' : 'Start typing to begin...'}
              className={`input-field font-mono text-lg ${!isCorrectSoFar ? '!border-red-400 !ring-red-300' : ''}`}
              autoFocus />
          </div>
          <div className="flex justify-between text-sm text-gray-500 px-1">
            <span>✅ Correct: <strong className="text-green-600">{correct}</strong></span>
            <span>❌ Wrong: <strong className="text-red-500">{wrong}</strong></span>
          </div>
        </>
      )}
    </div>
  );
}