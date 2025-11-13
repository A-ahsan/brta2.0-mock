import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  QrCode,
  MagnifyingGlass,
  CheckCircle,
  XCircle,
  Warning,
  Car,
  IdentificationCard,
  SignOut,
  House,
  Shield,
  Calendar,
  User,
} from 'phosphor-react';
import StatCard from '../components/StatCard';
import { useLanguage } from '../contexts/AppContext';
import { translations } from '../utils/translations';
import ThemeLanguageToggler from '../components/ThemeLanguageToggler';

const PoliceDashboard = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const vehicleRecords = [
    {
      id: 1,
      plate: 'ঢাকা মেট্রো-গ-১২৩৪৫৬',
      model: 'Toyota Corolla',
      owner: 'Ahmed Khan',
      status: 'Valid',
      licenseExpiry: '2026-12-31',
      fines: 0,
      insurance: 'Active',
    },
    {
      id: 2,
      plate: 'ঢাকা মেট্রো-খ-৭৮৯০১২',
      model: 'Honda Civic',
      owner: 'Fatima Rahman',
      status: 'Expired',
      licenseExpiry: '2024-06-30',
      fines: 2,
      insurance: 'Expired',
    },
    {
      id: 3,
      plate: 'চট্টগ্রাম-ক-৫৬৭৮৯০',
      model: 'Suzuki Alto',
      owner: 'Karim Hossain',
      status: 'Fined',
      licenseExpiry: '2025-08-15',
      fines: 5,
      insurance: 'Active',
    },
    {
      id: 4,
      plate: 'সিলেট-গ-২৩৪৫৬৭',
      model: 'Nissan X-Trail',
      owner: 'Ayesha Begum',
      status: 'Valid',
      licenseExpiry: '2027-03-20',
      fines: 0,
      insurance: 'Active',
    },
  ];

  const recentChecks = [
    { id: 1, plate: 'ঢাকা মেট্রো-গ-১২৩৪৫৬', status: 'Valid', time: '10:30 AM', officer: 'Officer Rahman' },
    { id: 2, plate: 'ঢাকা মেট্রো-খ-৭৮৯০১২', status: 'Expired', time: '10:25 AM', officer: 'Officer Karim' },
    { id: 3, plate: 'চট্টগ্রাম-ক-৫৬৭৮৯০', status: 'Fined', time: '10:20 AM', officer: 'Officer Sultana' },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Valid':
        return <CheckCircle size={24} weight="fill" className="text-success" />;
      case 'Expired':
        return <XCircle size={24} weight="fill" className="text-danger" />;
      case 'Fined':
        return <Warning size={24} weight="fill" className="text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Valid':
        return 'bg-success/20 text-success border-success';
      case 'Expired':
        return 'bg-danger/20 text-danger border-danger';
      case 'Fined':
        return 'bg-yellow-500/20 text-yellow-600 border-yellow-500';
      default:
        return 'bg-gray-500/20 text-gray-600 border-gray-500';
    }
  };

  const handleSearch = () => {
    const vehicle = vehicleRecords.find(v => v.plate.includes(searchQuery));
    setSelectedVehicle(vehicle || null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-white to-muted dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md sticky top-0 z-50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl">
                <Shield size={32} weight="bold" className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary dark:text-green-400">{t.policeDashboard}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'en' ? 'Vehicle Verification System' : 'যানবাহন যাচাইকরণ সিস্টেম'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeLanguageToggler />
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
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<CheckCircle size={48} weight="duotone" />}
            title={language === 'en' ? 'Vehicles Checked Today' : 'আজ পরীক্ষিত যানবাহন'}
            value="247"
            color="success"
            trend={12}
          />
          <StatCard
            icon={<Warning size={48} weight="duotone" />}
            title={language === 'en' ? 'Violations Found' : 'লঙ্ঘন পাওয়া গেছে'}
            value="18"
            color="warning"
            trend={-5}
          />
          <StatCard
            icon={<XCircle size={48} weight="duotone" />}
            title={language === 'en' ? 'Expired Documents' : 'মেয়াদ শেষ নথি'}
            value="12"
            color="danger"
            trend={-8}
          />
          <StatCard
            icon={<Car size={48} weight="duotone" />}
            title={language === 'en' ? 'Active Patrols' : 'সক্রিয় টহল'}
            value="35"
            color="info"
            trend={5}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* QR Scanner */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <QrCode size={28} weight="duotone" className="text-primary" />
              {t.scanQR}
            </h3>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative bg-gradient-to-br from-primary/10 to-primary-dark/10 dark:from-primary/20 dark:to-primary-dark/20 border-4 border-dashed border-primary/30 rounded-2xl p-12 mb-6 cursor-pointer"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <QrCode size={120} weight="duotone" className="text-primary opacity-30" />
                </motion.div>
              </div>
              <div className="relative text-center">
                <p className="text-gray-600 dark:text-gray-400 font-semibold">
                  {language === 'en' ? 'Tap to scan QR code' : 'QR কোড স্ক্যান করতে ট্যাপ করুন'}
                </p>
              </div>
            </motion.div>

            {/* Manual Search */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                {language === 'en' ? 'Or search by plate number:' : 'অথবা প্লেট নম্বর দিয়ে অনুসন্ধান করুন:'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder={language === 'en' ? 'Enter plate number...' : 'প্লেট নম্বর লিখুন...'}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSearch}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <MagnifyingGlass size={20} weight="bold" />
                  {language === 'en' ? 'Search' : 'খুঁজুন'}
                </motion.button>
              </div>
            </div>

            {/* Search Result */}
            {selectedVehicle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl border-2 border-gray-300 dark:border-gray-600"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                    {language === 'en' ? 'Vehicle Details' : 'যানবাহনের বিবরণ'}
                  </h4>
                  {getStatusIcon(selectedVehicle.status)}
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Plate:' : 'প্লেট:'}</span>
                    <p className="font-bold text-gray-800 dark:text-white">{selectedVehicle.plate}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Model:' : 'মডেল:'}</span>
                    <p className="font-bold text-gray-800 dark:text-white">{selectedVehicle.model}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Owner:' : 'মালিক:'}</span>
                    <p className="font-bold text-gray-800 dark:text-white">{selectedVehicle.owner}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Fines:' : 'জরিমানা:'}</span>
                    <p className="font-bold text-gray-800 dark:text-white">{selectedVehicle.fines}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Expiry:' : 'মেয়াদ:'}</span>
                    <p className="font-bold text-gray-800 dark:text-white">{selectedVehicle.licenseExpiry}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Insurance:' : 'বীমা:'}</span>
                    <p className="font-bold text-gray-800 dark:text-white">{selectedVehicle.insurance}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(selectedVehicle.status)}`}>
                    {t[selectedVehicle.status.toLowerCase()] || selectedVehicle.status}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Recent Checks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Calendar size={28} weight="duotone" className="text-primary" />
              {language === 'en' ? 'Recent Checks' : 'সাম্প্রতিক পরীক্ষা'}
            </h3>
            
            <div className="space-y-3">
              {recentChecks.map((check) => (
                <motion.div
                  key={check.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: check.id * 0.1 }}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-800 dark:text-white">{check.plate}</span>
                    {getStatusIcon(check.status)}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <User size={16} />
                      {check.officer}
                    </span>
                    <span>{check.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Vehicle Records Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            {language === 'en' ? 'Vehicle Records Database' : 'যানবাহন রেকর্ড ডাটাবেস'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {language === 'en' ? 'Plate Number' : 'প্লেট নম্বর'}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {language === 'en' ? 'Model' : 'মডেল'}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {language === 'en' ? 'Owner' : 'মালিক'}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {language === 'en' ? 'Status' : 'অবস্থা'}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {language === 'en' ? 'Fines' : 'জরিমানা'}
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {language === 'en' ? 'Action' : 'কার্যক্রম'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {vehicleRecords.map((vehicle) => (
                  <tr key={vehicle.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 text-gray-800 dark:text-white font-semibold">{vehicle.plate}</td>
                    <td className="px-6 py-4 text-gray-800 dark:text-white">{vehicle.model}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{vehicle.owner}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(vehicle.status)}`}>
                        {t[vehicle.status.toLowerCase()] || vehicle.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${vehicle.fines > 0 ? 'text-danger' : 'text-success'}`}>
                        {vehicle.fines}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedVehicle(vehicle)}
                        className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors"
                      >
                        {t.checkVehicle}
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PoliceDashboard;
