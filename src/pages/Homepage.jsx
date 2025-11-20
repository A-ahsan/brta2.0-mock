import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {
  IdentificationCard,
  FaceMask,
  CalendarCheck,
  CreditCard,
  Calculator,
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
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{
        duration: 0.4,
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
  const lottieRef = useRef(null);

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
    }, 5000); // 5 seconds - faster transitions reduce CPU load
    return () => clearInterval(interval);
  }, [taglineParts.length]);

  // Cleanup Lottie on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (lottieRef.current) {
        lottieRef.current = null;
      }
    };
  }, []);

  const gradients = [
    'bg-gradient-to-r from-primary via-green-600 to-primary-dark',
    'bg-gradient-to-r from-green-600 via-primary to-green-600',
    'bg-gradient-to-r from-primary-dark via-primary to-green-600',
  ];

  // Optimized Lottie animations - reduced quality for better performance
  const lottieAnimations = [
    {
      src: 'https://lottie.host/11c734c5-116f-45e0-bc03-cc668ea475cc/cYMgRLZuDp.lottie',
    },
    {
      src: 'https://lottie.host/40631cde-df3a-4602-8f11-4a942c3ec274/3pxVyqjqhy.lottie',
    },
    {
      src: 'https://lottie.host/1edbcd01-db0c-47d6-b9f6-7687663e7653/4Utdq6TqM8.lottie',
    },
    {
      src: 'https://lottie.host/615492e9-b132-45fa-b258-1e63b1df031e/5z53SpGaI9.lottie', // Bangladesh flag
    },
  ];

  // Use modulo to cycle through lottie animations independently
  const lottieIndex = currentIndex % lottieAnimations.length;

  const features = [
    {
      id: 'driving_license',
      icon: <IdentificationCard size={32} weight="duotone" />,
      title: t.drivingLicense,
      description: t.drivingLicenseDesc,
    },
    {
      id: 'face_verification',
      icon: <FaceMask size={32} weight="duotone" />,
      title: t.faceVerification,
      description: t.faceVerificationDesc,
    },
    {
      id: 'slot_booking',
      icon: <CalendarCheck size={32} weight="duotone" />,
      title: t.slotBooking,
      description: t.slotBookingDesc,
    },
    {
      id: 'payment_system',
      icon: <CreditCard size={32} weight="duotone" />,
      title: t.paymentSystem,
      description: t.paymentSystemDesc,
    },
    {
      id: 'cost_calculator',
      icon: <Calculator size={32} weight="duotone" />,
      title: t.costCalculator,
      description: t.costCalculatorDesc,
    },
    {
      id: 'chatbot',
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
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Optimized animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ willChange: 'transform' }}>
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -100, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", repeatType: "loop" }}
          className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-2xl"
          style={{ transform: 'translateZ(0)' }}
        />
        <motion.div
          animate={{ 
            x: [0, -100, 0],
            y: [0, 100, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", repeatType: "loop" }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-2xl"
          style={{ transform: 'translateZ(0)' }}
        />
        </div>
        <div className="container mx-auto max-w-7xl relative z-10">
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
                <div
                  className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 text-danger dark:text-red-400 px-6 py-2 rounded-full font-bold text-sm border-2 border-danger/30 backdrop-blur-sm shadow-lg"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-danger rounded-full animate-pulse" />
                    {t.noDalalNoDelay}
                  </span>
                </div>
              </motion.div>

              {/* Animated Tagline */}
              <div className="mb-6 min-h-[12rem] md:min-h-[14rem] lg:min-h-[16rem] relative overflow-visible py-4">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={currentIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
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
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 20px 60px rgba(0, 106, 78, 0.4)',
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/signup')}
                className="group relative overflow-hidden bg-gradient-to-r from-primary via-green-600 to-primary-dark text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all duration-300 flex items-center gap-3"
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative z-10">{t.cta}</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={24} weight="bold" />
                </motion.span>
              </motion.button>
            </motion.div>

            {/* Right Illustration - Lottie Animations */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              className="relative flex items-center justify-center lg:justify-end"
              style={{ transform: 'translateZ(0)' }}
            >
              {/* Floating decorative elements */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-green-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-green-500/20 to-primary/20 rounded-full blur-2xl" />
              
              <div className="w-full max-w-[500px] relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="relative bg-gradient-to-br from-white via-white to-gray-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-2xl border-2 border-primary/30 backdrop-blur-sm"
                  >
                    {/* Inner glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-green-500/10 rounded-3xl" />
                    
                    {/* Optimized Lottie Animation */}
                    <div className="relative w-full pb-[100%]">
                      <div className="absolute inset-0 p-8">
                        <DotLottieReact
                          key={`lottie-${lottieIndex}`}
                          src={lottieAnimations[lottieIndex].src}
                          loop
                          autoplay
                          speed={0.7}
                          style={{ 
                            width: '100%', 
                            height: '100%'
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Corner accents */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full animate-pulse" />
                    <div className="absolute bottom-4 left-4 w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900 overflow-hidden">
        {/* Decorative grid background */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #006A4E 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="bg-gradient-to-r from-primary to-green-600 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
                {language === 'en' ? 'Our Services' : 'আমাদের সেবা'}
              </span>
            </motion.div>
            <h2 
              className={`text-4xl md:text-5xl font-extrabold mb-6 ${
                language === 'en' 
                  ? 'bg-gradient-to-r from-gray-800 via-primary to-gray-800 dark:from-white dark:via-green-400 dark:to-white bg-clip-text text-transparent' 
                  : 'text-primary dark:text-green-400'
              }`}
              style={{ fontFamily: "'Noto Sans Bengali', 'Segoe UI', sans-serif" }}
            >
              {t.features}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
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
                featureId={feature.id}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-4 border-t border-primary/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <img src="/brta.png" alt="BRTA" className="h-12 w-12 rounded-lg" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
                BRTA 2.0
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 BRTA 2.0 - {language === 'en' ? 'All Rights Reserved' : 'সর্বস্বত্ব সংরক্ষিত'}
            </p>
            <p className="text-gray-500 text-xs max-w-md">
              {language === 'en' 
                ? 'Building a transparent, corruption-free digital Bangladesh' 
                : 'একটি স্বচ্ছ, দুর্নীতিমুক্ত ডিজিটাল বাংলাদেশ গড়ছি'}
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
