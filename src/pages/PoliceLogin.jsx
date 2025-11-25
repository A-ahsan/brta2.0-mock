import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { EnvelopeSimple, LockKey, Eye, EyeSlash, Shield, Detective } from 'phosphor-react';
import { useLanguage } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { translations } from '../utils/translations';
import toast from 'react-hot-toast';

const PoliceLogin = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await signIn(formData.email, formData.password);

    if (result.success) {
      // Check if user is actually police
      const role = result.profile?.role || 'user';
      
      if (role === 'police') {
        navigate('/police-dashboard');
      } else {
        toast.error(language === 'en' 
          ? 'Access denied! Police credentials required.' 
          : 'প্রবেশাধিকার অস্বীকার! পুলিশ শংসাপত্র প্রয়োজন।'
        );
        // Redirect based on actual role
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-800 flex items-center justify-center px-4 py-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -100, 0],
            y: [0, 100, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-3 mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-2xl"
          >
            <Detective size={48} weight="duotone" />
            <div>
              <h1 className="text-2xl font-extrabold">POLICE PORTAL</h1>
              <p className="text-sm opacity-90">
                {language === 'en' ? 'Law Enforcement Access' : 'আইন প্রয়োগকারী প্রবেশ'}
              </p>
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold mb-6 leading-tight text-gray-900 dark:text-white"
          >
            {language === 'en' 
              ? 'Vehicle Verification Portal' 
              : 'যানবাহন যাচাইকরণ পোর্টাল'}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
                <Shield size={32} className="text-white" weight="duotone" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {language === 'en' ? 'Police Features' : 'পুলিশ বৈশিষ্ট্য'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'en' ? 'Verification & enforcement' : 'যাচাইকরণ ও প্রয়োগ'}
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</span>
                <span className="text-gray-700 dark:text-gray-200">
                  {language === 'en' ? 'Verify vehicle documents' : 'যানবাহনের নথি যাচাই'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</span>
                <span className="text-gray-700 dark:text-gray-200">
                  {language === 'en' ? 'Real-time license checking' : 'রিয়েল-টাইম লাইসেন্স চেক'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</span>
                <span className="text-gray-700 dark:text-gray-200">
                  {language === 'en' ? 'Access violation records' : 'লঙ্ঘন রেকর্ড অ্যাক্সেস'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</span>
                <span className="text-gray-700 dark:text-gray-200">
                  {language === 'en' ? 'Generate instant reports' : 'তাৎক্ষণিক রিপোর্ট তৈরি'}
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-2 border-blue-200 dark:border-blue-800 p-8 max-w-md mx-auto w-full"
        >
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block p-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mb-4 shadow-xl"
            >
              <Detective size={48} className="text-white" weight="duotone" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-gray-800 dark:text-white mb-2"
            >
              {language === 'en' ? 'Police Access' : 'পুলিশ প্রবেশ'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              {language === 'en' ? 'Enter your police credentials' : 'আপনার পুলিশ শংসাপত্র লিখুন'}
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {language === 'en' ? 'Police Email' : 'পুলিশ ইমেইল'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <EnvelopeSimple size={20} className="text-blue-500" weight="duotone" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={language === 'en' ? 'police@brta.gov.bd' : 'পুলিশ@brta.gov.bd'}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 border-blue-200 dark:border-blue-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:bg-white dark:focus:bg-gray-700 dark:text-white placeholder-gray-400 transition-all text-base"
                  autoFocus
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {language === 'en' ? 'Police Password' : 'পুলিশ পাসওয়ার্ড'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockKey size={20} className="text-blue-500" weight="duotone" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-14 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 border-blue-200 dark:border-blue-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:bg-white dark:focus:bg-gray-700 dark:text-white placeholder-gray-400 transition-all text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {showPassword ? <EyeSlash size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {language === 'en' ? 'Remember me' : 'আমাকে মনে রাখুন'}
                </span>
              </label>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-base shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {language === 'en' ? 'Authenticating...' : 'যাচাই হচ্ছে...'}
                </>
              ) : (
                <>
                  <Shield size={24} weight="bold" />
                  {language === 'en' ? 'Access Police Portal' : 'পুলিশ পোর্টাল প্রবেশ'}
                </>
              )}
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6 text-center space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
              <span className="text-xs text-gray-500 dark:text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
            </div>
            <Link 
              to="/admin-login" 
              className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium transition-colors"
            >
              {language === 'en' ? 'Admin Login →' : 'অ্যাডমিন লগইন →'}
            </Link>
            <br />
            <Link 
              to="/login" 
              className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
            >
              {language === 'en' ? 'User Login →' : 'ব্যবহারকারী লগইন →'}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-center"
          >
            <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              ← {language === 'en' ? 'Back to Home' : 'হোম এ ফিরে যান'}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PoliceLogin;
