"use client";

import { Cloud, CloudRain, Sun, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

// Market trends data
const marketTrends = [
  { crop: "Wheat", trend: "+5.2%", demand: "High" },
  { crop: "Corn", trend: "+3.8%", demand: "High" },
  { crop: "Soybeans", trend: "+2.1%", demand: "Medium" },
];

// Weather interface to match OpenWeatherMap response
interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

export default function QuickStatsPanel() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch weather based on geolocation
  const fetchWeatherData = async (latitude: number, longitude: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/weather?lat=${latitude}&lon=${longitude}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Could not update weather");
    } finally {
      setLoading(false);
    }
  };

  // Get weather on component mount
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Unable to get your location for weather");
        }
      );
    }
  }, []);

  // Get weather condition icon
  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  return (
    <section className="py-12 bg-[#F9FBF7] w-full">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#2E7D32]">
          Today's Farming Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Weather Card - Now with real data */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-[#2E7D32]">
                <Sun className="mr-2 h-5 w-5 text-[#FFEB3B]" />
                Weather Update
              </CardTitle>
              <CardDescription>
                {loading
                  ? "Fetching local weather..."
                  : weatherData
                  ? `Current conditions for ${weatherData.name}`
                  : "Current conditions for your area"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-20">
                  <p>Loading weather data...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 p-3 rounded-md text-sm text-red-800">
                  <p>{error}</p>
                  <button
                    onClick={() => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                          (position) =>
                            fetchWeatherData(
                              position.coords.latitude,
                              position.coords.longitude
                            ),
                          (err) => setError("Unable to get your location")
                        );
                      }
                    }}
                    className="text-red-600 underline mt-2"
                  >
                    Try again
                  </button>
                </div>
              ) : weatherData ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {weatherData.weather[0].icon && (
                      <img
                        src={getWeatherIcon(weatherData.weather[0].icon)}
                        alt={weatherData.weather[0].description}
                        className="w-12 h-12 mr-2"
                      />
                    )}
                    <div>
                      <p className="text-3xl font-bold">
                        {Math.round(weatherData.main.temp)}°C
                      </p>
                      <p className="text-muted-foreground capitalize">
                        {weatherData.weather[0].description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="flex items-center justify-end text-sm">
                      <Cloud className="mr-1 h-4 w-4" />
                      Humidity: {weatherData.main.humidity}%
                    </p>
                    <p className="flex items-center justify-end text-sm mt-1">
                      <CloudRain className="mr-1 h-4 w-4" />
                      Wind: {Math.round(weatherData.wind.speed * 3.6)} km/h
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center h-20">
                  <button
                    onClick={() => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                          (position) =>
                            fetchWeatherData(
                              position.coords.latitude,
                              position.coords.longitude
                            ),
                          (err) => setError("Unable to get your location")
                        );
                      }
                    }}
                    className="bg-[#4CAF50] hover:bg-[#3e8e41] text-white py-2 px-4 rounded-md"
                  >
                    Get Local Weather
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Market Trends Card - Keeping your existing implementation */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-[#2E7D32]">
                <TrendingUp className="mr-2 h-5 w-5 text-[#4CAF50]" />
                Market Trends
              </CardTitle>
              <CardDescription>Top crops in demand today</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {marketTrends.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="font-medium">{item.crop}</span>
                    <div>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full mr-2 ${
                          item.demand === "High"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.demand}
                      </span>
                      <span className="text-green-600 font-medium">
                        {item.trend}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
