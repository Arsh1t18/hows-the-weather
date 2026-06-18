import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiX } from 'react-icons/fi';
import useWeatherStore from '../../store/weatherStore';

const ErrorDisplay = ({ error }) => {
  const { clearError } = useWeatherStore();

  return (
    <motion.div
      className="glass-card p-5 border border-red-300/30 flex items-start gap-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <FiAlertCircle className="text-red-300 text-2xl flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-white font-semibold mb-1">Something went wrong</p>
        <p className="text-white/70 text-sm">{error}</p>
        <p className="text-white/50 text-xs mt-2">
          Try searching for a different city or check your connection.
        </p>
      </div>
      <button
        onClick={clearError}
        className="text-white/40 hover:text-white transition-colors"
        aria-label="Dismiss error"
      >
        <FiX />
      </button>
    </motion.div>
  );
};

export default ErrorDisplay;
