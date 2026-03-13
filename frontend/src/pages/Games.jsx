import { useState } from 'react';
import MemoryGame from '../games/MemoryGame.jsx';
import BubblePop  from '../games/BubblePop.jsx';
import PuzzleGame from '../games/PuzzleGame.jsx';
import ColorMatch from '../games/ColorMatch.jsx';

const gameList = [
  { id:'bubble',  icon:'🫧', title:'Bubble Pop',       desc:'Pop all the bubbles to release tension.',          color:'bg-blue-100   dark:bg-blue-900/30'   },
  { id:'memory',  icon:'🃏', title:'Memory Card Game', desc:'Match pairs of cards to sharpen focus.',            color:'bg-purple-100 dark:bg-purple-900/30' },
  { id:'puzzle',  icon:'🧩', title:'Puzzle Game',      desc:'Slide tiles into order to clear your mind.',        color:'bg-green-100  dark:bg-green-900/30'  },
  { id:'color',   icon:'🌈', title:'Color Match',      desc:'Match the color name to the correct color swatch.', color:'bg-pink-100   dark:bg-pink-900/30'   },
];

export default function Games() {
  const [active, setActive] = useState(null);

  if (active === 'bubble') return <BubblePop onBack={() => setActive(null)} />;
  if (active === 'memory') return <MemoryGame onBack={() => setActive(null)} />;
  if (active === 'puzzle') return <PuzzleGame onBack={() => setActive(null)} />;
  if (active === 'color')  return <ColorMatch onBack={() => setActive(null)} />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 fade-in">
      <div className="text-center mb-10">
        <div className="text-5xl mb-2">🎮</div>
        <h1 className="text-3xl font-bold">Relaxation Games</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Fun, simple games designed to calm your mind and reduce stress.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {gameList.map(g => (
          <button key={g.id} onClick={() => setActive(g.id)}
            className={`card text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${g.color}`}>
            <div className="text-5xl mb-3">{g.icon}</div>
            <h2 className="text-xl font-bold mb-1">{g.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{g.desc}</p>
            <span className="btn-primary inline-block text-sm !px-4 !py-2">Play Now ▶</span>
          </button>
        ))}
      </div>
    </div>
  );
}
