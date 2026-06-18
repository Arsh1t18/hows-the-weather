import React from 'react';
import { motion } from 'framer-motion';
import { formatDay } from '../../utils/weatherUtils';

const ForecastCard = ({ day, index }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`;

  return (
    <motion.div
      className="glass-card flex-shrink-0 w-32 p-4 flex flex-col items-center gap-2 cursor-default"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      whileHover={{ scale: 1.05, y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}
    >
      <p className="text-white/70 text-sm font-medium">{formatDay(day.dt)}</p>
      <img src={iconUrl} alt={day.weather.description} className="w-10 h-10" />
      <p className="text-white/60 text-xs capitalize">{day.weather.description}</p>
      <div className="flex gap-2 mt-1">
        <span className="text-white font-bold text-sm">{day.temp_max}°</span>
        <span className="text-white/50 text-sm">{day.temp_min}°</span>
      </div>
      {day.pop > 0 && (
        <div className="flex items-center gap-1 mt-1">
          <span className="text-blue-200 text-xs">💧</span>
          <span className="text-blue-200/80 text-xs">{day.pop}%</span>
        </div>
      )}
    </motion.div>
  );
};

const SevenDayForecast = ({ forecast }) => {
  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-white/80 text-sm uppercase tracking-widest font-semibold mb-4">
        7-Day Forecast
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {forecast.map((day, i) => (
          <ForecastCard key={day.dt} day={day} index={i} />
        ))}
      </div>
    </motion.div>
  );
};

export default SevenDayForecast;
