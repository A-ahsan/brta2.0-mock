import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  IdentificationCard,
  FaceMask,
  CalendarCheck,
  CreditCard,
  Calculator,
  Robot,
  ArrowLeft,
  CheckCircle,
  Shield,
  Download,
  ShareNetwork,
} from 'phosphor-react';
import Navbar from '../components/Navbar';
import { useLanguage } from '../contexts/AppContext';
import { translations } from '../utils/translations';

const getIcon = (type) => {
  const iconProps = { size: 64, weight: "duotone" };
  switch(type) {
    case 'driving_license': return <IdentificationCard {...iconProps} />;
    case 'face_verification': return <FaceMask {...iconProps} />;
    case 'slot_booking': return <CalendarCheck {...iconProps} />;
    case 'payment_system': return <CreditCard {...iconProps} />;
    case 'cost_calculator': return <Calculator {...iconProps} />;
    case 'chatbot': return <Robot {...iconProps} />;
    default: return null;
  }
};

const FeatureDetail = () => {
  const { featureId } = useParams();
  const navigate = useNavigate();
  const languageContext = useLanguage();
  const language = languageContext?.language || 'en';
  const t = translations[language];

  const normalizedId = featureId ? featureId.toLowerCase().replace(/\s+/g, '_') : '';

  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [featureId]);

  const featureData = {
    driving_license: {
      title: t.drivingLicense,
      description: t.drivingLicenseDesc,
      fullDescription: language === 'en' ? 'Apply for your driving license online with our streamlined application process. Get your license approved faster with our secure and transparent system.' : 'আমাদের সহজ আবেদন প্রক্রিয়ার মাধ্যমে অনলাইনে আপনার ড্রাইভিং লাইসেন্সের জন্য আবেদন করুন। আমাদের নিরাপদ এবং স্বচ্ছ সিস্টেমের মাধ্যমে আপনার লাইসেন্স দ্রুত অনুমোদিত পান।',
      features: language === 'en' ? ['Quick online application process', 'Real-time application tracking', 'Instant approval notifications', 'Digital license delivery', '24/7 customer support', 'Secure document upload'] : ['দ্রুত অনলাইন আবেদন প্রক্রিয়া', 'রিয়েল-টাইম আবেদন ট্র্যাকিং', 'তাৎক্ষণিক অনুমোদন বিজ্ঞপ্তি', 'ডিজিটাল লাইসেন্স ডেলিভারি', '24/7 গ্রাহক সহায়তা', 'নিরাপদ ডকুমেন্ট আপলোড'],
      benefits: language === 'en' ? 'Save time with online applications, get instant notifications, and access your license anytime, anywhere.' : 'অনলাইন আবেদনের মাধ্যমে সময় বাঁচান, তাৎক্ষণিক বিজ্ঞপ্তি পান এবং যেকোনো সময় যেকোনো জায়গা থেকে আপনার লাইসেন্স অ্যাক্সেস করুন।',
    },
    face_verification: {
      title: t.faceVerification,
      description: t.faceVerificationDesc,
      fullDescription: language === 'en' ? 'State-of-the-art biometric authentication technology for enhanced security and user verification.' : 'উন্নত নিরাপত্তা এবং ব্যবহারকারী যাচাইকরণের জন্য অত্যাধুনিক বায়োমেট্রিক প্রমাণীকরণ প্রযুক্তি।',
      features: language === 'en' ? ['Advanced facial recognition', 'Liveness detection technology', 'High-accuracy verification', 'Fast processing (< 1 second)', 'Multiple verification attempts', 'Secure data encryption'] : ['উন্নত মুখ স্বীকৃতি', 'জীবন্ততা সনাক্তকরণ প্রযুক্তি', 'উচ্চ-নির্ভুলতা যাচাইকরণ', 'দ্রুত প্রক্রিয়াকরণ (< ১ সেকেন্ড)', 'একাধিক যাচাইকরণ প্রচেষ্টা', 'নিরাপদ ডেটা এনক্রিপশন'],
      benefits: language === 'en' ? 'Secure your account with world-class biometric security. Prevent fraud and ensure only authorized access.' : 'বিশ্বমানের বায়োমেট্রিক নিরাপত্তা দিয়ে আপনার অ্যাকাউন্ট সুরক্ষিত করুন। জালিয়াতি প্রতিরোধ করুন এবং শুধুমাত্র অনুমোদিত অ্যাক্সেস নিশ্চিত করুন।',
    },
    slot_booking: {
      title: t.slotBooking,
      description: t.slotBookingDesc,
      fullDescription: language === 'en' ? 'Book your test slots at your convenience with our intelligent scheduling system.' : 'আমাদের বুদ্ধিমান শিডিউলিং সিস্টেমের সাথে আপনার সুবিধামত পরীক্ষার স্লট বুক করুন।',
      features: language === 'en' ? ['Easy online slot booking', 'Multiple slot availability', 'Instant confirmation', 'Slot cancellation support', 'Reminder notifications', 'Flexible rescheduling'] : ['সহজ অনলাইন স্লট বুকিং', 'একাধিক স্লট উপলব্ধতা', 'তাৎক্ষণিক নিশ্চিতকরণ', 'স্লট বাতিলকরণ সহায়তা', 'রিমাইন্ডার বিজ্ঞপ্তি', 'নমনীয় পুনঃসময় নির্ধারণ'],
      benefits: language === 'en' ? 'Choose your preferred testing center and time. Never miss your test with automated reminders.' : 'আপনার পছন্দের পরীক্ষা কেন্দ্র এবং সময় নির্বাচন করুন। স্বয়ংক্রিয় রিমাইন্ডারের সাথে কখনও আপনার পরীক্ষা মিস করবেন না।',
    },
    payment_system: {
      title: t.paymentSystem,
      description: t.paymentSystemDesc,
      fullDescription: language === 'en' ? 'Secure online payment integration with multiple payment methods for seamless transactions.' : 'একাধিক পেমেন্ট পদ্ধতি সহ নিরাপদ অনলাইন পেমেন্ট ইন্টিগ্রেশন।',
      features: language === 'en' ? ['Multiple payment methods', 'SSL encryption security', 'Instant payment processing', 'Digital receipts', 'Payment history tracking', 'Refund support'] : ['একাধিক পেমেন্ট পদ্ধতি', 'SSL এনক্রিপশন নিরাপত্তা', 'তাৎক্ষণিক পেমেন্ট প্রক্রিয়াকরণ', 'ডিজিটাল রসিদ', 'পেমেন্ট ইতিহাস ট্র্যাকিং', 'রিফান্ড সহায়তা'],
      benefits: language === 'en' ? 'Pay securely with your preferred method. Get instant confirmation and digital receipts for all transactions.' : 'আপনার পছন্দের পদ্ধতিতে নিরাপদে অর্থ প্রদান করুন। সমস্ত লেনদেনের জন্য তাৎক্ষণিক নিশ্চিতকরণ এবং ডিজিটাল রসিদ পান।',
    },
    cost_calculator: {
      title: t.costCalculator,
      description: t.costCalculatorDesc,
      fullDescription: language === 'en' ? 'Calculate all fees and costs associated with licenses and vehicle registrations instantly.' : 'লাইসেন্স এবং যানবাহন নিবন্ধনের সাথে যুক্ত সমস্ত ফি এবং খরচ তাৎক্ষণিকভাবে গণনা করুন।',
      features: language === 'en' ? ['Transparent fee calculation', 'Multiple vehicle types', 'License category breakdown', 'Tax calculation included', 'No hidden charges', 'Export cost summary'] : ['স্বচ্ছ ফি গণনা', 'একাধিক যানবাহন ধরন', 'লাইসেন্স বিভাগ বিভাজন', 'ট্যাক্স গণনা অন্তর্ভুক্ত', 'কোন লুকানো চার্জ নেই', 'খরচ সারসংক্ষেপ রপ্তানি করুন'],
      benefits: language === 'en' ? 'Know exactly how much you need to pay before applying. No surprises, complete transparency.' : 'আবেদনের আগে জানুন আপনাকে ঠিক কত পরিমাণ অর্থ প্রদান করতে হবে। কোন সারপ্রাইজ নেই, সম্পূর্ণ স্বচ্ছতা।',
    },
    chatbot: {
      title: t.chatbot,
      description: t.chatbotDesc,
      fullDescription: language === 'en' ? '24/7 AI-powered chatbot assistance for instant answers to all your questions.' : '२४/७ এআই-চালিত চ্যাটবট সহায়তা আপনার সমস্ত প্রশ্নের তাৎক্ষণিক উত্তরের জন্য।',
      features: language === 'en' ? ['Instant response 24/7', 'Multi-language support', 'Smart question understanding', 'Human agent escalation', 'Chat history tracking', 'Personalized assistance'] : ['०२४/७ তাৎক্ষণিক প্রতিক্রিয়া', 'মাল্টি-ভাষা সমর্থন', 'স্মার্ট প্রশ্ন বোঝা', 'মানব এজেন্ট এসকেলেশন', 'চ্যাট ইতিহাস ট্র্যাকিং', 'ব্যক্তিগতকৃত সহায়তা'],
      benefits: language === 'en' ? 'Get instant answers without waiting. Our AI chatbot understands your needs and provides accurate solutions.' : 'অপেক্ষা না করে তাৎক্ষণিক উত্তর পান। আমাদের এআই চ্যাটবট আপনার চাহিদা বোঝে এবং সঠিক সমাধান প্রদান করে।',
    },
  };

  const feature = featureData[normalizedId];

  if (!feature) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-light via-white to-muted dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {language === 'en' ? 'Feature not found' : 'বৈশিষ্ট্য পাওয়া যায়নি'}
          </h1>
          <button onClick={() => navigate('/')} className="mt-6 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all">
            {language === 'en' ? 'Go Back' : 'ফিরে যান'}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-white to-muted dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="fixed top-24 left-4 md:left-8 z-40 flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all text-gray-800 dark:text-white"
      >
        <ArrowLeft size={20} />
        <span className="hidden sm:inline">{language === 'en' ? 'Back' : 'ফিরে'}</span>
      </motion.button>

      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Main gradient orb with morphing effect */}
          <motion.div
            animate={{ 
              x: [0, 100, 0], 
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
              borderRadius: ["50%", "40%", "50%"]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary/10 via-green-500/10 to-primary/5 blur-3xl"
          />
          
          {/* Geometric shapes background */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-[15%] left-[5%] w-32 h-32 border-2 border-primary/10"
            style={{ clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" }}
          />
          <motion.div
            animate={{ rotate: -360, scale: [1, 1.1, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[20%] right-[8%] w-24 h-24 border-2 border-green-600/10 rounded-xl"
          />
          
          {/* Floating Icons - Feature Specific */}
          {normalizedId === 'driving_license' && (
            <>
              {/* Primary icon with glow effect */}
              <motion.div
                animate={{ 
                  y: [0, -30, 0], 
                  rotate: [0, 5, 0],
                  filter: ["drop-shadow(0 0 8px rgba(0,106,78,0.3))", "drop-shadow(0 0 20px rgba(0,106,78,0.5))", "drop-shadow(0 0 8px rgba(0,106,78,0.3))"]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-40 left-[10%] opacity-20"
              >
                <IdentificationCard size={80} weight="duotone" className="text-primary" />
              </motion.div>
              {/* Shield with pulse */}
              <motion.div
                animate={{ 
                  y: [0, 25, 0], 
                  rotate: [0, -5, 0],
                  scale: [1, 1.08, 1]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[60%] right-[15%] opacity-15"
              >
                <div className="relative">
                  <Shield size={100} weight="duotone" className="text-green-600" />
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 bg-green-600/20 rounded-full blur-xl"
                  />
                </div>
              </motion.div>
              {/* Checkmark with trail */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0], 
                  x: [0, 10, 0],
                  opacity: [0.1, 0.15, 0.1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-40 left-[20%]"
              >
                <CheckCircle size={70} weight="duotone" className="text-primary" />
              </motion.div>
              {/* Floating particles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -100, 0],
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{ 
                    duration: 4 + i, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: i * 0.8
                  }}
                  className="absolute w-1 h-1 bg-primary/40 rounded-full"
                  style={{
                    left: `${15 + i * 15}%`,
                    bottom: `${20 + i * 5}%`
                  }}
                />
              ))}
            </>
          )}
          
          {normalizedId === 'face_verification' && (
            <>
              {/* Scanning face icon with scan lines */}
              <motion.div
                animate={{ 
                  y: [0, -35, 0], 
                  scale: [1, 1.1, 1] 
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-32 left-[12%] opacity-20 relative"
              >
                <FaceMask size={90} weight="duotone" className="text-primary" />
                <motion.div
                  animate={{ y: [0, 90, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-full h-0.5 bg-primary/40"
                />
              </motion.div>
              {/* Pulsing shield */}
              <motion.div
                animate={{ 
                  y: [0, 30, 0], 
                  rotate: [0, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute top-[55%] right-[10%] opacity-15"
              >
                <Shield size={110} weight="duotone" className="text-green-600" />
                <motion.div
                  animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 border-2 border-green-600/30 rounded-full"
                />
              </motion.div>
              {/* Orbiting checkmarks */}
              <motion.div
                className="absolute bottom-32 right-[25%]"
                style={{ width: 100, height: 100 }}
              >
                {[0, 120, 240].map((angle, i) => (
                  <motion.div
                    key={i}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
                    className="absolute top-1/2 left-1/2"
                    style={{ transformOrigin: "0 0" }}
                  >
                    <div style={{ transform: `rotate(${angle}deg) translateX(50px)` }}>
                      <CheckCircle size={20} weight="fill" className="text-primary opacity-30" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
          
          {normalizedId === 'slot_booking' && (
            <>
              {/* Calendar with page flip effect */}
              <motion.div
                animate={{ 
                  y: [0, -30, 0], 
                  rotateY: [0, 180, 360]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-36 right-[8%] opacity-20"
                style={{ transformStyle: "preserve-3d" }}
              >
                <CalendarCheck size={85} weight="duotone" className="text-primary" />
              </motion.div>
              {/* Animated clock/time indicators */}
              <motion.div className="absolute top-[58%] left-[12%] opacity-15">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <CheckCircle size={95} weight="duotone" className="text-green-600" />
                </motion.div>
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-1 h-3 bg-green-600/30"
                    style={{
                      transform: `rotate(${i * 30}deg) translateY(-40px)`,
                      transformOrigin: "0 40px"
                    }}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
              </motion.div>
              {/* Bouncing calendar icons */}
              <motion.div
                animate={{ 
                  y: [0, -22, 0], 
                  rotate: [0, 6, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-36 right-[22%] opacity-12"
              >
                <CalendarCheck size={70} weight="duotone" className="text-primary" />
              </motion.div>
            </>
          )}
          
          {normalizedId === 'payment_system' && (
            <>
              {/* Credit card with swipe effect */}
              <motion.div
                animate={{ 
                  y: [0, -32, 0], 
                  rotateZ: [0, 12, 0],
                  x: [0, 20, 0]
                }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-44 left-[15%] opacity-20"
              >
                <CreditCard size={88} weight="duotone" className="text-primary" />
                <motion.div
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                />
              </motion.div>
              {/* Shield with lock icon */}
              <motion.div
                animate={{ 
                  y: [0, 26, 0], 
                  scale: [1, 1.05, 1] 
                }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="absolute top-[62%] right-[18%] opacity-15"
              >
                <Shield size={105} weight="duotone" className="text-green-600" />
                <motion.div
                  animate={{ scale: [0.8, 1.2, 0.8], opacity: [1, 0, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-green-600/40"
                />
              </motion.div>
              {/* Currency symbols floating */}
              {['৳', '$', '€'].map((symbol, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -60, 0],
                    opacity: [0.15, 0.3, 0.15],
                    rotate: [0, 360, 0]
                  }}
                  transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
                  className="absolute text-4xl font-bold text-primary opacity-10"
                  style={{
                    left: `${20 + i * 25}%`,
                    bottom: `${30 + i * 10}%`
                  }}
                >
                  {symbol}
                </motion.div>
              ))}
              <motion.div
                animate={{ 
                  y: [0, -28, 0], 
                  x: [0, 8, 0] 
                }}
                transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute bottom-28 left-[18%] opacity-12"
              >
                <CheckCircle size={72} weight="duotone" className="text-primary" />
              </motion.div>
            </>
          )}
          
          {normalizedId === 'cost_calculator' && (
            <>
              {/* Calculator with number animation */}
              <motion.div
                animate={{ 
                  y: [0, -28, 0], 
                  x: [0, -10, 0] 
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-38 right-[12%] opacity-20 relative"
              >
                <Calculator size={82} weight="duotone" className="text-primary" />
                {[1, 2, 3].map((num, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -20, -40],
                      opacity: [1, 0.5, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: i * 0.6,
                      ease: "easeOut"
                    }}
                    className="absolute top-0 left-1/2 text-primary font-bold text-sm"
                  >
                    {num}
                  </motion.div>
                ))}
              </motion.div>
              {/* Graph bars animation */}
              <motion.div className="absolute top-[56%] left-[10%] opacity-15 flex gap-2 items-end h-24">
                {[60, 80, 50, 95, 70].map((height, i) => (
                  <motion.div
                    key={i}
                    animate={{ scaleY: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    className="w-3 bg-green-600 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </motion.div>
              {/* Percentage signs */}
              <motion.div
                animate={{ 
                  y: [0, -24, 0], 
                  rotate: [0, 360, 720],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute bottom-40 right-[20%] opacity-12 text-3xl font-bold text-primary"
              >
                %
              </motion.div>
            </>
          )}
          
          {normalizedId === 'chatbot' && (
            <>
              {/* Robot with antenna pulse */}
              <motion.div
                animate={{ 
                  y: [0, -35, 0], 
                  scale: [1, 1.08, 1] 
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-42 left-[14%] opacity-20 relative"
              >
                <Robot size={92} weight="duotone" className="text-primary" />
                <motion.div
                  animate={{ 
                    scaleY: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-primary"
                />
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full"
                />
              </motion.div>
              {/* Chat bubbles */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -40, -80],
                    x: [0, (i - 1) * 15, (i - 1) * 30],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: i * 0.8,
                    ease: "easeOut"
                  }}
                  className="absolute top-[60%] right-[14%] w-8 h-8 bg-green-600/20 rounded-lg"
                  style={{ borderRadius: "50% 50% 50% 0" }}
                />
              ))}
              {/* Network nodes */}
              <motion.div className="absolute bottom-34 left-[22%] w-32 h-32">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    className="absolute w-3 h-3 bg-primary/40 rounded-full"
                    style={{
                      top: `${Math.sin(i * Math.PI / 2) * 50 + 50}%`,
                      left: `${Math.cos(i * Math.PI / 2) * 50 + 50}%`
                    }}
                  />
                ))}
              </motion.div>
            </>
          )}
          
          {/* Decorative Elements - All Features - More Creative */}
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-[5%] w-4 h-4 border-2 border-primary/30 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute top-[70%] right-[8%]"
          >
            <div className="w-6 h-6 border-2 border-green-600/25" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
          </motion.div>
          <motion.div
            animate={{ 
              scale: [1, 1.5, 1], 
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[45%] left-[8%] w-2 h-2 bg-primary/40"
            style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 bg-gradient-to-r from-primary to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <div className="text-white">{getIcon(featureId)}</div>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-gray-800 via-primary to-gray-800 dark:from-white dark:via-green-400 dark:to-white bg-clip-text text-transparent">
              {feature.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {feature.fullDescription}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-primary to-green-600 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <Download size={20} />
              {language === 'en' ? 'Get Started' : 'শুরু করুন'}
            </button>
            <button className="px-8 py-4 bg-white dark:bg-gray-800 text-primary dark:text-green-400 rounded-lg font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 border-2 border-primary">
              <ShareNetwork size={20} />
              {language === 'en' ? 'Share' : 'শেয়ার করুন'}
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white dark:bg-gray-800/50 relative overflow-hidden">
        {/* Subtle Background Animation */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"
        />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-4xl font-extrabold mb-12 text-center text-gray-800 dark:text-white">
            {language === 'en' ? 'Key Features' : 'মূল বৈশিষ্ট্য'}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {feature.features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="flex items-start gap-4 p-6 bg-gradient-to-r from-primary/10 to-green-600/10 rounded-xl border border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                >
                  <CheckCircle size={28} className="text-primary flex-shrink-0 mt-1" weight="fill" />
                </motion.div>
                <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 relative overflow-hidden">
        {/* Animated Background Particles */}
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-[10%] w-20 h-20 bg-green-500/10 rounded-full blur-xl pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 25, 0], x: [0, -20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 left-[8%] w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"
        />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-primary via-green-600 to-primary rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden"
          >
            {/* Floating shield icon in background */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0], y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 right-8 opacity-10"
            >
              <Shield size={120} weight="duotone" />
            </motion.div>
            
            <div className="flex items-start gap-6 relative z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Shield size={48} weight="duotone" className="flex-shrink-0" />
              </motion.div>
              <div>
                <h3 className="text-3xl font-bold mb-4">
                  {language === 'en' ? 'Why Choose This Feature?' : 'এই বৈশিষ্ট্য কেন বেছে নিন?'}
                </h3>
                <p className="text-lg leading-relaxed opacity-90">{feature.benefits}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white dark:bg-gray-800/50 relative overflow-hidden">
        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [0, -30, 0], rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-[5%] w-16 h-16 border-4 border-primary/20 rounded-full pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 25, 0], rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-[8%] w-20 h-20 border-4 border-green-600/20 rounded-full pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-4xl font-extrabold mb-6 text-gray-800 dark:text-white"
          >
            {language === 'en' ? 'Ready to Get Started?' : 'শুরু করতে প্রস্তুত?'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
          >
            {language === 'en'
              ? 'Join thousands of users enjoying seamless vehicle and license management.'
              : 'হাজার হাজার ব্যবহারকারীদের সাথে যুক্ত হন যারা নিরবচ্ছিন্ন যানবাহন এবং লাইসেন্স ব্যবস্থাপনা উপভোগ করছেন।'}
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 106, 78, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-primary to-green-600 text-white rounded-lg font-bold text-lg hover:shadow-xl transition-all"
          >
            {language === 'en' ? 'Start Now' : 'এখনই শুরু করুন'}
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default FeatureDetail;
