import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
// import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FarmX - Agricultural Insights & Marketplace",
  description:
    "Maximize your farm's potential with AI-powered insights and marketplace solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} mx-auto w-full`}>
        <Toaster />
        {/* <ThemeProvider attribute="class" defaultTheme="light"> */}
        <Navbar />
        {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
