import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useWeatherStore from '../store/weatherStore';
import WeatherBackground from '../components/weather/WeatherBackground';
import SearchBar from '../components/ui/SearchBar';
import CurrentWeatherCard from '../components/weather/CurrentWeatherCard';
import SevenDayForecast from '../components/weather/SevenDayForecast';
import HourlyForecast from '../components/charts/HourlyForecast';
import AirQuality from '../components/weather/AirQuality';
import WeatherMetrics from '../components/weather/WeatherMetrics';
import WeatherMap from '../components/weather/WeatherMap';
import FavoritesPanel from '../components/weather/FavoritesPanel';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import ErrorDisplay from '../components/ui/ErrorDisplay';

const Dashboard = () => {
  const { weatherData, loading, error, fetchWeather, theme } = useWeatherStore();

  // Load default city on first visit
  useEffect(() => {
    if (!weatherData) {
      // Try geolocation first
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            fetchWeather(null, { lat: pos.coords.latitude, lon: pos.coords.longitude });
          },
          () => {
            fetchWeather('London');
          }
        );
      } else {
        fetchWeather('London');
      }
    }
  }, []);

  return (
    <motion.div
      className="relative min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Dynamic animated background */}
      <WeatherBackground theme={theme} />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 pb-16">
        {/* Header */}
        <motion.header
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-2xl font-bold text-white/90 mb-1 tracking-tight">
            How's The Weather
          </h1>
          <p className="text-white/50 text-sm font-light">
            Weather that changes the experience.
          </p>
        </motion.header>

        {/* Search */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <div className="mb-6">
              <ErrorDisplay error={error} />
            </div>
          )}
        </AnimatePresence>

        {/* Loading state */}
        <AnimatePresence mode="wait">
          {loading && !weatherData ? (
            <LoadingSkeleton key="skeleton" />
          ) : weatherData ? (
            <motion.div
              key="content"
              className="space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero weather card */}
              <CurrentWeatherCard data={weatherData.current} />

              {/* Forecast row */}
              <SevenDayForecast forecast={weatherData.forecast} />

              {/* Hourly chart */}
              <HourlyForecast hourly={weatherData.hourly} />

              {/* Metrics + AQI side by side on large screens */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <WeatherMetrics data={weatherData.current} />
                {weatherData.aqi && <AirQuality aqi={weatherData.aqi} />}
              </div>

              {/* Map */}
              <WeatherMap coord={weatherData.current.coord} />

              {/* Favorites & History */}
              <FavoritesPanel />
            </motion.div>
          ) : (
            /* Empty state */
            <motion.div
              key="empty"
              className="flex flex-col items-center justify-center py-24 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-7xl mb-6">🌤️</div>
              <h2 className="font-display text-2xl font-bold text-white mb-2">
                Search any city
              </h2>
              <p className="text-white/60 max-w-md">
                Type a city name in the search bar above to get the current weather, forecast, air quality, and more.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Attribution */}
      <div className="fixed bottom-3 right-4 text-white/30 text-xs">
        Powered by OpenWeatherMap
      </div>
    </motion.div>
  );
};

export default Dashboard;
