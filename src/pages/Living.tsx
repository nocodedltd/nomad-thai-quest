import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { 
  Building,
  Users,
  MapPin,
  Star,
  Calendar,
  DollarSign,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  Filter,
  Search,
  Heart,
  Coffee,
  Car,
  Plane,
  Music,
  Camera,
  Mountain,
  Ship,
  Lock,
  ArrowRight
} from "lucide-react";
import { useUser } from "@/shared/contexts/user-context";
import { UserContent } from "@/shared/components/paywall/user-content";
import { Paywall } from "@/shared/components/paywall/paywall";
import { UpgradePrompt } from "@/shared/components/paywall/upgrade-prompt";
import WorldpackersAffiliate from "@/features/accommodation/components/worldpackers-affiliate";

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
  {
    id: 2,
    name: "Chiang Mai Mountain View",
    type: "condos",
    location: "Nimmanhaemin, Chiang Mai", 
    price: "$450/month",
    rating: 4.6,
    reviews: 89,
    amenities: ["WiFi", "Pool", "Security", "Parking"],
    description: "Stylish condo with mountain views",
    access: "free"
  },
  {
    id: 3,
    name: "Phuket Beach Villa",
    type: "villas",
    location: "Kata Beach, Phuket",
    price: "$1,200/month",
    rating: 4.9,
    reviews: 67,
    amenities: ["Beach Access", "Private Pool", "Kitchen", "Garden"],
    description: "Luxury villa steps from the beach",
    access: "paid"
  },
  {
    id: 4,
    name: "Koh Samui Retreat",
    type: "villas", 
    location: "Bophut, Koh Samui",
    price: "$800/month",
    rating: 4.7,
    reviews: 43,
    amenities: ["Ocean View", "Pool", "WiFi", "Motorbike"],
    description: "Peaceful retreat with ocean views",
    access: "paid"
  }
];

const events = [
  {
    id: 1,
    title: "Bangkok Digital Nomad Meetup",
    date: "2024-02-15",
    time: "19:00",
    location: "Sukhumvit Soi 11",
    type: "meetup" as const,
    attendees: 45,
    maxAttendees: 60,
    price: "Free",
    organizer: "Bangkok Nomad Community",
    tags: ["Networking", "Coworking", "Social"],
    access: "free"
  },
  {
    id: 2,
    title: "Chiang Mai Food Tour",
    date: "2024-02-18",
    time: "18:00",
    location: "Old City, Chiang Mai",
    type: "trip" as const,
    attendees: 12,
    maxAttendees: 15,
    price: "$25",
    organizer: "Food Lovers Thailand",
    tags: ["Food", "Culture", "Walking"],
    access: "free"
  },
  {
    id: 3,
    title: "Koh Phi Phi Island Hopping",
    date: "2024-02-22",
    time: "08:00",
    location: "Phuket Marina",
    type: "trip" as const,
    attendees: 8,
    maxAttendees: 12,
    price: "$120",
    organizer: "Island Adventures",
    tags: ["Adventure", "Beach", "Snorkeling"],
    access: "paid"
  },
  {
    id: 4,
    title: "Full Moon Party Koh Phangan",
    date: "2024-02-25",
    time: "20:00", 
    location: "Haad Rin Beach",
    type: "party" as const,
    attendees: 200,
    maxAttendees: 500,
    price: "$15",
    organizer: "Party Thailand",
    tags: ["Party", "Beach", "Music"],
    access: "paid"
  }
];

const realEstateAgents = [
  {
    id: 1,
    name: "Sarah Property Bangkok",
    specialization: "Bangkok Condos",
    rating: 4.9,
    deals: 156,
    languages: ["English", "Thai"],
    contact: "+66 81 234 5678",
    access: "paid"
  },
  {
    id: 2,
    name: "Chiang Mai Living Co",
    specialization: "Northern Thailand",
    rating: 4.7,
    deals: 98,
    languages: ["English", "Thai", "German"],
    contact: "+66 53 123 456",
    access: "paid"
  }
];

export default function Living() {
  const navigate = useNavigate();
  const { userType, userState } = useUser();
  const [selectedTab, setSelectedTab] = useState<'accommodation' | 'community' | 'volunteering'>('accommodation');
  const [accommodationType, setAccommodationType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const hasAccess = (accessLevel: string) => {
    if (accessLevel === "free") return true;
    return userType === "paid";
  };

  const filteredAccommodation = accommodationListings.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = accommodationType === "all" || place.type === accommodationType;
    return matchesSearch && matchesType && hasAccess(place.access);
  });

  const filteredEvents = events.filter(event => hasAccess(event.access));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🏠 Living in Thailand</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find your perfect home and connect with the expat community
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={selectedTab === 'accommodation' ? 'default' : 'ghost'}
              onClick={() => setSelectedTab('accommodation')}
            >
              🏠 Accommodation
            </Button>
            <Button
              variant={selectedTab === 'community' ? 'default' : 'ghost'}
              onClick={() => setSelectedTab('community')}
            >
              👥 Community
            </Button>
            <Button
              variant={selectedTab === 'volunteering' ? 'default' : 'ghost'}
              onClick={() => setSelectedTab('volunteering')}
            >
              🤝 Volunteering
            </Button>
          </div>
        </div>

        <UserContent
          guestContent={
            <div>
              {selectedTab === 'accommodation' && (
                <div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {accommodationTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <Card key={type.id} className="p-6 text-center opacity-75">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center mx-auto mb-4`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold mb-2">{type.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                          <Badge variant="outline">{type.priceRange}</Badge>
                        </Card>
                      );
                    })}
                  </div>
                  
                  <UpgradePrompt 
                    title="Access Accommodation Platform"
                    description="Browse verified listings, contact agents, and book your Thailand home"
                    features={[
                      "1000+ verified listings",
                      "Direct agent contact",
                      "Booking assistance",
                      "Neighborhood guides"
                    ]}
                  />
                </div>
              )}
              
              {selectedTab === 'community' && (
                <div>
                  <div className="text-center mb-8">
                    <p className="text-muted-foreground">
                      Join our community to access events, meetups, and connect with fellow nomads
                    </p>
                  </div>
                  
                  <UpgradePrompt 
                    title="Join the Community"
                    description="Connect with thousands of expats and digital nomads across Thailand"
                    features={[
                      "Exclusive events & meetups",
                      "Local networking groups", 
                      "Activity partners",
                      "Insider recommendations"
                    ]}
                  />
                </div>
              )}

              {selectedTab === 'volunteering' && (
                <div>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-4">Volunteering Opportunities</h3>
                    <p className="text-muted-foreground">
                      Exchange your skills for free accommodation while exploring Thailand
                    </p>
                  </div>
                  
                  <UpgradePrompt 
                    title="Access Volunteering Platform"
                    description="Get $10 off Worldpackers membership and access to global volunteering opportunities"
                    features={[
                      "Free accommodation in exchange for work",
                      "Thailand-specific opportunities",
                      "Flexible schedules for digital nomads",
                      "Global network of hosts"
                    ]}
                  />
                </div>
              )}
            </div>
          }
          
          freeContent={
            <div>
              {selectedTab === 'accommodation' && (
                <div>
                  {/* Accommodation Types */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {accommodationTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <Card 
                          key={type.id} 
                          className={`p-6 text-center cursor-pointer transition-all hover:shadow-lg ${
                            accommodationType === type.id ? 'border-primary' : ''
                          }`}
                          onClick={() => setAccommodationType(type.id)}
                        >
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center mx-auto mb-4`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold mb-2">{type.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                          <Badge variant="outline">{type.priceRange}</Badge>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Search */}
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search by location or name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Free Listings */}
                  <div className="grid gap-6 mb-8">
                    {accommodationListings.filter(place => place.access === 'free').map((place) => (
                      <Card key={place.id} className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold">{place.name}</h3>
                            <p className="text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {place.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-green-600">{place.price}</div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{place.rating}</span>
                              <span className="text-muted-foreground">({place.reviews})</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{place.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {place.amenities.map((amenity) => (
                            <Badge key={amenity} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                        
                        <Button className="w-full">View Details</Button>
                      </Card>
                    ))}
                  </div>

                  {/* Premium Listings */}
                  <Paywall 
                    requiredLevel="paid"
                    title="Unlock Premium Listings"
                    description="Access luxury villas, exclusive properties, and direct agent contacts"
                  >
                    <div className="grid gap-6">
                      {accommodationListings.filter(place => place.access === 'paid').map((place) => (
                        <Card key={place.id} className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold">{place.name}</h3>
                              <p className="text-muted-foreground">{place.location}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold">{place.price}</div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>{place.rating}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-muted-foreground">{place.description}</p>
                        </Card>
                      ))}
                    </div>
                  </Paywall>
                </div>
              )}
              
              {selectedTab === 'community' && (
                <div>
                  <div className="grid gap-6 mb-8">
                    {events.filter(event => event.access === 'free').map((event) => (
                      <Card key={event.id} className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-bold">{event.title}</h3>
                            <p className="text-muted-foreground flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {event.date} at {event.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {event.location}
                              </span>
                            </p>
                          </div>
                          <Badge variant="outline" className="capitalize">{event.type}</Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {event.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-muted-foreground">
                            {event.attendees}/{event.maxAttendees} attending • {event.price}
                          </div>
                          <Button size="sm">Join Event</Button>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Paywall 
                    requiredLevel="paid"
                    title="Unlock Premium Events"
                    description="Access exclusive trips, parties, and VIP experiences"
                  >
                    <div className="grid gap-6">
                      {events.filter(event => event.access === 'paid').map((event) => (
                        <Card key={event.id} className="p-6">
                          <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                          <p className="text-muted-foreground">{event.location}</p>
                        </Card>
                      ))}
                    </div>
                  </Paywall>
                </div>
              )}

              {selectedTab === 'volunteering' && (
                <div>
                  <WorldpackersAffiliate />
                </div>
              )}
            </div>
          }
          
          paidContent={
            <div>
              {selectedTab === 'accommodation' && (
                <div>
                  {/* Accommodation Types */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {accommodationTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <Card 
                          key={type.id} 
                          className={`p-6 text-center cursor-pointer transition-all hover:shadow-lg ${
                            accommodationType === type.id ? 'border-primary' : ''
                          }`}
                          onClick={() => setAccommodationType(type.id)}
                        >
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center mx-auto mb-4`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold mb-2">{type.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                          <Badge variant="outline">{type.priceRange}</Badge>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Search and Filters */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search by location or name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                    <Button variant="outline">
                      <MapPin className="w-4 h-4 mr-2" />
                      Map View
                    </Button>
                  </div>

                  {/* All Listings */}
                  <div className="grid gap-6 mb-8">
                    {filteredAccommodation.map((place) => (
                      <Card key={place.id} className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold">{place.name}</h3>
                            <p className="text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {place.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-green-600">{place.price}</div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{place.rating}</span>
                              <span className="text-muted-foreground">({place.reviews})</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{place.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {place.amenities.map((amenity) => (
                            <Badge key={amenity} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">Contact Agent</Button>
                          <Button className="flex-1">Book Now</Button>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Real Estate Agents */}
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Recommended Agents</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {realEstateAgents.map((agent) => (
                        <div key={agent.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{agent.name}</h4>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{agent.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{agent.specialization}</p>
                          <p className="text-sm mb-2">{agent.deals} successful deals</p>
                          <div className="flex justify-between items-center">
                            <div className="text-sm">
                              Languages: {agent.languages.join(", ")}
                            </div>
                            <Button size="sm" variant="outline">Contact</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}
              
              {selectedTab === 'community' && (
                <div>
                  <div className="grid gap-6">
                    {filteredEvents.map((event) => {
                      const getEventIcon = (type: string) => {
                        switch (type) {
                          case 'party': return Music;
                          case 'trip': return Mountain;
                          case 'meetup': return Users;
                          default: return Calendar;
                        }
                      };
                      
                      const EventIcon = getEventIcon(event.type);
                      
                      return (
                        <Card key={event.id} className="p-6 hover:shadow-lg transition-shadow">
                          <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                              <EventIcon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold">{event.title}</h3>
                                <Badge variant="outline" className="capitalize">{event.type}</Badge>
                              </div>
                              
                              <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-4">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {event.date} at {event.time}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {event.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <DollarSign className="w-4 h-4" />
                                  {event.price}
                                </span>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                {event.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <div className="text-sm text-muted-foreground">
                                  {event.attendees}/{event.maxAttendees} attending • By {event.organizer}
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">Share</Button>
                                  <Button size="sm">
                                    Join Event <ArrowRight className="w-4 h-4 ml-2" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {selectedTab === 'volunteering' && (
                <div>
                  <WorldpackersAffiliate />
                </div>
              )}
            </div>
          }
        />
      </div>
    </div>
  );
}
