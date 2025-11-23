import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MegaphoneSimple, X, Sparkle, CalendarBlank, CurrencyDollar, DeviceMobile, Lightning } from 'phosphor-react';
import { useLanguage } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const NoticesTicker = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Mock ticker notices with professional icons
  const tickerNotices = [
    {
      en: 'NEW: Online License Renewal System Now Live - Apply from Home',
      bn: 'নতুন: অনলাইন লাইসেন্স নবায়ন সিস্টেম চালু - ঘর থেকে আবেদন করুন',
      badge: 'NEW'
    },
    {
      en: 'SCHEDULE: Driving Test December 2025 - Book Your Slots Now',
      bn: 'সময়সূচী: ড্রাইভিং পরীক্ষা ডিসেম্বর ২০২৫ - এখনই স্লট বুক করুন',
      badge: 'SCHEDULE'
    },
    {
      en: 'EXTENDED: Tax Token Payment Deadline - Dec 31, 2025',
      bn: 'বর্ধিত: ট্যাক্স টোকেন পেমেন্টের সময়সীমা - ৩১ ডিসেম্বর, ২০২৫',
      badge: 'EXTENDED'
    },
    {
      en: 'UPDATE: BRTA Go Mobile App Available - Download Now',
      bn: 'আপডেট: BRTA Go মোবাইল অ্যাপ উপলব্ধ - এখনই ডাউনলোড করুন',
      badge: 'UPDATE'
    },
    {
      en: 'NOTICE: 100% Digital Services Available 24/7 - No Middlemen',
      bn: 'নোটিশ: ১০০% ডিজিটাল সেবা ২৪/৭ উপলব্ধ - কোন মধ্যস্থতাকারী নেই',
      badge: 'NOTICE'
    }
  ];

  // Format notices with professional badges
  const formatNotice = (notice) => {
    const text = language === 'en' ? notice.en : notice.bn;
    return text;
  };

  const noticeText = tickerNotices.map(formatNotice).join('  •  ');

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-20 left-0 right-0 z-40 bg-gradient-to-r from-primary via-green-600 to-primary shadow-lg"
    >
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          {/* Icon */}
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="flex-shrink-0"
          >
            <MegaphoneSimple size={24} className="text-white" weight="duotone" />
          </motion.div>

          {/* Scrolling Text */}
          <div 
            className="flex-1 overflow-hidden cursor-pointer"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onClick={() => navigate('/notices')}
          >
            <motion.div
              className="whitespace-nowrap"
              animate={{
                x: isPaused ? 0 : [0, -2000]
              }}
              transition={{
                x: {
                  duration: isPaused ? 0 : 40,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              <span className="text-white font-medium text-sm md:text-base">
                {noticeText}  •  {noticeText}  •  {noticeText}
              </span>
            </motion.div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 p-1 hover:bg-white/20 rounded-lg transition"
            aria-label="Close notice ticker"
          >
            <X size={20} className="text-white" weight="bold" />
          </button>
        </div>

        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
          animate={{
            x: [-1000, 1000]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </motion.div>
  );
};

export default NoticesTicker;
