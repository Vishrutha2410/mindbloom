import { useState } from 'react';

const PUZZLES = [
  { scrambled: 'LMCBOO', answer: 'BLOOM',    hint: '🌸 What MindBloom wants you to do' },
  { scrambled: 'ALEBNAC', answer: 'BALANCE',  hint: '⚖️ Mental wellness key' },
  { scrambled: 'HSITNYUNSSE', answer: 'MINDFULNESS', hint: '🧘 Awareness of the present' },
  { scrambled: 'ACILMRET', answer: 'MIRACLES', hint: '✨ Hard work produces these' },
  { scrambled: 'EERATBH',  answer: 'BREATHE',  hint: '💨 Do this to calm down' },
  { scrambled: 'UXRAL',    answer: 'RELAX',    hint: '🛋️ Let go of tension' },
  { scrambled: 'AEYLNRG',  answer: 'ENERGY',   hint: '⚡ What rest restores' },
  { scrambled: 'PAHY',     answer: 'HAPPY',    hint: '😊 How MindBloom wants you to feel' },
  { scrambled: 'EULSACF',  answer: 'PEACEFUL', hint: '🕊️ A calm, undisturbed state' },
  { scrambled: 'TGERSHN',  answer: 'STRENGTH', hint: '💪 You have more than you know' },
];

export default function WordPuzzle({ onBack }) {
  const [idx,      setIdx]      = useState(0);
  const [input,    setInput]    = useState('');
  const [result,   setResult]   = useState(null); // 'correct' | 'wrong'
  const [score,    setScore]    = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);

  const puzzle = PUZZLES[idx];

  const check = () => {
    if (input.toUpperCase() === puzzle.answer) {
      setResult('correct');
      setScore(s => s + 1);
    } else {
      setResult('wrong');
    }
  };

  const next = () => {
    if (idx + 1 >= PUZZLES.length) { setFinished(true); return; }
    setIdx(i => i + 1);
    setInput('');
    setResult(null);
    setShowHint(false);
  };

  const reset = () => {
    setIdx(0); setInput(''); setResult(null);
    setScore(0); setShowHint(false); setFinished(false);
  };

  if (finished) return (
    <div className="max-w-md mx-auto px-4 py-8 fade-in">
      <div className="card text-center">
        <div className="text-5xl mb-3">🎉</div>
        <h2 className="text-2xl font-bold mb-2">Word Master!</h2>
        <p className="text-gray-500 mb-4">You scored <strong>{score}</strong> out of {PUZZLES.length}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset}   className="btn-primary">Play Again 📝</button>
          <button onClick={onBack}  className="btn-secondary">← Back</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto px-4 py-8 fade-in">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="btn-secondary !px-4 !py-2 text-sm">← Back</button>
        <h1 className="text-2xl font-bold">📝 Word Puzzle</h1>
        <span className="bg-teal-500 text-white px-4 py-2 rounded-xl font-bold text-sm">
          {idx + 1}/{PUZZLES.length}
        </span>
      </div>

      <div className="card mb-4 text-center">
        <p className="text-sm text-gray-400 mb-2">Unscramble this word:</p>
        <div className="flex justify-center gap-2 mb-4 flex-wrap">
          {puzzle.scrambled.split('').map((l, i) => (
            <span key={i}
              className="w-10 h-10 bg-bloom-lavender text-white font-extrabold text-lg rounded-xl flex items-center justify-center shadow">
              {l}
            </span>
          ))}
        </div>

        {showHint && (
          <p className="text-sm text-bloom-lavender font-medium mb-3 fade-in">💡 Hint: {puzzle.hint}</p>
        )}

        <input value={input} onChange={e => setInput(e.target.value.toUpperCase())}
          onKeyDown={e => e.key === 'Enter' && !result && check()}
          disabled={!!result}
          placeholder="Type your answer..."
          className="input-field text-center font-mono text-lg uppercase tracking-widest mb-3"
          maxLength={puzzle.answer.length + 2} />

        {result === 'correct' && (
          <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-xl font-bold fade-in">
            ✅ Correct! The word is {puzzle.answer} 🎉
          </div>
        )}
        {result === 'wrong' && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-xl font-bold fade-in">
            ❌ Wrong! The answer was <strong>{puzzle.answer}</strong>
          </div>
        )}
      </div>

      <div className="flex gap-3 justify-center flex-wrap">
        {!result && (
          <>
            <button onClick={check} disabled={!input} className="btn-primary disabled:opacity-50">Check ✓</button>
            <button onClick={() => setShowHint(true)} className="btn-secondary !bg-yellow-400 hover:!bg-yellow-500">💡 Hint</button>
          </>
        )}
        {result && (
          <button onClick={next} className="btn-primary w-full !py-3">
            {idx + 1 >= PUZZLES.length ? 'See Results 🎉' : 'Next Word →'}
          </button>
        )}
      </div>

      <div className="mt-4 text-center text-sm text-gray-400">Score: {score} correct so far</div>
    </div>
  );
}