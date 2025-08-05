import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  MapPin, 
  Star,
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
  MessageCircle,
  Plane,
  Car,
  Ship,
  Mountain,
  Music,
  Camera,
  Heart,
  Gift
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "party" | "trip" | "meetup" | "workshop";
  description: string;
  attendees: number;
  maxAttendees: number;
  price: string;
  organizer: string;
  image: string;
  tags: string[];
}

interface TravelPartner {
  id: string;
  name: string;
  type: "tour" | "transport" | "accommodation" | "activity";
  location: string;
  rating: number;
  reviews: number;
  discount: string;
  description: string;
  website: string;
  contact: {
    email: string;
    phone: string;
  };
}

const events: Event[] = [
  {
    id: "1",
    title: "Bangkok Boat Party",
    date: "2024-02-15",
    time: "18:00 - 23:00",
    location: "Chao Phraya River, Bangkok",
    type: "party",
    description: "Join us for an epic boat party on the Chao Phraya River! Music, drinks, and amazing views of Bangkok's skyline.",
    attendees: 45,
    maxAttendees: 60,
    price: "฿1,200",
    organizer: "NCC Events",
    image: "/boat-party.jpg",
    tags: ["Party", "Boat", "Music", "Networking"]
  },
  {
    id: "2",
    title: "Chiang Mai Jungle Rave",
    date: "2024-02-20",
    time: "20:00 - 04:00",
    location: "Doi Suthep, Chiang Mai",
    type: "party",
    description: "Experience the ultimate jungle rave in the mountains of Chiang Mai. Electronic music under the stars!",
    attendees: 78,
    maxAttendees: 100,
    price: "฿800",
    organizer: "Jungle Vibes",
    image: "/jungle-rave.jpg",
    tags: ["Rave", "Jungle", "Electronic", "Nature"]
  },
  {
    id: "3",
    title: "Digital Nomad Meetup",
    date: "2024-02-18",
    time: "19:00 - 22:00",
    location: "Cafe Nomad, Bangkok",
    type: "meetup",
    description: "Connect with fellow digital nomads, share experiences, and build your network in Thailand.",
    attendees: 25,
    maxAttendees: 40,
    price: "Free",
    organizer: "Nomad Network",
    image: "/nomad-meetup.jpg",
    tags: ["Networking", "Digital Nomads", "Coffee", "Business"]
  },
  {
    id: "4",
    title: "Phuket Island Hopping",
    date: "2024-02-25",
    time: "08:00 - 18:00",
    location: "Phuket & Surrounding Islands",
    type: "trip",
    description: "Explore the beautiful islands around Phuket with snorkeling, beach hopping, and island adventures.",
    attendees: 32,
    maxAttendees: 50,
    price: "฿2,500",
    organizer: "Island Adventures",
    image: "/island-hopping.jpg",
    tags: ["Islands", "Snorkeling", "Beach", "Adventure"]
  },
  {
    id: "5",
    title: "Muay Thai Workshop",
    date: "2024-02-22",
    time: "16:00 - 18:00",
    location: "Tiger Muay Thai, Phuket",
    type: "workshop",
    description: "Learn the basics of Muay Thai from professional trainers. No experience required!",
    attendees: 15,
    maxAttendees: 20,
    price: "฿500",
    organizer: "Tiger Muay Thai",
    image: "/muay-thai.jpg",
    tags: ["Muay Thai", "Fitness", "Martial Arts", "Workshop"]
  },
  {
    id: "6",
    title: "Camping Trip to Khao Yai",
    date: "2024-03-01",
    time: "09:00 - 18:00 (2 days)",
    location: "Khao Yai National Park",
    type: "trip",
    description: "Escape the city for a weekend camping trip in Thailand's beautiful national park.",
    attendees: 18,
    maxAttendees: 25,
    price: "฿1,800",
    organizer: "Nature Explorers",
    image: "/camping.jpg",
    tags: ["Camping", "Nature", "Hiking", "Weekend"]
  }
];

const travelPartners: TravelPartner[] = [
  {
    id: "1",
    name: "Thailand Island Tours",
    type: "tour",
    location: "Phuket, Krabi, Koh Samui",
    rating: 4.8,
    reviews: 234,
    discount: "20% OFF",
    description: "Premium island tours with experienced guides and small group sizes.",
    website: "https://thailandislandtours.com",
    contact: {
      email: "info@thailandislandtours.com",
      phone: "+66 76 123 4567"
    }
  },
  {
    id: "2",
    name: "Bangkok Airport Transfer",
    type: "transport",
    location: "Bangkok",
    rating: 4.9,
    reviews: 567,
    discount: "15% OFF",
    description: "Reliable airport transfers with English-speaking drivers and comfortable vehicles.",
    website: "https://bangkokairporttransfer.com",
    contact: {
      email: "book@bangkokairporttransfer.com",
      phone: "+66 2 987 6543"
    }
  },
  {
    id: "3",
    name: "Chiang Mai Adventure Hostel",
    type: "accommodation",
    location: "Chiang Mai",
    rating: 4.7,
    reviews: 189,
    discount: "10% OFF",
    description: "Adventure-focused hostel with organized tours and activities for guests.",
    website: "https://chiangmaiadventure.com",
    contact: {
      email: "hello@chiangmaiadventure.com",
      phone: "+66 53 555 1234"
    }
  },
  {
    id: "4",
    name: "Thai Cooking Classes",
    type: "activity",
    location: "Bangkok, Chiang Mai, Phuket",
    rating: 4.9,
    reviews: 312,
    discount: "25% OFF",
    description: "Learn to cook authentic Thai dishes with professional chefs in beautiful settings.",
    website: "https://thaicookingclasses.com",
    contact: {
      email: "cook@thaicookingclasses.com",
      phone: "+66 2 456 7890"
    }
  }
];

export default function Community() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("discord");
  const [selectedEventType, setSelectedEventType] = useState<string>("all");
  const [showDiscordModal, setShowDiscordModal] = useState(false);

  const tabs = [
    { id: "discord", label: "Discord Community", icon: MessageCircle },
    { id: "events", label: "Events Calendar", icon: Calendar },
    { id: "partners", label: "Travel Partners", icon: Plane }
  ];

  const eventTypes = [
    { id: "all", label: "All Events" },
    { id: "party", label: "Parties" },
    { id: "trip", label: "Trips" },
    { id: "meetup", label: "Meetups" },
    { id: "workshop", label: "Workshops" }
  ];

  const filteredEvents = events.filter(event => 
    selectedEventType === "all" || event.type === selectedEventType
  );

  const handleDiscordJoin = () => {
    setShowDiscordModal(true);
  };

  const handleDiscordRedirect = () => {
    // Redirect to Discord with invite link
    window.open("https://discord.gg/ncc-thailand", "_blank");
    setShowDiscordModal(false);
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
            <div className="p-3 rounded-xl bg-orange-500/10">
              <Users className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Community Module</h1>
              <p className="text-muted-foreground">Connect and thrive with the expat community</p>
            </div>
          </div>

          {/* Progress */}
          <Card className="p-4 bg-gradient-to-br from-orange-500/10 to-orange-600/5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold">Module Progress</h3>
              <Badge variant="secondary">0% Complete</Badge>
            </div>
            <ProgressBar progress={0} size="lg" className="mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0/4 sections completed</span>
              <span>0 XP earned</span>
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

        {/* Discord Community Tab */}
        {activeTab === "discord" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Discord Community</h2>
              <p className="text-muted-foreground">Join our exclusive Discord server and connect with fellow expats</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold">Join Our Discord</h3>
                    <p className="text-sm text-muted-foreground">Connect with 2,500+ members</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Exclusive channels for different interests</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Real-time event updates and announcements</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Direct access to mentors and experts</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Local meetup coordination</span>
                  </div>
                </div>

                <Button onClick={handleDiscordJoin} className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Join Discord Server
                </Button>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold">Community Channels</h3>
                    <p className="text-sm text-muted-foreground">Find your tribe</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">#digital-nomads</p>
                      <p className="text-xs text-muted-foreground">Remote work discussions</p>
                    </div>
                    <Badge variant="secondary">1.2k members</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">#bangkok-locals</p>
                      <p className="text-xs text-muted-foreground">Bangkok meetups & tips</p>
                    </div>
                    <Badge variant="secondary">856 members</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">#chiang-mai</p>
                      <p className="text-xs text-muted-foreground">Chiang Mai community</p>
                    </div>
                    <Badge variant="secondary">634 members</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">#events</p>
                      <p className="text-xs text-muted-foreground">Event announcements</p>
                    </div>
                    <Badge variant="secondary">2.1k members</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Events Calendar Tab */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">Events Calendar</h2>
                <p className="text-muted-foreground">Discover amazing events and meet fellow expats</p>
              </div>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                View Full Calendar
              </Button>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={selectedEventType === type.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedEventType(type.id)}
                >
                  {type.label}
                </Button>
              ))}
            </div>

            {/* Events Grid */}
            <div className="grid gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="p-6">
                  <div className="flex gap-6">
                    <div className="w-32 h-24 bg-muted rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg">{event.title}</h3>
                            <Badge variant="secondary">{event.type}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {event.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {event.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </span>
                          </div>
                          <p className="text-sm mb-3">{event.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{event.price}</div>
                          <div className="text-sm text-muted-foreground">
                            {event.attendees}/{event.maxAttendees} attendees
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <Button className="flex-1">
                          RSVP Now
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Travel Partners Tab */}
        {activeTab === "partners" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Travel Partners</h2>
              <p className="text-muted-foreground">Exclusive discounts from our trusted travel partners</p>
            </div>

            <div className="grid gap-6">
              {travelPartners.map((partner) => (
                <Card key={partner.id} className="p-6">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg">{partner.name}</h3>
                            <Badge variant="destructive">{partner.discount}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {partner.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              {partner.rating} ({partner.reviews} reviews)
                            </span>
                          </div>
                          <p className="text-sm mb-3">{partner.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button className="flex-1">
                          <Gift className="w-4 h-4 mr-2" />
                          Get Discount
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit Website
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Discord Join Modal */}
        {showDiscordModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Join Our Discord Community</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Join our exclusive Discord server to connect with fellow expats, get event updates, and access exclusive content.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>2,500+ active members</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Exclusive channels and roles</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Real-time event updates</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Direct access to mentors</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1" onClick={handleDiscordRedirect}>
                    Join Discord
                  </Button>
                  <Button variant="outline" onClick={() => setShowDiscordModal(false)}>
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