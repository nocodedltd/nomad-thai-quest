import { useState } from "react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
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
import { useUser } from "@/shared/contexts/user-context";
import { UserContent } from "@/shared/components/paywall/user-content";
import { Paywall } from "@/shared/components/paywall/paywall";
import { UpgradePrompt } from "@/shared/components/paywall/upgrade-prompt";
import ShortTermHostels from "@/features/accommodation/components/short-term-hostels";
import LongTermGuide from "@/features/accommodation/components/long-term-guide";
import WorldpackersAffiliate from "@/features/accommodation/components/worldpackers-affiliate";

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
  const [selectedTab, setSelectedTab] = useState<'short-term' | 'long-term' | 'community' | 'volunteering'>('short-term');

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
        <div className="subsection-nav-frosted">
          <button
            onClick={() => setSelectedTab('short-term')}
            className={`subsection-button-frosted flex items-center gap-2 ${selectedTab === 'short-term' ? 'selected' : ''}`}
          >
            🏨 Short-term
          </button>
          <button
            onClick={() => setSelectedTab('long-term')}
            className={`subsection-button-frosted flex items-center gap-2 ${selectedTab === 'long-term' ? 'selected' : ''}`}
          >
            📚 Long-term Guide
          </button>
          <button
            onClick={() => setSelectedTab('community')}
            className={`subsection-button-frosted flex items-center gap-2 ${selectedTab === 'community' ? 'selected' : ''}`}
          >
            👥 Community
          </button>
          <button
            onClick={() => setSelectedTab('volunteering')}
            className={`subsection-button-frosted flex items-center gap-2 ${selectedTab === 'volunteering' ? 'selected' : ''}`}
          >
            🤝 Volunteering
          </button>
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

            {selectedTab === 'community' && (
              <div>
                {/* Discord Invite Section */}
                <Card className="p-6 mb-8">
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
                <Card className="p-8">
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
                <LongTermGuide userType={userType} />
              </div>
            )}

            {selectedTab === 'community' && (
              <div>
                {/* Discord Invite Section */}
                <Card className="p-6 mb-8">
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
                <Card className="p-8">
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
                <LongTermGuide userType={userType} />
              </div>
            )}

            {selectedTab === 'community' && (
              <div>
                {/* Discord Invite Section */}
                <Card className="p-6 mb-8">
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
                <Card className="p-8">
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
