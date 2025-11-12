import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  IdentificationCard,
  Car,
  CreditCard,
  CalendarCheck,
  User,
  Gear,
  SignOut,
  ClockCounterClockwise,
  CheckCircle,
  Clock,
  X,
  List,
  Moon,
  Sun,
  Globe,
} from 'phosphor-react';
import { useTheme, useLanguage } from '../contexts/AppContext';
import { translations } from '../utils/translations';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('license');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const menuItems = [
    { id: 'license', icon: <IdentificationCard size={24} weight="duotone" />, label: t.licenseApplication },
    { id: 'vehicle', icon: <Car size={24} weight="duotone" />, label: t.vehicleRegistration },
    { id: 'payments', icon: <CreditCard size={24} weight="duotone" />, label: t.myPayments },
    { id: 'booking', icon: <CalendarCheck size={24} weight="duotone" />, label: t.testBooking },
    { id: 'profile', icon: <User size={24} weight="duotone" />, label: t.profile },
    { id: 'settings', icon: <Gear size={24} weight="duotone" />, label: t.settings },
  ];

  const licenseApplications = [
    { id: 1, type: 'New License', status: 'pending', date: '2025-11-10', applicationNo: 'DL2025001' },
    { id: 2, type: 'Renewal', status: 'approved', date: '2025-10-15', applicationNo: 'DL2025002' },
    { id: 3, type: 'Duplicate', status: 'processing', date: '2025-11-05', applicationNo: 'DL2025003' },
  ];

  const vehicles = [
    { id: 1, model: 'Toyota Corolla', plate: 'ঢাকা মেট্রো-গ-১২৩৪৫৬', year: '2022', status: 'Active' },
    { id: 2, model: 'Honda Civic', plate: 'ঢাকা মেট্রো-খ-৭৮৯০১২', year: '2021', status: 'Active' },
  ];

  const payments = [
    { id: 1, purpose: 'License Fee', amount: '৳ 2,500', date: '2025-11-10', status: 'Completed' },
    { id: 2, purpose: 'Vehicle Registration', amount: '৳ 15,000', date: '2025-10-15', status: 'Completed' },
    { id: 3, purpose: 'Test Fee', amount: '৳ 500', date: '2025-11-05', status: 'Pending' },
  ];

  const testSlots = [
    { id: 1, center: 'Mirpur Test Center', date: '2025-11-20', time: '10:00 AM', type: 'Driving Test' },
    { id: 2, center: 'Banani Test Center', date: '2025-11-22', time: '02:00 PM', type: 'Written Test' },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'completed':
      case 'active':
        return 'bg-success/20 text-success border-success';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-600 border-yellow-500';
      case 'processing':
        return 'bg-blue-500/20 text-blue-600 border-blue-500';
      default:
        return 'bg-gray-500/20 text-gray-600 border-gray-500';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'license':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.licenseApplication}</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {language === 'en' ? '+ New Application' : '+ নতুন আবেদন'}
              </motion.button>
            </div>
            <div className="grid gap-4">
              {licenseApplications.map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{app.type}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Application No:' : 'আবেদন নং:'} {app.applicationNo}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Date:' : 'তারিখ:'} {app.date}
                      </p>
                    </div>
                    <span className={`px-4 py-1 rounded-full text-sm font-semibold border-2 ${getStatusColor(app.status)}`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'vehicle':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.vehicleRegistration}</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {language === 'en' ? '+ Register Vehicle' : '+ যানবাহন নিবন্ধন'}
              </motion.button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {vehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-primary/10 to-primary-dark/10 dark:from-primary/20 dark:to-primary-dark/20 p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-primary/20"
                >
                  <Car size={48} weight="duotone" className="text-primary mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{vehicle.model}</h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-1 font-semibold">{vehicle.plate}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'en' ? 'Year:' : 'বছর:'} {vehicle.year}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'payments':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t.myPayments}</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">{language === 'en' ? 'Purpose' : 'উদ্দেশ্য'}</th>
                    <th className="px-6 py-4 text-left">{language === 'en' ? 'Amount' : 'পরিমাণ'}</th>
                    <th className="px-6 py-4 text-left">{language === 'en' ? 'Date' : 'তারিখ'}</th>
                    <th className="px-6 py-4 text-left">{language === 'en' ? 'Status' : 'অবস্থা'}</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <motion.tr
                      key={payment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-800 dark:text-white">{payment.purpose}</td>
                      <td className="px-6 py-4 text-gray-800 dark:text-white font-semibold">{payment.amount}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{payment.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'booking':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.testBooking}</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {language === 'en' ? '+ Book New Slot' : '+ নতুন স্লট বুক করুন'}
              </motion.button>
            </div>
            <div className="grid gap-4">
              {testSlots.map((slot, index) => (
                <motion.div
                  key={slot.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-primary"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{slot.type}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>{language === 'en' ? 'Center:' : 'কেন্দ্র:'}</strong> {slot.center}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>{language === 'en' ? 'Date:' : 'তারিখ:'}</strong> {slot.date}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        <strong>{language === 'en' ? 'Time:' : 'সময়:'}</strong> {slot.time}
                      </p>
                    </div>
                    <CalendarCheck size={48} weight="duotone" className="text-primary" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t.profile}</h2>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {language === 'en' ? 'JD' : 'জে'}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">John Doe</h3>
                  <p className="text-gray-600 dark:text-gray-400">john.doe@example.com</p>
                  <p className="text-gray-600 dark:text-gray-400">+880 1711-123456</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'License Number' : 'লাইসেন্স নম্বর'}
                  </label>
                  <p className="text-lg text-gray-800 dark:text-white">DL-123456789</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Date of Birth' : 'জন্ম তারিখ'}
                  </label>
                  <p className="text-lg text-gray-800 dark:text-white">01/01/1990</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Address' : 'ঠিকানা'}
                  </label>
                  <p className="text-lg text-gray-800 dark:text-white">Dhaka, Bangladesh</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'License Type' : 'লাইসেন্সের ধরন'}
                  </label>
                  <p className="text-lg text-gray-800 dark:text-white">Professional</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t.settings}</h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-6">
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {language === 'en' ? 'Dark Mode' : 'ডার্ক মোড'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'en' ? 'Toggle dark/light theme' : 'ডার্ক/লাইট থিম টগল করুন'}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  className="p-3 rounded-lg bg-primary text-white shadow-md"
                >
                  {isDark ? <Sun size={24} weight="bold" /> : <Moon size={24} weight="bold" />}
                </motion.button>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {language === 'en' ? 'Language' : 'ভাষা'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'en' ? 'Switch between English and Bangla' : 'ইংরেজি এবং বাংলার মধ্যে স্যুইচ করুন'}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleLanguage}
                  className="p-3 rounded-lg bg-primary text-white shadow-md flex items-center gap-2"
                >
                  <Globe size={24} weight="bold" />
                  <span className="font-semibold">{language.toUpperCase()}</span>
                </motion.button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-white to-muted dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Top Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md"
      >
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <List size={24} weight="bold" />
            </motion.button>
            <div className="flex items-center gap-3">
              <img src="/brta.png" alt="BRTA Logo" className="h-10 w-10" />
              <div>
                <h1 className="text-xl font-bold text-primary dark:text-green-400">BRTA 2.0</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t.dashboard}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 text-danger hover:bg-danger/10 rounded-lg transition-colors font-semibold"
            >
              <SignOut size={20} weight="bold" />
              {t.logout}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="flex pt-20">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed left-0 top-20 bottom-0 w-64 bg-white dark:bg-gray-900 shadow-xl p-6 overflow-y-auto z-40"
            >
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 10 }}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === item.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.icon}
                    <span className="font-semibold">{item.label}</span>
                  </motion.button>
                ))}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={`flex-1 p-8 transition-all ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
