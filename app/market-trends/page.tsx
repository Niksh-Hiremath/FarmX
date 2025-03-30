"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Filter,
  RefreshCw,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import MarketPriceChart from "@/components/market-price-chart";
import SupplyDemandChart from "@/components/supply-demand-chart";

export default function MarketTrendsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date());
    }, 1500);
  };

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container py-12 mx-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#2E7D32] mb-2">
              Market Trends & Analysis
            </h1>
            <p className="text-muted-foreground">
              Track real-time crop prices and market demand to maximize your
              profits
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={refreshData}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                Top Gainers
              </CardTitle>
              <CardDescription>
                Crops with highest price increases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <span className="font-medium">Soybeans</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    +8.2%
                  </Badge>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-medium">Corn</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    +5.7%
                  </Badge>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-medium">Wheat</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    +4.3%
                  </Badge>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <TrendingDown className="mr-2 h-5 w-5 text-red-500" />
                Top Decliners
              </CardTitle>
              <CardDescription>
                Crops with highest price decreases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <span className="font-medium">Cotton</span>
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                    -6.1%
                  </Badge>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-medium">Rice</span>
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                    -3.8%
                  </Badge>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-medium">Barley</span>
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                    -2.5%
                  </Badge>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                Upcoming Events
              </CardTitle>
              <CardDescription>
                Market events that may impact prices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex flex-col">
                  <span className="font-medium">USDA Crop Report</span>
                  <span className="text-sm text-muted-foreground">
                    May 12, 2023
                  </span>
                </li>
                <li className="flex flex-col">
                  <span className="font-medium">Grain Export Data Release</span>
                  <span className="text-sm text-muted-foreground">
                    May 15, 2023
                  </span>
                </li>
                <li className="flex flex-col">
                  <span className="font-medium">Agricultural Trade Summit</span>
                  <span className="text-sm text-muted-foreground">
                    May 22-24, 2023
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="price-trends" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="price-trends">Price Trends</TabsTrigger>
            <TabsTrigger value="supply-demand">Supply & Demand</TabsTrigger>
          </TabsList>

          <TabsContent value="price-trends">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Crop Price Trends</CardTitle>
                    <CardDescription>
                      Historical and current market prices
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="crop-select" className="text-sm">
                        Crop:
                      </Label>
                      <Select defaultValue="all">
                        <SelectTrigger id="crop-select" className="w-[140px]">
                          <SelectValue placeholder="Select crop" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Major Crops</SelectItem>
                          <SelectItem value="wheat">Wheat</SelectItem>
                          <SelectItem value="corn">Corn</SelectItem>
                          <SelectItem value="soybeans">Soybeans</SelectItem>
                          <SelectItem value="rice">Rice</SelectItem>
                          <SelectItem value="cotton">Cotton</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="time-range" className="text-sm">
                        Time Range:
                      </Label>
                      <Select defaultValue="6m">
                        <SelectTrigger id="time-range" className="w-[140px]">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1m">1 Month</SelectItem>
                          <SelectItem value="3m">3 Months</SelectItem>
                          <SelectItem value="6m">6 Months</SelectItem>
                          <SelectItem value="1y">1 Year</SelectItem>
                          <SelectItem value="5y">5 Years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Filter className="h-4 w-4" />
                      More Filters
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <MarketPriceChart />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="supply-demand">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Supply & Demand Analysis</CardTitle>
                    <CardDescription>
                      Current market balance and forecasts
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="region-select" className="text-sm">
                        Region:
                      </Label>
                      <Select defaultValue="national">
                        <SelectTrigger id="region-select" className="w-[140px]">
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="national">National</SelectItem>
                          <SelectItem value="midwest">Midwest</SelectItem>
                          <SelectItem value="south">South</SelectItem>
                          <SelectItem value="west">West</SelectItem>
                          <SelectItem value="northeast">Northeast</SelectItem>
                          <SelectItem value="global">Global</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="forecast-period" className="text-sm">
                        Forecast:
                      </Label>
                      <Select defaultValue="6m">
                        <SelectTrigger
                          id="forecast-period"
                          className="w-[140px]"
                        >
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3m">3 Months</SelectItem>
                          <SelectItem value="6m">6 Months</SelectItem>
                          <SelectItem value="1y">1 Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <SupplyDemandChart />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Market Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Price Drivers</CardTitle>
                <CardDescription>
                  Factors influencing current market prices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="w-1 bg-blue-500 rounded-full"></div>
                    <div>
                      <h4 className="font-medium">Weather Conditions</h4>
                      <p className="text-sm text-muted-foreground">
                        Recent rainfall in the Midwest has improved crop
                        outlook, putting downward pressure on corn and soybean
                        prices.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-1 bg-green-500 rounded-full"></div>
                    <div>
                      <h4 className="font-medium">Export Demand</h4>
                      <p className="text-sm text-muted-foreground">
                        Strong export demand from China is supporting soybean
                        prices despite improved growing conditions.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-1 bg-orange-500 rounded-full"></div>
                    <div>
                      <h4 className="font-medium">Policy Changes</h4>
                      <p className="text-sm text-muted-foreground">
                        New biofuel mandates are expected to increase corn
                        demand for ethanol production in the coming months.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Market Recommendations
                </CardTitle>
                <CardDescription>
                  AI-powered suggestions based on current trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="w-1 bg-green-500 rounded-full"></div>
                    <div>
                      <h4 className="font-medium">
                        Consider Forward Contracts
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        With soybean prices at 6-month highs, consider locking
                        in prices with forward contracts for a portion of your
                        expected harvest.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-1 bg-yellow-500 rounded-full"></div>
                    <div>
                      <h4 className="font-medium">Monitor Storage Costs</h4>
                      <p className="text-sm text-muted-foreground">
                        Current price trends suggest potential increases in Q3.
                        Compare storage costs against projected price increases
                        to optimize selling strategy.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-1 bg-blue-500 rounded-full"></div>
                    <div>
                      <h4 className="font-medium">Diversify Crop Portfolio</h4>
                      <p className="text-sm text-muted-foreground">
                        Consider allocating a portion of acreage to specialty
                        crops with strong price forecasts, such as organic
                        grains or pulses.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
