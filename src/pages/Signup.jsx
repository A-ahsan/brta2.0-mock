import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { User, EnvelopeSimple, LockKey, Phone, Eye, EyeSlash, UserPlus } from 'phosphor-react';
import { useLanguage } from '../contexts/AppContext';
import { translations } from '../utils/translations';

const Signup = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-3">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <div className="flex items-center gap-3 mb-4">
            <img src="/brta.png" alt="BRTA Logo" className="h-16 w-16 bg-white rounded-2xl p-2 shadow-lg" />
            <div>
              <h1 className="text-3xl font-extrabold text-primary dark:text-green-400">BRTA 2.0</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">{language === 'en' ? 'Smart Transport Portal' : 'স্মার্ট ট্রান্সপোর্ট পোর্টাল'}</p>
            </div>
          </div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold mb-3 leading-tight text-gray-800 dark:text-white"
          >
            {t.authTagline}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <p className="text-lg font-bold mb-3 text-danger">{t.noDalalNoDelay}</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-success">✓</span>
                <span className="text-gray-700 dark:text-gray-200">{t.authBenefit1}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success">✓</span>
                <span className="text-gray-700 dark:text-gray-200">{t.authBenefit2}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success">✓</span>
                <span className="text-gray-700 dark:text-gray-200">{t.authBenefit3}</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Right Side - Signup Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-5 max-w-md mx-auto w-full"
        >
          <div className="text-center mb-5">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
            >
              {language === 'en' ? 'Create Account' : 'অ্যাকাউন্ট তৈরি করুন'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              {language === 'en' ? 'Join BRTA 2.0 today' : 'আজই BRTA 2.0 এ যোগ দিন'}
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Full Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                {t.fullName}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder={language === 'en' ? 'John Doe' : 'আপনার নাম'}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none focus:bg-white dark:focus:bg-gray-700 dark:text-white placeholder-gray-400 transition-all text-base"
                  autoFocus
                  required
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                {t.emailAddress}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeSimple size={20} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={language === 'en' ? 'your@email.com' : 'আপনার@ইমেইল.com'}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none focus:bg-white dark:focus:bg-gray-700 dark:text-white placeholder-gray-400 transition-all text-base"
                  required
                />
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                {t.phoneNumber}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={20} className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={language === 'en' ? '+880 1234-567890' : '+৮৮০ ১২৩৪-৫৬৭৮৯০'}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none focus:bg-white dark:focus:bg-gray-700 dark:text-white placeholder-gray-400 transition-all text-base"
                  required
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                {t.password}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockKey size={20} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none focus:bg-white dark:focus:bg-gray-700 dark:text-white placeholder-gray-400 transition-all text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeSlash size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </motion.div>

            {/* Agree to Terms */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-start gap-2"
            >
              <input
                type="checkbox"
                checked={formData.agree}
                onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                className="w-4 h-4 mt-1 text-primary border-gray-300 rounded focus:ring-primary"
                required
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {language === 'en' ? 'I agree to the' : 'আমি সম্মত'}{' '}
                <Link to="#" className="text-primary hover:text-primary-dark font-medium">
                  {language === 'en' ? 'Terms & Conditions' : 'শর্তাবলী'}
                </Link>
              </span>
            </motion.div>

            {/* Signup Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-green-700 text-white py-2.5 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <UserPlus size={22} weight="bold" />
              {t.signup}
            </motion.button>
          </form>

          {/* Login Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 text-center"
          >
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'en' ? 'Already have an account?' : 'ইতিমধ্যে অ্যাকাউন্ট আছে?'}{' '}
              <Link to="/login" className="text-primary hover:text-primary-dark font-bold transition-colors">
                {t.login}
              </Link>
            </p>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-3 text-center"
          >
            <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-green-400 transition-colors">
              ← {language === 'en' ? 'Back to Home' : 'হোম এ ফিরে যান'}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
