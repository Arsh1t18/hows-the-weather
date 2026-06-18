# 🌤️ How's The Weather

> **Weather that changes the experience.**

A premium, Apple-inspired dynamic weather dashboard built with React.js, Vite, Tailwind CSS, Framer Motion, and Node.js. The entire UI transforms based on live weather conditions — sunny, rainy, cloudy, windy, snowy, stormy, or night.

---

## ✨ Features

- **Dynamic Themes** — UI, gradients, and animations adapt to live weather (Sunny / Rainy / Cloudy / Windy / Snow / Thunderstorm / Night)
- **Animated Backgrounds** — Rain particles, snowflakes, wind streaks, lightning flashes, floating sun particles, stars
- **City Search** — Autocomplete with API-powered suggestions, recent searches, favorites
- **Current Weather** — Temperature, feels like, humidity, wind, visibility, pressure, sunrise/sunset
- **7-Day Forecast** — Day, icon, high/low, rain probability
- **24-Hour Chart** — Interactive temperature area chart with hourly icons (Recharts)
- **Air Quality** — AQI index, status, PM2.5, PM10, CO, NO₂, Ozone, SO₂
- **Weather Metrics** — Humidity bar, wind direction, UV index, pressure, visibility, dew point
- **Weather Map** — OSM tiles + OpenWeatherMap layers (Clouds, Rain, Temp, Wind) with zoom
- **Favorites** — Save/remove cities, persist to localStorage via Zustand
- **Geolocation** — Auto-detects your location on first load
- **Fully Responsive** — Mobile-first, works on all screen sizes
- **Accessible** — Keyboard navigation, semantic HTML, ARIA labels, reduced-motion support

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5, Tailwind CSS 3 |
| Animations | Framer Motion 10 |
| Charts | Recharts |
| State | Zustand (with persistence) |
| Routing | React Router DOM 6 |
| Icons | React Icons |
| Backend | Node.js, Express 4 |
| HTTP | Axios |
| API | OpenWeatherMap (Current, Forecast, AQI, Geocoding) |
| Security | Helmet, express-rate-limit, CORS |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- [OpenWeatherMap API key](https://openweathermap.org/api) (free tier works)

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd hows-the-weather

# Install all dependencies
npm run install:all
# or manually:
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
OPENWEATHER_API_KEY=your_api_key_here
NODE_ENV=development
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Servers

```bash
# Both simultaneously (requires root npm install)
npm install
npm run dev

# Or separately:
npm run dev:backend   # http://localhost:5000
npm run dev:frontend  # http://localhost:5173
```

Open **http://localhost:5173** 🎉

---

## 📁 Project Structure

```
hows-the-weather/
├── backend/
│   ├── controllers/
│   │   └── weatherController.js   # Business logic, data processing
│   ├── routes/
│   │   └── weather.js             # Express routes
│   ├── services/
│   │   └── weatherService.js      # OpenWeatherMap API calls
│   ├── server.js                  # Express app, middleware
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── weather/
│   │   │   │   ├── CurrentWeatherCard.jsx   # Hero weather card
│   │   │   │   ├── WeatherIllustration.jsx  # Animated SVG illustrations
│   │   │   │   ├── WeatherBackground.jsx    # Dynamic animated backgrounds
│   │   │   │   ├── SevenDayForecast.jsx     # 7-day forecast cards
│   │   │   │   ├── AirQuality.jsx           # AQI section
│   │   │   │   ├── WeatherMetrics.jsx       # Detail metrics grid
│   │   │   │   ├── WeatherMap.jsx           # OSM + OWM tiles map
│   │   │   │   └── FavoritesPanel.jsx       # Favorites & recent searches
│   │   │   ├── charts/
│   │   │   │   └── HourlyForecast.jsx       # Recharts 24h area chart
│   │   │   └── ui/
│   │   │       ├── SplashScreen.jsx         # Animated intro
│   │   │       ├── SearchBar.jsx            # Search with autocomplete
│   │   │       ├── ErrorDisplay.jsx         # Error messages
│   │   │       └── LoadingSkeleton.jsx      # Loading state
│   │   ├── pages/
│   │   │   └── Dashboard.jsx               # Main page layout
│   │   ├── store/
│   │   │   └── weatherStore.js             # Zustand global state
│   │   ├── services/
│   │   │   └── api.js                      # Axios API client
│   │   ├── utils/
│   │   │   └── weatherUtils.js             # Theme, format helpers
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css                       # Tailwind + custom CSS
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.example
│   └── package.json
│
├── package.json                            # Root convenience scripts
└── README.md
```

---

## 🌍 API Endpoints

### Backend REST API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/weather?city=London` | Get full weather by city name |
| `GET` | `/api/weather?lat=51.5&lon=-0.12` | Get full weather by coordinates |
| `GET` | `/api/weather/search?query=Lon` | Search city suggestions |
| `GET` | `/health` | Health check |

### Response shape (`/api/weather`)

```json
{
  "current": {
    "city": "London",
    "country": "GB",
    "temp": 15,
    "feels_like": 13,
    "humidity": 72,
    "pressure": 1015,
    "visibility": 10.0,
    "wind_speed": 4.5,
    "weather": { "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" },
    "sunrise": 1700000000,
    "sunset": 1700040000,
    "coord": { "lat": 51.5, "lon": -0.12 },
    "dew_point": 10
  },
  "forecast": [...],  // 7 days
  "hourly": [...],    // 8 × 3h slots
  "aqi": { "index": 1, "status": "Good", "pm2_5": 5.2, ... }
}
```

---

## 🎨 Dynamic Weather Themes

| Weather | Gradient | Background Animation |
|---------|----------|---------------------|
| ☀️ Sunny | Warm Gold → Amber | Floating particles, rotating sun |
| 🌧️ Rainy | Gray Blue → Slate | 40 falling raindrops |
| ☁️ Cloudy | Silver → White | Slowly drifting clouds |
| 💨 Windy | Sky Blue → Azure | Horizontal wind streaks |
| ❄️ Snowy | Ice Blue → White | 30 falling snowflakes |
| ⛈️ Thunder | Indigo → Purple | Heavy rain + lightning flashes |
| 🌙 Night | Navy → Indigo | Stars + animated moon |

---

## 🚢 Deployment

### Frontend (Vercel / Netlify)

```bash
cd frontend
npm run build
# Deploy the `dist/` folder
```

Set env: `VITE_API_URL=https://your-backend.com/api`

### Backend (Railway / Render / Fly.io)

```bash
cd backend
# Set environment variables in your platform dashboard
# Deploy with: npm start
```

Set env: `OPENWEATHER_API_KEY=xxx` and `NODE_ENV=production`

### Full-stack (same domain)

Point your backend to serve `frontend/dist` as static files, or use a reverse proxy (nginx) to route `/api/*` to the backend and `/*` to the frontend.

---

## 🔑 Getting Your API Key

1. Sign up at [openweathermap.org](https://openweathermap.org/api)
2. Go to **API keys** in your account
3. Copy your key (takes ~10 minutes to activate)
4. Free tier includes: Current weather, 5-day forecast, Geocoding, Air Pollution ✅

---

## 📄 License

MIT — feel free to use this for your projects.
