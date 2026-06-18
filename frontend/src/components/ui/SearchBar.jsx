import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiClock, FiStar, FiMapPin } from 'react-icons/fi';
import useWeatherStore from '../../store/weatherStore';
import { weatherApi } from '../../services/api';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  const { fetchWeather, searchHistory, favorites, loading } = useWeatherStore();

  const handleSearch = useCallback(async (searchTerm) => {
    if (!searchTerm.trim()) return;
    setIsOpen(false);
    setQuery(searchTerm);
    setSuggestions([]);
    try {
      await fetchWeather(searchTerm.trim());
    } catch {}
  }, [fetchWeather]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setActiveIndex(-1);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (val.length >= 2) {
      setLoadingSuggestions(true);
      debounceRef.current = setTimeout(async () => {
        try {
          const results = await weatherApi.searchCities(val);
          setSuggestions(results);
          setIsOpen(true);
        } catch {
          setSuggestions([]);
        } finally {
          setLoadingSuggestions(false);
        }
      }, 350);
    } else {
      setSuggestions([]);
      setIsOpen(val.length === 0 && (searchHistory.length > 0 || favorites.length > 0));
    }
  };

  const handleFocus = () => {
    if (query.length === 0 && (searchHistory.length > 0 || favorites.length > 0)) {
      setIsOpen(true);
    }
  };

  const handleKeyDown = (e) => {
    const items = suggestions.length > 0 ? suggestions : [];
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => Math.min(prev + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && items[activeIndex]) {
        handleSearch(items[activeIndex].name);
      } else if (query.trim()) {
        handleSearch(query);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showHistory = query.length === 0 && isOpen;

  return (
    <div className="search-container relative w-full max-w-2xl mx-auto">
      {/* Search input */}
      <motion.div
        className="glass-card flex items-center gap-3 px-5 py-4"
        animate={{ boxShadow: isOpen ? '0 8px 40px rgba(0,0,0,0.15)' : '0 4px 20px rgba(0,0,0,0.08)' }}
      >
        <FiSearch className="text-white/70 text-xl flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder="Search any city in the world..."
          className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-base font-medium"
          aria-label="Search city"
          aria-autocomplete="list"
          aria-expanded={isOpen}
        />
        {query && (
          <button onClick={clearSearch} className="text-white/50 hover:text-white transition-colors">
            <FiX className="text-lg" />
          </button>
        )}
        {loading && (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0" />
        )}
      </motion.div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 glass-card overflow-hidden z-50"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {/* Suggestions from API */}
            {suggestions.length > 0 && (
              <div>
                <p className="px-4 pt-3 pb-1 text-xs text-white/50 uppercase tracking-wider font-medium">Cities</p>
                {suggestions.map((city, i) => (
                  <button
                    key={i}
                    onClick={() => handleSearch(city.name)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      activeIndex === i ? 'bg-white/20' : 'hover:bg-white/10'
                    }`}
                  >
                    <FiMapPin className="text-white/50 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">{city.name}</span>
                      <span className="text-white/50 text-sm ml-2">{city.state ? `${city.state}, ` : ''}{city.country}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Loading suggestions */}
            {loadingSuggestions && (
              <div className="px-4 py-3 text-white/50 text-sm flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Searching cities...
              </div>
            )}

            {/* History */}
            {showHistory && searchHistory.length > 0 && (
              <div>
                <p className="px-4 pt-3 pb-1 text-xs text-white/50 uppercase tracking-wider font-medium">Recent</p>
                {searchHistory.slice(0, 5).map((city, i) => (
                  <button
                    key={i}
                    onClick={() => handleSearch(city)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/10 transition-colors"
                  >
                    <FiClock className="text-white/40 flex-shrink-0" />
                    <span className="text-white/80">{city}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Favorites */}
            {showHistory && favorites.length > 0 && (
              <div className="border-t border-white/10">
                <p className="px-4 pt-3 pb-1 text-xs text-white/50 uppercase tracking-wider font-medium">Favorites</p>
                {favorites.slice(0, 4).map((city, i) => (
                  <button
                    key={i}
                    onClick={() => handleSearch(city)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/10 transition-colors"
                  >
                    <FiStar className="text-yellow-300/70 flex-shrink-0" />
                    <span className="text-white/80">{city}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Popular cities */}
            {showHistory && searchHistory.length === 0 && favorites.length === 0 && (
              <div>
                <p className="px-4 pt-3 pb-1 text-xs text-white/50 uppercase tracking-wider font-medium">Popular Cities</p>
                {['New York', 'London', 'Tokyo', 'Mumbai', 'Paris', 'Sydney'].map((city, i) => (
                  <button
                    key={i}
                    onClick={() => handleSearch(city)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/10 transition-colors"
                  >
                    <FiMapPin className="text-white/30 flex-shrink-0" />
                    <span className="text-white/70">{city}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
