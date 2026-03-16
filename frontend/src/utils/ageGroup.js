// Returns ageGroup string from numeric age
export const getAgeGroup = (age) => {
  if (age >= 8  && age <= 12) return 'kids';
  if (age >= 13 && age <= 18) return 'teens';
  if (age >= 19 && age <= 30) return 'young_adults';
  if (age > 30)               return 'adults';
  return 'young_adults';
};

// Human-readable label
export const ageGroupLabel = {
  kids:         '🧒 Kids (8–12)',
  teens:        '🎒 Teens (13–18)',
  young_adults: '🙋 Young Adults (19–30)',
  adults:       '🧑 Adults (30+)',
};

// Emoji badge per group
export const ageGroupEmoji = {
  kids:         '🧒',
  teens:        '🎒',
  young_adults: '🙋',
  adults:       '🧑',
};