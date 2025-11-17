import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Sun, Globe } from 'phosphor-react';
import { Bell } from 'phosphor-react';
import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import ThemeLanguageToggler from './ThemeLanguageToggler';
import { useTheme, useLanguage } from '../contexts/AppContext';
import { translations } from '../utils/translations';

const Navbar = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const t = translations[language];
  const [showPanel, setShowPanel] = useState(false);

  // Determine role based on route
  let role = null;
  if (location.pathname.startsWith('/dashboard')) role = 'user';
  else if (location.pathname.startsWith('/admin')) role = 'admin';
  else if (location.pathname.startsWith('/police')) role = 'police';

  const notifications = {
    user: ["Welcome to your dashboard!", "Your license renewal is pending.", "Profile updated successfully."],
    admin: ["3 new user registrations today.", "System maintenance scheduled for Friday.", "License application flagged for review."],
    police: ["Incident reported at checkpoint.", "License verification required.", "Patrol schedule updated."]
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm"
      style={{ transform: 'translateZ(0)' }}
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
          <div className="flex items-center gap-4 relative">
            <ThemeLanguageToggler />
            {/* Notification Bell only on dashboard pages */}
            {role && (
              <>
                <button
                  className="relative p-2 rounded-full hover:bg-primary/10 transition"
                  onClick={() => setShowPanel((prev) => !prev)}
                  aria-label="Notifications"
                >
                  <Bell size={28} className="text-primary" />
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">{notifications[role].length}</span>
                </button>
                {/* Notification Dropdown Panel */}
                {showPanel && (
                  <div className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg z-50 p-4">
                    <div className="flex items-center mb-2">
                      <Bell size={22} className="text-primary mr-2" />
                      <span className="font-bold text-lg capitalize">{role} Notifications</span>
                    </div>
                    <ul className="space-y-2 max-h-60 overflow-y-auto">
                      {notifications[role].length === 0 ? (
                        <li className="italic text-gray-400">No notifications</li>
                      ) : (
                        notifications[role].map((note, idx) => (
                          <li key={idx} className="bg-primary/5 rounded px-3 py-2 shadow-sm border border-primary/10 text-gray-800 dark:text-gray-200">
                            {note}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                )}
              </>
            )}
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

export default React.memo(Navbar);
