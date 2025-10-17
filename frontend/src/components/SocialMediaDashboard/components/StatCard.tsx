import { FC } from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  icon: JSX.Element;
  title: string;
  value: number;
  gradient: string;
  suffix?: string;
  loading?: boolean;
}

const StatCard: FC<StatCardProps> = ({ icon, title, value, gradient, suffix = '', loading }) => (
  <motion.div 
    whileHover={{ 
      scale: 1.05,
      y: -5,
      transition: { duration: 0.2 }
    }}
    className="group relative"
  >
    <motion.div 
      animate={{
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl blur"
    />
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/5 hover:border-white/10 transition-all duration-300"
    >
      <motion.div 
        whileHover={{ rotate: 5, scale: 1.1 }}
        className={`bg-gradient-to-r ${gradient} rounded-2xl p-3 w-14 h-14 mx-auto mb-4 flex items-center justify-center shadow-lg`}
      >
        {icon}
      </motion.div>
      <motion.h3 
        key={value}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-bold mb-2 text-white"
      >
        {loading ? (
          <div className="inline-block w-16 h-6 bg-gray-600/50 rounded animate-pulse"></div>
        ) : (
          `${value.toLocaleString()}${suffix}`
        )}
      </motion.h3>
      <p className="text-gray-300 text-sm mb-1">{title}</p>
      {!loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center space-x-1 text-xs"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity 
            }}
            className="w-2 h-2 bg-green-400 rounded-full"
          />
          <span className="text-green-400">Live</span>
        </motion.div>
      )}
    </motion.div>
  </motion.div>
);

export default StatCard;