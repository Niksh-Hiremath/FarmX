"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function LogoutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast("Logged out successfully", {
        description: "You have been logged out of your account",
      });
      router.push("/");
    }, 1000);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-80px)] py-12 mx-auto">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-red-100 p-3">
              <LogOut className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Log Out</CardTitle>
          <CardDescription>
            Are you sure you want to log out of your FarmX account?
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          You will need to log in again to access your personalized farming
          insights and recommendations.
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700"
            disabled={isLoading}
          >
            {isLoading ? "Logging out..." : "Yes, Log Me Out"}
          </Button>
          <Button variant="outline" onClick={handleCancel} className="w-full">
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
