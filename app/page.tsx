import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import QuickStatsPanel from "@/components/quick-stats-panel";
import FeaturedSection from "@/components/featured-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen mx-auto">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/images/hero-farm.jpg')" }}
        />
        <div className="container relative z-20 px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold text-white max-w-3xl">
              Maximize Your Farm's Potential with AI-Powered Insights
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">
              Get personalized crop recommendations, market trends, and expert
              advice to optimize your farming operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                size="lg"
                className="bg-[#4CAF50] hover:bg-[#3e8e41] text-white"
              >
                Get Crop Recommendations
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20"
              >
                Check Market Trends
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="bg-white py-6 border-b mx-auto md:min-w-4xl min-w-xl">
        <div className="container px-4 md:px-6">
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search for crops, weather, trends, or guides..."
              className="pl-10 py-6 text-base rounded-full border-[#8D6E63]/20 focus-visible:ring-[#4CAF50]"
            />
          </div>
        </div>
      </section>

      {/* Quick Stats Panel */}
      <QuickStatsPanel />

      {/* Featured Sections */}
      <FeaturedSection />

      {/* Footer */}
      <footer className="bg-[#2E7D32] text-white py-12 mt-auto w-full">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FarmX</h3>
              <p className="text-white/80">
                Empowering farmers with AI-driven insights and marketplace
                solutions.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Features</h4>
              <ul className="space-y-2 text-white/80">
                <li>
                  <Link href="#" className="hover:text-white">
                    Crop Recommendations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Market Analysis
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Farming Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Marketplace
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Community</h4>
              <ul className="space-y-2 text-white/80">
                <li>
                  <Link href="#" className="hover:text-white">
                    Expert Q&A
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Regional Groups
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Discussion Forums
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Events
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <ul className="space-y-2 text-white/80">
                <li>support@farmx.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Farming Lane, Agritown</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>© 2023 FarmX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
