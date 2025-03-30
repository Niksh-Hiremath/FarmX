"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Removed hardcoded recommendedCrops array

interface CropRecommendationResultsProps {
  data: {
    recommended_crop: string;
    soil_parameters: {
      nitrogen: number;
      phosphorus: number;
      potassium: number;
      ph: number;
    };
    climate_parameters: {
      temperature: number;
      humidity: number;
      rainfall: number;
    };
  } | null;
  onReset: () => void;
}

export default function CropRecommendationResults({
  data,
  onReset,
}: CropRecommendationResultsProps) {
  if (!data) return <div>No data available</div>;

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
            Your Crop Recommendation
          </h1>
          <p className="text-muted-foreground">
            Based on your provided soil and climate data
          </p>
        </div>

        <Card className="border-[#4CAF50] border-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">
                {data.recommended_crop.charAt(0).toUpperCase() + data.recommended_crop.slice(1)}
              </CardTitle>
              <Badge className="bg-[#4CAF50]">Top Recommendation</Badge>
            </div>
            <CardDescription>
              Recommended based on your soil & climate conditions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Soil Parameters</h4>
                <ul className="list-disc pl-5 text-sm">
                  <li>Nitrogen: {data.soil_parameters.nitrogen}</li>
                  <li>Phosphorus: {data.soil_parameters.phosphorus}</li>
                  <li>Potassium: {data.soil_parameters.potassium}</li>
                  <li>pH: {data.soil_parameters.ph}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Climate Parameters</h4>
                <ul className="list-disc pl-5 text-sm">
                  <li>Temperature: {data.climate_parameters.temperature}°C</li>
                  <li>Humidity: {data.climate_parameters.humidity}%</li>
                  <li>Rainfall: {data.climate_parameters.rainfall}mm</li>
                </ul>
              </div>
            </div>
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
      </div>
    </div>
  );
}
