import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import {
  Calculator,
  IdentificationCard,
  Bicycle,
  Car,
  Receipt,
  CurrencyCircleDollar,
  CheckCircle,
  Info,
} from 'phosphor-react';
import { useLanguage } from '../contexts/AppContext';
import { translations } from '../utils/translations';

const EmbeddedCalculator = () => {
  // Always use English for result section
  const { language } = useLanguage();
  const t = translations[language];
  const resultLabels = {
    calculatedFee: 'Calculated Fee',
    totalAmount: 'Total Amount',
    licenseType: 'License Type',
    service: 'Service',
    validity: 'Validity',
    engineCapacity: 'Engine Capacity',
    registrationPeriod: 'Registration Period',
    registrationFee: 'Registration Fee',
    annualTaxToken: 'Annual Tax Token',
    paymentType: 'Payment Type',
    taxFee: 'Tax Fee',
    fafFee: 'FAF Fee',
    info: 'Fees are approximate and may vary. Please verify with BRTA for exact amounts.'
  };
  const resultsRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState('driving_license');
  const [licenseType, setLicenseType] = useState('non_professional');
  const [licenseService, setLicenseService] = useState('new');
  const [bikeEngine, setBikeEngine] = useState('up_to_100');
  const [bikeRegPeriod, setBikeRegPeriod] = useState('2_years');
  const [carEngine, setCarEngine] = useState('up_to_1500');
  const [bikeTaxEngine, setBikeTaxEngine] = useState('below_100');
  const [bikeTaxType, setBikeTaxType] = useState('annual');
  const [calculatedFee, setCalculatedFee] = useState(null);

  const categories = [
    { id: 'driving_license', icon: IdentificationCard, name: t.feeCalc?.drivingLicense || 'Driving License' },
    { id: 'bike_registration', icon: Bicycle, name: t.feeCalc?.bikeRegistration || 'Bike Registration' },
    { id: 'car_registration', icon: Car, name: t.feeCalc?.carRegistration || 'Car Registration & Tax' },
    { id: 'bike_tax', icon: Receipt, name: t.feeCalc?.bikeTax || 'Bike Tax Token' },
  ];

  const calculateFee = () => {
    let result = { amount: 0, validity: '', breakdown: [] };

    switch (selectedCategory) {
      case 'driving_license':
        const licenseFees = {
          non_professional: { new: 4557, renewal: 4212, validity: '10 years' },
          professional: { new: 2832, renewal: 2387, validity: '5 years' }
        };
        result.amount = licenseFees[licenseType][licenseService];
        result.validity = licenseFees[licenseType].validity;
        result.breakdown = [
          { label: resultLabels.licenseType, value: licenseType === 'non_professional' ? 'Non-Professional' : 'Professional' },
          { label: resultLabels.service, value: licenseService === 'new' ? 'New License' : 'Renewal' },
          { label: resultLabels.validity, value: result.validity }
        ];
        break;

      case 'bike_registration':
        const bikeRegFees = {
          up_to_100: { '2_years': 10664, '10_years': 11764 },
          over_100: { '2_years': 11764, '10_years': 20964 }
        };
        result.amount = bikeRegFees[bikeEngine][bikeRegPeriod];
        result.validity = bikeRegPeriod === '2_years' ? '2 years' : '10 years';
        result.breakdown = [
          { label: resultLabels.engineCapacity, value: bikeEngine === 'up_to_100' ? 'Up to 100cc' : 'Over 100cc' },
          { label: resultLabels.registrationPeriod, value: result.validity }
        ];
        break;

      case 'car_registration':
        const carRegFees = {
          up_to_1500: { reg: 25000, tax: 15000 },
          '1501_2000': { reg: 50000, tax: 30000 },
          '2001_2500': { reg: 75000, tax: 60000 },
          '2501_3000': { reg: 125000, tax: 100000 },
          '3001_3500': { reg: 150000, tax: 200000 },
          above_3500: { reg: 200000, tax: 300000 }
        };
        const carFee = carRegFees[carEngine];
        result.amount = carFee.reg + carFee.tax;
        result.breakdown = [
          { label: resultLabels.engineCapacity, value: getCarEngineLabel(carEngine) },
          { label: resultLabels.registrationFee, value: `৳${carFee.reg.toLocaleString()}` },
          { label: resultLabels.annualTaxToken, value: `৳${carFee.tax.toLocaleString()}` }
        ];
        break;

      case 'bike_tax':
        const bikeTaxFees = {
          below_100: { annual: { tax: 1150, faf: 1150, total: 2300 }, permanent: { tax: 5750, faf: 1150, total: 6900 } },
          above_100: { annual: { tax: 2300, faf: 1150, total: 3450 }, permanent: { tax: 11500, faf: 1150, total: 12650 } }
        };
        const bikeTax = bikeTaxFees[bikeTaxEngine][bikeTaxType];
        result.amount = bikeTax.total;
        result.breakdown = [
          { label: resultLabels.engineCapacity, value: bikeTaxEngine === 'below_100' ? 'Below 100cc' : 'Above 100cc' },
          { label: resultLabels.paymentType, value: bikeTaxType === 'annual' ? 'Annual' : 'Permanent' },
          { label: resultLabels.taxFee, value: `৳${bikeTax.tax.toLocaleString()}` },
          { label: resultLabels.fafFee, value: `৳${bikeTax.faf.toLocaleString()}` }
        ];
        break;
    }

    setCalculatedFee(result);
    
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const getCarEngineLabel = (engine) => {
    const labels = {
      up_to_1500: 'Up to 1500cc',
      '1501_2000': '1501-2000cc',
      '2001_2500': '2001-2500cc',
      '2501_3000': '2501-3000cc',
      '3001_3500': '3001-3500cc',
      above_3500: 'Above 3500cc'
    };
    return labels[engine];
  };

  return (
    <div className="relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-green-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-400/20 to-green-400/20 rounded-full blur-3xl"
        />
        
        {/* Floating Calculator Icons */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            x: [0, 20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 opacity-10"
        >
          <Calculator size={80} weight="duotone" className="text-primary" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 40, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-1/4 opacity-10"
        >
          <CurrencyCircleDollar size={100} weight="duotone" className="text-green-600" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, -25, 0],
            x: [0, -15, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-1/3 opacity-10"
        >
          <Receipt size={70} weight="duotone" className="text-emerald-600" />
        </motion.div>
      </div>

      <div className="relative z-10 grid lg:grid-cols-3 gap-6">
      {/* Category Selection */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="lg:col-span-1"
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <CurrencyCircleDollar size={24} weight="duotone" className="text-primary" />
            {t.feeCalc?.selectCategory || 'Select Category'}
          </h3>
          <div className="space-y-3">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setCalculatedFee(null);
                }}
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-green-600 text-white shadow-lg shadow-primary/30 scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <category.icon size={24} weight="duotone" />
                <span className="font-medium text-left flex-1">{category.name}</span>
                {selectedCategory === category.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <CheckCircle size={20} weight="fill" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Calculator Form & Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="lg:col-span-2"
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Driving License Form */}
              {selectedCategory === 'driving_license' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <IdentificationCard size={28} weight="duotone" className="text-primary dark:text-green-400" />
                    {t.feeCalc?.drivingLicense || 'Driving License'}
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.feeCalc?.licenseType || 'License Type'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['non_professional', 'professional'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setLicenseType(type)}
                          className={`p-2 rounded-lg text-sm font-medium transition-all ${
                            licenseType === type
                              ? 'bg-primary text-white shadow-md'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {type === 'non_professional' ? (t.feeCalc?.nonProfessional || 'Non-Professional') : (t.feeCalc?.professional || 'Professional')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.feeCalc?.service || 'Service'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['new', 'renewal'].map((service) => (
                        <button
                          key={service}
                          onClick={() => setLicenseService(service)}
                          className={`p-2 rounded-lg text-sm font-medium transition-all ${
                            licenseService === service
                              ? 'bg-primary text-white shadow-md'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {service === 'new' ? (t.feeCalc?.newLicense || 'New License') : (t.feeCalc?.renewal || 'Renewal')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Bike Registration Form */}
              {selectedCategory === 'bike_registration' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <Bicycle size={28} weight="duotone" className="text-primary dark:text-green-400" />
                    {t.feeCalc?.bikeRegistration || 'Bike Registration'}
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.feeCalc?.engineCapacity || 'Engine Capacity'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['up_to_100', 'over_100'].map((engine) => (
                        <button
                          key={engine}
                          onClick={() => setBikeEngine(engine)}
                          className={`p-2 rounded-lg text-sm font-medium transition-all ${
                            bikeEngine === engine
                              ? 'bg-primary text-white shadow-md'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {engine === 'up_to_100' ? (t.feeCalc?.upTo100cc || 'Up to 100cc') : (t.feeCalc?.over100cc || 'Over 100cc')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.feeCalc?.registrationPeriod || 'Registration Period'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['2_years', '10_years'].map((period) => (
                        <button
                          key={period}
                          onClick={() => setBikeRegPeriod(period)}
                          className={`p-2 rounded-lg text-sm font-medium transition-all ${
                            bikeRegPeriod === period
                              ? 'bg-primary text-white shadow-md'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {period === '2_years' ? (t.feeCalc?.twoYears || '2 Years') : (t.feeCalc?.tenYears || '10 Years')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Car Registration Form */}
              {selectedCategory === 'car_registration' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <Car size={28} weight="duotone" className="text-primary dark:text-green-400" />
                    {t.feeCalc?.carRegistration || 'Car Registration & Tax'}
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.feeCalc?.engineCapacity || 'Engine Capacity'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['up_to_1500', '1501_2000', '2001_2500', '2501_3000', '3001_3500', 'above_3500'].map((engine) => (
                        <button
                          key={engine}
                          onClick={() => setCarEngine(engine)}
                          className={`p-2 rounded-lg text-xs font-medium transition-all ${
                            carEngine === engine
                              ? 'bg-primary text-white shadow-md'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {getCarEngineLabel(engine)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Bike Tax Form */}
              {selectedCategory === 'bike_tax' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <Receipt size={28} weight="duotone" className="text-primary dark:text-green-400" />
                    {t.feeCalc?.bikeTax || 'Bike Tax Token'}
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.feeCalc?.engineCapacity || 'Engine Capacity'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['below_100', 'above_100'].map((engine) => (
                        <button
                          key={engine}
                          onClick={() => setBikeTaxEngine(engine)}
                          className={`p-2 rounded-lg text-sm font-medium transition-all ${
                            bikeTaxEngine === engine
                              ? 'bg-primary text-white shadow-md'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {engine === 'below_100' ? (t.feeCalc?.below100cc || 'Below 100cc') : (t.feeCalc?.above100cc || 'Above 100cc')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.feeCalc?.paymentType || 'Payment Type'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['annual', 'permanent'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setBikeTaxType(type)}
                          className={`p-2 rounded-lg text-sm font-medium transition-all ${
                            bikeTaxType === type
                              ? 'bg-primary text-white shadow-md'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {type === 'annual' ? (t.feeCalc?.annual || 'Annual') : (t.feeCalc?.permanent || 'Permanent')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Calculate Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={calculateFee}
                className="w-full mt-8 bg-gradient-to-r from-primary to-green-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-2"
              >
                <Calculator size={24} weight="duotone" />
                {t.feeCalc?.calculateFee || 'Calculate Fee'}
              </motion.button>

              {/* Results */}
              <AnimatePresence>
                {calculatedFee && (
                  <motion.div
                    ref={resultsRef}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="mt-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-200 dark:border-green-700"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle size={28} weight="duotone" className="text-green-600 dark:text-green-400" />
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                        {resultLabels.calculatedFee}
                      </h4>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {resultLabels.totalAmount}
                      </p>
                      <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-600">
                        ৳{calculatedFee.amount.toLocaleString()}
                      </p>
                    </div>

                    <div className="space-y-2">
                      {calculatedFee.breakdown.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-lg p-3"
                        >
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {item.label}
                          </span>
                          <span className="text-sm font-bold text-gray-800 dark:text-white">
                            {item.value}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <Info size={20} weight="duotone" className="text-primary dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {resultLabels.info}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default EmbeddedCalculator;
