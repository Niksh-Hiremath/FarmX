import Image from "next/image";
import { ArrowRight, BarChart2, Leaf, ShoppingBag, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function FeaturedSection() {
  return (
    <section className="py-16 mx-auto">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-[#2E7D32]">
          Optimize Your Farming Operations
        </h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
          FarmX provides comprehensive tools and insights to help you make
          data-driven decisions for your farm's success.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* AI Crop Recommendations */}
          <Card className="border-t-4 border-t-[#4CAF50]">
            <CardHeader>
              <div className="mb-2">
                <Leaf className="h-8 w-8 text-[#4CAF50]" />
              </div>
              <CardTitle>AI Crop Recommendations</CardTitle>
              <CardDescription>
                Get personalized suggestions based on your soil, location, and
                market demand
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                variant="ghost"
                className="text-[#4CAF50] p-0 hover:text-[#2E7D32] hover:bg-transparent"
                asChild
              >
                <Link href="/crop-recommendations">
                  Explore <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Market Analysis */}
          <Card className="border-t-4 border-t-[#FFEB3B]">
            <CardHeader>
              <div className="mb-2">
                <BarChart2 className="h-8 w-8 text-[#FFEB3B]" />
              </div>
              <CardTitle>Market Analysis</CardTitle>
              <CardDescription>
                Track price trends and demand forecasts to maximize your profits
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                variant="ghost"
                className="text-[#4CAF50] p-0 hover:text-[#2E7D32] hover:bg-transparent"
                asChild
              >
                <Link href="/market-trends">
                  Explore <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Marketplace */}
          <Card className="border-t-4 border-t-[#8D6E63]">
            <CardHeader>
              <div className="mb-2">
                <ShoppingBag className="h-8 w-8 text-[#8D6E63]" />
              </div>
              <CardTitle>Crop Marketplace</CardTitle>
              <CardDescription>
                Buy and sell crops directly, rent equipment, and manage
                inventory
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                variant="ghost"
                className="text-[#4CAF50] p-0 hover:text-[#2E7D32] hover:bg-transparent"
                asChild
              >
                <Link href="/marketplace">
                  Explore <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Community */}
          <Card className="border-t-4 border-t-[#2196F3]">
            <CardHeader>
              <div className="mb-2">
                <Users className="h-8 w-8 text-[#2196F3]" />
              </div>
              <CardTitle>Farmer Community</CardTitle>
              <CardDescription>
                Connect with experts and fellow farmers to share knowledge
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                variant="ghost"
                className="text-[#4CAF50] p-0 hover:text-[#2E7D32] hover:bg-transparent"
                asChild
              >
                <Link href="/community">
                  Explore <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Success Stories */}
        <div className="mt-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#2E7D32]">
            Success Stories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=192&width=384"
                  alt="Farmer success story"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">30% Yield Increase</h3>
                <p className="text-muted-foreground">
                  "Using FarmX's crop recommendations, I was able to optimize my
                  planting schedule and increase my wheat yield by 30%."
                </p>
                <div className="mt-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center mr-3">
                    <span className="font-medium text-[#2E7D32]">JD</span>
                  </div>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">
                      Wheat Farmer, Iowa
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=192&width=384"
                  alt="Farmer success story"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">
                  Market Price Optimization
                </h3>
                <p className="text-muted-foreground">
                  "The market analysis tools helped me time my sales perfectly,
                  resulting in 25% higher profits for my corn harvest."
                </p>
                <div className="mt-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center mr-3">
                    <span className="font-medium text-[#2E7D32]">MS</span>
                  </div>
                  <div>
                    <p className="font-medium">Maria Smith</p>
                    <p className="text-sm text-muted-foreground">
                      Corn Grower, Nebraska
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=192&width=384"
                  alt="Farmer success story"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">
                  Pest Management Success
                </h3>
                <p className="text-muted-foreground">
                  "The community forum helped me identify and treat a pest issue
                  before it damaged my entire crop. Saved thousands!"
                </p>
                <div className="mt-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center mr-3">
                    <span className="font-medium text-[#2E7D32]">RJ</span>
                  </div>
                  <div>
                    <p className="font-medium">Robert Johnson</p>
                    <p className="text-sm text-muted-foreground">
                      Vegetable Farmer, California
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-[#4CAF50] hover:bg-[#3e8e41] text-white"
            >
              Join FarmX Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
