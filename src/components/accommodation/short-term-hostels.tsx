import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin,
  Star,
  ExternalLink,
  Users,
  Wifi,
  Coffee,
  Car,
  Plane
} from "lucide-react";

const hostelsByArea = [
  {
    area: "Bangkok",
    description: "Thailand's bustling capital with endless opportunities",
    hostels: [
      {
        name: "Lub d Bangkok Silom",
        rating: 4.5,
        price: "$15-25/night",
        description: "Modern hostel in the heart of Bangkok's business district",
        amenities: ["Free WiFi", "A/C", "Lockers", "Common Area"],
        googleMapsUrl: "https://goo.gl/maps/bangkok-silom-example",
        hostelworldUrl: "https://www.hostelworld.com/example-bangkok-silom",
        image: "/api/placeholder/300/200"
      },
      {
        name: "Mad Monkey Hostel Bangkok",
        rating: 4.3,
        price: "$12-20/night",
        description: "Vibrant backpacker hostel with great social atmosphere",
        amenities: ["Free WiFi", "Pool", "Bar", "Tours"],
        googleMapsUrl: "https://goo.gl/maps/bangkok-madmonkey-example",
        hostelworldUrl: "https://www.hostelworld.com/example-bangkok-madmonkey",
        image: "/api/placeholder/300/200"
      },
      {
        name: "The Yard Hostel",
        rating: 4.6,
        price: "$18-28/night",
        description: "Stylish hostel near Khao San Road with modern facilities",
        amenities: ["Free WiFi", "A/C", "Breakfast", "Security"],
        googleMapsUrl: "https://goo.gl/maps/bangkok-yard-example",
        hostelworldUrl: "https://www.hostelworld.com/example-bangkok-yard",
        image: "/api/placeholder/300/200"
      }
    ]
  },
  {
    area: "Chiang Mai",
    description: "Digital nomad haven in Northern Thailand",
    hostels: [
      {
        name: "Deejai Backpackers",
        rating: 4.4,
        price: "$8-15/night",
        description: "Cozy hostel in the heart of the old city",
        amenities: ["Free WiFi", "Garden", "Kitchen", "Laundry"],
        googleMapsUrl: "https://goo.gl/maps/chiangmai-deejai-example",
        hostelworldUrl: "https://www.hostelworld.com/example-chiangmai-deejai",
        image: "/api/placeholder/300/200"
      },
      {
        name: "Stamps Backpackers",
        rating: 4.2,
        price: "$10-18/night",
        description: "Popular hostel with great community vibe",
        amenities: ["Free WiFi", "Pool", "Tours", "Bike Rental"],
        googleMapsUrl: "https://goo.gl/maps/chiangmai-stamps-example",
        hostelworldUrl: "https://www.hostelworld.com/example-chiangmai-stamps",
        image: "/api/placeholder/300/200"
      },
      {
        name: "Phra Singh Village",
        rating: 4.5,
        price: "$12-22/night",
        description: "Boutique hostel near temples and markets",
        amenities: ["Free WiFi", "A/C", "Cafe", "Cultural Tours"],
        googleMapsUrl: "https://goo.gl/maps/chiangmai-phrasingh-example",
        hostelworldUrl: "https://www.hostelworld.com/example-chiangmai-phrasingh",
        image: "/api/placeholder/300/200"
      }
    ]
  },
  {
    area: "Koh Samui",
    description: "Tropical island paradise with stunning beaches",
    hostels: [
      {
        name: "Mad Monkey Hostel Koh Samui",
        rating: 4.1,
        price: "$20-30/night",
        description: "Beachfront hostel with pool and bar",
        amenities: ["Free WiFi", "Beach Access", "Pool", "Bar"],
        googleMapsUrl: "https://goo.gl/maps/kohsamui-madmonkey-example",
        hostelworldUrl: "https://www.hostelworld.com/example-kohsamui-madmonkey",
        image: "/api/placeholder/300/200"
      },
      {
        name: "Lub d Koh Samui",
        rating: 4.3,
        price: "$25-35/night",
        description: "Stylish hostel with modern amenities",
        amenities: ["Free WiFi", "Pool", "Restaurant", "Spa"],
        googleMapsUrl: "https://goo.gl/maps/kohsamui-lubd-example",
        hostelworldUrl: "https://www.hostelworld.com/example-kohsamui-lubd",
        image: "/api/placeholder/300/200"
      }
    ]
  },
  {
    area: "Phuket",
    description: "Thailand's largest island with world-class beaches",
    hostels: [
      {
        name: "Slumber Party Hostel",
        rating: 4.4,
        price: "$15-25/night",
        description: "Fun hostel near Patong Beach",
        amenities: ["Free WiFi", "Pool", "Kitchen", "Tours"],
        googleMapsUrl: "https://goo.gl/maps/phuket-slumber-example",
        hostelworldUrl: "https://www.hostelworld.com/example-phuket-slumber",
        image: "/api/placeholder/300/200"
      },
      {
        name: "Mad Monkey Hostel Phuket",
        rating: 4.2,
        price: "$18-28/night",
        description: "Social hostel with rooftop bar",
        amenities: ["Free WiFi", "Rooftop Bar", "Pool", "Laundry"],
        googleMapsUrl: "https://goo.gl/maps/phuket-madmonkey-example",
        hostelworldUrl: "https://www.hostelworld.com/example-phuket-madmonkey",
        image: "/api/placeholder/300/200"
      }
    ]
  },
  {
    area: "Koh Phi Phi",
    description: "Stunning limestone islands made famous by movies",
    hostels: [
      {
        name: "Blanco Beach Bar",
        rating: 4.0,
        price: "$20-35/night",
        description: "Beachfront hostel with amazing sunset views",
        amenities: ["Beach Access", "Bar", "Restaurant", "Tours"],
        googleMapsUrl: "https://goo.gl/maps/kohphiphi-blanco-example",
        hostelworldUrl: "https://www.hostelworld.com/example-kohphiphi-blanco",
        image: "/api/placeholder/300/200"
      },
      {
        name: "Phi Phi Island Village",
        rating: 4.2,
        price: "$25-40/night",
        description: "Tropical hostel surrounded by nature",
        amenities: ["Free WiFi", "Garden", "Restaurant", "Snorkeling"],
        googleMapsUrl: "https://goo.gl/maps/kohphiphi-village-example",
        hostelworldUrl: "https://www.hostelworld.com/example-kohphiphi-village",
        image: "/api/placeholder/300/200"
      }
    ]
  }
];

export default function ShortTermHostels() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const handleGoogleMapsClick = (url: string, hostelName: string) => {
    // In a real app, this would open Google Maps or prompt to save
    window.open(url, '_blank');
  };

  const handleHostelworldClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">🏨 Featured Hostels in Thailand</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Handpicked budget-friendly hostels perfect for backpackers across Thailand's top destinations
        </p>
      </div>

      {/* Area Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <Button
          variant={selectedArea === null ? "default" : "outline"}
          onClick={() => setSelectedArea(null)}
          className="h-auto py-3"
        >
          All Areas
        </Button>
        {hostelsByArea.map((area) => (
          <Button
            key={area.area}
            variant={selectedArea === area.area ? "default" : "outline"}
            onClick={() => setSelectedArea(area.area)}
            className="h-auto py-3"
          >
            {area.area}
          </Button>
        ))}
      </div>

      {/* Hostels Display */}
      <div className="space-y-8">
        {hostelsByArea
          .filter(area => selectedArea === null || area.area === selectedArea)
          .map((area) => (
            <div key={area.area}>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{area.area}</h3>
                <p className="text-muted-foreground">{area.description}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {area.hostels.map((hostel, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-muted relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Users className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-green-500">
                          {hostel.price}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-lg">{hostel.name}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{hostel.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {hostel.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {hostel.amenities.map((amenity) => (
                          <Badge key={amenity} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleGoogleMapsClick(hostel.googleMapsUrl, hostel.name)}
                        >
                          <MapPin className="w-4 h-4 mr-1" />
                          Save to Maps
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleHostelworldClick(hostel.hostelworldUrl)}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Info Section */}
      <Card className="p-6 mt-8 bg-blue-50 dark:bg-blue-950/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Why These Hostels?</h3>
            <p className="text-muted-foreground mb-4">
              These hostels have been personally vetted for their quality, location, and backpacker-friendly atmosphere. 
              Each offers great value for money and serves as an excellent base for exploring Thailand.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-blue-600" />
                <span>Reliable WiFi for remote work</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-blue-600" />
                <span>Social common areas</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-blue-600" />
                <span>Easy transportation access</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-blue-600" />
                <span>Airport transfer assistance</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
