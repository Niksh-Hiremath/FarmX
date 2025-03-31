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

          {/* Disease Detection */}
          <Card className="border-t-4 border-t-[#8D6E63]">
            <CardHeader>
              <div className="mb-2">
                <ShoppingBag className="h-8 w-8 text-[#8D6E63]" />
              </div>
              <CardTitle>Disease Detection</CardTitle>
              <CardDescription>
                Scan and detect diseaes in your crop
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                variant="ghost"
                className="text-[#4CAF50] p-0 hover:text-[#2E7D32] hover:bg-transparent"
                asChild
              >
                <Link href="/disease">
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
      </div>
    </section>
  );
}
