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
import WorldpackersAffiliate from "@/components/accommodation/worldpackers-affiliate";

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

type LivingTabProps = {
  compact?: boolean;
};

export default function LivingTab({ compact = false }: LivingTabProps) {
  const { userType } = useUser();
  const [selectedTab, setSelectedTab] = useState<'short-term' | 'long-term' | 'resources' | 'community' | 'volunteering'>('short-term');

  const hasAccess = (accessLevel: string) => {
    if (accessLevel === "free") return true;
    return userType === "paid";
  };

  const filteredEvents = events.filter(event => hasAccess(event.access));

  return (
    <div>
      {!compact && (
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">🏠 Living in Thailand</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete accommodation solutions from hostels to long-term rentals
          </p>
        </div>
      )}

      {/* Tabs */}
      <div className={`flex justify-center ${compact ? 'mb-4' : 'mb-8'}`}>
        <div className="flex bg-muted rounded-lg p-1 flex-wrap">
          <Button
            variant={selectedTab === 'short-term' ? 'default' : 'ghost'}
            onClick={() => setSelectedTab('short-term')}
            className={`flex items-center gap-2 ${compact ? 'px-3 py-1 text-sm' : ''}`}
          >
            🏨 Short-term
          </Button>
          <Button
            variant={selectedTab === 'long-term' ? 'default' : 'ghost'}
            onClick={() => setSelectedTab('long-term')}
            className={`flex items-center gap-2 ${compact ? 'px-3 py-1 text-sm' : ''}`}
          >
            📚 Long-term Guide
          </Button>
          <Button
            variant={selectedTab === 'resources' ? 'default' : 'ghost'}
            onClick={() => setSelectedTab('resources')}
            className={`flex items-center gap-2 ${compact ? 'px-3 py-1 text-sm' : ''}`}
          >
            🔧 Resources
          </Button>
          <Button
            variant={selectedTab === 'community' ? 'default' : 'ghost'}
            onClick={() => setSelectedTab('community')}
            className={`flex items-center gap-2 ${compact ? 'px-3 py-1 text-sm' : ''}`}
          >
            👥 Community
          </Button>
          <Button
            variant={selectedTab === 'volunteering' ? 'default' : 'ghost'}
            onClick={() => setSelectedTab('volunteering')}
            className={`flex items-center gap-2 ${compact ? 'px-3 py-1 text-sm' : ''}`}
          >
            🤝 Volunteering
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
                {/* Discord Invite Section */}
                <Card className="p-6 mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200 dark:border-indigo-800">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Join Our Official Discord Community</h3>
                    <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
                      Connect with fellow digital nomads, get real-time advice, and join the conversation about living in Thailand
                    </p>
                    <Button 
                      size="lg"
                      onClick={() => window.open('https://discord.gg/C4gHpDDqet', '_blank')}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Join Discord Server
                    </Button>
                  </div>
                </Card>

                {/* Coming Soon Banner */}
                <Card className="p-8 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 border-orange-200 dark:border-orange-800">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Meetups Coming Soon! 🎉</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      We're organizing amazing meetups and events across Thailand. Join our Discord to be the first to know when they're ready!
                    </p>
                  </div>
                </Card>
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
                {/* Discord Invite Section */}
                <Card className="p-6 mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200 dark:border-indigo-800">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Join Our Official Discord Community</h3>
                    <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
                      Connect with fellow digital nomads, get real-time advice, and join the conversation about living in Thailand
                    </p>
                    <Button 
                      size="lg"
                      onClick={() => window.open('https://discord.gg/C4gHpDDqet', '_blank')}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Join Discord Server
                    </Button>
                  </div>
                </Card>

                {/* Coming Soon Banner */}
                <Card className="p-8 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 border-orange-200 dark:border-orange-800">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Meetups Coming Soon! 🎉</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      We're organizing amazing meetups and events across Thailand. Join our Discord to be the first to know when they're ready!
                    </p>
                  </div>
                </Card>
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
                {/* Discord Invite Section */}
                <Card className="p-6 mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200 dark:border-indigo-800">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Join Our Official Discord Community</h3>
                    <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
                      Connect with fellow digital nomads, get real-time advice, and join the conversation about living in Thailand
                    </p>
                    <Button 
                      size="lg"
                      onClick={() => window.open('https://discord.gg/C4gHpDDqet', '_blank')}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Join Discord Server
                    </Button>
                  </div>
                </Card>

                {/* Coming Soon Banner */}
                <Card className="p-8 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 border-orange-200 dark:border-orange-800">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Meetups Coming Soon! 🎉</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      We're organizing amazing meetups and events across Thailand. Join our Discord to be the first to know when they're ready!
                    </p>
                  </div>
                </Card>
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
  );
}
