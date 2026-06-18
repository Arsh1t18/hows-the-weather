import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiX, FiTrash2 } from 'react-icons/fi';
import useWeatherStore from '../../store/weatherStore';

const FavoritesPanel = () => {
  const { favorites, toggleFavorite, fetchWeather, clearHistory, searchHistory } = useWeatherStore();

  if (favorites.length === 0 && searchHistory.length === 0) return null;

  return (
    <motion.div
      className="glass-card p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      {/* Favorites */}
      {favorites.length > 0 && (
        <div className="mb-5">
          <h3 className="text-white/80 text-sm uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
            <FiStar className="text-yellow-300" />
            Favorite Cities
          </h3>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {favorites.map(city => (
                <motion.div
                  key={city}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 glass-card px-3 py-2"
                >
                  <button
                    onClick={() => fetchWeather(city)}
                    className="text-white font-medium text-sm hover:text-yellow-200 transition-colors"
                  >
                    {city}
                  </button>
                  <button
                    onClick={() => toggleFavorite(city)}
                    className="text-white/40 hover:text-red-300 transition-colors ml-1"
                    aria-label={`Remove ${city} from favorites`}
                  >
                    <FiX className="text-sm" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Recent searches */}
      {searchHistory.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white/80 text-sm uppercase tracking-widest font-semibold">
              Recent Searches
            </h3>
            <button
              onClick={clearHistory}
              className="flex items-center gap-1 text-white/40 hover:text-white/70 text-xs transition-colors"
            >
              <FiTrash2 />
              Clear
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchHistory.slice(0, 8).map((city, i) => (
              <motion.button
                key={city}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => fetchWeather(city)}
                className="glass-card px-3 py-2 text-white/70 hover:text-white text-sm font-medium transition-colors"
              >
                {city}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default FavoritesPanel;
