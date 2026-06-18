import React from 'react';
import { motion } from 'framer-motion';
import { FiWind, FiEye, FiDroplet } from 'react-icons/fi';
import { getUVLabel, getWindDirection } from '../../utils/weatherUtils';

const MetricCard = ({ icon, label, value, sub, delay, gradient }) => (
  <motion.div
    className="glass-card p-5 flex flex-col gap-3"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.04, y: -3 }}
  >
    <div className="flex items-center justify-between">
      <p className="text-white/60 text-sm font-medium uppercase tracking-wider">{label}</p>
      <div
        className="w-9 h-9 rounded-2xl flex items-center justify-center text-white text-lg"
        style={{ background: gradient }}
      >
        {icon}
      </div>
    </div>
    <div>
      <p className="text-white font-display font-bold text-3xl">{value}</p>
      {sub && <p className="text-white/50 text-sm mt-1">{sub}</p>}
    </div>
  </motion.div>
);

const HumidityBar = ({ value }) => (
  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mt-2">
    <motion.div
      className="h-full rounded-full bg-blue-300"
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
    />
  </div>
);

const WeatherMetrics = ({ data }) => {
  const uvInfo = getUVLabel(data.uv_index || 0);
  const windDir = getWindDirection(data.wind_deg || 0);

  const metrics = [
    {
      icon: <FiDroplet />,
      label: 'Humidity',
      value: `${data.humidity}%`,
      sub: data.humidity > 70 ? 'High humidity' : data.humidity > 40 ? 'Comfortable' : 'Low humidity',
      gradient: 'linear-gradient(135deg, #29B6F6, #0288D1)',
      extra: <HumidityBar value={data.humidity} />
    },
    {
      icon: <FiWind />,
      label: 'Wind Speed',
      value: `${data.wind_speed}`,
      sub: `m/s · ${windDir}`,
      gradient: 'linear-gradient(135deg, #4FC3F7, #0288D1)'
    },
    {
      icon: '☀️',
      label: 'UV Index',
      value: data.uv_index ?? 'N/A',
      sub: uvInfo.label,
      gradient: 'linear-gradient(135deg, #FFD54F, #FF8F00)'
    },
    {
      icon: '🌡️',
      label: 'Pressure',
      value: `${data.pressure}`,
      sub: 'hPa',
      gradient: 'linear-gradient(135deg, #A5D6A7, #388E3C)'
    },
    {
      icon: <FiEye />,
      label: 'Visibility',
      value: `${data.visibility.toFixed(1)}`,
      sub: 'km',
      gradient: 'linear-gradient(135deg, #CE93D8, #7B1FA2)'
    },
    {
      icon: '💧',
      label: 'Dew Point',
      value: `${data.dew_point}°C`,
      sub: data.dew_point > 20 ? 'Humid' : data.dew_point > 10 ? 'Comfortable' : 'Dry',
      gradient: 'linear-gradient(135deg, #80DEEA, #00838F)'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h3 className="text-white/80 text-sm uppercase tracking-widest font-semibold mb-4">
        Weather Details
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((m, i) => (
          <MetricCard key={m.label} {...m} delay={0.1 + i * 0.05} />
        ))}
      </div>
    </motion.div>
  );
};

export default WeatherMetrics;
