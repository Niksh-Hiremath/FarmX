"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Filter,
  Grid3X3,
  List,
  Search,
  ShoppingBag,
  Tractor,
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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for crop listings
const cropListings = [
  {
    id: 1,
    title: "Premium Quality Wheat",
    description:
      "Freshly harvested wheat with high protein content. Ideal for flour production.",
    price: 7.5,
    unit: "bushel",
    quantity: 2500,
    location: "Iowa",
    seller: {
      name: "Johnson Farms",
      rating: 4.8,
      verified: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=200&width=300",
    postedDate: "2 days ago",
  },
  {
    id: 2,
    title: "Organic Corn",
    description:
      "Certified organic corn, non-GMO. Perfect for animal feed or food production.",
    price: 8.25,
    unit: "bushel",
    quantity: 1800,
    location: "Nebraska",
    seller: {
      name: "Green Valley Organics",
      rating: 4.9,
      verified: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=200&width=300",
    postedDate: "5 days ago",
  },
  {
    id: 3,
    title: "Soybeans - High Yield Variety",
    description:
      "High oil content soybeans, ideal for processing. Current season harvest.",
    price: 14.75,
    unit: "bushel",
    quantity: 1200,
    location: "Illinois",
    seller: {
      name: "Midwest Grain Co.",
      rating: 4.6,
      verified: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=200&width=300",
    postedDate: "1 week ago",
  },
  {
    id: 4,
    title: "Premium Rice",
    description:
      "Long grain rice, excellent quality with minimal broken grains.",
    price: 18.5,
    unit: "cwt",
    quantity: 850,
    location: "Arkansas",
    seller: {
      name: "Delta Rice Producers",
      rating: 4.7,
      verified: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=200&width=300",
    postedDate: "3 days ago",
  },
];

// Mock data for equipment rentals
const equipmentRentals = [
  {
    id: 1,
    title: "John Deere 8R Tractor",
    description:
      "370 HP tractor available for short-term rental. Includes GPS guidance system.",
    price: 450,
    unit: "day",
    location: "Iowa",
    owner: {
      name: "Precision Ag Services",
      rating: 4.9,
      verified: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=200&width=300",
    availability: "Available Now",
  },
  {
    id: 2,
    title: "Combine Harvester",
    description:
      "Modern combine with corn and grain headers. Operator included in rental price.",
    price: 650,
    unit: "day",
    location: "Nebraska",
    owner: {
      name: "Harvest Solutions",
      rating: 4.8,
      verified: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=200&width=300",
    availability: "Available from June 15",
  },
  {
    id: 3,
    title: "Fertilizer Spreader",
    description:
      "High-capacity spreader with precision application technology.",
    price: 200,
    unit: "day",
    location: "Illinois",
    owner: {
      name: "AgriRent Services",
      rating: 4.7,
      verified: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=200&width=300",
    availability: "Available Now",
  },
];

export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  return (
    <div className="container py-12 mx-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2E7D32] mb-2">
            Marketplace
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Buy and sell crops directly, rent equipment, and manage your
            inventory
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search crops, equipment, or supplies..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="bg-[#4CAF50] hover:bg-[#3e8e41]">
            Post New Listing
          </Button>
        </div>

        <Tabs defaultValue="crops" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="crops" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Crops & Produce
            </TabsTrigger>
            <TabsTrigger value="equipment" className="flex items-center gap-2">
              <Tractor className="h-4 w-4" />
              Equipment Rentals
            </TabsTrigger>
          </TabsList>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="verified-only" className="text-sm">
                    Verified Sellers Only
                  </Label>
                  <Switch
                    id="verified-only"
                    checked={showVerifiedOnly}
                    onCheckedChange={setShowVerifiedOnly}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Price Range:</Label>
                  <div className="w-[150px]">
                    <Slider
                      value={priceRange}
                      max={50}
                      step={0.5}
                      onValueChange={setPriceRange}
                    />
                  </div>
                  <span className="text-sm">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-muted" : ""}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-muted" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Seller Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="crops">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cropListings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={listing.image || "/placeholder.svg"}
                        alt={listing.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">
                          {listing.title}
                        </CardTitle>
                        <Badge className="bg-[#4CAF50]">
                          ${listing.price}/{listing.unit}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <span>{listing.location}</span>
                        <span>•</span>
                        <span>{listing.postedDate}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm line-clamp-2">
                        {listing.description}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={listing.seller.avatar}
                            alt={listing.seller.name}
                          />
                          <AvatarFallback>
                            {listing.seller.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {listing.seller.name}
                        </span>
                        {listing.seller.verified && (
                          <svg
                            className="h-4 w-4 text-blue-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        )}
                        <span className="text-sm text-muted-foreground">
                          ({listing.seller.rating})
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm">
                        <span className="font-medium">Quantity: </span>
                        <span>
                          {listing.quantity} {listing.unit}s
                        </span>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-[#4CAF50] hover:bg-[#3e8e41]"
                          >
                            Make Offer
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Make an Offer</DialogTitle>
                            <DialogDescription>
                              Submit your offer for {listing.title}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="offer-price"
                                className="text-right"
                              >
                                Price per {listing.unit}
                              </Label>
                              <div className="col-span-3 relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                  $
                                </span>
                                <Input
                                  id="offer-price"
                                  defaultValue={listing.price.toString()}
                                  className="pl-7"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="offer-quantity"
                                className="text-right"
                              >
                                Quantity
                              </Label>
                              <div className="col-span-3 flex items-center gap-2">
                                <Input
                                  id="offer-quantity"
                                  type="number"
                                  defaultValue="100"
                                  min="1"
                                  max={listing.quantity}
                                />
                                <span>{listing.unit}s</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="offer-message"
                                className="text-right"
                              >
                                Message
                              </Label>
                              <Input
                                id="offer-message"
                                placeholder="Optional message to seller"
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button className="bg-[#4CAF50] hover:bg-[#3e8e41]">
                              Submit Offer
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {cropListings.map((listing) => (
                  <Card key={listing.id}>
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-48 h-48">
                        <Image
                          src={listing.image || "/placeholder.svg"}
                          alt={listing.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold">
                              {listing.title}
                            </h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <span>{listing.location}</span>
                              <span>•</span>
                              <span>{listing.postedDate}</span>
                            </p>
                          </div>
                          <Badge className="bg-[#4CAF50]">
                            ${listing.price}/{listing.unit}
                          </Badge>
                        </div>
                        <p className="text-sm mt-2">{listing.description}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={listing.seller.avatar}
                              alt={listing.seller.name}
                            />
                            <AvatarFallback>
                              {listing.seller.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">
                            {listing.seller.name}
                          </span>
                          {listing.seller.verified && (
                            <svg
                              className="h-4 w-4 text-blue-500"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                          )}
                          <span className="text-sm text-muted-foreground">
                            ({listing.seller.rating})
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="text-sm">
                            <span className="font-medium">Quantity: </span>
                            <span>
                              {listing.quantity} {listing.unit}s
                            </span>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                className="bg-[#4CAF50] hover:bg-[#3e8e41]"
                              >
                                Make Offer
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Make an Offer</DialogTitle>
                                <DialogDescription>
                                  Submit your offer for {listing.title}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="offer-price-list"
                                    className="text-right"
                                  >
                                    Price per {listing.unit}
                                  </Label>
                                  <div className="col-span-3 relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                      $
                                    </span>
                                    <Input
                                      id="offer-price-list"
                                      defaultValue={listing.price.toString()}
                                      className="pl-7"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="offer-quantity-list"
                                    className="text-right"
                                  >
                                    Quantity
                                  </Label>
                                  <div className="col-span-3 flex items-center gap-2">
                                    <Input
                                      id="offer-quantity-list"
                                      type="number"
                                      defaultValue="100"
                                      min="1"
                                      max={listing.quantity}
                                    />
                                    <span>{listing.unit}s</span>
                                  </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="offer-message-list"
                                    className="text-right"
                                  >
                                    Message
                                  </Label>
                                  <Input
                                    id="offer-message-list"
                                    placeholder="Optional message to seller"
                                    className="col-span-3"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button className="bg-[#4CAF50] hover:bg-[#3e8e41]">
                                  Submit Offer
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <Button variant="outline">Load More Listings</Button>
            </div>
          </TabsContent>

          <TabsContent value="equipment">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {equipmentRentals.map((equipment) => (
                <Card key={equipment.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={equipment.image || "/placeholder.svg"}
                      alt={equipment.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">
                        {equipment.title}
                      </CardTitle>
                      <Badge className="bg-[#8D6E63]">
                        ${equipment.price}/{equipment.unit}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <span>{equipment.location}</span>
                      <span>•</span>
                      <Badge variant="outline" className="text-xs">
                        {equipment.availability}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm">{equipment.description}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={equipment.owner.avatar}
                          alt={equipment.owner.name}
                        />
                        <AvatarFallback>
                          {equipment.owner.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {equipment.owner.name}
                      </span>
                      {equipment.owner.verified && (
                        <svg
                          className="h-4 w-4 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      )}
                      <span className="text-sm text-muted-foreground">
                        ({equipment.owner.rating})
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-[#8D6E63] hover:bg-[#6D4C41]">
                          Book Equipment
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Book Equipment</DialogTitle>
                          <DialogDescription>
                            Reserve {equipment.title} for your farming needs
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="rental-start"
                              className="text-right"
                            >
                              Start Date
                            </Label>
                            <Input
                              id="rental-start"
                              type="date"
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="rental-end" className="text-right">
                              End Date
                            </Label>
                            <Input
                              id="rental-end"
                              type="date"
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="rental-notes"
                              className="text-right"
                            >
                              Special Requests
                            </Label>
                            <Input
                              id="rental-notes"
                              placeholder="Any special requirements"
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button className="bg-[#8D6E63] hover:bg-[#6D4C41]">
                            Confirm Booking
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>List Your Equipment for Rent</CardTitle>
                  <CardDescription>
                    Generate additional income by renting out your farming
                    equipment when not in use
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="equipment-title">Equipment Name</Label>
                        <Input
                          id="equipment-title"
                          placeholder="e.g., John Deere 8R Tractor"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="equipment-category">Category</Label>
                        <Select>
                          <SelectTrigger id="equipment-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tractor">Tractor</SelectItem>
                            <SelectItem value="harvester">Harvester</SelectItem>
                            <SelectItem value="planter">Planter</SelectItem>
                            <SelectItem value="sprayer">Sprayer</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="equipment-price">
                          Daily Rental Price ($)
                        </Label>
                        <Input
                          id="equipment-price"
                          type="number"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="equipment-location">Location</Label>
                        <Input
                          id="equipment-location"
                          placeholder="City, State"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="equipment-description">Description</Label>
                      <Input
                        id="equipment-description"
                        placeholder="Describe your equipment, specifications, and rental terms"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="equipment-photo">Upload Photos</Label>
                      <Input id="equipment-photo" type="file" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#8D6E63] hover:bg-[#6D4C41]">
                    List Equipment
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
