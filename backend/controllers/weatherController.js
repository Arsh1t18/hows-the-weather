const weatherService = require('../services/weatherService');

const weatherController = {
  async getWeather(req, res) {
    try {
      const { city, lat, lon } = req.query;

      let current, forecast, aqi;

      if (lat && lon) {
        [current, forecast] = await Promise.all([
          weatherService.getCurrentWeatherByCoords(lat, lon),
          weatherService.getForecastByCoords(lat, lon)
        ]);
      } else if (city) {
        [current, forecast] = await Promise.all([
          weatherService.getCurrentWeather(city),
          weatherService.getForecast(city)
        ]);
      } else {
        return res.status(400).json({ error: 'Please provide city name or coordinates.' });
      }

      // Get AQI using coordinates from current weather
      try {
        aqi = await weatherService.getAirQuality(current.coord.lat, current.coord.lon);
      } catch {
        aqi = null;
      }

      // Process 7-day forecast (daily summary from 3h intervals)
      const dailyForecast = processDailyForecast(forecast.list);
      // Process 24h forecast
      const hourlyForecast = forecast.list.slice(0, 8).map(item => ({
        time: item.dt,
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like),
        humidity: item.main.humidity,
        weather: item.weather[0],
        wind_speed: item.wind.speed,
        pop: item.pop || 0
      }));

      const response = {
        current: {
          city: current.name,
          country: current.sys.country,
          temp: Math.round(current.main.temp),
          feels_like: Math.round(current.main.feels_like),
          temp_min: Math.round(current.main.temp_min),
          temp_max: Math.round(current.main.temp_max),
          humidity: current.main.humidity,
          pressure: current.main.pressure,
          visibility: current.visibility / 1000,
          wind_speed: current.wind.speed,
          wind_deg: current.wind.deg,
          weather: current.weather[0],
          sunrise: current.sys.sunrise,
          sunset: current.sys.sunset,
          timezone: current.timezone,
          coord: current.coord,
          clouds: current.clouds?.all || 0,
          dew_point: calculateDewPoint(current.main.temp, current.main.humidity)
        },
        forecast: dailyForecast,
        hourly: hourlyForecast,
        aqi: aqi ? processAQI(aqi) : null
      };

      res.json(response);
    } catch (error) {
      if (error.response?.status === 404) {
        return res.status(404).json({ error: 'City not found. Please check the spelling and try again.' });
      }
      if (error.response?.status === 401) {
        return res.status(500).json({ error: 'API key configuration error.' });
      }
      console.error('Weather API error:', error.message);
      res.status(500).json({ error: 'Failed to fetch weather data. Please try again.' });
    }
  },

  async searchCities(req, res) {
    try {
      const { query } = req.query;
      if (!query || query.length < 2) {
        return res.json([]);
      }
      const cities = await weatherService.searchCities(query);
      const processed = cities.map(c => ({
        name: c.name,
        country: c.country,
        state: c.state || '',
        lat: c.lat,
        lon: c.lon,
        display: c.state ? `${c.name}, ${c.state}, ${c.country}` : `${c.name}, ${c.country}`
      }));
      res.json(processed);
    } catch (error) {
      console.error('Search error:', error.message);
      res.status(500).json({ error: 'Search failed.' });
    }
  }
};

function processDailyForecast(list) {
  const days = {};
  list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toDateString();
    if (!days[day]) {
      days[day] = {
        dt: item.dt,
        temps: [],
        weather: item.weather[0],
        pop: [],
        humidity: []
      };
    }
    days[day].temps.push(item.main.temp);
    days[day].pop.push(item.pop || 0);
    days[day].humidity.push(item.main.humidity);
  });

  return Object.values(days).slice(0, 7).map(day => ({
    dt: day.dt,
    temp_max: Math.round(Math.max(...day.temps)),
    temp_min: Math.round(Math.min(...day.temps)),
    weather: day.weather,
    pop: Math.round(Math.max(...day.pop) * 100),
    humidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length)
  }));
}

function processAQI(aqiData) {
  const components = aqiData.list[0]?.components || {};
  const aqi = aqiData.list[0]?.main?.aqi || 1;
  const aqiLabels = ['', 'Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
  return {
    index: aqi,
    status: aqiLabels[aqi] || 'Unknown',
    pm2_5: components.pm2_5?.toFixed(1) || 0,
    pm10: components.pm10?.toFixed(1) || 0,
    co: components.co?.toFixed(1) || 0,
    no2: components.no2?.toFixed(1) || 0,
    o3: components.o3?.toFixed(1) || 0,
    so2: components.so2?.toFixed(1) || 0
  };
}

function calculateDewPoint(temp, humidity) {
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
  return Math.round((b * alpha) / (a - alpha));
}

module.exports = weatherController;
