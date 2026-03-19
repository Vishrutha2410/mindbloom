import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AgeZoneBanner from '../components/AgeZoneBanner.jsx';

const allSessions = {
  kids: [
    { id:'kids1', title:'1-Min Fun Breathing', emoji:'🌈',
      desc:'A short, playful breathing exercise just for kids.',
      phases:[{ label:'Breathe In 🌬️', duration:3, color:'#6BCB77' }, { label:'Breathe Out 💨', duration:3, color:'#93C5FD' }] },
    { id:'kids2', title:'Calm Down Breathing', emoji:'🧸',
      desc:'When you feel upset, this will help you calm down.',
      phases:[{ label:'Inhale 🌸', duration:4, color:'#F9A8D4' }, { label:'Hold 🤫', duration:2, color:'#FCD34D' }, { label:'Exhale 💨', duration:4, color:'#A78BFA' }] },
  ],
  teens: [
    { id:'teens1', title:'Box Breathing', emoji:'🟦',
      desc:'Equal inhale, hold, exhale, hold. Great for exam stress.',
      phases:[{ label:'Inhale', duration:4, color:'#6BCB77' }, { label:'Hold', duration:4, color:'#93C5FD' }, { label:'Exhale', duration:4, color:'#A78BFA' }, { label:'Hold', duration:4, color:'#F9A8D4' }] },
    { id:'teens2', title:'Stress Relief Meditation', emoji:'🎧',
      desc:'5-min breathing to reset after a hard day at school.',
      phases:[{ label:'Breathe In', duration:5, color:'#6BCB77' }, { label:'Breathe Out', duration:5, color:'#A78BFA' }] },
  ],
  young_adults: [
    { id:'ya1', title:'4-7-8 Breathing', emoji:'🌬️',
      desc:'Inhale 4s, hold 7s, exhale 8s. Natural tranquilizer.',
      phases:[{ label:'Inhale', duration:4, color:'#6BCB77' }, { label:'Hold', duration:7, color:'#93C5FD' }, { label:'Exhale', duration:8, color:'#A78BFA' }] },
    { id:'ya2', title:'10-Min Meditation', emoji:'🌿',
      desc:'Full guided session for deep stress relief.',
      phases:[{ label:'Breathe In', duration:5, color:'#6BCB77' }, { label:'Hold', duration:3, color:'#93C5FD' }, { label:'Breathe Out', duration:7, color:'#A78BFA' }] },
  ],
  adults: [
    { id:'a1', title:'Guided Relaxation', emoji:'☁️',
      desc:'Full body scan and deep relaxation session.',
      phases:[{ label:'Inhale Deeply', duration:6, color:'#6BCB77' }, { label:'Hold Gently', duration:4, color:'#93C5FD' }, { label:'Exhale Slowly', duration:8, color:'#A78BFA' }] },
    { id:'a2', title:'Sleep Meditation', emoji:'🌙',
      desc:'Gentle breathing to prepare your mind for sleep.',
      phases:[{ label:'Breathe In', duration:4, color:'#6BCB77' }, { label:'Breathe Out', duration:8, color:'#93C5FD' }] },
  ],
};

export default function Meditation() {
  const [ageGroup,  setAgeGroup]  = useState('young_adults');
  const [selected,  setSelected]  = useState(null);
  const [running,   setRunning]   = useState(false);
  const [phaseIdx,  setPhaseIdx]  = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [cycles,    setCycles]    = useState(0);
  const intervalRef = useRef(null);
  const {t} = useTranslation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.ageGroup) setAgeGroup(user.ageGroup);
  }, []);

  const sessions = allSessions[ageGroup] || allSessions.young_adults;
  const session  = sessions.find(s => s.id === selected);

  const start = (id) => {
    setSelected(id);
    const s = sessions.find(s => s.id === id);
    setPhaseIdx(0); setCountdown(s.phases[0].duration);
    setCycles(0); setRunning(true);
  };

  const stop  = () => { setRunning(false); clearInterval(intervalRef.current); };
  const reset = () => { stop(); setSelected(null); setPhaseIdx(0); setCountdown(0); setCycles(0); };

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
          return session.phases[0].duration;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, phaseIdx, session]);

  const phase = session?.phases[phaseIdx];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 fade-in">
      <div className="text-center mb-6">
        <div className="text-5xl mb-2">🧘</div>
        <h1 className="text-3xl font-bold">{t('meditation.title')}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{t('meditation.subtitle')}</p>
      </div>

      <AgeZoneBanner ageGroup={ageGroup} />

      {!selected ? (
        <div className="grid grid-cols-1 gap-5">
          {sessions.map(s => (
            <button key={s.id} onClick={() => start(s.id)}
              className="card text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <span className="text-4xl group-hover:scale-110 transition-transform">{s.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{s.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{s.desc}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {s.phases.map((p, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-bloom-soft dark:bg-gray-700 font-medium">
                        {p.label} {p.duration}s
                      </span>
                    ))}
                  </div>
                </div>
                <span className="btn-primary !px-4 !py-2 text-sm">{t('meditation.start ▶')}</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-1">{session.title}</h2>
          <p className="text-gray-500 text-sm mb-8">{t('meditation.cycles')}: {cycles}</p>
          <div className="flex justify-center mb-8">
            <div className="relative w-56 h-56 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full opacity-20 breathe-circle" style={{ backgroundColor: phase?.color }} />
              <div className="absolute inset-4 rounded-full opacity-30 breathe-circle" style={{ backgroundColor: phase?.color, animationDelay:'0.3s' }} />
              <div className="relative w-36 h-36 rounded-full flex flex-col items-center justify-center shadow-2xl pulse-glow" style={{ backgroundColor: phase?.color }}>
                <span className="text-white text-5xl font-bold leading-none">{countdown}</span>
                <span className="text-white/90 text-sm font-semibold mt-1">{phase?.label}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {session.phases.map((p, i) => (
              <div key={i}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${i === phaseIdx ? 'text-white scale-110 shadow-lg' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}
                style={i === phaseIdx ? { backgroundColor: p.color } : {}}>
                {p.label} ({p.duration}s)
              </div>
            ))}
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={() => running ? stop() : start(selected)}
              className={`btn-primary !px-6 ${!running ? '!bg-bloom-green' : '!bg-orange-400 hover:!bg-orange-500'}`}>
              {running ? t('⏸meditation.pause') : t('▶meditation.resume')}
            </button>
            <button onClick={reset} className="btn-secondary !px-6">{t('✕meditation.exit')}</button>
          </div>
        </div>
      )}
    </div>
  );
}