"use client";

import type React from "react";

import { useState } from "react";
import { Calendar, MapPin } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import CropRecommendationResults from "@/components/crop-recommendation-results";

export default function CropRecommendationsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
      toast("Analysis complete", {
        description: "Here are your personalized crop recommendations",
      });
    }, 2000);
  };

  if (showResults) {
    return <CropRecommendationResults onReset={() => setShowResults(false)} />;
  }

  return (
    <div className="container py-12 mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2E7D32] mb-2">
            AI-Powered Crop Recommendations
          </h1>
          <p className="text-muted-foreground">
            Get personalized crop suggestions based on your soil, location, and
            planting time
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Enter Your Farm Details</CardTitle>
            <CardDescription>
              Provide information about your farm to get accurate
              recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="manual" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                  <TabsTrigger value="auto">Auto-Detect</TabsTrigger>
                </TabsList>

                <TabsContent value="manual" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          placeholder="City, State or ZIP Code"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="soil-type">Soil Type</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select soil type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clay">Clay Soil</SelectItem>
                          <SelectItem value="sandy">Sandy Soil</SelectItem>
                          <SelectItem value="silty">Silty Soil</SelectItem>
                          <SelectItem value="peaty">Peaty Soil</SelectItem>
                          <SelectItem value="chalky">Chalky Soil</SelectItem>
                          <SelectItem value="loamy">Loamy Soil</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="planting-month">Planting Month</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Select required>
                          <SelectTrigger className="pl-10">
                            <SelectValue placeholder="Select month" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="january">January</SelectItem>
                            <SelectItem value="february">February</SelectItem>
                            <SelectItem value="march">March</SelectItem>
                            <SelectItem value="april">April</SelectItem>
                            <SelectItem value="may">May</SelectItem>
                            <SelectItem value="june">June</SelectItem>
                            <SelectItem value="july">July</SelectItem>
                            <SelectItem value="august">August</SelectItem>
                            <SelectItem value="september">September</SelectItem>
                            <SelectItem value="october">October</SelectItem>
                            <SelectItem value="november">November</SelectItem>
                            <SelectItem value="december">December</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="farm-size">Farm Size (acres)</Label>
                      <Input
                        id="farm-size"
                        type="number"
                        min="0.1"
                        step="0.1"
                        placeholder="e.g., 5.5"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Soil pH Level</Label>
                        <span className="text-sm text-muted-foreground">
                          Neutral (7.0)
                        </span>
                      </div>
                      <Slider defaultValue={[7]} max={14} min={0} step={0.1} />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">
                          Acidic (0)
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Alkaline (14)
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Average Temperature</Label>
                        <span className="text-sm text-muted-foreground">
                          75°F
                        </span>
                      </div>
                      <div className="relative">
                        {/* <Thermometer className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /> */}
                        <Slider
                          defaultValue={[75]}
                          max={120}
                          min={32}
                          step={1}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">
                          32°F
                        </span>
                        <span className="text-xs text-muted-foreground">
                          120°F
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="irrigation">Irrigation Availability</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select irrigation type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">
                          Full irrigation system
                        </SelectItem>
                        <SelectItem value="partial">
                          Partial irrigation
                        </SelectItem>
                        <SelectItem value="rainfed">Rainfed only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="auto" className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-800">
                    <p className="text-sm">
                      Allow location access to automatically detect your
                      location, soil type, and weather conditions.
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => {
                        toast("Location detected", {
                          description:
                            "We've detected your location and soil conditions",
                        });
                      }}
                    >
                      <MapPin className="h-4 w-4" />
                      Detect My Location
                    </Button>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-4">Detected Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Location:</p>
                        <p className="font-medium">Not detected</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Soil Type:</p>
                        <p className="font-medium">Not detected</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Current Season:</p>
                        <p className="font-medium">Not detected</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">
                          Average Temperature:
                        </p>
                        <p className="font-medium">Not detected</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="farm-size-auto">Farm Size (acres)</Label>
                    <Input
                      id="farm-size-auto"
                      type="number"
                      min="0.1"
                      step="0.1"
                      placeholder="e.g., 5.5"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="irrigation-auto">
                      Irrigation Availability
                    </Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select irrigation type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">
                          Full irrigation system
                        </SelectItem>
                        <SelectItem value="partial">
                          Partial irrigation
                        </SelectItem>
                        <SelectItem value="rainfed">Rainfed only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>

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
              Our AI analyzes over 20 factors including soil composition,
              climate patterns, and market demand to provide you with the most
              suitable crop recommendations.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
