import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { 
  ExternalLink,
  Users,
  Building,
  MapPin,
  Star,
  Globe,
  Facebook,
  Search,
  Phone,
  Mail
} from "lucide-react";

const resourceCategories = [
  {
    id: "websites",
    title: "Property Websites",
    description: "Professional real estate platforms",
    icon: Globe,
    resources: [
      {
        name: "DDProperty",
        description: "Thailand's largest property portal with extensive listings",
        url: "https://www.ddproperty.com",
        features: ["English Interface", "Verified Listings", "Agent Contact", "Price Filters"],
        rating: 4.5
      },
      {
        name: "FazWaz",
        description: "International-focused platform with quality properties",
        url: "https://www.fazwaz.com",
        features: ["International Focus", "High-end Properties", "Professional Agents", "Virtual Tours"],
        rating: 4.3
      },
      {
        name: "Hipflat",
        description: "Modern interface with good search functionality",
        url: "https://www.hipflat.co.th",
        features: ["Modern UI", "Advanced Filters", "Map Search", "Mobile App"],
        rating: 4.2
      },
      {
        name: "Thailand-Property",
        description: "Comprehensive listings across all price ranges",
        url: "https://www.thailand-property.com",
        features: ["Wide Range", "Local Agents", "Area Guides", "Investment Info"],
        rating: 4.0
      }
    ]
  },
  {
    id: "facebook",
    title: "Facebook Groups",
    description: "Direct access to landlords and local deals",
    icon: Facebook,
    resources: [
      {
        name: "Bangkok Apartments for Rent",
        description: "Active group with daily listings in Bangkok area",
        url: "https://www.facebook.com/groups/bangkokapartments",
        features: ["Daily Posts", "Direct Contact", "Local Prices", "Negotiable"],
        members: "45K+ members"
      },
      {
        name: "Chiang Mai Expats Housing",
        description: "Northern Thailand housing community",
        url: "https://www.facebook.com/groups/chiangmaihousing",
        features: ["Expat Community", "Local Tips", "Verified Members", "Support"],
        members: "28K+ members"
      },
      {
        name: "Phuket Villas & Rentals",
        description: "Beach properties and vacation rentals",
        url: "https://www.facebook.com/groups/phuketvillas",
        features: ["Beach Properties", "Luxury Options", "Seasonal Rates", "Tourist Areas"],
        members: "15K+ members"
      },
      {
        name: "Thailand Digital Nomad Housing",
        description: "Nomad-focused accommodation sharing",
        url: "https://www.facebook.com/groups/nomadthaihousing",
        features: ["Nomad Focus", "Short-term OK", "WiFi Verified", "Community"],
        members: "12K+ members"
      }
    ]
  },
  {
    id: "agents",
    title: "Recommended Agents",
    description: "Trusted real estate professionals",
    icon: Users,
    resources: [
      {
        name: "Bangkok Property Pro",
        description: "Specializes in Bangkok condos and apartments",
        contact: "+66 2 123 4567",
        email: "info@bangkokpropertypro.com",
        features: ["English Speaking", "Condo Specialist", "Negotiation Help", "Legal Support"],
        areas: ["Sukhumvit", "Silom", "Sathorn", "Thonglor"]
      },
      {
        name: "Chiang Mai Living Solutions",
        description: "Northern Thailand property experts",
        contact: "+66 53 123 456",
        email: "hello@chiangmailiving.com",
        features: ["Local Expertise", "Expat Friendly", "Long-term Focus", "Area Guidance"],
        areas: ["Old City", "Nimmanhaemin", "Hang Dong", "Mae Rim"]
      },
      {
        name: "Island Property Phuket",
        description: "Beach and island property specialists",
        contact: "+66 76 123 456",
        email: "rentals@islandpropertyphuket.com",
        features: ["Beach Properties", "Luxury Focus", "Vacation Rentals", "Investment"],
        areas: ["Patong", "Kata", "Karon", "Kamala"]
      }
    ]
  },
  {
    id: "tools",
    title: "Useful Tools",
    description: "Apps and websites to help your search",
    icon: Search,
    resources: [
      {
        name: "Thai Rent Price Calculator",
        description: "Estimate fair rental prices by area",
        url: "https://rentcalculator.thailand.com",
        features: ["Price Estimation", "Area Comparison", "Market Trends", "Fair Price Guide"]
      },
      {
        name: "Bangkok BTS/MRT Map",
        description: "Transportation planning for location selection",
        url: "https://www.bts.co.th/map",
        features: ["Route Planning", "Station Info", "Travel Times", "Area Access"]
      },
      {
        name: "Thailand Visa Calculator",
        description: "Check visa requirements for rental terms",
        url: "https://visacalculator.thailand.com",
        features: ["Visa Types", "Duration Limits", "Requirements", "Compliance"]
      },
      {
        name: "Currency Converter",
        description: "THB to your currency conversion",
        url: "https://wise.com/currency-converter",
        features: ["Real-time Rates", "Historical Data", "Rate Alerts", "Multi-currency"]
      }
    ]
  }
];

const quickTips = [
  {
    icon: MapPin,
    title: "Location First",
    description: "Choose your area before hunting for specific properties"
  },
  {
    icon: Building,
    title: "Visit in Person",
    description: "Never commit to long-term rentals without seeing the property"
  },
  {
    icon: Star,
    title: "Negotiate Everything",
    description: "Rent, utilities, and lease terms are often negotiable"
  },
  {
    icon: Users,
    title: "Join Communities",
    description: "Expat groups provide invaluable local knowledge and support"
  }
];

export default function AccommodationResources() {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">🔧 Accommodation Resources & Tools</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Essential resources, websites, and tools to help you find the perfect long-term accommodation in Thailand
        </p>
      </div>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickTips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <Card key={index} className="p-4 text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{tip.title}</h3>
              <p className="text-sm text-muted-foreground">{tip.description}</p>
            </Card>
          );
        })}
      </div>

      {/* Resource Categories */}
      <div className="space-y-8">
        {resourceCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.id}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {category.resources.map((resource, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold mb-2">{resource.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      </div>
                      {resource.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{resource.rating}</span>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.features?.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    {/* Members count for Facebook groups */}
                    {resource.members && (
                      <p className="text-sm text-muted-foreground mb-4">
                        <Users className="w-4 h-4 inline mr-1" />
                        {resource.members}
                      </p>
                    )}

                    {/* Contact info for agents */}
                    {resource.contact && (
                      <div className="text-sm text-muted-foreground mb-4 space-y-1">
                        <p className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {resource.contact}
                        </p>
                        {resource.email && (
                          <p className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {resource.email}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Areas for agents */}
                    {resource.areas && (
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Coverage Areas:</p>
                        <div className="flex flex-wrap gap-1">
                          {resource.areas.map((area) => (
                            <Badge key={area} variant="outline" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <Button 
                      className="w-full" 
                      variant={category.id === 'agents' ? 'outline' : 'default'}
                      onClick={() => {
                        if (resource.url) {
                          window.open(resource.url, '_blank');
                        } else if (resource.email) {
                          window.location.href = `mailto:${resource.email}`;
                        }
                      }}
                    >
                      {category.id === 'facebook' && 'Join Group'}
                      {category.id === 'websites' && (
                        <>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit Website
                        </>
                      )}
                      {category.id === 'agents' && (
                        <>
                          <Phone className="w-4 h-4 mr-2" />
                          Contact Agent
                        </>
                      )}
                      {category.id === 'tools' && (
                        <>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Use Tool
                        </>
                      )}
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Help Section */}
      <Card className="p-6 mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Need More Help?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Still struggling to find the right accommodation? Our community has helped thousands of digital nomads 
            secure great places to live in Thailand. Get personalized advice and support.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Join Our Community
            </Button>
            <Button>
              <ExternalLink className="w-4 h-4 mr-2" />
              Get 1-on-1 Help
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
