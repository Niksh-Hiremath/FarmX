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

// Mock data for farming guides
const farmingGuides = [
  {
    id: 1,
    title: "Complete Guide to Growing Wheat",
    description:
      "Learn everything about wheat cultivation from soil preparation to harvest.",
    category: "Grains",
    difficulty: "Medium",
    timeToRead: "15 min read",
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
  },
  {
    id: 2,
    title: "Corn Cultivation: Best Practices",
    description:
      "Maximize your corn yields with these proven techniques and tips.",
    category: "Grains",
    difficulty: "Medium",
    timeToRead: "12 min read",
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
  {
    id: 3,
    title: "Organic Soybean Farming",
    description:
      "A comprehensive guide to growing soybeans using organic methods.",
    category: "Legumes",
    difficulty: "Hard",
    timeToRead: "18 min read",
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
  {
    id: 4,
    title: "Rice Cultivation Techniques",
    description:
      "Step-by-step guide to successful rice farming in various conditions.",
    category: "Grains",
    difficulty: "Hard",
    timeToRead: "20 min read",
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
  {
    id: 5,
    title: "Cotton Growing Guide",
    description:
      "Everything you need to know about cotton cultivation and harvesting.",
    category: "Fiber Crops",
    difficulty: "Medium",
    timeToRead: "14 min read",
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
  {
    id: 6,
    title: "Potato Farming for Beginners",
    description:
      "Start growing potatoes successfully with this beginner-friendly guide.",
    category: "Root Vegetables",
    difficulty: "Easy",
    timeToRead: "10 min read",
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
  },
];

// Mock data for pest & disease guides
const pestDiseaseGuides = [
  {
    id: 1,
    title: "Identifying and Treating Common Wheat Diseases",
    description:
      "Learn to identify and treat rust, smut, and other common wheat diseases.",
    category: "Disease Control",
    cropType: "Wheat",
    timeToRead: "12 min read",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Managing Corn Borers and Rootworms",
    description:
      "Effective strategies for controlling the most damaging corn pests.",
    category: "Pest Control",
    cropType: "Corn",
    timeToRead: "14 min read",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Soybean Aphid Management",
    description:
      "Identify, prevent, and treat soybean aphid infestations in your fields.",
    category: "Pest Control",
    cropType: "Soybeans",
    timeToRead: "10 min read",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Rice Blast Disease Prevention",
    description:
      "Strategies to prevent and manage rice blast disease in your paddies.",
    category: "Disease Control",
    cropType: "Rice",
    timeToRead: "15 min read",
    image: "/placeholder.svg?height=200&width=300",
  },
];

export default function FarmingGuidesPage() {
  const [searchQuery, setSearchQuery] = useState("");

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
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="corn">Corn</SelectItem>
                <SelectItem value="soybeans">Soybeans</SelectItem>
                <SelectItem value="rice">Rice</SelectItem>
                <SelectItem value="cotton">Cotton</SelectItem>
                <SelectItem value="potato">Potato</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {farmingGuides
              .filter((guide) => guide.featured)
              .map((guide) => (
                <Card key={guide.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                      <Image
                        src={guide.image || "/placeholder.svg"}
                        alt={guide.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge className="mb-2 bg-[#4CAF50]">
                              {guide.category}
                            </Badge>
                            <CardTitle className="text-xl">
                              {guide.title}
                            </CardTitle>
                          </div>
                          <Badge variant="outline">{guide.difficulty}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2 flex-grow">
                        <p className="text-sm">{guide.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {guide.timeToRead}
                        </span>
                        <Button asChild className="gap-1">
                          <Link href={`/farming-guides/${guide.id}`}>
                            Read Guide
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        <Tabs defaultValue="growing-guides" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger
              value="growing-guides"
              className="flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Growing Guides
            </TabsTrigger>
            <TabsTrigger
              value="pest-disease"
              className="flex items-center gap-2"
            >
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 13h2v2h-2v-2zm0-8h2v6h-2V7z" />
              </svg>
              Pest & Disease Control
            </TabsTrigger>
          </TabsList>

          <TabsContent value="growing-guides">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {farmingGuides
                .filter((guide) => !guide.featured)
                .map((guide) => (
                  <Card key={guide.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={guide.image || "/placeholder.svg"}
                        alt={guide.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <Badge className="mb-2">{guide.category}</Badge>
                        <Badge variant="outline">{guide.difficulty}</Badge>
                      </div>
                      <CardTitle className="text-lg">{guide.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">{guide.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {guide.timeToRead}
                      </span>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="gap-1"
                      >
                        <Link href={`/farming-guides/${guide.id}`}>
                          Read Guide
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="pest-disease">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pestDiseaseGuides.map((guide) => (
                <Card key={guide.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                      <Image
                        src={guide.image || "/placeholder.svg"}
                        alt={guide.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge className="mb-2">{guide.category}</Badge>
                          <Badge variant="outline">{guide.cropType}</Badge>
                        </div>
                        <CardTitle className="text-lg">{guide.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2 flex-grow">
                        <p className="text-sm">{guide.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {guide.timeToRead}
                        </span>
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="gap-1"
                        >
                          <Link
                            href={`/farming-guides/pest-disease/${guide.id}`}
                          >
                            Read Guide
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
