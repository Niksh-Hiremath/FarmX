"use client";

import { useState } from "react";
import Link from "next/link";
import { Filter, MessageSquare, Search, Users } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for discussions
const discussions = [
  {
    id: 1,
    title: "Best practices for organic pest control in corn?",
    author: {
      name: "Michael Johnson",
      role: "Farmer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Pest Control",
    replies: 24,
    views: 342,
    lastActivity: "2 hours ago",
    isHot: true,
  },
  {
    id: 2,
    title:
      "Weather forecast for Midwest region shows potential drought conditions",
    author: {
      name: "Sarah Williams",
      role: "Expert",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Weather Alerts",
    replies: 18,
    views: 276,
    lastActivity: "5 hours ago",
    isHot: true,
  },
  {
    id: 3,
    title: "New government subsidy program for sustainable farming practices",
    author: {
      name: "Robert Chen",
      role: "Expert",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Government Programs",
    replies: 32,
    views: 510,
    lastActivity: "1 day ago",
    isHot: false,
  },
  {
    id: 4,
    title: "Recommendations for soil testing services in the Southern region?",
    author: {
      name: "Emily Davis",
      role: "Farmer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Soil Management",
    replies: 15,
    views: 198,
    lastActivity: "2 days ago",
    isHot: false,
  },
  {
    id: 5,
    title: "Comparing yields between traditional and no-till farming methods",
    author: {
      name: "David Wilson",
      role: "Farmer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Farming Techniques",
    replies: 29,
    views: 387,
    lastActivity: "3 days ago",
    isHot: false,
  },
];

// Mock data for regional groups
const regionalGroups = [
  {
    id: 1,
    name: "Midwest Grain Growers",
    members: 1245,
    topics: 87,
    description:
      "A community for grain farmers in the Midwest region to share knowledge and best practices.",
  },
  {
    id: 2,
    name: "Southern Cotton Alliance",
    members: 876,
    topics: 62,
    description:
      "Connect with cotton farmers across the Southern states to discuss cultivation techniques and market trends.",
  },
  {
    id: 3,
    name: "West Coast Specialty Crops",
    members: 932,
    topics: 74,
    description:
      "For farmers growing specialty crops in California, Oregon, and Washington.",
  },
  {
    id: 4,
    name: "Northeast Dairy Collective",
    members: 654,
    topics: 51,
    description:
      "Supporting dairy farmers in the Northeast with discussions on feed, herd management, and milk prices.",
  },
];

// Mock data for expert Q&A
const expertQA = [
  {
    id: 1,
    question:
      "What's the optimal nitrogen application rate for corn following soybeans?",
    askedBy: "Thomas Miller",
    expert: {
      name: "Dr. Jennifer Lee",
      specialty: "Soil Fertility",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    answers: 3,
    status: "Answered",
  },
  {
    id: 2,
    question: "How can I identify and treat early signs of soybean rust?",
    askedBy: "Rebecca Taylor",
    expert: {
      name: "Dr. Mark Wilson",
      specialty: "Plant Pathology",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    answers: 2,
    status: "Answered",
  },
  {
    id: 3,
    question:
      "What are the best cover crops for improving soil health in a corn-soybean rotation?",
    askedBy: "James Anderson",
    expert: null,
    answers: 0,
    status: "Open",
  },
  {
    id: 4,
    question:
      "How should I adjust irrigation scheduling during extended heat waves?",
    askedBy: "Maria Rodriguez",
    expert: {
      name: "Dr. Steven Brown",
      specialty: "Irrigation Management",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    answers: 1,
    status: "Answered",
  },
];

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container py-12 mx-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2E7D32] mb-2">
            Farmer Community
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow farmers, join regional groups, and get expert
            advice on all your farming questions
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search discussions, groups, or questions..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="bg-[#4CAF50] hover:bg-[#3e8e41]">
            Start New Discussion
          </Button>
        </div>

        <Tabs defaultValue="discussions" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger
              value="discussions"
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Discussions
            </TabsTrigger>
            <TabsTrigger
              value="regional-groups"
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Regional Groups
            </TabsTrigger>
            <TabsTrigger value="expert-qa" className="flex items-center gap-2">
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
              Expert Q&A
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discussions">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Select defaultValue="latest">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest Activity</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="replies">Most Replies</SelectItem>
                    <SelectItem value="views">Most Views</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground">
                Showing {discussions.length} discussions
              </div>
            </div>

            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card key={discussion.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <Link
                          href={`/community/discussion/${discussion.id}`}
                          className="hover:underline"
                        >
                          <CardTitle className="text-lg">
                            {discussion.title}
                          </CardTitle>
                        </Link>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={discussion.author.avatar}
                              alt={discussion.author.name}
                            />
                            <AvatarFallback>
                              {discussion.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{discussion.author.name}</span>
                          <Badge variant="outline" className="ml-1 text-xs">
                            {discussion.author.role}
                          </Badge>
                        </CardDescription>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline">{discussion.category}</Badge>
                        {discussion.isHot && (
                          <Badge className="bg-red-500">Hot</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="pt-2 text-sm text-muted-foreground">
                    <div className="flex justify-between w-full">
                      <div className="flex gap-4">
                        <span>{discussion.replies} replies</span>
                        <span>{discussion.views} views</span>
                      </div>
                      <div>Last activity: {discussion.lastActivity}</div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <Button variant="outline">Load More Discussions</Button>
            </div>
          </TabsContent>

          <TabsContent value="regional-groups">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regionalGroups.map((group) => (
                <Card key={group.id}>
                  <CardHeader>
                    <Link
                      href={`/community/group/${group.id}`}
                      className="hover:underline"
                    >
                      <CardTitle>{group.name}</CardTitle>
                    </Link>
                    <CardDescription className="flex gap-4 mt-1">
                      <span>{group.members} members</span>
                      <span>{group.topics} topics</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{group.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View Group
                    </Button>
                    <Button
                      size="sm"
                      className="bg-[#4CAF50] hover:bg-[#3e8e41]"
                    >
                      Join Group
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Create a New Group</CardTitle>
                  <CardDescription>
                    Start your own regional farming group to connect with
                    farmers in your area
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="group-name"
                          className="text-sm font-medium"
                        >
                          Group Name
                        </label>
                        <Input
                          id="group-name"
                          placeholder="e.g., Northeast Organic Farmers"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="group-region"
                          className="text-sm font-medium"
                        >
                          Region
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="midwest">Midwest</SelectItem>
                            <SelectItem value="northeast">Northeast</SelectItem>
                            <SelectItem value="south">South</SelectItem>
                            <SelectItem value="west">West</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="group-description"
                          className="text-sm font-medium"
                        >
                          Description
                        </label>
                        <Input
                          id="group-description"
                          placeholder="Describe the purpose of your group"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#4CAF50] hover:bg-[#3e8e41]">
                    Create Group
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="expert-qa">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                Ask Our Agricultural Experts
              </h2>
              <Button className="bg-[#4CAF50] hover:bg-[#3e8e41]">
                Ask a Question
              </Button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-[#F1F8E9] border-[#C5E1A5]">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#33691E]">
                      Soil & Fertilizer
                    </CardTitle>
                    <CardDescription>
                      Questions about soil health, fertilization, and nutrient
                      management
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <p className="font-medium">Expert: Dr. Jennifer Lee</p>
                      <p className="text-muted-foreground">
                        PhD in Soil Science
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Questions
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-[#E8F5E9] border-[#A5D6A7]">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#2E7D32]">
                      Pest & Disease Control
                    </CardTitle>
                    <CardDescription>
                      Questions about identifying and managing crop pests and
                      diseases
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <p className="font-medium">Expert: Dr. Mark Wilson</p>
                      <p className="text-muted-foreground">Plant Pathologist</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Questions
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-[#E0F7FA] border-[#80DEEA]">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#006064]">
                      Irrigation & Water
                    </CardTitle>
                    <CardDescription>
                      Questions about water management and irrigation systems
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <p className="font-medium">Expert: Dr. Steven Brown</p>
                      <p className="text-muted-foreground">
                        Irrigation Specialist
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Questions
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Recent Questions</h3>
                <div className="space-y-4">
                  {expertQA.map((qa) => (
                    <Card key={qa.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <Link
                            href={`/community/question/${qa.id}`}
                            className="hover:underline"
                          >
                            <CardTitle className="text-lg">
                              {qa.question}
                            </CardTitle>
                          </Link>
                          <Badge
                            className={
                              qa.status === "Answered"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                            }
                          >
                            {qa.status}
                          </Badge>
                        </div>
                        <CardDescription className="mt-1">
                          Asked by {qa.askedBy}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        {qa.expert ? (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={qa.expert.avatar}
                                alt={qa.expert.name}
                              />
                              <AvatarFallback>
                                {qa.expert.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {qa.expert.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {qa.expert.specialty}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Waiting for expert response
                          </p>
                        )}
                      </CardContent>
                      <CardFooter className="pt-0 text-sm">
                        <div className="flex justify-between w-full">
                          <span>
                            {qa.answers}{" "}
                            {qa.answers === 1 ? "answer" : "answers"}
                          </span>
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 h-auto text-[#4CAF50]"
                          >
                            View Question
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
