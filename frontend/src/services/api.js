import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000
});

export const weatherApi = {
  getWeather: async (params) => {
    const response = await api.get('/weather', { params });
    return response.data;
  },
  searchCities: async (query) => {
    const response = await api.get('/weather/search', { params: { query } });
    return response.data;
  }
};

export default api;
