"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Leaf, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import farmingGuidesData from "@/app/data/farming-guides.json";

export default function CropGuidePage({ params }: { params: { id: string } }) {
  const cropId = parseInt(params.id);
  const crop = farmingGuidesData.crops.find((c) => c.id === cropId);

  if (!crop) {
    return (
      <div className="container py-12 mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Crop guide not found</h1>
        <Button asChild>
          <Link href="/farming-guides">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Guides
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" asChild className="mb-4">
            <Link href="/farming-guides">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Guides
            </Link>
          </Button>
          <div className="flex items-center gap-2 mb-2">
            <Badge>{crop.category}</Badge>
            <Badge variant="outline">{crop.difficulty}</Badge>
            <span className="text-sm text-muted-foreground ml-auto">
              {crop.timeToRead}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#2E7D32] mb-2">
            {crop.title}
          </h1>
          <p className="text-muted-foreground mb-4">{crop.description}</p>
          <p className="text-sm italic mb-4">
            <span className="font-semibold">Scientific Name:</span>{" "}
            {crop.scientificName}
          </p>
        </div>

        <div className="relative h-64 md:h-80 mb-8 rounded-lg overflow-hidden">
          <Image
            src={crop.image || "/placeholder.svg?height=400&width=800"}
            alt={crop.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Growing Season</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-semibold">Planting Time:</p>
                  <p className="text-sm">{crop.growingSeason.plantingTime}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Harvest Time:</p>
                  <p className="text-sm">{crop.growingSeason.harvestTime}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Growing Zones:</p>
                  <p className="text-sm">{crop.growingSeason.growingZones}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold">Sunlight:</p>
                  <p className="text-sm">{crop.quickStats.sunlight}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Soil pH:</p>
                  <p className="text-sm">{crop.quickStats.soilPH}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Watering Needs:</p>
                  <p className="text-sm">{crop.quickStats.wateringNeeds}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Spacing:</p>
                  <p className="text-sm">{crop.quickStats.spacing}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Days to Maturity:</p>
                  <p className="text-sm">{crop.quickStats.daysToMaturity}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="growing-guide" className="mb-10">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="growing-guide">Growing Guide</TabsTrigger>
            <TabsTrigger value="problems">Common Problems</TabsTrigger>
            <TabsTrigger value="seasonal">Seasonal Care</TabsTrigger>
          </TabsList>

          <TabsContent value="growing-guide" className="mt-6">
            <h2 className="text-2xl font-bold mb-6">Step-by-Step Growing Guide</h2>
            <Accordion type="single" collapsible className="w-full">
              {crop.growingSteps.map((step) => (
                <AccordionItem key={step.stepNumber} value={`step-${step.stepNumber}`}>
                  <AccordionTrigger>
                    <span className="text-left">
                      <span className="font-semibold">Step {step.stepNumber}:</span> {step.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <p className="mb-4">{step.description}</p>
                    {step.tips && step.tips.length > 0 && (
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2 flex items-center">
                          <Leaf className="h-4 w-4 mr-2 text-green-600" />
                          Pro Tips:
                        </h4>
                        <ul className="space-y-2">
                          {step.tips.map((tip, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                              <span className="text-sm">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="problems" className="mt-6">
            <h2 className="text-2xl font-bold mb-6">Common Problems</h2>
            <div className="space-y-6">
              {crop.commonProblems.map((problem, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                      {problem.problem}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold">Symptoms:</p>
                        <p className="text-sm">{problem.symptoms}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Causes:</p>
                        <p className="text-sm">{problem.causes}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Solutions:</p>
                        <p className="text-sm">{problem.solutions}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="seasonal" className="mt-6">
            <h2 className="text-2xl font-bold mb-6">Seasonal Care</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2 bg-green-50">
                  <CardTitle className="text-lg">Spring</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p>{crop.seasonalCare.spring}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2 bg-yellow-50">
                  <CardTitle className="text-lg">Summer</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p>{crop.seasonalCare.summer}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2 bg-orange-50">
                  <CardTitle className="text-lg">Fall</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p>{crop.seasonalCare.fall}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2 bg-blue-50">
                  <CardTitle className="text-lg">Winter</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p>{crop.seasonalCare.winter}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}