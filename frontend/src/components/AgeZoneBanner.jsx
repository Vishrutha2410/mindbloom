import { ageGroupLabel, ageGroupEmoji } from '../utils/ageGroup.js';

export default function AgeZoneBanner({ ageGroup }) {
  const colors = {
    kids:         'from-yellow-200 to-orange-200 dark:from-yellow-900/40 dark:to-orange-900/40 border-yellow-300',
    teens:        'from-blue-200 to-purple-200 dark:from-blue-900/40 dark:to-purple-900/40 border-blue-300',
    young_adults: 'from-green-200 to-teal-200 dark:from-green-900/40 dark:to-teal-900/40 border-green-300',
    adults:       'from-pink-200 to-rose-200 dark:from-pink-900/40 dark:to-rose-900/40 border-pink-300',
  };

  return (
    <div className={`bg-gradient-to-r ${colors[ageGroup] || colors.young_adults} border rounded-2xl px-5 py-3 flex items-center gap-3 mb-6`}>
      <span className="text-3xl">{ageGroupEmoji[ageGroup]}</span>
      <div>
        <p className="font-bold text-sm">Your Zone</p>
        <p className="text-lg font-extrabold">{ageGroupLabel[ageGroup]}</p>
      </div>
    </div>
  );
}