const moods = [
  { key:'happy',    emoji:'😊', label:'Happy',    color:'bg-yellow-100 border-yellow-400 dark:bg-yellow-900/40' },
  { key:'calm',     emoji:'😌', label:'Calm',     color:'bg-blue-100   border-blue-400   dark:bg-blue-900/40'   },
  { key:'stressed', emoji:'😓', label:'Stressed', color:'bg-orange-100 border-orange-400 dark:bg-orange-900/40' },
  { key:'angry',    emoji:'😡', label:'Angry',    color:'bg-red-100    border-red-400    dark:bg-red-900/40'    },
  { key:'sad',      emoji:'😢', label:'Sad',      color:'bg-indigo-100 border-indigo-400 dark:bg-indigo-900/40' },
  { key:'tired',    emoji:'😴', label:'Tired',    color:'bg-gray-100   border-gray-400   dark:bg-gray-700/60'   },
];

export default function MoodSelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {moods.map(m => (
        <button key={m.key} onClick={() => onSelect(m.key)}
          className={`flex flex-col items-center gap-1 p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-105 active:scale-95 ${m.color} ${selected === m.key ? 'scale-105 shadow-lg ring-2 ring-offset-2 ring-bloom-lavender' : ''}`}>
          <span className="text-4xl">{m.emoji}</span>
          <span className="font-semibold text-sm">{m.label}</span>
        </button>
      ))}
    </div>
  );
}
