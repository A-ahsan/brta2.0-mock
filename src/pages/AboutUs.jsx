import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, Eye, Heart, Lightbulb, Lightning, Globe, CheckCircle,
  Phone, Envelope, MapPin, Clock
} from 'phosphor-react';
import { useLanguage } from '../contexts/AppContext';
import { translations } from '../utils/translations';
import Navbar from '../components/Navbar';

const AboutUs = () => {
  const { language } = useLanguage();
  const t = translations[language].aboutPage;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const values = [
    {
      icon: <Heart size={40} weight="duotone" />,
      title: t.transparency,
      description: t.transparencyText,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Lightning size={40} weight="duotone" />,
      title: t.efficiency,
      description: t.efficiencyText,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Lightbulb size={40} weight="duotone" />,
      title: t.innovation,
      description: t.innovationText,
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Globe size={40} weight="duotone" />,
      title: t.accessibility,
      description: t.accessibilityText,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const features = [
    t.feature1,
    t.feature2,
    t.feature3,
    t.feature4,
    t.feature5,
    t.feature6
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-white to-muted dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ willChange: 'transform' }}>
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-green-500/20 rounded-full blur-3xl"
          style={{ transform: 'translateZ(0)' }}
        />
        <motion.div
          animate={{ 
            x: [0, -100, 0],
            y: [0, 100, 0],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          style={{ transform: 'translateZ(0)' }}
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-green-400/10 to-primary/10 rounded-full blur-3xl"
          style={{ transform: 'translateZ(0)' }}
        />
      </div>
      
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl relative">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <img 
                src="/brta.png" 
                alt="BRTA Logo" 
                className="h-24 w-24 object-contain mx-auto"
              />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-8 mb-16"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-primary to-green-600 rounded-xl">
                  <Target size={32} className="text-white" weight="duotone" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t.mission}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {t.missionText}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                  <Eye size={32} className="text-white" weight="duotone" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t.vision}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {t.visionText}
              </p>
            </motion.div>
          </motion.div>

          {/* Core Values */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
            >
              {t.values}
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-block p-4 bg-gradient-to-br ${value.color} rounded-full mb-4`}
                  >
                    <div className="text-white">
                      {value.icon}
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Features */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
            >
              {t.features}
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-start gap-3 bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md border border-gray-200 dark:border-gray-700"
                >
                  <CheckCircle 
                    size={24} 
                    className="text-primary flex-shrink-0 mt-1" 
                    weight="duotone" 
                  />
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    {feature}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-br from-primary to-green-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold text-center mb-12"
            >
              {t.contact}
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <MapPin size={28} weight="duotone" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{t.headquarters}</h3>
                    <p className="text-white/90">{t.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Phone size={28} weight="duotone" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{t.phone}</h3>
                    <p className="text-white/90">+880-2-9006316</p>
                    <h3 className="font-bold text-lg mb-1 mt-3">{t.helpline}</h3>
                    <p className="text-white/90">16469</p>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Envelope size={28} weight="duotone" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{t.email}</h3>
                    <p className="text-white/90">info@brta.gov.bd</p>
                    <p className="text-white/90">support@brta.gov.bd</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Clock size={28} weight="duotone" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{t.hours}</h3>
                    <p className="text-white/90">{t.workingHours}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
