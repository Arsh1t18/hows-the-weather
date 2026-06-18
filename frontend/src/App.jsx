import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './components/ui/SplashScreen';
import Dashboard from './pages/Dashboard';
import useWeatherStore from './store/weatherStore';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const { theme } = useWeatherStore();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-1000 ${getGradientClass(theme)}`}>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        ) : (
          <Routes>
            <Route path="/" element={<Dashboard key="dashboard" />} />
          </Routes>
        )}
      </AnimatePresence>
    </div>
  );
}

function getGradientClass(theme) {
  const map = {
    sunny: 'weather-gradient-sunny',
    rainy: 'weather-gradient-rainy',
    cloudy: 'weather-gradient-cloudy',
    windy: 'weather-gradient-windy',
    snow: 'weather-gradient-snow',
    thunderstorm: 'weather-gradient-thunderstorm',
    night: 'weather-gradient-night',
    default: 'weather-gradient-default'
  };
  return map[theme] || map.default;
}

export default App;
