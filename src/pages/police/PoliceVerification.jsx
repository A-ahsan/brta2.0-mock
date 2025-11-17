import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  QrCode,
  MagnifyingGlass,
  CheckCircle,
  XCircle,
  Warning,
} from 'phosphor-react';
import { useLanguage } from '../../contexts/AppContext';
import { translations } from '../../utils/translations';

const PoliceVerification = () => {
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

  const handleSearch = useCallback(() => {
    const vehicle = vehicleRecords.find(v => v.plate.includes(searchQuery));
    setSelectedVehicle(vehicle || null);
  }, [searchQuery]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary/5 via-transparent to-green-500/5 p-1 rounded-2xl"
      >
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-primary to-green-600 rounded-xl">
              <QrCode size={24} weight="duotone" className="text-white sm:w-8 sm:h-8" />
            </div>
            <span className="break-words">{language === 'en' ? 'Vehicle Verification' : 'যানবাহন যাচাইকরণ'}</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
            {language === 'en' ? 'Scan QR code or search by plate number to verify vehicle documents' : 'যানবাহনের নথি যাচাই করতে QR কোড স্ক্যান করুন বা প্লেট নম্বর দিয়ে অনুসন্ধান করুন'}
          </p>

          {/* QR Scanner */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-gradient-to-br from-primary/10 to-primary-dark/10 dark:from-primary/20 dark:to-primary-dark/20 border-4 border-dashed border-primary/30 rounded-2xl p-8 sm:p-12 lg:p-16 mb-6 sm:mb-8 cursor-pointer group transition-all"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
                style={{ transform: 'translateZ(0)', willChange: 'transform' }}
              >
                <QrCode size={80} weight="duotone" className="sm:w-28 sm:h-28 lg:w-36 lg:h-36 text-primary opacity-30 group-hover:opacity-50 transition-opacity" />
              </motion.div>
            </div>
            <div className="relative text-center">
              <p className="text-gray-600 dark:text-gray-400 font-semibold text-sm sm:text-base lg:text-lg px-2">
                {language === 'en' ? 'Tap to scan QR code from vehicle smart card' : 'যানবাহন স্মার্ট কার্ড থেকে QR কোড স্ক্যান করতে ট্যাপ করুন'}
              </p>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="relative my-6 sm:my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 sm:px-4 py-1 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-semibold rounded-full border-2 border-gray-200 dark:border-gray-700">
                {language === 'en' ? 'OR' : 'অথবা'}
              </span>
            </div>
          </div>

          {/* Manual Search */}
          <div className="space-y-3 sm:space-y-4">
            <label className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">
              {language === 'en' ? 'Search by plate number:' : 'প্লেট নম্বর দিয়ে অনুসন্ধান করুন:'}
            </label>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder={language === 'en' ? 'Enter plate number...' : 'প্লেট নম্বর লিখুন...'}
                className="flex-1 px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white transition-all text-base sm:text-lg"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-green-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <MagnifyingGlass size={20} className="sm:w-6 sm:h-6" weight="bold" />
                {language === 'en' ? 'Search' : 'খুঁজুন'}
              </motion.button>
            </div>
          </div>

          {/* Search Result */}
          {selectedVehicle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 sm:mt-8 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl border-2 border-gray-300 dark:border-gray-600 shadow-lg"
            >
              <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-6 gap-3">
                <div>
                  <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-1 sm:mb-2">
                    {language === 'en' ? 'Vehicle Details' : 'যানবাহনের বিবরণ'}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                    {language === 'en' ? 'Document verification completed' : 'নথি যাচাইকরণ সম্পন্ন'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedVehicle.status)}
                  <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold border-2 whitespace-nowrap ${getStatusColor(selectedVehicle.status)}`}>
                    {t[selectedVehicle.status.toLowerCase()] || selectedVehicle.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl">
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{language === 'en' ? 'Plate Number' : 'প্লেট নম্বর'}</span>
                    <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 dark:text-white mt-1 break-words">{selectedVehicle.plate}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl">
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{language === 'en' ? 'Model' : 'মডেল'}</span>
                    <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 dark:text-white mt-1">{selectedVehicle.model}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl">
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{language === 'en' ? 'Owner' : 'মালিক'}</span>
                    <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 dark:text-white mt-1">{selectedVehicle.owner}</p>
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl">
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{language === 'en' ? 'License Expiry' : 'লাইসেন্সের মেয়াদ'}</span>
                    <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 dark:text-white mt-1">{selectedVehicle.licenseExpiry}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl">
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{language === 'en' ? 'Insurance Status' : 'বীমার অবস্থা'}</span>
                    <p className={`text-base sm:text-lg lg:text-xl font-bold mt-1 ${selectedVehicle.insurance === 'Active' ? 'text-success' : 'text-danger'}`}>{selectedVehicle.insurance}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl">
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{language === 'en' ? 'Outstanding Fines' : 'বকেয়া জরিমানা'}</span>
                    <p className={`text-base sm:text-lg lg:text-xl font-bold mt-1 ${selectedVehicle.fines > 0 ? 'text-danger' : 'text-success'}`}>
                      {selectedVehicle.fines} {language === 'en' ? 'fine(s)' : 'জরিমানা'}
                    </p>
                  </div>
                </div>
              </div>

              {selectedVehicle.fines > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <Warning size={24} weight="fill" className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-800 dark:text-yellow-300">
                        {language === 'en' ? 'Outstanding Violations' : 'বকেয়া লঙ্ঘন'}
                      </p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                        {language === 'en' 
                          ? 'This vehicle has unpaid fines. Please advise the driver to settle all outstanding penalties.' 
                          : 'এই যানবাহনের অপরিশোধিত জরিমানা রয়েছে। অনুগ্রহ করে চালককে সমস্ত বকেয়া জরিমানা পরিশোধ করতে পরামর্শ দিন।'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedVehicle.status === 'Expired' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <XCircle size={24} weight="fill" className="text-danger flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-800 dark:text-red-300">
                        {language === 'en' ? 'Expired Documents' : 'মেয়াদ শেষ নথি'}
                      </p>
                      <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                        {language === 'en' 
                          ? 'Vehicle documents have expired. The vehicle should not be operated until documents are renewed.' 
                          : 'যানবাহনের নথি মেয়াদ শেষ হয়ে গেছে। নথি নবায়ন না হওয়া পর্যন্ত যানবাহন পরিচালনা করা উচিত নয়।'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(PoliceVerification);
