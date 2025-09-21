import { useState } from "react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { ProgressBar } from "@/shared/components/ui/progress-bar";
import { 
  ChevronRight,
  ChevronDown,
  CheckCircle,
  Star,
  Facebook,
  Globe,
  Home,
  DollarSign,
  Users,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  BookOpen,
  Target,
  Lightbulb
} from "lucide-react";

const guideModules = [
  {
    id: 1,
    title: "Facebook Marketplace + Facebook Groups",
    subtitle: "The #1 Recommendation",
    duration: "15 min read",
    difficulty: "Beginner",
    completed: false,
    content: {
      overview: "Facebook Marketplace and Facebook Groups are the top recommendation for finding accommodation in Thailand. This approach cuts through the BS and allows direct contact with Thai real estate agents, landlords, or property owners without overpriced listings or inflated tourist rates.",
      whyItWorks: "This method works because it eliminates middlemen skimming commissions and gives access to real local prices. Most agents speak enough English to make deals, and the inventory is updated daily with plenty of options.",
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
      tips: [
        "Always visit properties in person before committing",
        "Ask for recent photos and videos",
        "Verify agent credentials and reviews",
        "Use Google Translate for Thai communications",
        "Join multiple groups for better coverage"
      ]
    }
  },
  {
    id: 2,
    title: "Real Estate Agent Websites",
    subtitle: "Professional Alternative",
    duration: "10 min read",
    difficulty: "Beginner",
    completed: false,
    content: {
      overview: "Real estate agent websites serve as a backup option when Facebook doesn't meet your needs or when you prefer professional assistance with the legwork.",
      whyItWorks: "These platforms offer polished, professional listings with better photos, floor plans, and English-speaking agents, making them ideal for those who want a more structured approach.",
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
          title: "Use Advanced Filters",
          description: "Narrow down options using detailed search criteria",
          details: [
            "Set budget range and property type",
            "Filter by amenities (pool, gym, security)",
            "Choose specific areas or districts",
            "Sort by price, size, or newest listings"
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
      tips: [
        "Compare prices across multiple platforms",
        "Always ask for the 'local price' or 'Thai price'",
        "Request to see similar properties at different price points",
        "Get everything in writing before committing",
        "Ask about hidden fees or additional costs"
      ]
    }
  },
  {
    id: 3,
    title: "Short-Term with Airbnb",
    subtitle: "Temporary Solution",
    duration: "8 min read", 
    difficulty: "Beginner",
    completed: false,
    content: {
      overview: "Airbnb works well for short-term stays (1 week to 3 months) when first arriving in Thailand or for temporary accommodation while searching for long-term options.",
      whyItWorks: "Airbnb provides hassle-free booking from abroad with established cancellation policies and host verification, making it ideal for initial accommodation needs.",
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
        },
        {
          title: "Book Strategically",
          description: "Make smart booking decisions to maximize value",
          details: [
            "Book shorter initial stays to test the area",
            "Look for properties with flexible cancellation",
            "Read recent reviews carefully",
            "Verify location proximity to work/transport needs"
          ]
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
      tips: [
        "Use for first 1-2 weeks while searching for long-term options",
        "Negotiate monthly rates directly with hosts",
        "Book in less touristy areas for better prices",
        "Read all reviews, especially recent negative ones",
        "Have backup options in case of cancellations"
      ]
    }
  },
  {
    id: 4,
    title: "Final Tips & Best Practices",
    subtitle: "Essential Knowledge",
    duration: "12 min read",
    difficulty: "Intermediate", 
    completed: false,
    content: {
      overview: "Critical tips and best practices to ensure successful accommodation hunting and avoid common pitfalls when renting in Thailand.",
      whyItWorks: "These proven strategies have helped thousands of expats secure great accommodation deals while avoiding scams and overpriced properties.",
      steps: [
        {
          title: "Always Visit in Person",
          description: "Never commit to long-term contracts without physically inspecting the property",
          details: [
            "Schedule viewings during different times of day",
            "Check water pressure and electricity functionality", 
            "Test WiFi speed and connectivity",
            "Inspect for cleanliness and maintenance issues",
            "Verify security measures and access controls"
          ]
        },
        {
          title: "Master the Art of Negotiation",
          description: "Learn to negotiate effectively, especially for stays of 6+ months",
          details: [
            "Research local market rates beforehand",
            "Offer longer-term commitments for discounts",
            "Point out any property issues that need fixing",
            "Ask for utilities or services to be included",
            "Get negotiated terms in writing"
          ]
        },
        {
          title: "Understand What's Included",
          description: "Clarify all costs upfront to avoid surprise expenses",
          details: [
            "Ask about WiFi speed and any data limits",
            "Clarify electricity costs and payment methods",
            "Understand water costs and any restrictions",
            "Check if cleaning services are included",
            "Verify maintenance responsibility for appliances"
          ]
        },
        {
          title: "Evaluate Location Carefully",
          description: "Consider all location factors beyond just price",
          details: [
            "Test walkability to essential services",
            "Check noise levels during day and night",
            "Verify transportation connections",
            "Research local expat community presence",
            "Consider proximity to coworking spaces"
          ]
        }
      ],
      pros: [
        "Avoid costly mistakes and scams",
        "Secure better deals through negotiation",
        "Find properties that truly meet your needs",
        "Build relationships with reliable agents",
        "Integrate better into local communities"
      ],
      cons: [
        "Requires more time and effort",
        "May need to view many properties",
        "Some trial and error involved",
        "Negotiation can be stressful"
      ],
      tips: [
        "Keep a checklist of requirements when viewing",
        "Take photos/videos during property visits",
        "Ask previous tenants about their experience",
        "Build relationships with reliable agents for future needs",
        "Join expat groups for ongoing support and advice"
      ]
    }
  }
];

export default function LongTermGuide() {
  const [expandedModule, setExpandedModule] = useState<number | null>(1);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  const toggleModule = (moduleId: number) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const markCompleted = (moduleId: number) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const getCompletionPercentage = () => {
    return Math.round((completedModules.length / guideModules.length) * 100);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">🏠 How to Find Long-Term Accommodation in Thailand</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Complete guide to securing long-term housing in Thailand, from Facebook groups to professional agents
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="p-6 mb-8 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Course Progress</h3>
          <Badge variant="secondary">{completedModules.length} of {guideModules.length} completed</Badge>
        </div>
        <ProgressBar 
          progress={getCompletionPercentage()}
          showPercentage={true}
          size="lg"
          className="mb-2"
        />
        <p className="text-sm text-muted-foreground">
          Complete all modules to master long-term accommodation hunting in Thailand
        </p>
      </Card>

      {/* Course Modules */}
      <div className="space-y-4">
        {guideModules.map((module) => {
          const isExpanded = expandedModule === module.id;
          const isCompleted = completedModules.includes(module.id);
          
          return (
            <Card key={module.id} className="overflow-hidden">
              {/* Module Header */}
              <div 
                className="p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleModule(module.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-500' : 'bg-primary'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <BookOpen className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        {module.title}
                        {module.id === 1 && <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
                      </h3>
                      <p className="text-sm text-muted-foreground">{module.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge variant="outline">{module.duration}</Badge>
                      <Badge variant="secondary" className="ml-2">{module.difficulty}</Badge>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </div>

              {/* Module Content */}
              {isExpanded && (
                <div className="border-t p-6 space-y-6">
                  {/* Overview */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Overview
                    </h4>
                    <p className="text-muted-foreground">{module.content.overview}</p>
                  </div>

                  {/* Why It Works */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Why This Works
                    </h4>
                    <p className="text-muted-foreground">{module.content.whyItWorks}</p>
                  </div>

                  {/* Steps */}
                  <div>
                    <h4 className="font-semibold mb-4">Step-by-Step Process</h4>
                    <div className="space-y-4">
                      {module.content.steps.map((step, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold mb-2">{step.title}</h5>
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

                  {/* Pros and Cons */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-600">
                        <ThumbsUp className="w-4 h-4" />
                        Pros
                      </h4>
                      <ul className="space-y-2">
                        {module.content.pros.map((pro, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-600">
                        <ThumbsDown className="w-4 h-4" />
                        Cons
                      </h4>
                      <ul className="space-y-2">
                        {module.content.cons.map((con, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tips */}
                  <div>
                    <h4 className="font-semibold mb-3">💡 Pro Tips</h4>
                    <div className="grid gap-2">
                      {module.content.tips.map((tip, index) => (
                        <div key={index} className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg text-sm">
                          {tip}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mark Complete Button */}
                  <div className="flex justify-end pt-4 border-t">
                    <Button 
                      onClick={() => markCompleted(module.id)}
                      disabled={isCompleted}
                      className={isCompleted ? "bg-green-500" : ""}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        "Mark as Complete"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Summary Card */}
      {completedModules.length === guideModules.length && (
        <Card className="p-6 mt-8 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Congratulations! 🎉</h3>
            <p className="text-muted-foreground mb-4">
              You've completed the complete guide to finding long-term accommodation in Thailand. 
              You're now equipped with all the knowledge needed to secure great housing deals!
            </p>
            <Button>
              <ExternalLink className="w-4 h-4 mr-2" />
              Start Your Housing Search
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
