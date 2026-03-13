import { useState, useEffect, useRef } from 'react';

const sessions = [
  {
    id: 'box',
    title: 'Box Breathing',
    emoji: '🟦',
    desc: 'Equal inhale, hold, exhale, hold. Calms the nervous system.',
    phases: [
      { label: 'Inhale',  duration: 4, color: '#6BCB77' },
      { label: 'Hold',    duration: 4, color: '#93C5FD' },
      { label: 'Exhale',  duration: 4, color: '#A78BFA' },
      { label: 'Hold',    duration: 4, color: '#F9A8D4' },
    ],
  },
  {
    id: '478',
    title: '4-7-8 Breathing',
    emoji: '🌬️',
    desc: 'Inhale 4s, hold 7s, exhale 8s. Natural tranquilizer for the nervous system.',
    phases: [
      { label: 'Inhale',  duration: 4, color: '#6BCB77' },
      { label: 'Hold',    duration: 7, color: '#93C5FD' },
      { label: 'Exhale',  duration: 8, color: '#A78BFA' },
    ],
  },
  {
    id: 'calm',
    title: 'Calm Breathing',
    emoji: '🌿',
    desc: 'Simple 5s in, 5s out. Perfect for beginners.',
    phases: [
      { label: 'Inhale',  duration: 5, color: '#6BCB77' },
      { label: 'Exhale',  duration: 5, color: '#A78BFA' },
    ],
  },
];

export default function Meditation() {
  const [selected,     setSelected]     = useState(null);
  const [running,      setRunning]       = useState(false);
  const [phaseIdx,     setPhaseIdx]      = useState(0);
  const [countdown,    setCountdown]     = useState(0);
  const [cycles,       setCycles]        = useState(0);
  const intervalRef = useRef(null);

  const session = sessions.find(s => s.id === selected);

  const start = (id) => {
    setSelected(id);
    const s = sessions.find(s => s.id === id);
    setPhaseIdx(0);
    setCountdown(s.phases[0].duration);
    setCycles(0);
    setRunning(true);
  };

  const stop = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    stop();
    setSelected(null);
    setPhaseIdx(0);
    setCountdown(0);
    setCycles(0);
  };

  useEffect(() => {
    if (!running || !session) return;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setPhaseIdx(pi => {
            const next = (pi + 1) % session.phases.length;
            if (next === 0) setCycles(c => c + 1);
            setCountdown(session.phases[next].duration);
            return next;
          });
          return session.phases[(phaseIdx + 1) % session.phases.length]?.duration || 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [running, phaseIdx, session]);

  const phase = session?.phases[phaseIdx];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 fade-in">
      <div className="text-center mb-8">
        <div className="text-5xl mb-2">🧘</div>
        <h1 className="text-3xl font-bold">Breathing & Meditation</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Choose a breathing pattern and let your mind settle.</p>
      </div>

      {!selected ? (
        /* Session Picker */
        <div className="grid grid-cols-1 gap-5">
          {sessions.map(s => (
            <button key={s.id} onClick={() => start(s.id)}
              className="card text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <span className="text-4xl group-hover:scale-110 transition-transform">{s.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{s.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{s.desc}</p>
                  <div className="flex gap-2 mt-2">
                    {s.phases.map((p, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-bloom-soft dark:bg-gray-700 font-medium">
                        {p.label} {p.duration}s
                      </span>
                    ))}
                  </div>
                </div>
                <span className="btn-primary !px-4 !py-2 text-sm">Start ▶</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* Active Session */
        <div className="text-center">
          <h2 className="text-xl font-bold mb-1">{session.title}</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Cycles completed: {cycles}</p>

          {/* Breathing Circle */}
          <div className="flex justify-center mb-8">
            <div className="relative w-56 h-56 flex items-center justify-center">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full opacity-20 breathe-circle"
                style={{ backgroundColor: phase?.color }} />
              {/* Middle ring */}
              <div className="absolute inset-4 rounded-full opacity-30 breathe-circle"
                style={{ backgroundColor: phase?.color, animationDelay: '0.3s' }} />
              {/* Inner circle */}
              <div className="relative w-36 h-36 rounded-full flex flex-col items-center justify-center shadow-2xl pulse-glow"
                style={{ backgroundColor: phase?.color }}>
                <span className="text-white text-5xl font-bold leading-none">{countdown}</span>
                <span className="text-white/90 text-sm font-semibold mt-1">{phase?.label}</span>
              </div>
            </div>
          </div>

          {/* Phase indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {session.phases.map((p, i) => (
              <div key={i}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${i === phaseIdx ? 'text-white scale-110 shadow-lg' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}
                style={i === phaseIdx ? { backgroundColor: p.color } : {}}>
                {p.label} ({p.duration}s)
              </div>
            ))}
          </div>

          {/* Instruction text */}
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-8">
            {phase?.label === 'Inhale'  && 'Breathe slowly in through your nose... 👃'}
            {phase?.label === 'Hold'    && 'Hold gently and stay still... 🤫'}
            {phase?.label === 'Exhale'  && 'Slowly breathe out through your mouth... 💨'}
          </p>

          <div className="flex gap-3 justify-center">
            <button onClick={() => running ? stop() : start(selected)} className={`btn-primary !px-6 ${running ? 'bg-orange-400 hover:bg-orange-500' : 'bg-bloom-green'}`}>
              {running ? '⏸ Pause' : '▶ Resume'}
            </button>
            <button onClick={reset} className="btn-secondary !px-6">✕ Exit</button>
          </div>
        </div>
      )}
    </div>
  );
}
