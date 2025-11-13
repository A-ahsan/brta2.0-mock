import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Sun, Globe } from 'phosphor-react';
import ThemeLanguageToggler from './ThemeLanguageToggler';
import { useTheme, useLanguage } from '../contexts/AppContext';
import { translations } from '../utils/translations';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const t = translations[language];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/brta.png" 
              alt="BRTA Logo" 
              className="h-12 w-12 object-contain transition-transform group-hover:scale-110"
            />
            <div>
              <h1 className="text-2xl font-bold text-primary dark:text-green-400">
                BRTA 2.0
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {language === 'en' ? 'Smart Transport Portal' : 'স্মার্ট ট্রান্সপোর্ট পোর্টাল'}
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/dashboard"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-green-400 transition-colors font-medium"
            >
              {t.dashboard}
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-green-400 transition-colors font-medium"
            >
              {t.reminders}
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-green-400 transition-colors font-medium"
            >
              {t.appointments}
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <ThemeLanguageToggler />

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
            >
              {t.login}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
