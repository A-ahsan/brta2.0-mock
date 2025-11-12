import { motion } from 'framer-motion';

const StatCard = ({ icon, title, value, color = 'primary', trend }) => {
  const colorClasses = {
    primary: 'from-primary to-primary-dark',
    success: 'from-green-500 to-green-700',
    danger: 'from-red-500 to-red-700',
    warning: 'from-yellow-500 to-yellow-700',
    info: 'from-blue-500 to-blue-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`bg-gradient-to-br ${colorClasses[color]} p-6 rounded-xl shadow-lg text-white relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 opacity-10">
        <div className="text-8xl">{icon}</div>
      </div>
      <div className="relative z-10">
        <p className="text-sm opacity-90 mb-1">{title}</p>
        <h3 className="text-4xl font-bold mb-2">{value}</h3>
        {trend && (
          <p className="text-xs opacity-80">
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
