const axios = require('axios');

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';
const AQI_URL = 'https://api.openweathermap.org/data/2.5/air_pollution';
const API_KEY = process.env.OPENWEATHER_API_KEY;

const weatherService = {
  async getCurrentWeather(city) {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: { q: city, appid: API_KEY, units: 'metric' }
    });
    return response.data;
  },

  async getCurrentWeatherByCoords(lat, lon) {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: { lat, lon, appid: API_KEY, units: 'metric' }
    });
    return response.data;
  },

  async getForecast(city) {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: { q: city, appid: API_KEY, units: 'metric', cnt: 40 }
    });
    return response.data;
  },

  async getForecastByCoords(lat, lon) {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: { lat, lon, appid: API_KEY, units: 'metric', cnt: 40 }
    });
    return response.data;
  },

  async getAirQuality(lat, lon) {
    const response = await axios.get(AQI_URL, {
      params: { lat, lon, appid: API_KEY }
    });
    return response.data;
  },

  async searchCities(query) {
    const response = await axios.get(`${GEO_URL}/direct`, {
      params: { q: query, limit: 5, appid: API_KEY }
    });
    return response.data;
  },

  async getUVIndex(lat, lon) {
    try {
      // UV index is included in OneCall API
      const response = await axios.get(`${BASE_URL}/uvi`, {
        params: { lat, lon, appid: API_KEY }
      });
      return response.data;
    } catch {
      return { value: 0 };
    }
  }
};

module.exports = weatherService;
