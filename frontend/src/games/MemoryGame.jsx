import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const EMOJIS = ['🌸','🌿','🦋','🌈','⭐','🍀','🌻','🐬'];
const makeCards = () => {
  const pairs = [...EMOJIS, ...EMOJIS];
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs.map((emoji, id) => ({ id, emoji, flipped: false, matched: false }));
};

export default function MemoryGame({ onBack }) {
  const [cards,   setCards]   = useState(makeCards);
  const [flipped, setFlipped] = useState([]);
  const [moves,   setMoves]   = useState(0);
  const [won,     setWon]     = useState(false);
  const [locked,  setLocked]  = useState(false);
  const {t} = useTranslation();

  const flip = (id) => {
    if (locked) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    const newFlipped = [...flipped, id];
    setCards(newCards);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setLocked(true);
      setMoves(m => m + 1);
      const [a, b] = newFlipped.map(i => newCards.find(c => c.id === i));
      if (a.emoji === b.emoji) {
        const matched = newCards.map(c => newFlipped.includes(c.id) ? { ...c, matched: true } : c);
        setCards(matched);
        setFlipped([]);
        setLocked(false);
        if (matched.every(c => c.matched)) setWon(true);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => newFlipped.includes(c.id) ? { ...c, flipped: false } : c));
          setFlipped([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  const reset = () => { setCards(makeCards()); setFlipped([]); setMoves(0); setWon(false); setLocked(false); };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 fade-in">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="btn-secondary !px-4 !py-2 text-sm">{t('←games.back')}</button>
        <h1 className="text-2xl font-bold">🃏 Memory Game</h1>
        <span className="bg-bloom-lavender text-white px-4 py-2 rounded-xl font-bold text-sm">Moves: {moves}</span>
      </div>

      {won ? (
        <div className="card text-center fade-in">
          <div className="text-5xl mb-3">🎊</div>
          <h2 className="text-2xl font-bold mb-1">You Won!</h2>
          <p className="text-gray-500 mb-4">Completed in {moves} moves</p>
          <button onClick={reset} className="btn-primary">Play Again 🃏</button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {cards.map(c => (
            <button key={c.id} onClick={() => flip(c.id)}
              className={`h-16 rounded-2xl text-2xl font-bold transition-all duration-300 border-2 ${
                c.matched ? 'bg-bloom-green/30 border-bloom-green scale-95 cursor-default' :
                c.flipped ? 'bg-bloom-lavender/30 border-bloom-lavender scale-105' :
                'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:scale-105 hover:border-bloom-lavender'
              }`}>
              {(c.flipped || c.matched) ? c.emoji : '❓'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
