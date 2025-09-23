import { useState } from "react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Progress } from "@/shared/components/ui/progress";
import {
  ArrowLeft,
  Download,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Star,
  ExternalLink,
  Facebook,
  Globe,
  Phone,
  Mail,
  Target,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

// Accommodation guide data matching the original long-term guide structure
const accommodationGuides = {
  "facebook-marketplace": {
    id: "facebook-marketplace",
    title: "Facebook Marketplace + Groups Strategy",
    sections: [
      {
        id: "overview",
        title: "Strategy Overview",
        icon: Target,
        content: {
          description: "Facebook Marketplace and Facebook Groups are the top recommendation for finding accommodation in Thailand. This approach cuts through the BS and allows direct contact with Thai real estate agents, landlords, or property owners without overpriced listings or inflated tourist rates.",
          whyItWorks: "This method works because it eliminates middlemen skimming commissions and gives access to real local prices. Most agents speak enough English to make deals, and the inventory is updated daily with plenty of options."
        }
      },
      {
        id: "process",
        title: "Step-by-Step Process",
        icon: CheckCircle,
        content: {
          steps: [
            {
              title: "Set Up Facebook Marketplace",
              description: "Go to Facebook Marketplace and set your location to your desired area (Bangkok, Chiang Mai, Phuket, etc.)",
              details: [
                "Access Facebook.com and navigate to Marketplace",
                "Use the location filter to select your target city",
                "Ensure your profile looks legitimate for better responses"
              ]
            },
            {
              title: "Search for Properties",
              description: "Type in search terms like 'condo,' 'apartment,' 'villa,' or 'house for rent'",
              details: [
                "Use Thai terms like 'คอนโด' (condo) for better results",
                "Filter by monthly rent and number of bedrooms",
                "Save interesting listings to review later"
              ]
            },
            {
              title: "Contact Agents Directly",
              description: "Message agents directly - most speak enough English to negotiate deals",
              details: [
                "Be polite and professional in messages",
                "Ask about availability and viewing times",
                "Negotiate price, especially for longer stays"
              ]
            },
            {
              title: "Join Local Facebook Groups",
              description: "Join area-specific groups for off-market deals and ISO postings",
              details: [
                "Search for groups like 'Bangkok Apartments for Rent'",
                "Join 'Chiang Mai Expats Housing' for northern Thailand",
                "Look for 'Phuket Villas & Rentals' for beach properties",
                "Post your own 'ISO' (In Search Of) listing with requirements"
              ]
            }
          ]
        }
      }
    ],
    pros: [
      "Much cheaper than Airbnb",
      "Direct negotiation with agents",
      "Daily inventory updates",
      "Great for long-term stays (6–12 months)",
      "Access to off-market deals"
    ],
    cons: [
      "Can be overwhelming with many duplicate listings",
      "Scams exist - always visit before sending money",
      "Some agents can be pushy or unreliable",
      "Language barriers occasionally"
    ],
    resources: {
      groups: [
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
    }
  },
  "real-estate-websites": {
    id: "real-estate-websites",
    title: "Real Estate Websites + Agents Strategy",
    sections: [
      {
        id: "overview",
        title: "Professional Platform Overview",
        icon: Target,
        content: {
          description: "Real estate agent websites serve as a backup option when Facebook doesn't meet your needs or when you prefer professional assistance with the legwork.",
          whyItWorks: "These platforms offer polished, professional listings with better photos, floor plans, and English-speaking agents, making them ideal for those who want a more structured approach."
        }
      },
      {
        id: "process",
        title: "Step-by-Step Process",
        icon: CheckCircle,
        content: {
          steps: [
            {
              title: "Research Reputable Websites",
              description: "Google 'real estate agents in [city] Thailand' to find established platforms",
              details: [
                "Look for websites with professional design and updated listings",
                "Check for English language support",
                "Verify company credentials and contact information"
              ]
            },
            {
              title: "Browse Major Platforms",
              description: "Visit established websites like DDProperty, FazWaz, Hipflat, and Thailand-Property",
              details: [
                "DDProperty (www.ddproperty.com) - Largest property portal",
                "FazWaz (www.fazwaz.com) - International-focused platform",
                "Hipflat (www.hipflat.co.th) - Modern interface with good filtering",
                "Thailand-Property (www.thailand-property.com) - Comprehensive listings"
              ]
            },
            {
              title: "Contact Professional Agents",
              description: "Reach out to agents through the platform for assistance",
              details: [
                "Use contact forms or phone numbers provided",
                "Schedule property viewings",
                "Ask about additional properties not listed online",
                "Inquire about negotiation possibilities"
              ]
            }
          ]
        }
      }
    ],
    pros: [
      "Professional and polished experience",
      "Better quality photos and property details",
      "English-speaking agents",
      "Suitable for high-end condos and villas",
      "Established companies with reputation to maintain"
    ],
    cons: [
      "Prices usually inflated 20-30% above local rates",
      "Less flexibility for negotiation",
      "Listings not always up to date",
      "Some listings are bait-and-switch tactics",
      "Commission fees may be passed to tenants"
    ],
    resources: {
      websites: [
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
      ],
      agents: [
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
    }
  },
  "airbnb-short-term": {
    id: "airbnb-short-term",
    title: "Airbnb Short-term Strategy",
    sections: [
      {
        id: "overview",
        title: "Strategic Airbnb Usage",
        icon: Target,
        content: {
          description: "Airbnb works well for short-term stays (1 week to 3 months) when first arriving in Thailand or for temporary accommodation while searching for long-term options.",
          whyItWorks: "Airbnb provides hassle-free booking from abroad with established cancellation policies and host verification, making it ideal for initial accommodation needs."
        }
      },
      {
        id: "process",
        title: "Step-by-Step Process",
        icon: CheckCircle,
        content: {
          steps: [
            {
              title: "Search Your Destination",
              description: "Use Airbnb's search function to find properties in your target area",
              details: [
                "Enter specific neighborhoods or districts",
                "Set check-in and check-out dates",
                "Specify number of guests and room requirements"
              ]
            },
            {
              title: "Apply Strategic Filters",
              description: "Use filters to find properties suitable for digital nomads",
              details: [
                "Filter for WiFi availability and speed ratings",
                "Look for kitchen access for cost savings",
                "Check for pool and fitness amenities",
                "Enable monthly discount filter for longer stays",
                "Filter by 'Superhost' status for reliability"
              ]
            },
            {
              title: "Message Hosts Directly",
              description: "Contact hosts for custom offers, especially for monthly stays",
              details: [
                "Ask about discounts for stays longer than a month",
                "Inquire about additional amenities or services",
                "Request local recommendations and tips",
                "Clarify check-in procedures and house rules"
              ]
            }
          ]
        }
      }
    ],
    pros: [
      "Completely hassle-free booking process",
      "Bills typically included (WiFi, electricity, water)",
      "Can book from abroad with confidence",
      "Host support and local recommendations",
      "Verified properties and hosts"
    ],
    cons: [
      "Expensive for longer stays (30-100% markup)",
      "Often targeted at tourists vs. locals",
      "Less local immersion and community",
      "Some hosts cancel last minute",
      "Platform fees add to overall cost"
    ],
    resources: {}
  }
};

export default function AccommodationDetailViewer({
  accommodation,
  onBack
}: {
  accommodation: any;
  onBack: () => void;
}) {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  const guideData = accommodationGuides[accommodation.id as keyof typeof accommodationGuides];

  if (!guideData) {
    return <div>Guide not found</div>;
  }

  const handleSectionComplete = (sectionIndex: number) => {
    if (!completedSections.includes(sectionIndex)) {
      setCompletedSections([...completedSections, sectionIndex]);
    }
  };

  const getCompletionPercentage = () => {
    return Math.round((completedSections.length / guideData.sections.length) * 100);
  };

  const currentSectionData = guideData.sections[currentSection];
  const SectionIcon = currentSectionData.icon;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Selection
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{guideData.title}</h1>
            <div className="flex items-center gap-4 mt-2">
              <Badge variant="outline" className="text-xs">
                {accommodation.termType}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {completedSections.length} of {guideData.sections.length} sections completed
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Guide
          </Button>
        </div>

        {/* Progress */}
        <Card className="p-4 mb-6">
          <Progress
            value={getCompletionPercentage()}
            className="mb-2"
          />
          <p className="text-sm text-muted-foreground">
            Complete all sections to master this accommodation strategy
          </p>
        </Card>

        {/* Section Navigation */}
        <div className="flex justify-center mb-6">
          <div className="subsection-nav-frosted">
            {guideData.sections.map((section, index) => {
              const Icon = section.icon;
              const isCompleted = completedSections.includes(index);
              const isCurrent = currentSection === index;

              return (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(index)}
                  className={cn(
                    "subsection-button-frosted flex items-center gap-2",
                    isCurrent && "selected"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  {section.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Content */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className={cn(
              "w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center",
              accommodation.gradient
            )}>
              <SectionIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{currentSectionData.title}</h2>
              <Badge variant="secondary" className="mt-1">
                Section {currentSection + 1} of {guideData.sections.length}
              </Badge>
            </div>
          </div>

          {/* Section content */}
          <div className="space-y-6">
            {currentSectionData.content.description && (
              <div>
                <p className="text-muted-foreground leading-relaxed">
                  {currentSectionData.content.description}
                </p>
              </div>
            )}

            {currentSectionData.content.whyItWorks && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Why This Works
                </h3>
                <p className="text-sm text-muted-foreground">
                  {currentSectionData.content.whyItWorks}
                </p>
              </div>
            )}

            {currentSectionData.content.steps && (
              <div>
                <h3 className="font-semibold mb-4">Step-by-Step Process</h3>
                <div className="space-y-4">
                  {currentSectionData.content.steps.map((step, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{step.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                          <ul className="space-y-1">
                            {step.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="text-sm flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation and completion */}
          <div className="flex items-center justify-between pt-6 border-t mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0}
            >
              Previous Section
            </Button>

            <Button
              onClick={() => handleSectionComplete(currentSection)}
              disabled={completedSections.includes(currentSection)}
              className={completedSections.includes(currentSection) ? "bg-green-500" : ""}
            >
              {completedSections.includes(currentSection) ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Completed
                </>
              ) : (
                "Mark Complete"
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => setCurrentSection(Math.min(guideData.sections.length - 1, currentSection + 1))}
              disabled={currentSection === guideData.sections.length - 1}
            >
              Next Section
            </Button>
          </div>
        </Card>

        {/* Pros and Cons */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-green-600">
              <ThumbsUp className="w-5 h-5" />
              Advantages
            </h3>
            <ul className="space-y-2">
              {guideData.pros.map((pro, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {pro}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-red-600">
              <ThumbsDown className="w-5 h-5" />
              Disadvantages
            </h3>
            <ul className="space-y-2">
              {guideData.cons.map((con, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  {con}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Resources */}
        {(guideData.resources.groups || guideData.resources.websites || guideData.resources.agents) && (
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              Helpful Resources
            </h3>

            {/* Facebook Groups */}
            {guideData.resources.groups && (
              <div className="mb-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Facebook className="w-4 h-4" />
                  Facebook Groups
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  {guideData.resources.groups.map((group, index) => (
                    <Card key={index} className="p-4">
                      <h5 className="font-medium mb-1">{group.name}</h5>
                      <p className="text-sm text-muted-foreground mb-2">{group.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {group.features.map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {group.members}
                      </p>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => window.open(group.url, '_blank')}
                      >
                        Join Group
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Property Websites */}
            {guideData.resources.websites && (
              <div className="mb-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Property Websites
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  {guideData.resources.websites.map((website, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h5 className="font-medium mb-1">{website.name}</h5>
                          <p className="text-sm text-muted-foreground mb-2">{website.description}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{website.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {website.features.map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => window.open(website.url, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3 mr-2" />
                        Visit Website
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Agents */}
            {guideData.resources.agents && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Recommended Agents
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  {guideData.resources.agents.map((agent, index) => (
                    <Card key={index} className="p-4">
                      <h5 className="font-medium mb-1">{agent.name}</h5>
                      <p className="text-sm text-muted-foreground mb-2">{agent.description}</p>
                      <div className="text-sm text-muted-foreground mb-3 space-y-1">
                        <p className="flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          {agent.contact}
                        </p>
                        <p className="flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          {agent.email}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {agent.features.map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <div className="mb-3">
                        <p className="text-xs font-medium mb-1">Coverage Areas:</p>
                        <div className="flex flex-wrap gap-1">
                          {agent.areas.map((area) => (
                            <Badge key={area} variant="outline" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => window.location.href = `mailto:${agent.email}`}
                      >
                        <Phone className="w-3 h-3 mr-2" />
                        Contact Agent
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}