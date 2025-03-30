"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Bookmark,
  Clock,
  Download,
  Printer,
  Share2,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for a specific farming guide (wheat)
const wheatGuide = {
  id: 1,
  title: "Complete Guide to Growing Wheat",
  description:
    "Learn everything about wheat cultivation from soil preparation to harvest.",
  category: "Grains",
  difficulty: "Medium",
  timeToRead: "15 min read",
  author: {
    name: "Dr. Sarah Johnson",
    title: "Agricultural Scientist",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  publishDate: "May 10, 2023",
  updatedDate: "July 15, 2023",
  image: "/placeholder.svg?height=400&width=800",
  content: {
    introduction: `
      Wheat is one of the world's most important cereal crops, providing essential nutrients to billions of people. This guide will walk you through the entire process of growing wheat, from selecting the right variety to harvesting and storage.
      
      Whether you're a small-scale farmer or managing large acreage, these principles will help you maximize your wheat yield while maintaining soil health and sustainability.
    `,
    sections: [
      {
        title: "Selecting the Right Wheat Variety",
        content: `
          There are several types of wheat to consider:
          
          - **Winter Wheat**: Planted in fall, dormant in winter, harvested in early summer
          - **Spring Wheat**: Planted in spring, harvested in late summer
          - **Hard Red Wheat**: High protein, ideal for bread flour
          - **Soft White Wheat**: Lower protein, better for pastries and cakes
          - **Durum Wheat**: Very hard, used primarily for pasta
          
          Choose a variety that's well-adapted to your local climate and soil conditions. Consult with your local agricultural extension office for specific recommendations for your region.
        `,
      },
      {
        title: "Soil Preparation",
        content: `
          Wheat grows best in well-drained, loamy soil with a pH between 6.0 and 7.0. Follow these steps for optimal soil preparation:
          
          1. **Soil Testing**: Conduct a soil test to determine nutrient levels and pH
          2. **Tillage**: Prepare a firm seedbed with good soil-to-seed contact
          3. **Fertilization**: Apply fertilizer based on soil test results
             - Nitrogen: 60-120 lbs/acre (depending on soil organic matter)
             - Phosphorus: 20-60 lbs/acre
             - Potassium: 20-60 lbs/acre
          4. **pH Adjustment**: Apply lime if soil pH is below 6.0
          
          For no-till systems, ensure proper weed control before planting and adjust fertilizer application methods accordingly.
        `,
      },
      {
        title: "Planting",
        content: `
          Proper planting is crucial for establishing a good wheat crop:
          
          - **Planting Date**:
            - Winter Wheat: 4-6 weeks before first frost (typically September-October)
            - Spring Wheat: As early as soil can be worked (typically March-April)
          
          - **Seeding Rate**: 1.2-1.8 million seeds per acre (approximately 60-120 lbs/acre)
          
          - **Planting Depth**: 1-1.5 inches deep
          
          - **Row Spacing**: 6-8 inches for conventional drilling
          
          Ensure good seed-to-soil contact and uniform depth for even emergence.
        `,
      },
      {
        title: "Crop Management",
        content: `
          Proper management throughout the growing season is essential:
          
          - **Weed Control**:
            - Pre-emergence herbicides can be applied shortly after planting
            - Post-emergence herbicides should target specific weed problems
            - Mechanical cultivation may be an option for organic production
          
          - **Disease Management**:
            - Scout regularly for diseases like rust, powdery mildew, and Fusarium head blight
            - Apply fungicides at the appropriate growth stage if disease pressure warrants
            - Crop rotation helps break disease cycles
          
          - **Insect Management**:
            - Monitor for aphids, armyworms, and other pests
            - Use economic thresholds to determine if treatment is necessary
            - Consider beneficial insects in your management decisions
          
          - **Irrigation** (if available):
            - Critical periods for water are at germination, tillering, and grain filling
            - Avoid overwatering, which can promote disease
        `,
      },
      {
        title: "Harvesting",
        content: `
          Timing is critical for wheat harvest:
          
          - Harvest when grain moisture is between 13-15%
          - Kernels should be firm and difficult to dent with your fingernail
          - Straw should be golden yellow and dry
          
          For combine harvesting:
          - Set cylinder speed and concave clearance according to manufacturer recommendations
          - Adjust settings throughout the day as moisture conditions change
          - Minimize grain damage and losses by fine-tuning combine settings
          
          For small-scale harvesting:
          - Cut wheat with a sickle when kernels are hard
          - Bundle into sheaves and shock to dry
          - Thresh by beating or using a small thresher
        `,
      },
      {
        title: "Storage",
        content: `
          Proper storage preserves wheat quality:
          
          - Clean grain thoroughly before storage
          - Ensure moisture content is below 13% for long-term storage
          - Store in clean, dry bins or containers
          - Monitor temperature and moisture regularly
          - Control insects with proper bin sanitation and approved protectants if necessary
          
          For seed wheat:
          - Store at cooler temperatures if possible
          - Keep moisture below 12%
          - Conduct germination tests before the next planting season
        `,
      },
    ],
  },
  relatedGuides: [
    {
      id: 2,
      title: "Corn Cultivation: Best Practices",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 3,
      title: "Organic Soybean Farming",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 5,
      title: "Cotton Growing Guide",
      image: "/placeholder.svg?height=100&width=150",
    },
  ],
};

export default function GuideDetailPage() {
  const guide = wheatGuide; // In a real app, you would fetch the guide based on the ID
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="container py-12 mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" size="sm" className="gap-1 mb-4" asChild>
            <Link href="/farming-guides">
              <ArrowLeft className="h-4 w-4" />
              Back to Guides
            </Link>
          </Button>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge>{guide.category}</Badge>
            <Badge variant="outline">{guide.difficulty}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {guide.timeToRead}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#2E7D32] mb-4">
            {guide.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <Avatar>
              <AvatarImage src={guide.author.avatar} alt={guide.author.name} />
              <AvatarFallback>{guide.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{guide.author.name}</p>
              <p className="text-sm text-muted-foreground">
                {guide.author.title}
              </p>
            </div>
            <div className="text-sm text-muted-foreground ml-auto">
              Updated: {guide.updatedDate}
            </div>
          </div>

          <div className="relative h-[300px] md:h-[400px] mb-6 rounded-lg overflow-hidden">
            <Image
              src={guide.image || "/placeholder.svg"}
              alt={guide.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant="outline"
              size="sm"
              className={`gap-1 ${liked ? "bg-blue-50 text-blue-600" : ""}`}
              onClick={() => setLiked(!liked)}
            >
              <ThumbsUp className="h-4 w-4" />
              {liked ? "Liked" : "Like"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`gap-1 ${
                bookmarked ? "bg-blue-50 text-blue-600" : ""
              }`}
              onClick={() => setBookmarked(!bookmarked)}
            >
              <Bookmark className="h-4 w-4" />
              {bookmarked ? "Saved" : "Save"}
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="prose prose-green max-w-none mb-8">
          <div className="bg-[#F1F8E9] p-4 rounded-lg border border-[#C5E1A5] mb-6">
            <h2 className="text-[#33691E] text-lg font-bold mt-0">
              Introduction
            </h2>
            <p className="text-[#33691E] mb-0">{guide.content.introduction}</p>
          </div>

          <Tabs defaultValue="guide" className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="guide">Guide</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            <TabsContent value="guide" className="pt-4">
              {guide.content.sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-xl font-bold text-[#2E7D32] mb-4">
                    {section.title}
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: section.content.replace(/\n/g, "<br />"),
                    }}
                  />
                </div>
              ))}
            </TabsContent>
            <TabsContent value="materials" className="pt-4">
              <h2 className="text-xl font-bold text-[#2E7D32] mb-4">
                Required Materials
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg
                    className="h-5 w-5 text-[#4CAF50] mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span>
                    Quality wheat seeds (appropriate variety for your region)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="h-5 w-5 text-[#4CAF50] mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span>Soil testing kit or professional soil analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="h-5 w-5 text-[#4CAF50] mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span>Fertilizers (based on soil test results)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="h-5 w-5 text-[#4CAF50] mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span>Seed drill or broadcasting equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="h-5 w-5 text-[#4CAF50] mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span>Herbicides (pre and post-emergence)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="h-5 w-5 text-[#4CAF
50] mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span>Fungicides (if disease pressure warrants)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="h-5 w-5 text-[#4CAF50] mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span>Combine harvester or manual harvesting tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="h-5 w-5 text-[#4CAF50] mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span>Storage containers or bins</span>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="faq" className="pt-4">
              <h2 className="text-xl font-bold text-[#2E7D32] mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold">
                    What is the best time to plant wheat?
                  </h3>
                  <p>
                    For winter wheat, plant 4-6 weeks before the first frost
                    (typically September-October). For spring wheat, plant as
                    early as the soil can be worked (typically March-April).
                  </p>
                </div>
                <div>
                  <h3 className="font-bold">How much water does wheat need?</h3>
                  <p>
                    Wheat typically requires 12-15 inches of water throughout
                    the growing season. Critical periods for water are at
                    germination, tillering, and grain filling.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold">
                    How do I know when wheat is ready to harvest?
                  </h3>
                  <p>
                    Wheat is ready to harvest when grain moisture is between
                    13-15%, kernels are firm and difficult to dent with your
                    fingernail, and straw is golden yellow and dry.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold">
                    What is the average yield for wheat?
                  </h3>
                  <p>
                    Average wheat yields vary by region and variety, but
                    typically range from 30-80 bushels per acre for winter wheat
                    and 25-70 bushels per acre for spring wheat.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold">Can wheat be grown organically?</h3>
                  <p>
                    Yes, wheat can be grown organically. This requires careful
                    attention to crop rotation, mechanical weed control, organic
                    fertilizers, and biological pest management.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Separator className="my-8" />

        <div className="pt-4">
          <h2 className="text-xl font-bold text-[#2E7D32] mb-4">
            Related Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {guide.relatedGuides.map((relatedGuide) => (
              <Card key={relatedGuide.id} className="overflow-hidden">
                <Link
                  href={`/farming-guides/${relatedGuide.id}`}
                  className="block"
                >
                  <div className="relative h-32">
                    <Image
                      src={relatedGuide.image || "/placeholder.svg"}
                      alt={relatedGuide.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium line-clamp-2">
                      {relatedGuide.title}
                    </h3>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
