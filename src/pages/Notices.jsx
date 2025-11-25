import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MegaphoneSimple, Calendar, Tag, ArrowRight, X, 
  CaretDown, FunnelSimple, TrendUp
} from 'phosphor-react';
import { useLanguage } from '../contexts/AppContext';
import { translations } from '../utils/translations';
import Navbar from '../components/Navbar';

const Notices = () => {
  const { language } = useLanguage();
  const t = translations[language].noticesPage;
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock notices data
  const notices = [
    {
      id: 1,
      title: language === 'en' 
        ? 'New Online License Renewal System Launch' 
        : 'নতুন অনলাইন লাইসেন্স নবায়ন সিস্টেম চালু',
      category: 'license',
      date: '2025-11-20',
      excerpt: language === 'en'
        ? 'BRTA introduces a fully digital license renewal system. No physical visit required.'
        : 'BRTA সম্পূর্ণ ডিজিটাল লাইসেন্স নবায়ন সিস্টেম চালু করেছে। কোন শারীরিক উপস্থিতির প্রয়োজন নেই।',
      content: language === 'en'
        ? 'We are excited to announce the launch of our new online license renewal system. Citizens can now renew their driving licenses from the comfort of their homes. The system includes biometric verification, online payment, and instant processing. Valid from December 1, 2025.'
        : 'আমরা আমাদের নতুন অনলাইন লাইসেন্স নবায়ন সিস্টেম চালুর ঘোষণা দিতে পেরে আনন্দিত। নাগরিকরা এখন তাদের ঘর থেকে তাদের ড্রাইভিং লাইসেন্স নবায়ন করতে পারবেন। সিস্টেমে বায়োমেট্রিক যাচাইকরণ, অনলাইন পেমেন্ট এবং তাৎক্ষণিক প্রক্রিয়াকরণ অন্তর্ভুক্ত রয়েছে। ১ ডিসেম্বর, ২০২৫ থেকে কার্যকর।',
      trending: false
    },
    {
      id: 2,
      title: language === 'en'
        ? 'Driving Test Schedule - December 2025'
        : 'ড্রাইভিং পরীক্ষার সময়সূচী - ডিসেম্বর ২০২৫',
      category: 'exam',
      date: '2025-11-18',
      excerpt: language === 'en'
        ? 'Updated schedule for driving tests in all regional offices.'
        : 'সকল আঞ্চলিক অফিসে ড্রাইভিং পরীক্ষার আপডেট সময়সূচী।',
      content: language === 'en'
        ? 'The driving test schedule for December 2025 has been published. Tests will be conducted from December 5-20 in all major cities. Slots are now available for booking through our online portal. Please bring your acknowledgment receipt and original documents.'
        : 'ডিসেম্বর ২০২৫ এর জন্য ড্রাইভিং পরীক্ষার সময়সূচী প্রকাশিত হয়েছে। সকল প্রধান শহরে ৫-২০ ডিসেম্বর পরীক্ষা অনুষ্ঠিত হবে। আমাদের অনলাইন পোর্টালের মাধ্যমে স্লট বুকিং এখন উপলব্ধ। অনুগ্রহ করে আপনার স্বীকৃতি রসিদ এবং মূল নথি আনুন।',
      trending: false
    },
    {
      id: 3,
      title: language === 'en'
        ? 'Tax Token Payment Deadline Extended'
        : 'ট্যাক্স টোকেন পেমেন্টের সময়সীমা বর্ধিত',
      category: 'tax',
      date: '2025-11-15',
      excerpt: language === 'en'
        ? 'Annual tax token payment deadline extended to December 31, 2025.'
        : 'বার্ষিক ট্যাক্স টোকেন পেমেন্টের সময়সীমা ৩১ ডিসেম্বর, ২০২৫ পর্যন্ত বর্ধিত।',
      content: language === 'en'
        ? 'In consideration of public convenience, the deadline for annual tax token payment has been extended to December 31, 2025. No late fees will be charged for payments made before this date. Pay online to avoid queues.'
        : 'জনসাধারণের সুবিধার কথা বিবেচনা করে, বার্ষিক ট্যাক্স টোকেন পেমেন্টের সময়সীমা ৩১ ডিসেম্বর, ২০২৫ পর্যন্ত বর্ধিত করা হয়েছে। এই তারিখের আগে করা পেমেন্টের জন্য কোন বিলম্ব ফি চার্জ করা হবে না। লাইন এড়াতে অনলাইনে পেমেন্ট করুন।',
      trending: false
    },
    {
      id: 4,
      title: language === 'en'
        ? 'System Maintenance Notice'
        : 'সিস্টেম রক্ষণাবেক্ষণ নোটিশ',
      category: 'maintenance',
      date: '2025-11-12',
      excerpt: language === 'en'
        ? 'Scheduled maintenance on November 25, 2025 from 12 AM to 6 AM.'
        : '২৫ নভেম্বর, ২০২৫ রাত ১২টা থেকে সকাল ৬টা পর্যন্ত নির্ধারিত রক্ষণাবেক্ষণ।',
      content: language === 'en'
        ? 'Our online services will be temporarily unavailable due to scheduled system maintenance on November 25, 2025, from 12:00 AM to 6:00 AM. We apologize for any inconvenience. All services will resume normal operation after 6 AM.'
        : 'আমাদের অনলাইন সেবা ২৫ নভেম্বর, ২০২৫ রাত ১২:০০টা থেকে সকাল ৬:০০টা পর্যন্ত নির্ধারিত সিস্টেম রক্ষণাবেক্ষণের কারণে সাময়িকভাবে অনুপলব্ধ থাকবে। যেকোনো অসুবিধার জন্য আমরা দুঃখিত। সকাল ৬টার পরে সমস্ত সেবা স্বাভাবিক কার্যক্রম পুনরায় শুরু করবে।',
      trending: false
    },
    {
      id: 5,
      title: language === 'en'
        ? 'New Vehicle Registration Fees Announced'
        : 'নতুন যানবাহন নিবন্ধন ফি ঘোষণা',
      category: 'vehicle',
      date: '2025-11-10',
      excerpt: language === 'en'
        ? 'Updated fee structure for vehicle registration effective from January 1, 2026.'
        : '১ জানুয়ারী, ২০২৬ থেকে কার্যকর যানবাহন নিবন্ধনের জন্য আপডেট ফি কাঠামো।',
      content: language === 'en'
        ? 'The government has announced a new fee structure for vehicle registration. The updated fees will be effective from January 1, 2026. Please use our online fee calculator to estimate your registration costs. Discounts available for electric vehicles.'
        : 'সরকার যানবাহন নিবন্ধনের জন্য একটি নতুন ফি কাঠামো ঘোষণা করেছে। আপডেট করা ফি ১ জানুয়ারী, ২০২৬ থেকে কার্যকর হবে। আপনার নিবন্ধন খরচ অনুমান করতে অনুগ্রহ করে আমাদের অনলাইন ফি ক্যালকুলেটর ব্যবহার করুন। বৈদ্যুতিক যানবাহনের জন্য ছাড় উপলব্ধ।',
      trending: false
    },
    {
      id: 6,
      title: language === 'en'
        ? 'Mobile App Launch - BRTA Go'
        : 'মোবাইল অ্যাপ লঞ্চ - BRTA Go',
      category: 'general',
      date: '2025-11-08',
      excerpt: language === 'en'
        ? 'Download the new BRTA Go app for seamless access to all services.'
        : 'সকল সেবায় নির্বিঘ্ন প্রবেশের জন্য নতুন BRTA Go অ্যাপ ডাউনলোড করুন।',
      content: language === 'en'
        ? 'BRTA is proud to launch its official mobile application - BRTA Go. The app provides all services including license applications, vehicle registration, fee payment, and slot booking. Available on iOS and Android. Download now from your app store.'
        : 'BRTA তার অফিসিয়াল মোবাইল অ্যাপ্লিকেশন - BRTA Go চালু করতে পেরে গর্বিত। অ্যাপটি লাইসেন্স আবেদন, যানবাহন নিবন্ধন, ফি পেমেন্ট এবং স্লট বুকিং সহ সকল সেবা প্রদান করে। iOS এবং Android এ উপলব্ধ। আপনার অ্যাপ স্টোর থেকে এখনই ডাউনলোড করুন।',
      trending: false
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      general: 'from-blue-500 to-blue-600',
      license: 'from-green-500 to-green-600',
      vehicle: 'from-purple-500 to-purple-600',
      tax: 'from-yellow-500 to-yellow-600',
      exam: 'from-red-500 to-red-600',
      maintenance: 'from-gray-500 to-gray-600'
    };
    return colors[category] || colors.general;
  };

  const filteredNotices = filterCategory === 'all' 
    ? notices 
    : notices.filter(n => n.category === filterCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-white to-muted dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements - Optimized */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 150, 0],
            y: [0, -80, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
          className="absolute top-10 right-20 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-green-600/20 rounded-full blur-3xl"
          style={{ transform: 'translate3d(0, 0, 0)', willChange: 'transform' }}
        />
        <motion.div
          animate={{ 
            x: [0, -120, 0],
            y: [0, 120, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
          className="absolute bottom-10 left-20 w-[450px] h-[450px] bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
          style={{ transform: 'translate3d(0, 0, 0)', willChange: 'transform' }}
        />
        <motion.div
          animate={{ 
            rotate: [0, 360]
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-gradient-to-br from-yellow-400/15 to-orange-500/15 rounded-full blur-3xl"
          style={{ transform: 'translate3d(0, 0, 0)', willChange: 'transform' }}
        />
      </div>
      
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-4"
            >
              <div className="p-4 bg-gradient-to-br from-primary to-green-600 rounded-2xl">
                <MegaphoneSimple size={48} className="text-white" weight="duotone" />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <FunnelSimple size={20} />
              <span className="font-medium">{t.category}:</span>
            </div>
            {['all', 'general', 'license', 'vehicle', 'tax', 'exam', 'maintenance'].map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterCategory === cat
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {cat === 'all' 
                  ? (language === 'en' ? 'All' : 'সব') 
                  : t.categories[cat]
                }
              </motion.button>
            ))}
          </motion.div>

          {/* Notices Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="wait">
              {filteredNotices.map((notice, index) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.03
                  }}
                  whileHover={{ y: -5 }}
                  className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer group"
                  style={{ transform: 'translate3d(0, 0, 0)', willChange: 'transform' }}
                  onClick={() => setSelectedNotice(notice)}
                >
                  {/* Trending Badge */}
                  {notice.trending && (
                    <motion.div
                      initial={{ x: -100 }}
                      animate={{ x: 0 }}
                      className="absolute top-4 -left-8 bg-red-500 text-white px-10 py-1 transform -rotate-45 text-xs font-bold flex items-center gap-1"
                    >
                      <TrendUp size={14} weight="bold" />
                      {language === 'en' ? 'TRENDING' : 'জনপ্রিয়'}
                    </motion.div>
                  )}

                  {/* Category Badge */}
                  <div className={`h-2 bg-gradient-to-r ${getCategoryColor(notice.category)}`} />
                  
                  <div className="p-6">
                    {/* Category Tag */}
                    <div className="flex items-center gap-2 mb-3">
                      <Tag size={18} className="text-primary" weight="duotone" />
                      <span className="text-sm font-semibold text-primary">
                        {t.categories[notice.category]}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {notice.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {notice.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                        <Calendar size={16} weight="duotone" />
                        <span>{new Date(notice.date).toLocaleDateString(language === 'en' ? 'en-US' : 'bn-BD', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="text-primary font-semibold flex items-center gap-1"
                      >
                        {t.viewDetails}
                        <ArrowRight size={18} weight="bold" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredNotices.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <MegaphoneSimple size={64} className="text-gray-400 mx-auto mb-4" weight="duotone" />
              <p className="text-xl text-gray-500 dark:text-gray-400">
                {language === 'en' ? 'No notices found in this category' : 'এই ক্যাটাগরিতে কোন নোটিশ পাওয়া যায়নি'}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal for Notice Details */}
      <AnimatePresence>
        {selectedNotice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedNotice(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${getCategoryColor(selectedNotice.category)} p-6 text-white relative`}>
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
                >
                  <X size={24} weight="bold" />
                </button>
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={20} weight="duotone" />
                  <span className="text-sm font-semibold">
                    {t.categories[selectedNotice.category]}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-2 pr-12">
                  {selectedNotice.title}
                </h2>
                <div className="flex items-center gap-2 text-white/90">
                  <Calendar size={18} weight="duotone" />
                  <span>{t.publishedOn} {new Date(selectedNotice.date).toLocaleDateString(language === 'en' ? 'en-US' : 'bn-BD', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {selectedNotice.content}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notices;
