import React from 'react';
import { motion } from 'framer-motion';
import { getAQIColor } from '../../utils/weatherUtils';

const AQIMeter = ({ value }) => {
  const percent = Math.min((value / 5) * 100, 100);
  const colors = ['#4CAF50', '#FFEB3B', '#FF9800', '#F44336', '#9C27B0'];
  const color = colors[Math.min(value - 1, 4)] || colors[0];

  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        {/* Track */}
        <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
        {/* Progress */}
        <circle
          cx="60" cy="60" r="50"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 50}`}
          strokeDashoffset={`${2 * Math.PI * 50 * (1 - percent / 100)}`}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-white font-bold text-3xl font-display" style={{ color }}>
          {value}
        </span>
        <span className="text-white/50 text-xs">AQI</span>
      </div>
    </div>
  );
};

const AQIPollutant = ({ label, value, unit, delay }) => (
  <motion.div
    className="glass-card p-3 text-center"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    whileHover={{ scale: 1.03 }}
  >
    <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{label}</p>
    <p className="text-white font-bold text-lg">{value}</p>
    <p className="text-white/40 text-xs">{unit}</p>
  </motion.div>
);

const AirQuality = ({ aqi }) => {
  if (!aqi) return null;
  const aqiColor = getAQIColor(aqi.index);

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className="text-white/80 text-sm uppercase tracking-widest font-semibold mb-6">
        Air Quality
      </h3>

      <div className="flex flex-col sm:flex-row items-center gap-8">
        {/* AQI Meter */}
        <div className="flex flex-col items-center gap-2">
          <AQIMeter value={aqi.index} />
          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${aqiColor.bg} ${aqiColor.text}`}>
            {aqi.status}
          </span>
        </div>

        {/* Pollutants grid */}
        <div className="flex-1 grid grid-cols-3 gap-3 w-full">
          <AQIPollutant label="PM2.5" value={aqi.pm2_5} unit="μg/m³" delay={0.1} />
          <AQIPollutant label="PM10" value={aqi.pm10} unit="μg/m³" delay={0.15} />
          <AQIPollutant label="CO" value={aqi.co} unit="μg/m³" delay={0.2} />
          <AQIPollutant label="NO₂" value={aqi.no2} unit="μg/m³" delay={0.25} />
          <AQIPollutant label="Ozone" value={aqi.o3} unit="μg/m³" delay={0.3} />
          <AQIPollutant label="SO₂" value={aqi.so2} unit="μg/m³" delay={0.35} />
        </div>
      </div>
    </motion.div>
  );
};

export default AirQuality;
