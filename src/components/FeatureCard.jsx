import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

const FeatureCard = React.memo(({ icon, title, description, delay = 0, featureId = '' }) => {
  const navigate = useNavigate();

  const getFeatureId = () => {
    if (featureId) return featureId;
    // Generate ID from title
    return title.toLowerCase().replace(/\s+/g, '_').replace(/[&]/g, 'and');
  };

  const handleClick = () => {
    navigate(`/feature/${getFeatureId()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      onClick={handleClick}
      className="group relative bg-gradient-to-br from-white via-white to-gray-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900/50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/50 overflow-hidden cursor-pointer"
      style={{ transform: 'translateZ(0)' }}
    >
      {/* Animated background gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      
        {/* Corner decorative accents removed from feature card */}
      
      <div className="relative z-10">
        {/* Icon Container */}
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="relative w-20 h-20 bg-gradient-to-br from-primary via-green-600 to-primary-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-2xl group-hover:shadow-primary/30 transition-all duration-300"
        >
          {/* Inner glow */}
          <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="text-white text-3xl relative z-10">{icon}</div>
          
            {/* Floating particle removed to simplify visuals */}
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-green-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          {description}
        </p>
        
        {/* Hover arrow indicator */}
        <motion.div
          className="flex items-center gap-2 text-primary dark:text-green-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <span>Learn more</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight size={16} weight="bold" />
          </motion.div>
        </motion.div>
      </div>

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"
      />
    </motion.div>
  );
});

FeatureCard.displayName = 'FeatureCard';

export default FeatureCard;
