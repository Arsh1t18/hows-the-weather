import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MAP_LAYERS = [
  { id: 'clouds_new', label: 'Clouds' },
  { id: 'precipitation_new', label: 'Rain' },
  { id: 'temp_new', label: 'Temp' },
  { id: 'wind_new', label: 'Wind' },
];

const WeatherMap = ({ coord }) => {
  const [activeLayer, setActiveLayer] = useState('clouds_new');
  const [zoom, setZoom] = useState(6);
  const apiKey = import.meta.env.VITE_OWM_KEY || '';

  if (!coord) return null;

  const lat = coord.lat;
  const lon = coord.lon;

  // Convert lat/lon to tile coordinates
  const getTileCoords = (lat, lon, zoom) => {
    const n = Math.pow(2, zoom);
    const x = Math.floor((lon + 180) / 360 * n);
    const latRad = lat * Math.PI / 180;
    const y = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n);
    return { x, y, z: zoom };
  };

  const { x, y, z } = getTileCoords(lat, lon, zoom);

  // Build a 3x3 grid of OSM tiles centered on location
  const osmBase = 'https://tile.openstreetmap.org';

  const tiles = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      tiles.push({ x: x + dx, y: y + dy, z, dx, dy });
    }
  }

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white/80 text-sm uppercase tracking-widest font-semibold">
          Weather Map
        </h3>
        <div className="flex gap-2">
          {MAP_LAYERS.map(layer => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeLayer === layer.id
                  ? 'bg-white/30 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/10'
              }`}
            >
              {layer.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map display */}
      <div className="relative rounded-2xl overflow-hidden" style={{ height: '300px', background: '#1a1a2e' }}>
        {/* OSM tiles grid */}
        <div
          className="absolute inset-0 grid"
          style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)' }}
        >
          {tiles.map((tile, i) => (
            <img
              key={i}
              src={`${osmBase}/${tile.z}/${tile.x}/${tile.y}.png`}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ))}
        </div>

        {/* Weather overlay */}
        <div
          className="absolute inset-0"
          style={{ opacity: 0.5 }}
        >
          <div
            className="absolute inset-0 grid"
            style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)' }}
          >
            {tiles.map((tile, i) => (
              <img
                key={i}
                src={`https://tile.openweathermap.org/map/${activeLayer}/${tile.z}/${tile.x}/${tile.y}.png?appid=${apiKey || 'demo'}`}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ))}
          </div>
        </div>

        {/* Center marker */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center">
            <div className="w-5 h-5 bg-red-400 rounded-full border-2 border-white shadow-lg" />
            <div className="w-0.5 h-3 bg-red-400/70" />
            <div className="w-3 h-1 bg-red-400/30 rounded-full" />
          </div>
        </div>

        {/* Zoom controls */}
        <div className="absolute right-3 top-3 flex flex-col gap-1">
          <button
            onClick={() => setZoom(Math.min(zoom + 1, 12))}
            className="w-8 h-8 glass-card flex items-center justify-center text-white font-bold text-lg hover:bg-white/30 transition-colors"
          >
            +
          </button>
          <button
            onClick={() => setZoom(Math.max(zoom - 1, 3))}
            className="w-8 h-8 glass-card flex items-center justify-center text-white font-bold text-lg hover:bg-white/30 transition-colors"
          >
            −
          </button>
        </div>

        {/* Layer badge */}
        <div className="absolute left-3 bottom-3 glass-card px-2.5 py-1 text-xs text-white/80">
          {MAP_LAYERS.find(l => l.id === activeLayer)?.label} Layer · Z{zoom}
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherMap;
