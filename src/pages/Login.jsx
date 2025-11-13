import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { EnvelopeSimple, LockKey, Eye, EyeSlash, SignIn } from 'phosphor-react';
import { useLanguage } from '../contexts/AppContext';
import { translations } from '../utils/translations';

const Login = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <div className="flex items-center gap-4 mb-8">
            <img src="/brta.png" alt="BRTA Logo" className="h-24 w-24 bg-white rounded-2xl p-3 shadow-lg" />
            <div>
              <h1 className="text-5xl font-extrabold text-primary dark:text-green-400">BRTA 2.0</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">{language === 'en' ? 'Smart Transport Portal' : 'স্মার্ট ট্রান্সপোর্ট পোর্টাল'}</p>
            </div>
          </div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-6 leading-tight text-gray-800 dark:text-white"
          >
            {t.tagline}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <p className="text-xl font-bold mb-4 text-danger">{t.noDalalNoDelay}</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-success">✓</span>
                <span className="text-gray-700 dark:text-gray-200">{language === 'en' ? 'Fast & Transparent' : 'দ্রুত এবং স্বচ্ছ'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success">✓</span>
                <span className="text-gray-700 dark:text-gray-200">{language === 'en' ? '24/7 Online Services' : '২৪/৭ অনলাইন সেবা'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success">✓</span>
                <span className="text-gray-700 dark:text-gray-200">{language === 'en' ? 'Secure Platform' : 'নিরাপদ প্ল্যাটফর্ম'}</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 max-w-md mx-auto w-full"
        >
          <div className="text-center mb-10">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-gray-800 dark:text-white mb-3"
            >
              {language === 'en' ? 'Welcome Back!' : 'আবার স্বাগতম!'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              {language === 'en' ? 'Login to access your account' : 'আপনার অ্যাকাউন্ট অ্যাক্সেস করতে লগইন করুন'}
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t.emailAddress}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <EnvelopeSimple size={22} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={language === 'en' ? 'your@email.com' : 'আপনার@ইমেইল.com'}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary dark:text-white placeholder-gray-400 transition-all text-base"
                  required
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t.password}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockKey size={22} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-14 py-4 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary dark:text-white placeholder-gray-400 transition-all text-base"
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

            {/* Remember Me & Forgot Password */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{t.rememberMe}</span>
              </label>
              <Link to="#" className="text-sm text-primary hover:text-primary-dark font-semibold transition-colors">
                {t.forgotPassword}
              </Link>
            </motion.div>

            {/* Login Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3"
            >
              <SignIn size={24} weight="bold" />
              {t.login}
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600 dark:text-gray-400">
              {t.dontHaveAccount}{' '}
              <Link to="/signup" className="text-primary hover:text-primary-dark font-bold transition-colors">
                {t.signup}
              </Link>
            </p>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-4 text-center"
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

export default Login;
