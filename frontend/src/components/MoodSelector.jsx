import { useTranslation } from 'react-i18next';

const moodColors = {
  happy:    'bg-yellow-100 border-yellow-400 dark:bg-yellow-900/40',
  calm:     'bg-blue-100   border-blue-400   dark:bg-blue-900/40',
  stressed: 'bg-orange-100 border-orange-400 dark:bg-orange-900/40',
  angry:    'bg-red-100    border-red-400    dark:bg-red-900/40',
  sad:      'bg-indigo-100 border-indigo-400 dark:bg-indigo-900/40',
  tired:    'bg-gray-100   border-gray-400   dark:bg-gray-700/60',
};

const moodEmojis = {
  happy:    '😊',
  calm:     '😌',
  stressed: '😓',
  angry:    '😡',
  sad:      '😢',
  tired:    '😴',
};

export default function MoodSelector({ selected, onSelect }) {
  const { t } = useTranslation();

  // ✅ Labels come from translations — changes with language
  const moods = [
    { key: 'happy',    emoji: moodEmojis.happy,    label: t('mood.moods.happy')    },
    { key: 'calm',     emoji: moodEmojis.calm,     label: t('mood.moods.calm')     },
    { key: 'stressed', emoji: moodEmojis.stressed, label: t('mood.moods.stressed') },
    { key: 'angry',    emoji: moodEmojis.angry,    label: t('mood.moods.angry')    },
    { key: 'sad',      emoji: moodEmojis.sad,      label: t('mood.moods.sad')      },
    { key: 'tired',    emoji: moodEmojis.tired,    label: t('mood.moods.tired')    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {moods.map(m => (
        <button key={m.key} onClick={() => onSelect(m.key)}
          className={`flex flex-col items-center gap-1 p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-105 active:scale-95
            ${moodColors[m.key]}
            ${selected === m.key ? 'scale-105 shadow-lg ring-2 ring-offset-2 ring-bloom-lavender' : ''}
          `}>
          <span className="text-4xl">{m.emoji}</span>
          <span className="font-semibold text-sm">{m.label}</span>
        </button>
      ))}
    </div>
  );
}