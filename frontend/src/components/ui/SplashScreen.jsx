import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 weather-gradient-default"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, #FFD54F, #FFB300)', top: '10%', left: '10%' }}
          animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-72 h-72 rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(circle, #4FC3F7, #29B6F6)', bottom: '10%', right: '10%' }}
          animate={{ scale: [1, 1.2, 1], x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Logo area */}
      <motion.div
        className="flex flex-col items-center gap-6 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Animated Sun Icon */}
        <motion.div
          className="relative w-24 h-24 sun-glow"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-full h-full rounded-full"
            style={{ background: 'radial-gradient(circle at 35% 35%, #FFF9C4, #FFD54F, #FFB300)' }}
          />
          {/* Sun rays */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 h-8 bg-amber-300/70 rounded-full"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-48px)`,
                transformOrigin: 'bottom center'
              }}
            />
          ))}
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white text-shadow mb-2 tracking-tight">
            How's The Weather
          </h1>
          <p className="text-white/70 font-sans text-lg font-light tracking-wide">
            Weather that changes the experience.
          </p>
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          className="flex flex-col items-center gap-3 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-white/70"
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
          <p className="text-white/60 text-sm font-light tracking-widest uppercase">
            Loading weather intelligence...
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
