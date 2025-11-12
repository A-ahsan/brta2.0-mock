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
    // Mock login - redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-green-900 flex items-center justify-center px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block text-white"
        >
          <div className="flex items-center gap-4 mb-8">
            <img src="/brta.png" alt="BRTA Logo" className="h-20 w-20 bg-white/10 rounded-2xl p-2 backdrop-blur" />
            <div>
              <h1 className="text-5xl font-extrabold">BRTA 2.0</h1>
              <p className="text-xl opacity-90">{language === 'en' ? 'Smart Transport Portal' : 'স্মার্ট ট্রান্সপোর্ট পোর্টাল'}</p>
            </div>
          </div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold mb-6"
          >
            {t.tagline}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl opacity-90 mb-8"
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
          >
            <p className="text-2xl font-bold mb-4">{t.noDalalNoDelay}</p>
            <ul className="space-y-2 opacity-90">
              <li className="flex items-center gap-2">
                <span className="text-green-300">✓</span>
                {language === 'en' ? 'Fast & Transparent Process' : 'দ্রুত এবং স্বচ্ছ প্রক্রিয়া'}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-300">✓</span>
                {language === 'en' ? '24/7 Online Services' : '২৪/৭ অনলাইন সেবা'}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-300">✓</span>
                {language === 'en' ? 'Secure Digital Platform' : 'নিরাপদ ডিজিটাল প্ল্যাটফর্ম'}
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 lg:p-12"
        >
          <div className="text-center mb-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-gray-800 dark:text-white mb-2"
            >
              {language === 'en' ? 'Welcome Back!' : 'আবার স্বাগতম!'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 dark:text-gray-400"
            >
              {language === 'en' ? 'Login to access your account' : 'আপনার অ্যাকাউন্ট অ্যাক্সেস করতে লগইন করুন'}
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t.emailAddress}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <EnvelopeSimple size={20} className="text-gray-400" weight="bold" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={language === 'en' ? 'your.email@example.com' : 'আপনার.ইমেইল@example.com'}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white transition-all"
                  required
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t.password}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockKey size={20} className="text-gray-400" weight="bold" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeSlash size={20} weight="bold" /> : <Eye size={20} weight="bold" />}
                </button>
              </div>
            </motion.div>

            {/* Remember Me & Forgot Password */}
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
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{t.rememberMe}</span>
              </label>
              <a href="#" className="text-sm text-primary hover:text-primary-dark font-semibold transition-colors">
                {t.forgotPassword}
              </a>
            </motion.div>

            {/* Login Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <SignIn size={24} weight="bold" />
              {t.login}
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600 dark:text-gray-400">
              {t.dontHaveAccount}{' '}
              <Link to="/signup" className="text-primary hover:text-primary-dark font-bold transition-colors">
                {t.signup}
              </Link>
            </p>
          </motion.div>

          {/* Quick Access */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
          >
            <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-4">
              {language === 'en' ? 'Quick Access:' : 'দ্রুত প্রবেশ:'}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/admin')}
                className="flex-1 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors text-sm font-semibold"
              >
                {language === 'en' ? 'Admin Panel' : 'অ্যাডমিন প্যানেল'}
              </button>
              <button
                onClick={() => navigate('/police')}
                className="flex-1 py-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors text-sm font-semibold"
              >
                {language === 'en' ? 'Police Dashboard' : 'পুলিশ ড্যাশবোর্ড'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
