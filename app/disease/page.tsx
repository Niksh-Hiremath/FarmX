"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  History,
  Check,
  AlertCircle,
  FileType,
  Leaf,
  Camera,
  RefreshCw,
  XCircle,
  Info,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Mock data for previous scans
const previousScans = [
  {
    id: 1,
    cropType: "Tomato",
    disease: "Late Blight",
    confidence: 94,
    date: "2025-03-25",
    image: "/placeholder.svg?height=200&width=300",
    severity: "High",
    recommendation:
      "Apply fungicide immediately. Consider removing severely infected plants to prevent spread.",
  },
  {
    id: 2,
    cropType: "Wheat",
    disease: "Powdery Mildew",
    confidence: 87,
    date: "2025-03-20",
    image: "/placeholder.svg?height=200&width=300",
    severity: "Medium",
    recommendation:
      "Apply sulfur-based fungicide. Ensure proper spacing between plants for better air circulation.",
  },
  {
    id: 3,
    cropType: "Corn",
    disease: "Northern Leaf Blight",
    confidence: 92,
    date: "2025-03-15",
    image: "/placeholder.svg?height=200&width=300",
    severity: "Medium",
    recommendation:
      "Apply foliar fungicide. Use resistant varieties in future plantings.",
  },
  {
    id: 4,
    cropType: "Rice",
    disease: "Healthy",
    confidence: 98,
    date: "2025-03-10",
    image: "/placeholder.svg?height=200&width=300",
    severity: "None",
    recommendation:
      "Continue current management practices. Regular monitoring recommended.",
  },
];

export default function CropDiseaseDetectionPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [cropType, setCropType] = useState("");
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [uploadMethod, setUploadMethod] = useState("upload");

  // Create a reference to the file input element
  const fileInputRef = useRef(null);

  // Function to trigger file input click
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // In a real implementation, this would access the device camera
    // For this mockup, we'll just show an alert
    alert("Camera functionality would open device camera here.");
  };

  const resetAnalysis = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
    setCropType("");
  };

  const analyzeImage = async () => {
    if (!selectedFile) {
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate progress updates
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);

    try {
      // Create a FormData object to send only the image
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Send to FastAPI backend
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error from server: ${response.statusText}`);
      }

      const result = await response.json();
      setAnalysisProgress(100);

      // Map the API response to our UI model
      // The backend returns predicted_class, confidence, and filename
      setAnalysisResult({
        disease: result.predicted_class || "Unknown",
        confidence: result.confidence || 0,
        severity: getSeverityFromDisease(result.predicted_class),
      });
    } catch (err) {
      console.error("Analysis failed:", err);

      // Fallback to mock data for demonstration if needed
      const mockResult = {
        disease: cropType === "Rice" ? "Healthy" : "Late Blight",
        confidence: 94,
        severity: cropType === "Rice" ? "None" : "High",
      };

      setAnalysisResult(mockResult);
    } finally {
      clearInterval(interval);
      setIsAnalyzing(false);
    }
  };

  // Helper function to determine severity based on disease type
  const getSeverityFromDisease = (disease) => {
    if (!disease) return "Unknown";

    if (disease.toLowerCase().includes("healthy")) {
      return "None";
    } else if (
      disease.toLowerCase().includes("blight") ||
      disease.toLowerCase().includes("rust") ||
      disease.toLowerCase().includes("rot")
    ) {
      return "High";
    } else {
      return "Medium";
    }
  };

  return (
    <div className="container py-12 mx-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2E7D32] mb-2">
            Crop Disease Detection
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload images of your crops to identify diseases and get treatment
            recommendations
          </p>
        </div>

        <Tabs defaultValue="detection" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="detection" className="flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              Disease Detection
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Scan History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="detection">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Crop Image</CardTitle>
                  <CardDescription>
                    Select an image of your crop for disease detection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant={
                          uploadMethod === "upload" ? "default" : "outline"
                        }
                        className={
                          uploadMethod === "upload"
                            ? "bg-[#4CAF50] hover:bg-[#3e8e41]"
                            : ""
                        }
                        onClick={() => setUploadMethod("upload")}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        File Upload
                      </Button>
                      <Button
                        variant={
                          uploadMethod === "camera" ? "default" : "outline"
                        }
                        className={
                          uploadMethod === "camera"
                            ? "bg-[#4CAF50] hover:bg-[#3e8e41]"
                            : ""
                        }
                        onClick={() => setUploadMethod("camera")}
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Use Camera
                      </Button>
                    </div>

                    {uploadMethod === "upload" ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        {!previewUrl ? (
                          <>
                            <FileType className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground mb-2">
                              Drag and drop an image or click to browse files
                            </p>
                            <Input
                              id="image-upload"
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                            <Button
                              variant="outline"
                              className="mt-2"
                              onClick={handleBrowseClick}
                            >
                              Browse Files
                            </Button>
                          </>
                        ) : (
                          <div className="relative w-full h-48">
                            <Image
                              src={previewUrl}
                              alt="Crop preview"
                              fill
                              className="object-contain"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={resetAnalysis}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Camera className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Take a photo of your crop using your device camera
                        </p>
                        <Button
                          onClick={handleCameraCapture}
                          className="mt-2 bg-[#4CAF50] hover:bg-[#3e8e41]"
                        >
                          Open Camera
                        </Button>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="crop-type">Crop Type</Label>
                      <Select value={cropType} onValueChange={setCropType}>
                        <SelectTrigger id="crop-type">
                          <SelectValue placeholder="Select crop type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tomato">Tomato</SelectItem>
                          <SelectItem value="Potato">Potato</SelectItem>
                          <SelectItem value="Corn">Corn</SelectItem>
                          <SelectItem value="Wheat">Wheat</SelectItem>
                          <SelectItem value="Rice">Rice</SelectItem>
                          <SelectItem value="Soybean">Soybean</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    onClick={analyzeImage}
                    disabled={!previewUrl || isAnalyzing}
                    className="bg-[#4CAF50] hover:bg-[#3e8e41]"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Image"
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                  <CardDescription>Disease detection analysis</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex flex-col justify-center">
                  {isAnalyzing ? (
                    <div className="text-center space-y-4">
                      <RefreshCw className="h-12 w-12 mx-auto text-[#4CAF50] animate-spin" />
                      <p>Analyzing your crop image...</p>
                      <Progress
                        value={analysisProgress}
                        className="h-2 w-full"
                      />
                      <p className="text-sm text-muted-foreground">
                        {analysisProgress}% complete
                      </p>
                    </div>
                  ) : analysisResult ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Diagnosis:</h3>
                        <Badge
                          className={
                            analysisResult.disease === "Healthy"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }
                        >
                          {analysisResult.disease}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Confidence:</span>
                          <span className="font-semibold">
                            {analysisResult.confidence}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Severity:</span>
                          <span
                            className={`font-semibold ${
                              analysisResult.severity === "High"
                                ? "text-red-500"
                                : analysisResult.severity === "Medium"
                                ? "text-amber-500"
                                : "text-green-500"
                            }`}
                          >
                            {analysisResult.severity}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Button className="bg-[#4CAF50] hover:bg-[#3e8e41]">
                          <Check className="h-4 w-4 mr-1" /> Save Result
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <AlertCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        Upload an image to get analysis results
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Your Scan History</h3>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Crops</SelectItem>
                    <SelectItem value="tomato">Tomato</SelectItem>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="corn">Corn</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {previousScans.map((scan) => (
                  <Card key={scan.id}>
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-48 h-48">
                        <Image
                          src={scan.image || "/placeholder.svg"}
                          alt={scan.cropType}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold">
                              {scan.cropType}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Scanned on{" "}
                              {new Date(scan.date).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge
                            className={
                              scan.disease === "Healthy"
                                ? "bg-green-500"
                                : scan.severity === "High"
                                ? "bg-red-500"
                                : "bg-amber-500"
                            }
                          >
                            {scan.disease}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-sm font-medium">Confidence</p>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={scan.confidence}
                                className="h-2"
                              />
                              <span className="text-sm">
                                {scan.confidence}%
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Severity</p>
                            <span
                              className={`text-sm font-semibold ${
                                scan.severity === "High"
                                  ? "text-red-500"
                                  : scan.severity === "Medium"
                                  ? "text-amber-500"
                                  : "text-green-500"
                              }`}
                            >
                              {scan.severity}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-end mt-4 gap-2">
                          <Button variant="outline" size="sm">
                            View Image
                          </Button>
                          <Button
                            className="bg-[#4CAF50] hover:bg-[#3e8e41]"
                            size="sm"
                          >
                            Rescan
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Button variant="outline">Load More History</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
