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

// Mock data - would be replaced with API calls in production
const weatherData = {
  temperature: 28,
  condition: "Sunny",
  humidity: 65,
  wind: 12,
};

const marketTrends = [
  { crop: "Wheat", trend: "+5.2%", demand: "High" },
  { crop: "Corn", trend: "+3.8%", demand: "High" },
  { crop: "Soybeans", trend: "+2.1%", demand: "Medium" },
];

const farmingTips = [
  "Apply organic mulch to conserve soil moisture during dry periods",
  "Consider intercropping to maximize land use and reduce pest pressure",
  "Monitor soil pH regularly for optimal nutrient absorption",
];

export default function QuickStatsPanel() {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % farmingTips.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-[#F9FBF7] w-full">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#2E7D32]">
          Today's Farming Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Weather Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-[#2E7D32]">
                <Sun className="mr-2 h-5 w-5 text-[#FFEB3B]" />
                Weather Update
              </CardTitle>
              <CardDescription>
                Current conditions for your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">
                    {weatherData.temperature}°C
                  </p>
                  <p className="text-muted-foreground">
                    {weatherData.condition}
                  </p>
                </div>
                <div className="text-right">
                  <p className="flex items-center justify-end text-sm">
                    <Cloud className="mr-1 h-4 w-4" />
                    Humidity: {weatherData.humidity}%
                  </p>
                  <p className="flex items-center justify-end text-sm mt-1">
                    <CloudRain className="mr-1 h-4 w-4" />
                    Wind: {weatherData.wind} km/h
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Trends Card */}
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

          {/* AI Farming Tips Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-[#2E7D32]">
                <svg
                  className="mr-2 h-5 w-5 text-[#8D6E63]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
                AI Farming Tips
              </CardTitle>
              <CardDescription>
                Smart suggestions for better yields
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-[#F1F8E9] p-4 rounded-lg border border-[#C5E1A5] min-h-[100px] flex items-center">
                <p className="text-[#33691E]">{farmingTips[currentTip]}</p>
              </div>
              <div className="flex justify-center mt-3">
                {farmingTips.map((_, index) => (
                  <span
                    key={index}
                    className={`mx-1 block w-2 h-2 rounded-full ${
                      currentTip === index ? "bg-[#4CAF50]" : "bg-[#C5E1A5]"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
