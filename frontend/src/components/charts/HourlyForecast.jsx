import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { formatHour } from '../../utils/weatherUtils';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card px-4 py-3 text-sm">
        <p className="text-white/70 mb-1">{label}</p>
        <p className="text-white font-bold text-lg">{payload[0]?.value}°C</p>
        {payload[1] && (
          <p className="text-blue-200 text-xs">Feels like {payload[1]?.value}°C</p>
        )}
      </div>
    );
  }
  return null;
};

const HourlyForecast = ({ hourly }) => {
  const data = hourly.map(h => ({
    time: formatHour(h.time),
    temp: h.temp,
    feels: h.feels_like,
    humidity: h.humidity,
    icon: h.weather.icon,
    pop: Math.round(h.pop * 100)
  }));

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className="text-white/80 text-sm uppercase tracking-widest font-semibold mb-6">
        24-Hour Forecast
      </h3>

      {/* Icons row */}
      <div className="flex justify-between mb-2 px-1">
        {data.map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <span className="text-white/60 text-xs">{h.time}</span>
            <img
              src={`https://openweathermap.org/img/wn/${h.icon}.png`}
              alt=""
              className="w-8 h-8"
            />
            {h.pop > 0 && (
              <span className="text-blue-200/80 text-xs">{h.pop}%</span>
            )}
          </div>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgba(255,255,255,0.5)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="rgba(255,255,255,0)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="feelsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgba(147,197,253,0.4)" stopOpacity={0.5} />
              <stop offset="95%" stopColor="rgba(147,197,253,0)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis dataKey="time" hide />
          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
            tickFormatter={v => `${v}°`}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth={2.5}
            fill="url(#tempGradient)"
            dot={{ fill: 'white', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: 'white' }}
          />
          <Area
            type="monotone"
            dataKey="feels"
            stroke="rgba(147,197,253,0.6)"
            strokeWidth={1.5}
            fill="url(#feelsGradient)"
            strokeDasharray="4 4"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex gap-4 mt-2 justify-end">
        <div className="flex items-center gap-2 text-xs text-white/60">
          <div className="w-6 h-0.5 bg-white/90 rounded" />
          Temperature
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <div className="w-6 h-0.5 bg-blue-200/60 rounded border-dashed" style={{ borderTop: '2px dashed rgba(147,197,253,0.6)' }} />
          Feels like
        </div>
      </div>
    </motion.div>
  );
};

export default HourlyForecast;
