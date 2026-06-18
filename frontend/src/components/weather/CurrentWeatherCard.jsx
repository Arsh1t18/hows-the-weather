import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiWind, FiEye, FiDroplet, FiSunrise, FiSunset } from 'react-icons/fi';
import { WiHumidity, WiBarometer, WiThermometer } from 'react-icons/wi';
import useWeatherStore from '../../store/weatherStore';
import { formatTime, getTheme } from '../../utils/weatherUtils';
import WeatherIllustration from './WeatherIllustration';

const CurrentWeatherCard = ({ data }) => {
  const { theme, toggleFavorite, isFavorite } = useWeatherStore();
  const t = getTheme(theme);
  const favorite = isFavorite(data.city);

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather.icon}@4x.png`;

  return (
    <motion.div
      className="glass-card p-6 md:p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        {/* Left: Main info */}
        <div className="flex-1">
          {/* City & Country */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white text-shadow">
                {data.city}
              </h2>
              <p className="text-white/70 font-medium text-lg">{data.country}</p>
            </div>
            <button
              onClick={() => toggleFavorite(data.city)}
              className="glass-button p-3 rounded-2xl"
              aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <FiHeart
                className={`text-xl transition-colors ${favorite ? 'text-red-400 fill-current' : 'text-white/70'}`}
              />
            </button>
          </div>

          {/* Condition */}
          <p className="text-white/80 text-base font-medium capitalize mb-4">
            {data.weather.description}
          </p>

          {/* Temperature */}
          <div className="flex items-end gap-4 mb-4">
            <motion.span
              className="font-display font-bold text-white text-shadow"
              style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', lineHeight: 1 }}
              key={data.temp}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {data.temp}°
            </motion.span>
            <div className="pb-3">
              <p className="text-white/60 text-sm">Feels like</p>
              <p className="text-white/90 font-semibold text-xl">{data.feels_like}°C</p>
            </div>
          </div>

          {/* High / Low */}
          <div className="flex gap-4 mb-4">
            <span className="glass-card px-3 py-1.5 text-sm font-medium text-white/90">
              ↑ {data.temp_max}° High
            </span>
            <span className="glass-card px-3 py-1.5 text-sm font-medium text-white/90">
              ↓ {data.temp_min}° Low
            </span>
          </div>

          {/* Quick stats row */}
          <div className="flex flex-wrap gap-4">
            <QuickStat icon={<FiDroplet />} label="Humidity" value={`${data.humidity}%`} />
            <QuickStat icon={<FiWind />} label="Wind" value={`${data.wind_speed} m/s`} />
            <QuickStat icon={<FiEye />} label="Visibility" value={`${data.visibility} km`} />
          </div>
        </div>

        {/* Right: Illustration + Sunrise/Sunset */}
        <div className="flex flex-col items-center gap-6">
          <WeatherIllustration theme={theme} icon={iconUrl} />

          {/* Sunrise/Sunset */}
          <div className="flex gap-6">
            <div className="text-center glass-card px-4 py-3">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Sunrise</p>
              <p className="text-white font-semibold">{formatTime(data.sunrise, data.timezone)}</p>
            </div>
            <div className="text-center glass-card px-4 py-3">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Sunset</p>
              <p className="text-white font-semibold">{formatTime(data.sunset, data.timezone)}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const QuickStat = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 glass-card px-3 py-2">
    <span className="text-white/60 text-base">{icon}</span>
    <div>
      <p className="text-white/50 text-xs">{label}</p>
      <p className="text-white font-medium text-sm">{value}</p>
    </div>
  </div>
);

export default CurrentWeatherCard;
