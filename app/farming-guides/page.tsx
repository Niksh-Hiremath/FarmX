"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ChevronRight, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import farming guides data
import farmingGuidesData from "@/app/data/farming-guides.json";

export default function FarmingGuidesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { crops } = farmingGuidesData;

  // Filter crops based on search query
  const filteredCrops = crops.filter(
    (crop) =>
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-12 mx-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2E7D32] mb-2">
            Farming Guides
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Step-by-step guides for growing different crops and managing pests &
            diseases
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search guides by crop type, technique, or keyword..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Crops</SelectItem>
                {crops.map((crop) => (
                  <SelectItem key={crop.id} value={crop.name.toLowerCase()}>
                    {crop.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <Card key={crop.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={crop.image || "/placeholder.svg?height=200&width=300"}
                  alt={crop.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <Badge className="mb-2">{crop.category}</Badge>
                  <Badge variant="outline">{crop.difficulty}</Badge>
                </div>
                <CardTitle className="text-lg">{crop.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm">{crop.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div></div> {/* Empty div to maintain spacing */}
                <Button asChild size="sm" variant="outline" className="gap-1">
                  <Link href={`/farming-guides/${crop.id}`}>
                    Read Guide
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
