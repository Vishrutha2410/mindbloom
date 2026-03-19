import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const STATES = { waiting: 'waiting', ready: 'ready', go: 'go', result: 'result' };

export default function ReactionGame({ onBack }) {
  const [state,   setState]   = useState(STATES.waiting);
  const [time,    setTime]    = useState(null);
  const [best,    setBest]    = useState(null);
  const [tooEarly,setTooEarly]= useState(false);
  const startRef = useRef(null);
  const timerRef = useRef(null);
  const {t} = useTranslation();

  const begin = () => {
    setTooEarly(false);
    setState(STATES.ready);
    const delay = 2000 + Math.random() * 3000;
    timerRef.current = setTimeout(() => {
      setState(STATES.go);
      startRef.current = Date.now();
    }, delay);
  };

  const click = () => {
    if (state === STATES.ready) {
      clearTimeout(timerRef.current);
      setTooEarly(true);
      setState(STATES.waiting);
      return;
    }
    if (state === STATES.go) {
      const ms = Date.now() - startRef.current;
      setTime(ms);
      if (!best || ms < best) setBest(ms);
      setState(STATES.result);
    }
  };

  const rating = (ms) => {
    if (ms < 200) return { label: '⚡ Lightning Fast!',  color: 'text-yellow-500' };
    if (ms < 300) return { label: '🚀 Super Fast!',      color: 'text-green-500'  };
    if (ms < 400) return { label: '👍 Good Reaction!',   color: 'text-blue-500'   };
    return              { label: '🐢 Keep Practicing!',  color: 'text-orange-400' };
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 fade-in">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="btn-secondary !px-4 !py-2 text-sm">{t('games.back')}</button>
        <h1 className="text-2xl font-bold">⚡ Reaction Test</h1>
        <span className="bg-yellow-400 text-white px-4 py-2 rounded-xl font-bold text-sm">
          Best: {best ? `${best}ms` : '--'}
        </span>
      </div>

      <div
        onClick={state === STATES.waiting || state === STATES.result ? undefined : click}
        className={`w-full h-72 rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 select-none ${
          state === STATES.go      ? 'bg-bloom-green shadow-2xl scale-105' :
          state === STATES.ready   ? 'bg-red-400' :
          state === STATES.result  ? 'bg-bloom-lavender/30' :
                                     'bg-gray-100 dark:bg-gray-700'
        }`}>
        {state === STATES.waiting && (
          <>
            <div className="text-6xl mb-4">⚡</div>
            <p className="text-xl font-bold mb-2">Tap the button below to start</p>
            {tooEarly && <p className="text-red-500 font-semibold mt-2">Too early! Wait for GREEN.</p>}
          </>
        )}
        {state === STATES.ready && (
          <>
            <div className="text-6xl mb-4">🔴</div>
            <p className="text-xl font-bold">Wait for green...</p>
            <p className="text-sm text-gray-500 mt-2">(Don't click yet!)</p>
          </>
        )}
        {state === STATES.go && (
          <>
            <div className="text-7xl mb-4">🟢</div>
            <p className="text-2xl font-extrabold text-white">CLICK NOW!</p>
          </>
        )}
        {state === STATES.result && (
          <>
            <div className="text-5xl mb-3">🏁</div>
            <p className="text-4xl font-extrabold mb-2">{time}ms</p>
            <p className={`text-lg font-bold ${rating(time).color}`}>{rating(time).label}</p>
          </>
        )}
      </div>

      <div className="mt-6 flex gap-3 justify-center">
        {state === STATES.waiting  && <button onClick={begin}       className="btn-primary w-full !py-3">Start Test ⚡</button>}
        {state === STATES.result   && <button onClick={begin}       className="btn-primary">Try Again ⚡</button>}
        {(state === STATES.go || state === STATES.ready) && (
          <button onClick={click} className="btn-primary w-full !py-3 !bg-bloom-green text-xl">
            {state === STATES.go ? '👆 TAP!' : '👆 Click when green'}
          </button>
        )}
      </div>
    </div>
  );
}