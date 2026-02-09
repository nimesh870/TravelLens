import { useState, useEffect } from "react";

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  condition: string;
  icon: string;
  isDay: boolean;
  precipitation: number;
  daily?: {
    maxTemp: number[];
    minTemp: number[];
    weatherCodes: number[];
    dates: string[];
  };
}

// Destination coordinates
const destinationCoords: Record<string, [number, number]> = {
  kathmandu: [27.7172, 85.324],
  pokhara: [28.2096, 83.9856],
  lumbini: [27.4833, 83.2767],
  chitwan: [27.5291, 84.3542],
  swayambhu: [27.7149, 85.2905],
  everest: [27.9881, 86.925],
};

// WMO Weather interpretation codes
const weatherDescriptions: Record<number, { condition: string; icon: string }> = {
  0: { condition: "Clear sky", icon: "☀️" },
  1: { condition: "Mainly clear", icon: "🌤️" },
  2: { condition: "Partly cloudy", icon: "⛅" },
  3: { condition: "Overcast", icon: "☁️" },
  45: { condition: "Foggy", icon: "🌫️" },
  48: { condition: "Rime fog", icon: "🌫️" },
  51: { condition: "Light drizzle", icon: "🌦️" },
  53: { condition: "Moderate drizzle", icon: "🌦️" },
  55: { condition: "Dense drizzle", icon: "🌧️" },
  61: { condition: "Slight rain", icon: "🌧️" },
  63: { condition: "Moderate rain", icon: "🌧️" },
  65: { condition: "Heavy rain", icon: "🌧️" },
  71: { condition: "Slight snow", icon: "🌨️" },
  73: { condition: "Moderate snow", icon: "🌨️" },
  75: { condition: "Heavy snow", icon: "❄️" },
  80: { condition: "Rain showers", icon: "🌦️" },
  81: { condition: "Moderate showers", icon: "🌧️" },
  82: { condition: "Violent showers", icon: "⛈️" },
  85: { condition: "Snow showers", icon: "🌨️" },
  86: { condition: "Heavy snow showers", icon: "❄️" },
  95: { condition: "Thunderstorm", icon: "⛈️" },
  96: { condition: "Thunderstorm with hail", icon: "⛈️" },
  99: { condition: "Thunderstorm with heavy hail", icon: "⛈️" },
};

function getWeatherInfo(code: number) {
  return weatherDescriptions[code] || { condition: "Unknown", icon: "🌡️" };
}

// Cache to avoid redundant API calls
const weatherCache: Record<string, { data: WeatherData; timestamp: number }> = {};
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

export function useWeather(destinationId: string) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const coords = destinationCoords[destinationId];
    if (!coords) {
      setError("Unknown destination");
      setLoading(false);
      return;
    }

    // Check cache
    const cached = weatherCache[destinationId];
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setWeather(cached.data);
      setLoading(false);
      return;
    }

    const fetchWeather = async () => {
      try {
        setLoading(true);
        const [lat, lng] = coords;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Weather API error");

        const data = await res.json();
        const current = data.current;
        const info = getWeatherInfo(current.weather_code);

        const weatherData: WeatherData = {
          temperature: Math.round(current.temperature_2m),
          feelsLike: Math.round(current.apparent_temperature),
          humidity: current.relative_humidity_2m,
          windSpeed: Math.round(current.wind_speed_10m),
          weatherCode: current.weather_code,
          condition: info.condition,
          icon: info.icon,
          isDay: current.is_day === 1,
          precipitation: current.precipitation,
          daily: {
            maxTemp: data.daily.temperature_2m_max.map((t: number) => Math.round(t)),
            minTemp: data.daily.temperature_2m_min.map((t: number) => Math.round(t)),
            weatherCodes: data.daily.weather_code,
            dates: data.daily.time,
          },
        };

        weatherCache[destinationId] = { data: weatherData, timestamp: Date.now() };
        setWeather(weatherData);
        setError(null);
      } catch (err) {
        setError("Failed to load weather");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [destinationId]);

  return { weather, loading, error };
}
