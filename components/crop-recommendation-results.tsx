"use client";

import {
  BarChart,
  Leaf,
  Droplets,
  Sun,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock data - would be replaced with API response in production
const recommendedCrops = [
  {
    name: "Wheat",
    profitPotential: 85,
    growthDifficulty: "Easy",
    waterRequirements: "Medium",
    growthDuration: "110-130 days",
    idealTemperature: "70-75°F",
    marketDemand: "High",
    estimatedYield: "45-60 bushels/acre",
    estimatedProfit: "$350-450/acre",
    reasons: [
      "Soil type is ideal for wheat cultivation",
      "Current season is optimal for planting",
      "Market demand is high with stable prices",
      "Low pest pressure expected in your region",
    ],
  },
  {
    name: "Corn",
    profitPotential: 78,
    growthDifficulty: "Medium",
    waterRequirements: "High",
    growthDuration: "90-120 days",
    idealTemperature: "75-85°F",
    marketDemand: "High",
    estimatedYield: "160-180 bushels/acre",
    estimatedProfit: "$300-400/acre",
    reasons: [
      "Your irrigation system can support water requirements",
      "Soil pH level is within optimal range",
      "Strong market demand with good price forecasts",
      "Your farm size is suitable for efficient corn production",
    ],
  },
  {
    name: "Soybeans",
    profitPotential: 72,
    growthDifficulty: "Medium",
    waterRequirements: "Medium",
    growthDuration: "90-120 days",
    idealTemperature: "70-80°F",
    marketDemand: "Medium",
    estimatedYield: "45-55 bushels/acre",
    estimatedProfit: "$250-350/acre",
    reasons: [
      "Good rotation crop after wheat or corn",
      "Soil conditions are favorable",
      "Moderate water requirements match your irrigation capacity",
      "Growing demand in local markets",
    ],
  },
  {
    name: "Canola",
    profitPotential: 65,
    growthDifficulty: "Medium-Hard",
    waterRequirements: "Medium-Low",
    growthDuration: "85-110 days",
    idealTemperature: "65-75°F",
    marketDemand: "Medium",
    estimatedYield: "35-45 bushels/acre",
    estimatedProfit: "$200-300/acre",
    reasons: [
      "Tolerates your soil pH levels well",
      "Lower water requirements suit your conditions",
      "Growing demand for canola oil",
      "Good price stability in recent seasons",
    ],
  },
];

interface CropRecommendationResultsProps {
  onReset: () => void;
}

export default function CropRecommendationResults({
  onReset,
}: CropRecommendationResultsProps) {
  return (
    <div className="container py-12 mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" className="gap-1" onClick={onReset}>
            <ArrowLeft className="h-4 w-4" />
            Back to Form
          </Button>
          <div className="ml-auto">
            <Button variant="outline" size="sm" className="mr-2">
              Save Results
            </Button>
            <Button variant="outline" size="sm">
              Print
            </Button>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2E7D32] mb-2">
            Your Crop Recommendations
          </h1>
          <p className="text-muted-foreground">
            Based on your soil type, location, and planting time
          </p>
        </div>

        <div className="grid gap-6">
          {recommendedCrops.map((crop, index) => (
            <Card
              key={index}
              className={index === 0 ? "border-[#4CAF50] border-2" : ""}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">{crop.name}</CardTitle>
                      {index === 0 && (
                        <Badge className="bg-[#4CAF50]">
                          Top Recommendation
                        </Badge>
                      )}
                    </div>
                    <CardDescription>
                      {crop.growthDifficulty} to grow • {crop.growthDuration} to
                      harvest
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Profit Potential</div>
                    <div className="flex items-center gap-1">
                      <Progress
                        value={crop.profitPotential}
                        className="h-2 w-24"
                      />
                      <span className="text-sm font-medium">
                        {crop.profitPotential}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="reasons">Why This Crop?</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex flex-col items-center p-3 bg-gray-50 rounded-md">
                        <Droplets className="h-5 w-5 text-blue-500 mb-1" />
                        <span className="text-xs text-muted-foreground">
                          Water Needs
                        </span>
                        <span className="font-medium text-sm">
                          {crop.waterRequirements}
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-gray-50 rounded-md">
                        <Sun className="h-5 w-5 text-orange-500 mb-1" />
                        <span className="text-xs text-muted-foreground">
                          Ideal Temp
                        </span>
                        <span className="font-medium text-sm">
                          {crop.idealTemperature}
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-gray-50 rounded-md">
                        <TrendingUp className="h-5 w-5 text-green-500 mb-1" />
                        <span className="text-xs text-muted-foreground">
                          Market Demand
                        </span>
                        <span className="font-medium text-sm">
                          {crop.marketDemand}
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-gray-50 rounded-md">
                        <BarChart className="h-5 w-5 text-purple-500 mb-1" />
                        <span className="text-xs text-muted-foreground">
                          Est. Yield
                        </span>
                        <span className="font-medium text-sm">
                          {crop.estimatedYield.split("/")[0]}
                        </span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="details">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Growth Information
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">
                              Growth Duration:
                            </span>
                            <span>{crop.growthDuration}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">
                              Water Requirements:
                            </span>
                            <span>{crop.waterRequirements}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">
                              Ideal Temperature:
                            </span>
                            <span>{crop.idealTemperature}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">
                              Difficulty Level:
                            </span>
                            <span>{crop.growthDifficulty}</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Economic Information
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">
                              Market Demand:
                            </span>
                            <span>{crop.marketDemand}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">
                              Estimated Yield:
                            </span>
                            <span>{crop.estimatedYield}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">
                              Estimated Profit:
                            </span>
                            <span className="text-[#4CAF50] font-medium">
                              {crop.estimatedProfit}
                            </span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">
                              Profit Potential:
                            </span>
                            <span>{crop.profitPotential}%</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="reasons">
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Why We Recommend This Crop
                      </h4>
                      <ul className="space-y-2">
                        {crop.reasons.map((reason, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                          >
                            <Leaf className="h-4 w-4 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" size="sm">
                  View Detailed Guide
                </Button>
                <Button size="sm" className="bg-[#4CAF50] hover:bg-[#3e8e41]">
                  Check Market Prices
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
