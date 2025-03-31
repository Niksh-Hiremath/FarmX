"use client";

import type React from "react";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import CropRecommendationResults from "@/components/crop-recommendation-results";

export default function CropRecommendationsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recommendationData, setRecommendationData] = useState(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const params = new URLSearchParams({
        n: formData.get("n") as string,
        p: formData.get("p") as string,
        k: formData.get("k") as string,
        temperature: formData.get("temperature") as string,
        humidity: formData.get("humidity") as string,
        ph: formData.get("ph") as string,
        rainfall: formData.get("rainfall") as string,
        location: formData.get("location") as string,
      });
      const res = await fetch(`http://localhost:8000/recommend_crop?${params.toString()}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setRecommendationData(data);
      toast("Analysis complete", {
        description: "Here are your personalized crop recommendations",
      });
      setShowResults(true);
    } catch (error) {
      toast("Error fetching crop recommendation");
    } finally {
      setIsLoading(false);
    }
  };

  if (showResults) {
    return (
      <CropRecommendationResults data={recommendationData} onReset={() => setShowResults(false)} />
    );
  }

  return (
    <div className="container py-12 mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2E7D32] mb-2">
            AI-Powered Crop Recommendations
          </h1>
          <p className="text-muted-foreground">
            Get personalized crop suggestions based on your farm inputs
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Enter Your Farm Details</CardTitle>
            <CardDescription>
              Provide the required inputs to receive recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      name="location"
                      placeholder="City, State or ZIP Code"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="n">Nitrogen (N)</Label>
                  <Input
                    id="n"
                    name="n"
                    type="number"
                    placeholder="e.g., 10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="p">Phosphorus (P)</Label>
                  <Input
                    id="p"
                    name="p"
                    type="number"
                    placeholder="e.g., 5"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="k">Potassium (K)</Label>
                  <Input
                    id="k"
                    name="k"
                    type="number"
                    placeholder="e.g., 7"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature (°C)</Label>
                  <Input
                    id="temperature"
                    name="temperature"
                    type="number"
                    placeholder="e.g., 24"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="humidity">Humidity (%)</Label>
                  <Input
                    id="humidity"
                    name="humidity"
                    type="number"
                    placeholder="e.g., 80"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ph">Soil pH</Label>
                  <Input
                    id="ph"
                    name="ph"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 7"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rainfall">Rainfall (mm)</Label>
                  <Input
                    id="rainfall"
                    name="rainfall"
                    type="number"
                    placeholder="e.g., 200"
                    required
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button
                  type="submit"
                  className="w-full bg-[#4CAF50] hover:bg-[#3e8e41]"
                  disabled={isLoading}
                >
                  {isLoading ? "Analyzing..." : "Get Crop Recommendations"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Our AI analyzes your input factors to provide you with personalized crop recommendations.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
