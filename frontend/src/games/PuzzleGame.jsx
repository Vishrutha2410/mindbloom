import { useState } from 'react';

const SIZE  = 3;
const TOTAL = SIZE * SIZE;
const goal  = [...Array(TOTAL - 1).keys()].map(i => i + 1).concat(0);

const shuffle = () => {
  let tiles = [...goal];
  for (let i = 0; i < 500; i++) {
    const blank = tiles.indexOf(0);
    const moves = [];
    if (blank % SIZE !== 0)          moves.push(blank - 1);
    if (blank % SIZE !== SIZE - 1)   moves.push(blank + 1);
    if (blank >= SIZE)               moves.push(blank - SIZE);
    if (blank < TOTAL - SIZE)        moves.push(blank + SIZE);
    const pick = moves[Math.floor(Math.random() * moves.length)];
    [tiles[blank], tiles[pick]] = [tiles[pick], tiles[blank]];
  }
  return tiles;
};

const isSolved = (tiles) => tiles.every((t, i) => t === goal[i]);

export default function PuzzleGame({ onBack }) {
  const [tiles, setTiles] = useState(shuffle);
  const [moves, setMoves] = useState(0);
  const won = isSolved(tiles);

  const move = (idx) => {
    const blank = tiles.indexOf(0);
    const valid = [blank - 1, blank + 1, blank - SIZE, blank + SIZE];
    const diffRow = Math.floor(idx / SIZE) !== Math.floor(blank / SIZE);
    if ((idx === blank - 1 || idx === blank + 1) && diffRow) return;
    if (!valid.includes(idx)) return;
    const next = [...tiles];
    [next[blank], next[idx]] = [next[idx], next[blank]];
    setTiles(next);
    setMoves(m => m + 1);
  };

  const reset = () => { setTiles(shuffle()); setMoves(0); };

  return (
    <div className="max-w-sm mx-auto px-4 py-8 fade-in">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="btn-secondary !px-4 !py-2 text-sm">← Back</button>
        <h1 className="text-2xl font-bold">🧩 Puzzle</h1>
        <span className="bg-bloom-green text-white px-4 py-2 rounded-xl font-bold text-sm">Moves: {moves}</span>
      </div>

      {won ? (
        <div className="card text-center fade-in">
          <div className="text-5xl mb-3">🏆</div>
          <h2 className="text-2xl font-bold mb-1">Puzzle Solved!</h2>
          <p className="text-gray-500 mb-4">Completed in {moves} moves</p>
          <button onClick={reset} className="btn-primary">Play Again 🧩</button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {tiles.map((t, i) => (
              <button key={i} onClick={() => move(i)}
                className={`h-20 rounded-2xl text-2xl font-bold transition-all duration-200 border-2 ${
                  t === 0 ? 'bg-gray-100 dark:bg-gray-800 border-dashed border-gray-300 dark:border-gray-600 cursor-default' :
                  'bg-white dark:bg-gray-700 border-bloom-lavender/40 hover:bg-bloom-lavender/20 hover:scale-105 active:scale-95'
                }`}>
                {t !== 0 ? t : ''}
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400">Arrange 1–8 in order. Tap a tile next to the blank space to move it.</p>
        </>
      )}
    </div>
  );
}
