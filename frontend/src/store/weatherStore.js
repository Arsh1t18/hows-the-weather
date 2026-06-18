import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { weatherApi } from '../services/api';

const useWeatherStore = create(
  persist(
    (set, get) => ({
      // Weather data
      weatherData: null,
      loading: false,
      error: null,
      
      // Search
      searchHistory: [],
      favorites: [],
      
      // Theme
      theme: 'default',

      // Fetch weather
      fetchWeather: async (city, coords) => {
        set({ loading: true, error: null });
        try {
          const params = coords 
            ? { lat: coords.lat, lon: coords.lon }
            : { city };
          
          const data = await weatherApi.getWeather(params);
          const theme = getWeatherTheme(data.current.weather, data.current.sunrise, data.current.sunset);
          
          set({ 
            weatherData: data, 
            loading: false, 
            theme 
          });

          // Add to search history
          if (city) {
            const history = get().searchHistory;
            const newHistory = [
              city,
              ...history.filter(h => h.toLowerCase() !== city.toLowerCase())
            ].slice(0, 10);
            set({ searchHistory: newHistory });
          }
          
          return data;
        } catch (error) {
          set({ 
            loading: false, 
            error: error.response?.data?.error || 'Failed to fetch weather data' 
          });
          throw error;
        }
      },

      // Add/remove favorite
      toggleFavorite: (city) => {
        const favorites = get().favorites;
        const exists = favorites.find(f => f.toLowerCase() === city.toLowerCase());
        if (exists) {
          set({ favorites: favorites.filter(f => f.toLowerCase() !== city.toLowerCase()) });
        } else {
          set({ favorites: [...favorites, city].slice(0, 10) });
        }
      },

      isFavorite: (city) => {
        return get().favorites.some(f => f.toLowerCase() === city?.toLowerCase());
      },

      clearHistory: () => set({ searchHistory: [] }),
      clearError: () => set({ error: null })
    }),
    {
      name: 'hows-the-weather-store',
      partialize: (state) => ({ 
        searchHistory: state.searchHistory, 
        favorites: state.favorites 
      })
    }
  )
);

function getWeatherTheme(weather, sunrise, sunset) {
  const now = Date.now() / 1000;
  const isNight = now < sunrise || now > sunset;
  
  if (isNight) return 'night';
  
  const id = weather.id;
  
  if (id >= 200 && id < 300) return 'thunderstorm';
  if (id >= 300 && id < 600) return 'rainy';
  if (id >= 600 && id < 700) return 'snow';
  if (id >= 700 && id < 800) return 'windy';
  if (id === 800) return 'sunny';
  if (id >= 801 && id <= 804) {
    if (id === 801) return 'sunny';
    return 'cloudy';
  }
  
  return 'default';
}

export default useWeatherStore;
