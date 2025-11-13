import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {
  IdentificationCard,
  Fingerprint,
  CalendarCheck,
  CreditCard,
  QrCode,
  Robot,
  ArrowRight,
  CheckCircle,
  Lightning,
  Shield,
  Car,
  Truck,
  Bicycle,
} from 'phosphor-react';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';
import { useLanguage } from '../contexts/AppContext';
import { translations } from '../utils/translations';

const AnimatedLine = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: "easeOut"
      }}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  );
};

const Homepage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  // Split tagline by period (works for both languages)
  const taglineParts = t.tagline.split('।').length > 1 
    ? t.tagline.split('।').filter(part => part.trim())
    : t.tagline.split('.').filter(part => part.trim());
  const separator = language === 'bn' ? '।' : '.';

  // Rotating text animation state
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sync both text and animation with same state
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % taglineParts.length);
    }, 5000); // Change both text and animation every 5 seconds (slower)
    return () => clearInterval(interval);
  }, [taglineParts.length]);

  const gradients = [
    'bg-gradient-to-r from-primary via-green-600 to-primary-dark',
    'bg-gradient-to-r from-green-600 via-primary to-green-600',
    'bg-gradient-to-r from-primary-dark via-primary to-green-600',
  ];

  // Lottie animations from LottieFiles - synced with tagline
  const lottieAnimations = [
    {
      src: 'https://lottie.host/11c734c5-116f-45e0-bc03-cc668ea475cc/cYMgRLZuDp.lottie', // Smart Roads - should show car/road
    },
    {
      src: 'https://lottie.host/40631cde-df3a-4602-8f11-4a942c3ec274/3pxVyqjqhy.lottie', // Smart Drivers - should show bike
    },
    {
      src: 'https://lottie.host/1edbcd01-db0c-47d6-b9f6-7687663e7653/4Utdq6TqM8.lottie', // Smart Traffic - should show traffic signal
    },
    {
      src: 'https://lottie.host/615492e9-b132-45fa-b258-1e63b1df031e/5z53SpGaI9.lottie', // Smart Bangladesh - should show flag
    }
  ];

  const features = [
    {
      icon: <IdentificationCard size={32} weight="duotone" />,
      title: t.drivingLicense,
      description: t.drivingLicenseDesc,
    },
    {
      icon: <Fingerprint size={32} weight="duotone" />,
      title: t.faceVerification,
      description: t.faceVerificationDesc,
    },
    {
      icon: <CalendarCheck size={32} weight="duotone" />,
      title: t.slotBooking,
      description: t.slotBookingDesc,
    },
    {
      icon: <CreditCard size={32} weight="duotone" />,
      title: t.paymentSystem,
      description: t.paymentSystemDesc,
    },
    {
      icon: <QrCode size={32} weight="duotone" />,
      title: t.qrPoliceCheck,
      description: t.qrPoliceCheckDesc,
    },
    {
      icon: <Robot size={32} weight="duotone" />,
      title: t.chatbot,
      description: t.chatbotDesc,
    },
  ];

  const benefits = [
    { text: language === 'en' ? 'No Middlemen' : 'কোন মধ্যস্থতাকারী নেই', icon: <CheckCircle size={24} weight="fill" /> },
    { text: language === 'en' ? 'Instant Processing' : 'তাৎক্ষণিক প্রক্রিয়াকরণ', icon: <Lightning size={24} weight="fill" /> },
    { text: language === 'en' ? 'Secure & Transparent' : 'নিরাপদ এবং স্বচ্ছ', icon: <Shield size={24} weight="fill" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-white to-muted dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-6"
              >
                <div className="bg-red-50 dark:bg-red-900/30 text-danger dark:text-red-400 px-6 py-2 rounded-full font-bold text-sm border-2 border-danger/30">
                  {t.noDalalNoDelay}
                </div>
              </motion.div>

              {/* Animated Tagline */}
              <div className="mb-6 min-h-[12rem] md:min-h-[14rem] lg:min-h-[16rem] relative overflow-visible py-4">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={currentIndex}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-normal absolute top-0 left-0 right-0 text-primary dark:text-green-400"
                    style={{ lineHeight: '1.5' }}
                  >
                    {taglineParts[currentIndex]}{separator}
                  </motion.h1>
                </AnimatePresence>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              >
                {t.subtitle}
              </motion.p>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.6 + index * 0.1 }}
                    className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md"
                  >
                    <span className="text-success">{benefit.icon}</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">{benefit.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9 }}
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 106, 78, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/signup')}
                className="group bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 flex items-center gap-3"
              >
                {t.cta}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={24} weight="bold" />
                </motion.span>
              </motion.button>
            </motion.div>

            {/* Right Illustration - Lottie Animations */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative flex items-center justify-center lg:justify-end"
            >
              <div className="w-full max-w-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 shadow-2xl border-2 border-primary/20"
                  >
                    <div className="relative w-full pb-[100%]">
                      <div className="absolute inset-0">
                        <DotLottieReact
                          src={lottieAnimations[currentIndex].src}
                          loop
                          autoplay
                        />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50 dark:bg-gray-800/50 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 dark:text-white">
              {t.features}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Everything you need for seamless vehicle and license management' 
                : 'নিরবচ্ছিন্ন যানবাহন এবং লাইসেন্স ব্যবস্থাপনার জন্য আপনার প্রয়োজনীয় সবকিছু'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-primary-dark/5 dark:from-primary/10 dark:to-primary-dark/10 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 dark:text-white">
              {language === 'en' ? 'Trusted by Thousands' : 'হাজার হাজার মানুষের বিশ্বাস'}
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center"
            >
              <div className="text-5xl font-extrabold text-primary mb-2">12,450+</div>
              <div className="text-gray-600 dark:text-gray-400 font-semibold">
                {language === 'en' ? 'Registered Users' : 'নিবন্ধিত ব্যবহারকারী'}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center"
            >
              <div className="text-5xl font-extrabold text-success mb-2">8,234+</div>
              <div className="text-gray-600 dark:text-gray-400 font-semibold">
                {language === 'en' ? 'Vehicles Registered' : 'নিবন্ধিত যানবাহন'}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center"
            >
              <div className="text-5xl font-extrabold text-primary-dark mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-400 font-semibold">
                {language === 'en' ? 'Satisfaction Rate' : 'সন্তুষ্টির হার'}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © 2025 BRTA 2.0 - {language === 'en' ? 'All Rights Reserved' : 'সর্বস্বত্ব সংরক্ষিত'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
