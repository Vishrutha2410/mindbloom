import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AgeZoneBanner from '../components/AgeZoneBanner.jsx';
import MemoryGame    from '../games/MemoryGame.jsx';
import BubblePop     from '../games/BubblePop.jsx';
import PuzzleGame    from '../games/PuzzleGame.jsx';
import ColorMatch    from '../games/ColorMatch.jsx';
import ReactionGame  from '../games/ReactionGame.jsx';
import TypingGame    from '../games/TypingGame.jsx';
import WordPuzzle    from '../games/WordPuzzle.jsx';

// All game definitions mapped to their ageGroups
const allGames = [
  { id:'bubble',   icon:'🫧', title:'Bubble Pop',            desc:'Pop all bubbles to release tension.',             ageGroups:['kids','teens','young_adults','adults'], color:'bg-blue-100 dark:bg-blue-900/30'   },
  { id:'memory',   icon:'🃏', title:'Memory Card Game',      desc:'Match pairs of cards to sharpen focus.',          ageGroups:['kids','teens'],                         color:'bg-purple-100 dark:bg-purple-900/30' },
  { id:'color',    icon:'🌈', title:'Color Match',           desc:'Match the color name to the swatch.',             ageGroups:['kids','teens','young_adults','adults'], color:'bg-pink-100 dark:bg-pink-900/30'   },
  { id:'puzzle',   icon:'🧩', title:'Puzzle Slider',         desc:'Slide tiles into order to clear your mind.',      ageGroups:['teens','young_adults','adults'],        color:'bg-green-100 dark:bg-green-900/30' },
  { id:'reaction', icon:'⚡', title:'Reaction Speed Test',   desc:'Test how fast your brain reacts!',                ageGroups:['teens','young_adults'],                 color:'bg-yellow-100 dark:bg-yellow-900/30' },
  { id:'typing',   icon:'⌨️', title:'Typing Speed Challenge',desc:'Race against the clock to type fast.',            ageGroups:['teens','young_adults'],                 color:'bg-orange-100 dark:bg-orange-900/30' },
  { id:'word',     icon:'📝', title:'Word Puzzle',           desc:'Unscramble letters to find the hidden word.',     ageGroups:['young_adults','adults'],                color:'bg-teal-100 dark:bg-teal-900/30'   },
];

export default function Games() {
  const [active,    setActive]    = useState(null);
  const [ageGroup,  setAgeGroup]  = useState('young_adults');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.ageGroup) setAgeGroup(user.ageGroup);
  }, []);

  const visibleGames = allGames.filter(g => g.ageGroups.includes(ageGroup));

  if (active === 'bubble')   return <BubblePop   onBack={() => setActive(null)} />;
  if (active === 'memory')   return <MemoryGame   onBack={() => setActive(null)} />;
  if (active === 'puzzle')   return <PuzzleGame   onBack={() => setActive(null)} />;
  if (active === 'color')    return <ColorMatch   onBack={() => setActive(null)} />;
  if (active === 'reaction') return <ReactionGame onBack={() => setActive(null)} />;
  if (active === 'typing')   return <TypingGame   onBack={() => setActive(null)} />;
  if (active === 'word')     return <WordPuzzle   onBack={() => setActive(null)} />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 fade-in">
      <div className="text-center mb-6">
        <div className="text-5xl mb-2">🎮</div>
        <h1 className="text-3xl font-bold">Games Zone</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Games picked just for your age group.</p>
      </div>

      <AgeZoneBanner ageGroup={ageGroup} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {visibleGames.map(g => (
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