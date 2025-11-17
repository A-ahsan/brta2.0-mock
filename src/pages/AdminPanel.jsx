import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Routes, Route, NavLink } from 'react-router-dom';
import {
  CheckCircle,
  CalendarBlank,
  SignOut,
  Bell,
  X,
  List,
  ChartLine,
} from 'phosphor-react';
import { useLanguage, useTheme } from '../contexts/AppContext';
import { translations } from '../utils/translations';
import ThemeLanguageToggler from '../components/ThemeLanguageToggler';
import AdminOverview from './admin/AdminOverview';
import AdminApplications from './admin/AdminApplications';
import AdminSlots from './admin/AdminSlots';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const t = translations[language];
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { 
      path: '/admin/overview', 
      label: language === 'en' ? 'Overview' : 'সংক্ষিপ্ত বিবরণ',
      icon: ChartLine 
    },
    { 
      path: '/admin/applications', 
      label: language === 'en' ? 'Applications' : 'আবেদনপত্র',
      icon: CheckCircle 
    },
    { 
      path: '/admin/slots', 
      label: language === 'en' ? 'Test Slots' : 'পরীক্ষার স্লট',
      icon: CalendarBlank 
    },
  ];

  const notifications = [
    "3 new user registrations today.",
    "System maintenance scheduled for Friday.",
    "License application flagged for review."
  ];

  const monthlyData = [
    { month: 'Jan', applications: 120, approved: 100, rejected: 20 },
    { month: 'Feb', applications: 150, approved: 130, rejected: 20 },
    { month: 'Mar', applications: 180, approved: 160, rejected: 20 },
    { month: 'Apr', applications: 200, approved: 175, rejected: 25 },
    { month: 'May', applications: 220, approved: 190, rejected: 30 },
    { month: 'Jun', applications: 250, approved: 220, rejected: 30 },
  ];

  const testCenterData = [
    { name: 'Mirpur', value: 35 },
    { name: 'Banani', value: 25 },
    { name: 'Uttara', value: 20 },
    { name: 'Dhanmondi', value: 15 },
    { name: 'Others', value: 5 },
  ];

  const COLORS = ['#006A4E', '#28A745', '#FFB020', '#DC3545', '#6C757D'];

  const pendingApplications = [
    { id: 1, name: 'Ahmed Khan', type: 'New License', date: '2025-11-12', applicationNo: 'DL2025010' },
    { id: 2, name: 'Fatima Rahman', type: 'Renewal', date: '2025-11-11', applicationNo: 'DL2025011' },
    { id: 3, name: 'Karim Hossain', type: 'Duplicate', date: '2025-11-10', applicationNo: 'DL2025012' },
    { id: 4, name: 'Ayesha Begum', type: 'New License', date: '2025-11-09', applicationNo: 'DL2025013' },
  ];

  const testSlots = [
    { id: 1, center: 'Mirpur Test Center', date: '2025-11-20', slots: 25, booked: 18, available: 7 },
    { id: 2, center: 'Banani Test Center', date: '2025-11-20', slots: 20, booked: 15, available: 5 },
    { id: 3, center: 'Uttara Test Center', date: '2025-11-21', slots: 30, booked: 22, available: 8 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ willChange: 'transform' }}>
        <motion.div
          animate={{ 
            x: [0, 50, 0],
            y: [0, -100, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", repeatType: "loop" }}
          className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          style={{ transform: 'translateZ(0)' }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-700/50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                aria-label="Toggle Menu"
              >
                <List size={24} className="text-primary dark:text-green-400" />
              </button>
              <img src="/brta.png" alt="BRTA Logo" className="h-10 w-10" />
              <div>
                <h1 className="text-xl font-bold text-primary dark:text-green-400">BRTA 2.0 - {t.adminPanel}</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="relative p-2 rounded-full hover:bg-primary/10 transition"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notifications"
              >
                <Bell size={24} className="text-primary" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">{notifications.length}</span>
              </button>
              <ThemeLanguageToggler />
            </div>
          </div>
        </div>

        {/* Notifications Dropdown */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute right-6 top-20 w-80 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bell size={20} className="text-primary dark:text-green-400" />
                  <span className="font-bold text-lg text-gray-800 dark:text-white">{language === 'en' ? 'Admin Notifications' : 'অ্যাডমিন বিজ্ঞপ্তি'}</span>
                </div>
                <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <X size={20} />
                </button>
              </div>
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <li className="italic text-gray-400 dark:text-gray-500">{language === 'en' ? 'No notifications' : 'কোনো বিজ্ঞপ্তি নেই'}</li>
                ) : (
                  notifications.map((note, idx) => (
                    <li key={idx} className="bg-primary/5 dark:bg-primary/10 rounded-lg px-3 py-2 shadow-sm border border-primary/10 dark:border-primary/20 text-gray-800 dark:text-gray-200 text-sm">
                      {note}
                    </li>
                  ))
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-[calc(4rem+1px)] h-[calc(100vh-4rem-1px)] w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl border-r-2 border-gray-200/50 dark:border-gray-700/50 z-40 overflow-y-auto"
            >
              <nav className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all group ${
                        isActive
                          ? 'bg-gradient-to-r from-primary to-green-600 text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon 
                          size={24} 
                          weight={isActive ? "fill" : "regular"}
                          className={isActive ? "text-white" : "text-primary dark:text-green-400 group-hover:text-primary dark:group-hover:text-green-400"}
                        />
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>

              {/* Logout Button */}
              <div className="absolute bottom-6 left-4 right-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-danger hover:bg-red-100 dark:hover:bg-red-900/40 rounded-xl font-semibold transition-all"
                >
                  <SignOut size={24} weight="bold" />
                  {t.logout}
                </motion.button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="container mx-auto px-6 py-8">
            {/* Sub-pages Content */}
            <Routes>
              <Route path="/overview" element={<AdminOverview />} />
              <Route path="/applications" element={<AdminApplications />} />
              <Route path="/slots" element={<AdminSlots />} />
              <Route path="/" element={<AdminOverview />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
