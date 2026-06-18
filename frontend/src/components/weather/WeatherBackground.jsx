import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Sunny background with floating particles and glow
const SunnyBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Central sun glow */}
    <motion.div
      className="absolute top-10 right-20 w-64 h-64 rounded-full sun-glow opacity-40"
      style={{ background: 'radial-gradient(circle, #FFF9C4, #FFD54F, transparent)' }}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* Floating light particles */}
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-3 h-3 rounded-full bg-yellow-200/50"
        style={{
          left: `${10 + i * 8}%`,
          top: `${20 + (i % 3) * 25}%`
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.4, 1]
        }}
        transition={{
          duration: 3 + i * 0.4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: i * 0.3
        }}
      />
    ))}
    {/* Gentle clouds */}
    <motion.div
      className="absolute top-16 left-10 w-32 h-12 rounded-full bg-white/20 blur-xl"
      animate={{ x: [0, 40, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute top-32 right-32 w-48 h-16 rounded-full bg-white/15 blur-xl"
      animate={{ x: [0, -30, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
    />
  </div>
);

// Rain animation
const RainyBackground = () => {
  const raindrops = useMemo(() =>
    [...Array(40)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      height: `${40 + Math.random() * 60}px`,
      duration: `${0.5 + Math.random() * 0.5}s`,
      delay: `${Math.random() * 2}s`,
      opacity: 0.3 + Math.random() * 0.4
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="rain-container">
        {raindrops.map((drop, i) => (
          <div
            key={i}
            className="raindrop"
            style={{
              left: drop.left,
              height: drop.height,
              animationDuration: drop.duration,
              animationDelay: drop.delay,
              opacity: drop.opacity
            }}
          />
        ))}
      </div>
      {/* Misty overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10" />
    </div>
  );
};

// Cloud animation
const CloudyBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[
      { top: '5%', delay: 0, size: 'w-72 h-20', opacity: 0.3 },
      { top: '20%', delay: 3, size: 'w-96 h-24', opacity: 0.25 },
      { top: '35%', delay: 6, size: 'w-60 h-16', opacity: 0.2 },
      { top: '55%', delay: 9, size: 'w-80 h-20', opacity: 0.15 },
    ].map((cloud, i) => (
      <motion.div
        key={i}
        className={`absolute ${cloud.size} rounded-full bg-white blur-2xl`}
        style={{ top: cloud.top, left: '-20%', opacity: cloud.opacity }}
        animate={{ x: ['-20%', '130%'] }}
        transition={{ duration: 25 + i * 5, repeat: Infinity, ease: 'linear', delay: cloud.delay }}
      />
    ))}
  </div>
);

// Wind animation
const WindyBackground = () => {
  const streaks = useMemo(() =>
    [...Array(20)].map((_, i) => ({
      top: `${5 + i * 5}%`,
      width: `${80 + Math.random() * 120}px`,
      duration: `${1.5 + Math.random() * 2}s`,
      delay: `${Math.random() * 3}s`,
      opacity: 0.2 + Math.random() * 0.3
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {streaks.map((streak, i) => (
        <div
          key={i}
          className="wind-streak"
          style={{
            top: streak.top,
            width: streak.width,
            animationDuration: streak.duration,
            animationDelay: streak.delay,
            opacity: streak.opacity
          }}
        />
      ))}
    </div>
  );
};

// Snow animation
const SnowBackground = () => {
  const snowflakes = useMemo(() =>
    [...Array(30)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      size: `${8 + Math.random() * 12}px`,
      duration: `${4 + Math.random() * 4}s`,
      delay: `${Math.random() * 6}s`
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {snowflakes.map((flake, i) => (
        <div
          key={i}
          className="snowflake text-white/70"
          style={{
            left: flake.left,
            fontSize: flake.size,
            animationDuration: flake.duration,
            animationDelay: flake.delay
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};

// Thunderstorm animation
const ThunderstormBackground = () => {
  const raindrops = useMemo(() =>
    [...Array(50)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      height: `${30 + Math.random() * 50}px`,
      duration: `${0.3 + Math.random() * 0.3}s`,
      delay: `${Math.random() * 1.5}s`,
      opacity: 0.4 + Math.random() * 0.4
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Heavy rain */}
      <div className="rain-container">
        {raindrops.map((drop, i) => (
          <div
            key={i}
            className="raindrop"
            style={{
              left: drop.left,
              height: drop.height,
              animationDuration: drop.duration,
              animationDelay: drop.delay,
              opacity: drop.opacity
            }}
          />
        ))}
      </div>
      {/* Lightning flashes */}
      <motion.div
        className="absolute inset-0 bg-white/20 lightning-bolt"
        style={{ animationDuration: '5s', animationDelay: '2s' }}
        animate={{ opacity: [0, 0, 0, 1, 0.5, 0, 0, 0, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0 bg-blue-200/15 lightning-bolt"
        animate={{ opacity: [0, 0, 0, 0, 0, 1, 0, 0, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </div>
  );
};

// Night background
const NightBackground = () => {
  const stars = useMemo(() =>
    [...Array(80)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 70}%`,
      size: `${1 + Math.random() * 2}px`,
      delay: Math.random() * 3
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: star.delay }}
        />
      ))}
      {/* Moon */}
      <motion.div
        className="absolute top-16 right-24 w-20 h-20 rounded-full"
        style={{ background: 'radial-gradient(circle at 35% 30%, #FFF9C4, #FFD54F)', boxShadow: '0 0 40px 15px rgba(255, 220, 80, 0.2)' }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
};

const WeatherBackground = ({ theme }) => {
  const components = {
    sunny: SunnyBackground,
    rainy: RainyBackground,
    cloudy: CloudyBackground,
    windy: WindyBackground,
    snow: SnowBackground,
    thunderstorm: ThunderstormBackground,
    night: NightBackground,
    default: WindyBackground
  };

  const Background = components[theme] || components.default;
  return <Background />;
};

export default WeatherBackground;

