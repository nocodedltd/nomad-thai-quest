import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  DollarSign,
  ArrowRight,
  Music,
  Mountain,
  Users,
  MapPin,
  Star,
  Home,
  BookOpen,
  ExternalLink
} from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { UserContent } from "@/components/shared/user-content";
import { Paywall } from "@/components/shared/paywall";
import { UpgradePrompt } from "@/components/shared/upgrade-prompt";
import ShortTermHostels from "@/components/accommodation/short-term-hostels";
import LongTermGuide from "@/components/accommodation/long-term-guide";
import AccommodationResources from "@/components/accommodation/accommodation-resources";

// Archived accommodation listings data - replaced with new module system
// Original data moved to archived-listings.tsx

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

// Archived real estate agents data - now included in accommodation-resources.tsx

export default function LivingTab() {
  const { userType } = useUser();
  const [selectedTab, setSelectedTab] = useState<'short-term' | 'long-term' | 'resources' | 'community'>('short-term');

  const hasAccess = (accessLevel: string) => {
    if (accessLevel === "free") return true;
    return userType === "paid";
  };

  const filteredEvents = events.filter(event => hasAccess(event.access));

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">🏠 Living in Thailand</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Complete accommodation solutions from hostels to long-term rentals
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-muted rounded-lg p-1 flex-wrap">
          <Button
            variant={selectedTab === 'short-term' ? 'default' : 'ghost'}
            onClick={() => setSelectedTab('short-term')}
            className="flex items-center gap-2"
          >
            🏨 Short-term
          </Button>
          <Button
            variant={selectedTab === 'long-term' ? 'default' : 'ghost'}
            onClick={() => setSelectedTab('long-term')}
            className="flex items-center gap-2"
          >
            📚 Long-term Guide
          </Button>
          <Button
            variant={selectedTab === 'resources' ? 'default' : 'ghost'}
            onClick={() => setSelectedTab('resources')}
            className="flex items-center gap-2"
          >
            🔧 Resources
          </Button>
          <Button
            variant={selectedTab === 'community' ? 'default' : 'ghost'}
            onClick={() => setSelectedTab('community')}
            className="flex items-center gap-2"
          >
            👥 Community
          </Button>
        </div>
      </div>

      <UserContent
        guestContent={
          <div>
            {selectedTab === 'short-term' && (
              <div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">Featured Hostels Preview</h3>
                  <p className="text-muted-foreground">
                    Get a taste of our handpicked hostel recommendations across Thailand
                  </p>
                </div>
                
                <UpgradePrompt 
                  title="Access Complete Hostel Directory"
                  description="Browse our full collection of verified backpacker hostels with direct booking links"
                  features={[
                    "50+ verified hostels across Thailand",
                    "Direct Google Maps integration",
                    "Hostelworld booking links",
                    "Area-specific recommendations"
                  ]}
                />
              </div>
            )}

            {selectedTab === 'long-term' && (
              <div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">Long-term Accommodation Guide</h3>
                  <p className="text-muted-foreground">
                    Learn the strategies used by successful expats to find great long-term housing
                  </p>
                </div>
                
                <UpgradePrompt 
                  title="Access Complete Housing Guide"
                  description="Master the art of finding long-term accommodation in Thailand"
                  features={[
                    "Step-by-step housing guide",
                    "Facebook group strategies",
                    "Negotiation techniques",
                    "Scam avoidance tips"
                  ]}
                />
              </div>
            )}

            {selectedTab === 'resources' && (
              <div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">Essential Resources & Tools</h3>
                  <p className="text-muted-foreground">
                    Access our curated collection of websites, agents, and tools
                  </p>
                </div>
                
                <UpgradePrompt 
                  title="Access All Resources"
                  description="Get our complete resource library for accommodation hunting"
                  features={[
                    "Verified real estate websites",
                    "Trusted agent contacts",
                    "Facebook group directory",
                    "Essential tools & calculators"
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
          </div>
        }
        
        freeContent={
          <div>
            {selectedTab === 'short-term' && (
              <div>
                <ShortTermHostels />
              </div>
            )}

            {selectedTab === 'long-term' && (
              <div>
                <LongTermGuide />
              </div>
            )}

            {selectedTab === 'resources' && (
              <div>
                <AccommodationResources />
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
          </div>
        }
        
        paidContent={
          <div>
            {selectedTab === 'short-term' && (
              <div>
                <ShortTermHostels />
              </div>
            )}

            {selectedTab === 'long-term' && (
              <div>
                <LongTermGuide />
              </div>
            )}

            {selectedTab === 'resources' && (
              <div>
                <AccommodationResources />
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
          </div>
        }
      />
    </div>
  );
}
