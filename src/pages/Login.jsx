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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-4">

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

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-md mx-auto w-full"
        >
          <div className="text-center mb-6">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
            >
              {language === 'en' ? 'Welcome Back!' : 'আবার স্বাগতম!'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              {language === 'en' ? 'Login to access your account' : 'আপনার অ্যাকাউন্ট অ্যাক্সেস করতে লগইন করুন'}
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
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
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none focus:bg-white dark:focus:bg-gray-700 dark:text-white placeholder-gray-400 transition-all text-base"
                  autoFocus
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
                  className="w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none focus:bg-white dark:focus:bg-gray-700 dark:text-white placeholder-gray-400 transition-all text-base"
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
              className="w-full bg-gradient-to-r from-primary to-green-700 text-white py-3 rounded-xl font-bold text-base shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2"
            >
              <SignIn size={22} weight="bold" />
              {t.login}
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-5 text-center"
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

export default Login;
