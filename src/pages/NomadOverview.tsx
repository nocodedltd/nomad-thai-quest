import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  FileText, 
  Home, 
  Users, 
  ArrowRight,
  Clock,
  CheckCircle,
  Target,
  Plane,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  TrendingUp,
  Globe,
  Shield,
  Building
} from "lucide-react";

const timelinePhases = [
  {
    id: "preparation",
    title: "Preparation Phase",
    duration: "3-6 months before",
    description: "Build foundation before arrival",
    color: "from-blue-500 to-blue-600",
    icon: Target,
    completed: false
  },
  {
    id: "income",
    title: "Income Secured",
    duration: "2-4 months before",
    description: "Establish revenue streams",
    color: "from-green-500 to-green-600",
    icon: DollarSign,
    completed: false
  },
  {
    id: "legal",
    title: "Legal Setup",
    duration: "1-2 months before",
    description: "Visa and documentation ready",
    color: "from-purple-500 to-purple-600",
    icon: FileText,
    completed: false
  },
  {
    id: "relocation",
    title: "Relocation",
    duration: "Arrival month",
    description: "Move and settle in Thailand",
    color: "from-orange-500 to-orange-600",
    icon: Plane,
    completed: false
  },
  {
    id: "integration",
    title: "Integration",
    duration: "First 3 months",
    description: "Build community and optimize life",
    color: "from-pink-500 to-pink-600",
    icon: Users,
    completed: false
  }
];

const incomeStreams = [
  {
    title: "Amazon FBA Business",
    description: "E-commerce arbitrage and private label",
    difficulty: "Intermediate",
    timeToIncome: "3-6 months",
    potential: "$2,000-$10,000/month",
    icon: Briefcase,
    courses: 8,
    completed: 2,
    color: "from-emerald-500/20 to-emerald-600/20"
  },
  {
    title: "Digital Nomad Remote Work",
    description: "High-paying remote positions",
    difficulty: "Beginner",
    timeToIncome: "1-3 months",
    potential: "$3,000-$8,000/month",
    icon: Globe,
    courses: 5,
    completed: 1,
    color: "from-blue-500/20 to-blue-600/20"
  },
  {
    title: "English Teaching",
    description: "Online and in-person teaching",
    difficulty: "Beginner",
    timeToIncome: "1-2 months",
    potential: "$1,500-$4,000/month",
    icon: GraduationCap,
    courses: 6,
    completed: 0,
    color: "from-purple-500/20 to-purple-600/20"
  },
  {
    title: "Freelancing & Consulting",
    description: "Leverage existing skills",
    difficulty: "Beginner",
    timeToIncome: "2-4 weeks",
    potential: "$2,000-$6,000/month",
    icon: TrendingUp,
    courses: 4,
    completed: 0,
    color: "from-orange-500/20 to-orange-600/20"
  }
];

const visaOptions = [
  {
    title: "Education Visa (ED)",
    description: "Learn Thai or Muay Thai legally",
    duration: "1-2 years",
    cost: "$1,000-$2,000",
    difficulty: "Easy",
    bestFor: "Long-term stay, learning culture",
    icon: GraduationCap,
    pros: ["Renewable", "Work opportunities", "Cultural immersion"],
    cons: ["Requires attendance", "Limited work rights"]
  },
  {
    title: "Elite Visa",
    description: "Premium long-term residency",
    duration: "5-20 years",
    cost: "$15,000-$60,000",
    difficulty: "Easy",
    bestFor: "High income, minimal hassle",
    icon: Shield,
    pros: ["No renewals", "VIP treatment", "Work allowed"],
    cons: ["Expensive", "No path to PR"]
  },
  {
    title: "Tourist Visa + Extensions",
    description: "Short-term flexible option",
    duration: "6-8 months",
    cost: "$200-$500",
    difficulty: "Medium",
    bestFor: "Testing the waters",
    icon: MapPin,
    pros: ["Low cost", "Flexible", "Easy entry"],
    cons: ["Visa runs", "Uncertainty", "Limited"]
  }
];

const accommodationOptions = [
  {
    title: "Bangkok Condos",
    description: "Urban living with all amenities",
    priceRange: "$500-$1,500/month",
    bestFor: "City lovers, networking",
    areas: ["Sukhumvit", "Silom", "Sathorn", "Thonglor"],
    icon: Building,
    features: ["BTS/MRT access", "Shopping malls", "International food", "Coworking spaces"]
  },
  {
    title: "Chiang Mai Houses",
    description: "Affordable mountain city living",
    priceRange: "$300-$800/month",
    bestFor: "Digital nomads, lower cost",
    areas: ["Nimman", "Old City", "Hang Dong", "Mae Rim"],
    icon: Home,
    features: ["Lower cost", "Nature access", "Nomad community", "Cool weather"]
  },
  {
    title: "Beach Towns",
    description: "Tropical island lifestyle",
    priceRange: "$400-$1,200/month",
    bestFor: "Beach lovers, relaxed pace",
    areas: ["Koh Samui", "Phuket", "Hua Hin", "Koh Phangan"],
    icon: MapPin,
    features: ["Beach access", "Water sports", "Tourism income", "Seasonal pricing"]
  }
];

export default function NomadOverview() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("timeline");

  // Overall progress calculation
  const overallProgress = 25; // Mock progress - would come from backend

  return (
    <div className="min-h-screen bg-background p-3 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Header */}
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">The Farang Forge</h1>
          <p className="text-sm md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your complete roadmap to successfully forging your path to Thailand
          </p>
        </div>

        {/* Overall Progress - Mobile First */}
        <Card className="p-4 mb-4 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold">Overall Progress</h3>
            <Badge variant="secondary">{overallProgress}% Complete</Badge>
          </div>
          <ProgressBar progress={overallProgress} size="lg" className="mb-2" />
          <p className="text-xs md:text-sm text-muted-foreground">
            Keep going! You're making great progress toward your Thailand move.
          </p>
        </Card>

        {/* Navigation Tabs - Mobile Optimized */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-muted p-1 rounded-lg overflow-x-auto max-w-full">
            {[
              { id: "timeline", label: "Timeline", icon: Calendar },
              { id: "income", label: "Income", icon: DollarSign },
              { id: "visa", label: "Visa", icon: FileText },
              { id: "accommodation", label: "Housing", icon: Home }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={selectedTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedTab(tab.id)}
                className="flex items-center gap-1 md:gap-2 flex-shrink-0 text-xs md:text-sm px-2 md:px-3"
              >
                <tab.icon className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Timeline View */}
        {selectedTab === "timeline" && (
          <div className="space-y-4 md:space-y-8">
            <Card className="p-4 md:p-6">
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Target className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  Your Journey to Thailand
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Timeline Line - Mobile Optimized */}
                  <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-muted-foreground/20"></div>
                  
                  <div className="space-y-6 md:space-y-8">
                    {timelinePhases.map((phase, index) => (
                      <div key={phase.id} className="relative flex items-start gap-4 md:gap-6">
                        {/* Timeline Dot - Mobile Optimized */}
                        <div className={`relative z-10 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${phase.color} text-white shadow-lg flex-shrink-0`}>
                          <phase.icon className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                            <h3 className="text-lg md:text-xl font-bold">{phase.title}</h3>
                            <Badge variant="secondary" className="text-xs self-start">{phase.duration}</Badge>
                          </div>
                          <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">{phase.description}</p>
                          
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                            {/* Show relevant cards based on phase */}
                            {phase.id === "income" && (
                              <>
                                {incomeStreams.slice(0, 2).map((stream) => (
                                  <Card key={stream.title} className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                      <stream.icon className="w-5 h-5 text-primary" />
                                      <h4 className="font-semibold text-sm">{stream.title}</h4>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-2">{stream.potential}</p>
                                    <ProgressBar progress={(stream.completed / stream.courses) * 100} size="sm" />
                                  </Card>
                                ))}
                              </>
                            )}
                            
                            {phase.id === "legal" && (
                              <>
                                {visaOptions.slice(0, 2).map((visa) => (
                                  <Card key={visa.title} className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                      <visa.icon className="w-5 h-5 text-primary" />
                                      <h4 className="font-semibold text-sm">{visa.title}</h4>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{visa.cost} • {visa.duration}</p>
                                  </Card>
                                ))}
                              </>
                            )}
                            
                            {phase.id === "relocation" && (
                              <>
                                {accommodationOptions.slice(0, 2).map((acc) => (
                                  <Card key={acc.title} className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                      <acc.icon className="w-5 h-5 text-primary" />
                                      <h4 className="font-semibold text-sm">{acc.title}</h4>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{acc.priceRange}</p>
                                  </Card>
                                ))}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Income Sources View */}
        {selectedTab === "income" && (
          <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
            {incomeStreams.map((stream) => (
              <Card key={stream.title} className={`p-4 md:p-6 bg-gradient-to-br ${stream.color}`}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 md:p-3 rounded-xl bg-white/10 flex-shrink-0">
                      <stream.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg md:text-xl font-bold">{stream.title}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{stream.difficulty} • {stream.timeToIncome}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs self-start">{stream.potential}</Badge>
                </div>
                
                <p className="text-muted-foreground mb-4">{stream.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Course Progress</span>
                    <span>{stream.completed}/{stream.courses} completed</span>
                  </div>
                  <ProgressBar progress={(stream.completed / stream.courses) * 100} size="md" />
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  variant="default"
                  onClick={() => {
                    if (stream.title === "Amazon FBA Business") {
                      navigate("/course/amazon-fba");
                    } else {
                      navigate("/courses");
                    }
                  }}
                >
                  Start Learning
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* Visa Options View */}
        {selectedTab === "visa" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {visaOptions.map((visa) => (
              <Card key={visa.title} className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <visa.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{visa.title}</h3>
                    <p className="text-sm text-muted-foreground">{visa.duration}</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">{visa.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-semibold">Cost</p>
                    <p className="text-sm text-muted-foreground">{visa.cost}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Difficulty</p>
                    <p className="text-sm text-muted-foreground">{visa.difficulty}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2">Best For</p>
                  <p className="text-sm text-muted-foreground">{visa.bestFor}</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-green-600">Pros</p>
                    <ul className="text-xs text-muted-foreground">
                      {visa.pros.map((pro, idx) => (
                        <li key={idx}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-red-600">Cons</p>
                    <ul className="text-xs text-muted-foreground">
                      {visa.cons.map((con, idx) => (
                        <li key={idx}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Button className="w-full mt-4" variant="outline">
                  Learn More
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* Accommodation View */}
        {selectedTab === "accommodation" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {accommodationOptions.map((acc) => (
              <Card key={acc.title} className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-warning/10">
                    <acc.icon className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{acc.title}</h3>
                    <p className="text-sm text-muted-foreground">{acc.priceRange}</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">{acc.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2">Best For</p>
                  <p className="text-sm text-muted-foreground">{acc.bestFor}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2">Popular Areas</p>
                  <div className="flex flex-wrap gap-1">
                    {acc.areas.map((area) => (
                      <Badge key={area} variant="secondary" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2">Key Features</p>
                  <ul className="text-xs text-muted-foreground">
                    {acc.features.map((feature, idx) => (
                      <li key={idx}>• {feature}</li>
                    ))}
                  </ul>
                </div>
                
                <Button className="w-full mt-4" variant="outline">
                  Explore Options
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Thailand Journey?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of successful nomads who have used our proven system to relocate to Thailand
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/dashboard")}>
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/courses")}>
                Browse Courses
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}