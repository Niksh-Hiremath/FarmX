"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function MarketTrendsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [formData, setFormData] = useState({
    district: "",
    commodity: "",
    state: "",
    market: "",
  });
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Build query parameters for POST request
      // This FastAPI endpoint expects query parameters, not JSON body
      const queryParams = new URLSearchParams({
        district: formData.district,
        commodity: formData.commodity,
        state: formData.state,
        market: formData.market,
      }).toString();

      const url = `http://localhost:8000/market_analysis?${queryParams}`;
      console.log("Fetching from URL:", url);

      const res = await fetch(url, {
        method: "POST", // Keep POST method as the backend expects it
        headers: {
          "Accept": "application/json",
        },
        // No body needed as we're using query parameters
      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error response:", errorText);
        throw new Error(
          `Failed to fetch data: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      console.log("Received data:", data);
      setResponse(data);
    } catch (error) {
      console.error("Error fetching market analysis:", error);
      setError(error.message || "An error occurred while fetching data");

      // For demo purposes, let's set a mock response using the actual format returned by the API
      setResponse({
        'district name': 'Sangrur',
        'market name': 'Ahmedgarh',
        'commodity': formData.commodity,
        'variety': 'Other',
        'grade': 'FAQ',
        'min price': '800',
        'max price': '900',
        'modal price': '900',
        'date': '2025-03-02' // Note: API returns a datetime.date object but JSON will have it as string
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Format the response data in a more user-friendly way
  const renderResults = () => {
    if (!response) return null;
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 p-3 rounded-md">
            <h3 className="text-sm font-medium text-green-800">District</h3>
            <p className="text-lg font-semibold">{response['district name'] || 'N/A'}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-md">
            <h3 className="text-sm font-medium text-green-800">Market</h3>
            <p className="text-lg font-semibold">{response['market name'] || 'N/A'}</p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-medium mb-2">Commodity Details</h3>
          <div className="grid grid-cols-2 gap-y-2">
            <div>
              <span className="text-sm text-gray-500">Commodity:</span>
              <p className="font-semibold">{response.commodity || 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Variety:</span>
              <p className="font-semibold">{response.variety || 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Grade:</span>
              <p className="font-semibold">{response.grade || 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Date:</span>
              <p className="font-semibold">{response.date || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-md">
          <h3 className="font-medium text-blue-800 mb-2">Price Information</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-blue-600">Min Price</p>
              <p className="text-xl font-bold">₹{response['min price'] || 'N/A'}</p>
            </div>
            <div className="border-l border-r border-blue-200">
              <p className="text-xs text-blue-600">Modal Price</p>
              <p className="text-xl font-bold">₹{response['modal price'] || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-blue-600">Max Price</p>
              <p className="text-xl font-bold">₹{response['max price'] || 'N/A'}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-xs text-gray-500">Raw API Response:</p>
          <pre className="bg-gray-100 p-2 rounded-md text-xs overflow-auto max-h-[100px]">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      </div>
    );
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Market Analysis Form</CardTitle>
              <CardDescription>
                Enter commodity and location details to get market analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="commodity">Commodity</Label>
                  <Input
                    id="commodity"
                    name="commodity"
                    value={formData.commodity}
                    onChange={handleChange}
                    placeholder="Enter commodity name"
                    required
                  />
                </div>

                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state name"
                    required
                  />
                </div>

                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="Enter district name"
                    required
                  />
                </div>

                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="market">Market</Label>
                  <Input
                    id="market"
                    name="market"
                    value={formData.market}
                    onChange={handleChange}
                    placeholder="Enter market name"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]"
                  disabled={isLoading}
                >
                  {isLoading ? "Analyzing..." : "Get Market Analysis"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>
                Market analysis based on your inputs
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center h-[300px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E7D32]"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-800 p-4 rounded-md">
                  <h3 className="font-bold mb-2">Error</h3>
                  <p>{error}</p>
                  <div className="mt-4 p-2 bg-gray-100 rounded text-sm">
                    <p className="font-mono">
                      Please check that your API server is running at
                      http://localhost:8000
                    </p>
                  </div>
                </div>
              ) : response ? (
                renderResults()
              ) : (
                <div className="flex justify-center items-center h-[300px] text-muted-foreground">
                  <p>Submit the form to see market analysis results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
