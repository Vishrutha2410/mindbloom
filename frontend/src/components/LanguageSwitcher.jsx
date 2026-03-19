import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ta', label: 'தமிழ்',   flag: '🇮🇳' },
  { code: 'hi', label: 'हिंदी',   flag: '🇮🇳' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const current = languages.find(l => l.code === i18n.language) || languages[0];

  const change = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('i18nextLng', code);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-bloom-lavender/10 transition-all text-sm font-medium">
        <span>{current.flag}</span>
        <span className="hidden sm:block">{current.label}</span>
        <span className="text-gray-400 text-xs">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl z-50 overflow-hidden min-w-[140px]">
          {languages.map(lang => (
            <button key={lang.code}
              onClick={() => change(lang.code)}
              className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-bloom-lavender/10 transition-all ${i18n.language === lang.code ? 'bg-bloom-lavender/20 font-bold text-bloom-lavender' : ''}`}>
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
              {i18n.language === lang.code && <span className="ml-auto text-bloom-lavender">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}