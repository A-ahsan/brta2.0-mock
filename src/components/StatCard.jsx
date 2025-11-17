import React from 'react';
import { motion } from 'framer-motion';

const StatCard = React.memo(({ icon, title, value, color = 'primary', trend }) => {
  const colorClasses = {
    primary: 'from-primary via-green-600 to-primary-dark',
    success: 'from-green-500 via-green-600 to-green-700',
    danger: 'from-red-500 via-red-600 to-red-700',
    warning: 'from-yellow-500 via-yellow-600 to-yellow-700',
    info: 'from-blue-500 via-blue-600 to-blue-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={{ 
        y: -5
      }}
      className={`group relative bg-gradient-to-br ${colorClasses[color]} p-6 rounded-2xl shadow-xl text-white overflow-hidden border-2 border-white/20 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl`}
      style={{ transform: 'translateZ(0)' }}
    >
      
      {/* Background icon */}
      <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <motion.div 
          className="text-8xl"
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {icon}
        </motion.div>
      </div>
      
      {/* Corner accent */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-white/10 rounded-br-3xl" />
      <div className="absolute bottom-0 right-0 w-12 h-12 bg-white/10 rounded-tl-3xl" />
      
      {/* Content */}
      <div className="relative z-10">
        <motion.p 
          className="text-sm font-semibold opacity-90 mb-2 uppercase tracking-wider"
          whileHover={{ scale: 1.05 }}
        >
          {title}
        </motion.p>
        <motion.h3 
          className="text-4xl md:text-5xl font-extrabold mb-2"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {value}
        </motion.h3>
        {trend && (
          <motion.p 
            className="text-xs opacity-90 font-semibold flex items-center gap-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className={trend > 0 ? 'text-green-200' : 'text-red-200'}>
              {trend > 0 ? '↑' : '↓'}
            </span>
            {Math.abs(trend)}% {trend > 0 ? 'increase' : 'decrease'}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';

export default StatCard;
