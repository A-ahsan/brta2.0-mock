import { Sun, Moon, Globe } from 'phosphor-react';
import { useTheme, useLanguage } from '../contexts/AppContext';

export default function ThemeLanguageToggler() {
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  // Brand color for pill and border
  const pillColor = isDark ? 'bg-primary-dark border-primary-dark' : 'bg-primary border-primary';
  const knobColor = isDark ? 'bg-gray-900' : 'bg-white';

  return (
    <div className="flex items-center gap-3">
      {/* Language Toggler */}
      <button
        onClick={toggleLanguage}
        className={`flex items-center gap-1 px-3 py-2 rounded-full font-semibold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-primary bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-primary`}
        title={language === 'en' ? 'Switch to Bangla' : 'Switch to English'}
      >
        <Globe size={18} weight="bold" />
        <span className="font-semibold text-xs">{language === 'en' ? 'EN' : 'BN'}</span>
      </button>
      {/* Theme Toggler - pill style, knob contains icon */}
      <button
        onClick={toggleTheme}
        className={`relative w-16 h-9 rounded-full flex items-center border-2 ${pillColor} transition-colors focus:outline-none focus:ring-2 focus:ring-primary`}
        aria-label="Toggle theme"
      >
        {/* Only knob with icon inside, no icons in pill */}
        <span
          className={`absolute top-1/2 -translate-y-1/2 left-1 transition-transform duration-300 z-20 ${isDark ? 'translate-x-7' : ''}`}
        >
          <span className={`block w-7 h-7 ${knobColor} rounded-full shadow flex items-center justify-center border-2 border-primary`}> 
            {isDark ? <Moon size={18} className="text-primary-dark" /> : <Sun size={18} className="text-yellow-400" />}
          </span>
        </span>
      </button>
    </div>
  );
}
