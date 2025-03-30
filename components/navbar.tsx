"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50 w-full">
      <div className="container mx-auto py-4 w-full">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <svg
              className="h-8 w-8 text-[#4CAF50]"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 3L4 9v12h16V9l-8-6zm0 2.25L18 9.75V21H6V9.75L12 5.25z" />
              <path d="M7.5 11.5h9v1.5h-9z" />
              <path d="M7.5 14.5h9v1.5h-9z" />
              <path d="M7.5 17.5h4.5v1.5h-4.5z" />
            </svg>
            <span className="text-xl font-bold text-[#2E7D32]">FarmX</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/crop-recommendations"
              className="text-[#2E7D32] font-medium hover:text-[#4CAF50]"
            >
              Crop Recommendations
            </Link>
            <Link
              href="/market-trends"
              className="text-[#2E7D32] font-medium hover:text-[#4CAF50]"
            >
              Market Analysis
            </Link>
            <Link
              href="/farming-guides"
              className="text-[#2E7D32] font-medium hover:text-[#4CAF50]"
            >
              Farming Guides
            </Link>
            <Link
              href="/marketplace"
              className="text-[#2E7D32] font-medium hover:text-[#4CAF50]"
            >
              Marketplace
            </Link>
            <Link
              href="/community"
              className="text-[#2E7D32] font-medium hover:text-[#4CAF50]"
            >
              Community
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white"
              onClick={() => (window.location.href = "/auth/login")}
            >
              Log In
            </Button>
            <Button
              className="bg-[#4CAF50] hover:bg-[#3e8e41] text-white"
              onClick={() => (window.location.href = "/auth/signup")}
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-[#2E7D32]" />
            ) : (
              <Menu className="h-6 w-6 text-[#2E7D32]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/crop-recommendations"
                className="text-[#2E7D32] font-medium hover:text-[#4CAF50] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Crop Recommendations
              </Link>
              <Link
                href="/market-trends"
                className="text-[#2E7D32] font-medium hover:text-[#4CAF50] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Market Analysis
              </Link>
              <Link
                href="/farming-guides"
                className="text-[#2E7D32] font-medium hover:text-[#4CAF50] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Farming Guides
              </Link>
              <Link
                href="/marketplace"
                className="text-[#2E7D32] font-medium hover:text-[#4CAF50] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Marketplace
              </Link>
              <Link
                href="/community"
                className="text-[#2E7D32] font-medium hover:text-[#4CAF50] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </Link>
              <div className="flex space-x-4 pt-2">
                <Button
                  variant="outline"
                  className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.location.href = "/auth/login";
                  }}
                >
                  Log In
                </Button>
                <Button
                  className="bg-[#4CAF50] hover:bg-[#3e8e41] text-white"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.location.href = "/auth/signup";
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
