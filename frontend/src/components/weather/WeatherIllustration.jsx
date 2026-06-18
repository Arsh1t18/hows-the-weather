import React from 'react';
import { motion } from 'framer-motion';

const SunIllustration = () => (
  <div className="relative w-40 h-40 flex items-center justify-center">
    {/* Outer glow rings */}
    {[1, 2, 3].map(i => (
      <motion.div
        key={i}
        className="absolute rounded-full border-2 border-yellow-200/30"
        style={{ width: 50 + i * 25, height: 50 + i * 25 }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2 + i, repeat: Infinity, delay: i * 0.3 }}
      />
    ))}
    {/* Sun body */}
    <motion.div
      className="relative w-20 h-20 rounded-full sun-glow z-10"
      style={{ background: 'radial-gradient(circle at 35% 35%, #FFF9C4, #FFD54F, #FFB300)' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
    >
      {/* Rays */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 w-1.5 h-6 bg-yellow-200/80 rounded-full"
          style={{
            transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-44px)`
          }}
        />
      ))}
    </motion.div>
  </div>
);

const RainIllustration = () => (
  <div className="relative w-40 h-40 flex items-center justify-center overflow-hidden">
    {/* Cloud */}
    <motion.div
      className="absolute top-6 w-32 h-14 bg-white/30 rounded-full blur-sm"
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.div
      className="absolute top-10 left-8 w-24 h-12 bg-white/25 rounded-full blur-sm"
      animate={{ x: [0, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    {/* Raindrops */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-0.5 rounded-full bg-blue-200/80"
        style={{ left: `${20 + i * 10}%`, height: '20px', top: '-20px' }}
        animate={{ y: [0, 120], opacity: [0.8, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1, ease: 'linear' }}
      />
    ))}
  </div>
);

const CloudIllustration = () => (
  <div className="relative w-40 h-40 flex items-center justify-center">
    <motion.div
      className="absolute w-36 h-16 bg-white/40 rounded-full blur-sm"
      animate={{ x: [0, 8, 0], y: [0, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute top-8 left-4 w-28 h-14 bg-white/30 rounded-full blur-sm"
      animate={{ x: [0, -6, 0], y: [0, 5, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
    />
    <motion.div
      className="absolute top-4 right-4 w-16 h-16 bg-white/50 rounded-full"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  </div>
);

const WindIllustration = () => (
  <div className="relative w-40 h-40 flex items-center justify-center overflow-hidden">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-1 rounded-full bg-white/60"
        style={{ width: 30 + i * 20, top: `${20 + i * 15}%` }}
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
      />
    ))}
    {/* Wind swirl */}
    <motion.div
      className="w-16 h-16 border-4 border-white/30 rounded-full"
      style={{ borderTopColor: 'rgba(255,255,255,0.7)' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
    />
  </div>
);

const SnowIllustration = () => (
  <div className="relative w-40 h-40 flex items-center justify-center overflow-hidden">
    {/* Cloud */}
    <motion.div
      className="absolute top-4 w-32 h-14 bg-white/40 rounded-full"
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    {/* Snowflakes */}
    {['❄', '❅', '❆', '✦', '❄', '❅'].map((flake, i) => (
      <motion.span
        key={i}
        className="absolute text-white/80 text-lg"
        style={{ left: `${15 + i * 15}%`, top: '0%' }}
        animate={{ y: [0, 140], opacity: [0.8, 0], rotate: [0, 360] }}
        transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3, ease: 'linear' }}
      >
        {flake}
      </motion.span>
    ))}
  </div>
);

const ThunderIllustration = () => (
  <div className="relative w-40 h-40 flex items-center justify-center">
    {/* Dark storm cloud */}
    <motion.div
      className="absolute top-4 w-36 h-16 rounded-full"
      style={{ background: 'rgba(92, 107, 192, 0.5)' }}
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    {/* Lightning bolt */}
    <motion.div
      className="absolute text-yellow-300 font-bold"
      style={{ fontSize: '64px', top: '30%', lineHeight: 1 }}
      animate={{ opacity: [0, 1, 0.5, 1, 0], scale: [0.9, 1.1, 1] }}
      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
    >
      ⚡
    </motion.div>
    {/* Rain */}
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-0.5 h-4 bg-blue-200/80 rounded-full"
        style={{ left: `${20 + i * 15}%`, bottom: '0%' }}
        animate={{ y: [-40, 20], opacity: [0.8, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
      />
    ))}
  </div>
);

const NightIllustration = () => (
  <div className="relative w-40 h-40 flex items-center justify-center">
    {/* Moon */}
    <motion.div
      className="w-20 h-20 rounded-full"
      style={{ background: 'radial-gradient(circle at 35% 30%, #FFF9C4, #FFD54F)', boxShadow: '0 0 30px 10px rgba(255,220,80,0.2)' }}
      animate={{ scale: [1, 1.04, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    {/* Stars */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 bg-white rounded-full"
        style={{ left: `${10 + i * 15}%`, top: `${10 + (i % 3) * 25}%` }}
        animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
      />
    ))}
  </div>
);

const WeatherIllustration = ({ theme }) => {
  const illustrations = {
    sunny: SunIllustration,
    rainy: RainIllustration,
    cloudy: CloudIllustration,
    windy: WindIllustration,
    snow: SnowIllustration,
    thunderstorm: ThunderIllustration,
    night: NightIllustration,
    default: SunIllustration
  };

  const Illustration = illustrations[theme] || illustrations.default;

  return (
    <motion.div
      key={theme}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Illustration />
    </motion.div>
  );
};

export default WeatherIllustration;
