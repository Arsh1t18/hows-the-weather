export const THEMES = {
  sunny: {
    gradient: 'weather-gradient-sunny',
    primary: '#FFB300',
    secondary: '#FF8F00',
    accent: '#FFF8E1',
    text: 'text-amber-900',
    textLight: 'text-amber-700',
    label: 'Sunny'
  },
  rainy: {
    gradient: 'weather-gradient-rainy',
    primary: '#78909C',
    secondary: '#546E7A',
    accent: '#CFD8DC',
    text: 'text-slate-900',
    textLight: 'text-slate-700',
    label: 'Rainy'
  },
  cloudy: {
    gradient: 'weather-gradient-cloudy',
    primary: '#90A4AE',
    secondary: '#607D8B',
    accent: '#ECEFF1',
    text: 'text-slate-800',
    textLight: 'text-slate-600',
    label: 'Cloudy'
  },
  windy: {
    gradient: 'weather-gradient-windy',
    primary: '#29B6F6',
    secondary: '#0288D1',
    accent: '#E1F5FE',
    text: 'text-sky-900',
    textLight: 'text-sky-700',
    label: 'Windy'
  },
  snow: {
    gradient: 'weather-gradient-snow',
    primary: '#90CAF9',
    secondary: '#42A5F5',
    accent: '#E3F2FD',
    text: 'text-blue-900',
    textLight: 'text-blue-700',
    label: 'Snowy'
  },
  thunderstorm: {
    gradient: 'weather-gradient-thunderstorm',
    primary: '#5C6BC0',
    secondary: '#3949AB',
    accent: '#E8EAF6',
    text: 'text-indigo-950',
    textLight: 'text-indigo-800',
    label: 'Thunderstorm'
  },
  night: {
    gradient: 'weather-gradient-night',
    primary: '#3949AB',
    secondary: '#1A237E',
    accent: '#5C6BC0',
    text: 'text-indigo-100',
    textLight: 'text-indigo-300',
    label: 'Night'
  },
  default: {
    gradient: 'weather-gradient-default',
    primary: '#29B6F6',
    secondary: '#0288D1',
    accent: '#E1F5FE',
    text: 'text-sky-900',
    textLight: 'text-sky-700',
    label: 'Clear'
  }
};

export const getTheme = (themeName) => THEMES[themeName] || THEMES.default;

export const formatTime = (unix, timezone = 0) => {
  const date = new Date((unix + timezone) * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  return `${h}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

export const formatDay = (unix) => {
  const date = new Date(unix * 1000);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  if (date.toDateString() === today.toDateString()) return 'Today';
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return days[date.getDay()];
};

export const formatHour = (unix) => {
  const date = new Date(unix * 1000);
  const hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  return `${h} ${ampm}`;
};

export const getAQIColor = (index) => {
  const colors = {
    1: { bg: 'bg-green-400', text: 'text-green-900', label: 'Good' },
    2: { bg: 'bg-yellow-400', text: 'text-yellow-900', label: 'Fair' },
    3: { bg: 'bg-orange-400', text: 'text-orange-900', label: 'Moderate' },
    4: { bg: 'bg-red-400', text: 'text-red-900', label: 'Poor' },
    5: { bg: 'bg-purple-500', text: 'text-purple-900', label: 'Very Poor' }
  };
  return colors[index] || colors[1];
};

export const getUVLabel = (uv) => {
  if (uv <= 2) return { label: 'Low', color: 'text-green-500' };
  if (uv <= 5) return { label: 'Moderate', color: 'text-yellow-500' };
  if (uv <= 7) return { label: 'High', color: 'text-orange-500' };
  if (uv <= 10) return { label: 'Very High', color: 'text-red-500' };
  return { label: 'Extreme', color: 'text-purple-500' };
};

export const getWindDirection = (deg) => {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
};
