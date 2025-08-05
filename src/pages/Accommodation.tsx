import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Home, 
  Video, 
  MapPin, 
  Star,
  Users,
  Calendar,
  DollarSign,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  CheckCircle,
  Clock,
  Target,
  Zap,
  TrendingUp,
  Award,
  Building,
  Car,
  Plane,
  Play
} from "lucide-react";

interface Hostel {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: string;
  type: "party" | "chill" | "family" | "digital-nomad";
  amenities: string[];
  description: string;
  image: string;
  reviews: number;
}

interface RealEstateAgent {
  id: string;
  name: string;
  company: string;
  location: string;
  specialties: string[];
  rating: number;
  reviews: number;
  contact: {
    email: string;
    phone: string;
    website: string;
  };
  description: string;
}

const hostels: Hostel[] = [
  {
    id: "1",
    name: "Revolutions Hostel",
    location: "Bangkok, Thailand",
    rating: 4.8,
    price: "฿300-500/night",
    type: "party",
    amenities: ["Free WiFi", "Rooftop Bar", "Social Events", "Kitchen"],
    description: "The ultimate party hostel in Bangkok with daily events and social atmosphere.",
    image: "/revolutions-hostel.jpg",
    reviews: 1247
  },
  {
    id: "2",
    name: "Nomad House Chiang Mai",
    location: "Chiang Mai, Thailand",
    rating: 4.9,
    price: "฿400-600/night",
    type: "digital-nomad",
    amenities: ["Co-working Space", "High-speed WiFi", "Quiet Zones", "Coffee Shop"],
    description: "Perfect for digital nomads with dedicated workspaces and quiet areas.",
    image: "/nomad-house.jpg",
    reviews: 892
  },
  {
    id: "3",
    name: "Phuket Beach Hostel",
    location: "Phuket, Thailand",
    rating: 4.6,
    price: "฿250-400/night",
    type: "chill",
    amenities: ["Beach Access", "Hammocks", "Yoga Classes", "Bike Rental"],
    description: "Relaxed beachfront hostel perfect for unwinding and meeting fellow travelers.",
    image: "/phuket-beach.jpg",
    reviews: 567
  },
  {
    id: "4",
    name: "Bangkok Family Hostel",
    location: "Bangkok, Thailand",
    rating: 4.7,
    price: "฿350-550/night",
    type: "family",
    amenities: ["Private Rooms", "Kitchen", "Laundry", "Tour Desk"],
    description: "Family-friendly hostel with private rooms and kitchen facilities.",
    image: "/bangkok-family.jpg",
    reviews: 423
  }
];

const realEstateAgents: RealEstateAgent[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    company: "Bangkok Property Solutions",
    location: "Bangkok",
    specialties: ["Condos", "Serviced Apartments", "Expat Areas"],
    rating: 4.9,
    reviews: 156,
    contact: {
      email: "sarah@bangkokproperty.com",
      phone: "+66 2 123 4567",
      website: "https://bangkokproperty.com"
    },
    description: "Specialized in helping expats find their perfect home in Bangkok's best neighborhoods."
  },
  {
    id: "2",
    name: "Mike Chen",
    company: "Chiang Mai Real Estate",
    location: "Chiang Mai",
    specialties: ["Houses", "Villas", "Digital Nomad Areas"],
    rating: 4.8,
    reviews: 89,
    contact: {
      email: "mike@chiangmairealestate.com",
      phone: "+66 53 987 6543",
      website: "https://chiangmairealestate.com"
    },
    description: "Expert in Chiang Mai's real estate market, especially popular with digital nomads."
  },
  {
    id: "3",
    name: "Lisa Thompson",
    company: "Phuket Property Partners",
    location: "Phuket",
    specialties: ["Beach Houses", "Luxury Villas", "Investment Properties"],
    rating: 4.7,
    reviews: 203,
    contact: {
      email: "lisa@phuketproperty.com",
      phone: "+66 76 555 1234",
      website: "https://phuketproperty.com"
    },
    description: "Leading real estate expert in Phuket, specializing in beachfront and luxury properties."
  }
];

export default function Accommodation() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("guide");
  const [selectedHostelType, setSelectedHostelType] = useState<string>("all");
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<RealEstateAgent | null>(null);

  const tabs = [
    { id: "guide", label: "Video Guide", icon: Video },
    { id: "hostels", label: "Hostel Finder", icon: Building },
    { id: "agents", label: "Real Estate", icon: Home }
  ];

  const hostelTypes = [
    { id: "all", label: "All Types" },
    { id: "party", label: "Party" },
    { id: "chill", label: "Chill" },
    { id: "family", label: "Family" },
    { id: "digital-nomad", label: "Digital Nomad" }
  ];

  const filteredHostels = hostels.filter(hostel => 
    selectedHostelType === "all" || hostel.type === selectedHostelType
  );

  const handleAgentContact = (agent: RealEstateAgent) => {
    setSelectedAgent(agent);
    setShowAgentForm(true);
  };

  return (
    <div className="min-h-screen bg-background p-3 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/overview")}
            className="mb-4 text-sm"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Overview
          </Button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-purple-500/10">
              <Home className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Accommodation Module</h1>
              <p className="text-muted-foreground">Find your perfect home in Thailand</p>
            </div>
          </div>

          {/* Progress */}
          <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold">Module Progress</h3>
              <Badge variant="secondary">25% Complete</Badge>
            </div>
            <ProgressBar progress={25} size="lg" className="mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1/4 sections completed</span>
              <span>250 XP earned</span>
            </div>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-muted p-1 rounded-lg">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 text-xs md:text-sm px-3 md:px-4"
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Video Guide Tab */}
        {activeTab === "guide" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Accommodation Video Guide</h2>
              <p className="text-muted-foreground">Learn everything about finding accommodation in Thailand</p>
            </div>

            <Card className="p-6">
              <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Video Guide Coming Soon</p>
                  <p className="text-sm text-muted-foreground">Learn about housing options, costs, and tips</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold">What You'll Learn:</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Types of accommodation in Thailand</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Cost of living by city</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>How to find the best deals</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Negotiation tips</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Legal considerations</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Popular neighborhoods</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Video Guide
                  </Button>
                </div>
              </div>
            </Card>

            {/* Quick Links */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="w-6 h-6 text-blue-600" />
                  <h3 className="font-bold">Facebook Marketplace</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Find local rental listings and connect directly with landlords
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Browse Listings
                </Button>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Building className="w-6 h-6 text-green-600" />
                  <h3 className="font-bold">Real Estate Sites</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Professional real estate platforms with verified listings
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Properties
                </Button>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                  <h3 className="font-bold">Expat Groups</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Join Facebook groups for expat housing recommendations
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Join Groups
                </Button>
              </Card>
            </div>
          </div>
        )}

        {/* Hostel Finder Tab */}
        {activeTab === "hostels" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">Hostel Finder</h2>
                <p className="text-muted-foreground">Find the perfect hostel for your Thailand adventure</p>
              </div>
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Get Free Guide
              </Button>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap gap-2">
              {hostelTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={selectedHostelType === type.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedHostelType(type.id)}
                >
                  {type.label}
                </Button>
              ))}
            </div>

            {/* Hostels Grid */}
            <div className="grid gap-6">
              {filteredHostels.map((hostel) => (
                <Card key={hostel.id} className="p-6">
                  <div className="flex gap-6">
                    <div className="w-32 h-24 bg-muted rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg mb-1">{hostel.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{hostel.location}</span>
                            <Badge variant="secondary">{hostel.type}</Badge>
                          </div>
                          <p className="text-sm mb-3">{hostel.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{hostel.price}</div>
                          <div className="flex items-center gap-1 justify-end">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm">{hostel.rating}</span>
                            <span className="text-xs text-muted-foreground">({hostel.reviews})</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {hostel.amenities.map((amenity, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <Button className="flex-1">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Real Estate Agents Tab */}
        {activeTab === "agents" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Real Estate Agents</h2>
              <p className="text-muted-foreground">Connect with trusted real estate professionals</p>
            </div>

            <div className="grid gap-6">
              {realEstateAgents.map((agent) => (
                <Card key={agent.id} className="p-6">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg mb-1">{agent.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{agent.company}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{agent.location}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm">{agent.rating}</span>
                              <span className="text-xs text-muted-foreground">({agent.reviews})</span>
                            </div>
                          </div>
                          <p className="text-sm mb-3">{agent.description}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {agent.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <Button 
                          className="flex-1"
                          onClick={() => handleAgentContact(agent)}
                        >
                          Contact Agent
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Website
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Agent Contact Form Modal */}
        {showAgentForm && selectedAgent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Contact {selectedAgent.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your full name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Your phone number" />
                </div>
                <div>
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-15k">Under ฿15,000/month</SelectItem>
                      <SelectItem value="15k-25k">฿15,000 - ฿25,000/month</SelectItem>
                      <SelectItem value="25k-40k">฿25,000 - ฿40,000/month</SelectItem>
                      <SelectItem value="40k-60k">฿40,000 - ฿60,000/month</SelectItem>
                      <SelectItem value="over-60k">Over ฿60,000/month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Preferred Location</Label>
                  <Input id="location" placeholder="City, neighborhood, or area" />
                </div>
                <div>
                  <Label htmlFor="property-type">Property Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="condo">Condo/Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="serviced">Serviced Apartment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" placeholder="Any specific requirements or preferences" />
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1" onClick={() => setShowAgentForm(false)}>
                    Send Request
                  </Button>
                  <Button variant="outline" onClick={() => setShowAgentForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
} 