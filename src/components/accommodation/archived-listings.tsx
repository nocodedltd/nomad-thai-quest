// ARCHIVED ACCOMMODATION LISTINGS
// This file contains the original accommodation listings functionality
// Archived on: $(date)
// Reason: Replaced with three new modules (short-term hostels, long-term guide, and resources)

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Building,
  Users,
  MapPin,
  Star,
  Calendar,
  DollarSign,
  Search,
  Filter,
  Coffee,
  ArrowRight,
  Music,
  Mountain
} from "lucide-react";

// Original accommodation listings data - ARCHIVED
const accommodationTypes = [
  {
    id: "hostels",
    title: "Hostels & Backpacker",
    description: "Budget-friendly social accommodation",
    icon: Users,
    priceRange: "$5-20/night",
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "condos",
    title: "Condos & Apartments", 
    description: "Modern living with amenities",
    icon: Building,
    priceRange: "$300-1,500/month",
    color: "from-green-500 to-green-600"
  },
  {
    id: "coliving",
    title: "Co-living Spaces",
    description: "Digital nomad communities",
    icon: Coffee,
    priceRange: "$400-800/month", 
    color: "from-purple-500 to-purple-600"
  },
  {
    id: "villas",
    title: "Houses & Villas",
    description: "Private space and luxury",
    icon: Star,
    priceRange: "$800-5,000/month",
    color: "from-orange-500 to-orange-600"
  }
];

const accommodationListings = [
  {
    id: 1,
    name: "Bangkok Nomad Hub",
    type: "coliving",
    location: "Sukhumvit, Bangkok",
    price: "$650/month",
    rating: 4.8,
    reviews: 124,
    amenities: ["WiFi", "Coworking", "Gym", "Pool", "Laundry"],
    description: "Modern co-living space designed for digital nomads",
    access: "free"
  },
  // ... rest of original listings
];

// This component is archived and should not be used
export default function ArchivedAccommodationListings() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">⚠️ Archived Component</h2>
      <p className="text-muted-foreground">
        This accommodation listings component has been archived and replaced with new modules.
      </p>
    </div>
  );
}
