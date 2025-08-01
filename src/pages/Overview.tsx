import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { 
  Map, 
  DollarSign, 
  FileText, 
  Home, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Target, 
  Zap, 
  Shield, 
  Globe, 
  Plane, 
  Building, 
  Heart,
  Star,
  TrendingUp,
  Award,
  BookOpen,
  GraduationCap,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react";

interface JourneyPhase {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  progress: number;
  lessons: number;
  completedLessons: number;
  neonColor: string;
  gradientColor: string;
  features: string[];
  nextSteps: string[];
  estimatedCost: string;
  timeToComplete: string;
}

const journeyPhases: JourneyPhase[] = [
  {
    id: "research",
    title: "Research & Planning",
    subtitle: "Lay the Foundation",
    description: "Understand Thailand's culture, visa requirements, and create your relocation strategy.",
    icon: Globe,
    duration: "2-4 weeks",
    difficulty: "Beginner",
    progress: 85,
    lessons: 8,
    completedLessons: 7,
    neonColor: "futuristic-neon-blue",
    gradientColor: "from-futuristic-neon-blue to-futuristic-neon-cyan",
    features: [
      "Thailand culture & customs",
      "Visa requirements overview",
      "Cost of living analysis",
      "Best cities for expats",
      "Healthcare system guide",
      "Language basics",
      "Legal considerations",
      "Timeline planning"
    ],
    nextSteps: [
      "Complete visa research",
      "Choose your target city",
      "Set up initial budget"
    ],
    estimatedCost: "$500-1,000",
    timeToComplete: "2-4 weeks"
  },
  {
    id: "income",
    title: "Income Streams",
    subtitle: "Build Your Financial Foundation",
    description: "Establish sustainable income sources that work from anywhere in Thailand.",
    icon: DollarSign,
    duration: "4-8 weeks",
    difficulty: "Intermediate",
    progress: 60,
    lessons: 12,
    completedLessons: 7,
    neonColor: "futuristic-neon-green",
    gradientColor: "from-futuristic-neon-green to-futuristic-neon-cyan",
    features: [
      "Amazon FBA setup",
      "Remote work opportunities",
      "Teaching English online",
      "Freelancing platforms",
      "Digital marketing",
      "E-commerce ventures",
      "Consulting services",
      "Passive income streams"
    ],
    nextSteps: [
      "Set up Amazon FBA account",
      "Create freelancer profiles",
      "Start income tracking"
    ],
    estimatedCost: "$1,000-3,000",
    timeToComplete: "4-8 weeks"
  },
  {
    id: "visa",
    title: "Visa & Legal",
    subtitle: "Secure Your Stay",
    description: "Navigate Thailand's visa system and ensure legal compliance for long-term residence.",
    icon: FileText,
    duration: "3-6 weeks",
    difficulty: "Intermediate",
    progress: 40,
    lessons: 10,
    completedLessons: 4,
    neonColor: "futuristic-neon-purple",
    gradientColor: "from-futuristic-neon-purple to-futuristic-neon-pink",
    features: [
      "Tourist visa extensions",
      "Education visa options",
      "Elite visa program",
      "Business visa setup",
      "Marriage visa process",
      "Retirement visa requirements",
      "Visa run strategies",
      "Legal documentation"
    ],
    nextSteps: [
      "Choose visa strategy",
      "Gather required documents",
      "Apply for initial visa"
    ],
    estimatedCost: "$500-5,000",
    timeToComplete: "3-6 weeks"
  },
  {
    id: "accommodation",
    title: "Accommodation",
    subtitle: "Find Your Home",
    description: "Discover the perfect place to live in Thailand, from condos to houses.",
    icon: Home,
    duration: "2-4 weeks",
    difficulty: "Beginner",
    progress: 25,
    lessons: 8,
    completedLessons: 2,
    neonColor: "futuristic-neon-pink",
    gradientColor: "from-futuristic-neon-pink to-futuristic-neon-orange",
    features: [
      "Best neighborhoods",
      "Rental market guide",
      "Condominium options",
      "House rentals",
      "Negotiation strategies",
      "Utility setup",
      "Furniture & appliances",
      "Moving logistics"
    ],
    nextSteps: [
      "Research target areas",
      "Contact real estate agents",
      "Plan viewing trips"
    ],
    estimatedCost: "$2,000-5,000",
    timeToComplete: "2-4 weeks"
  },
  {
    id: "community",
    title: "Community & Integration",
    subtitle: "Build Your Network",
    description: "Connect with locals and expats to create your support network in Thailand.",
    icon: Users,
    duration: "Ongoing",
    difficulty: "Beginner",
    progress: 15,
    lessons: 6,
    completedLessons: 1,
    neonColor: "futuristic-neon-orange",
    gradientColor: "from-futuristic-neon-orange to-futuristic-neon-cyan",
    features: [
      "Expat communities",
      "Local networking events",
      "Language exchange programs",
      "Social media groups",
      "Professional networks",
      "Cultural activities",
      "Volunteer opportunities",
      "Friendship building"
    ],
    nextSteps: [
      "Join expat Facebook groups",
      "Attend local meetups",
      "Start language learning"
    ],
    estimatedCost: "$200-500",
    timeToComplete: "Ongoing"
  }
];

const Overview = () => {
  const navigate = useNavigate();
  const [selectedPhase, setSelectedPhase] = useState<JourneyPhase | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");

  const overallProgress = Math.round(
    journeyPhases.reduce((sum, phase) => sum + phase.progress, 0) / journeyPhases.length
  );

  const totalLessons = journeyPhases.reduce((sum, phase) => sum + phase.lessons, 0);
  const completedLessons = journeyPhases.reduce((sum, phase) => sum + phase.completedLessons, 0);

  return (
    <div className="min-h-screen bg-futuristic-bg-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 bg-futuristic-neon-blue rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-futuristic-neon-purple rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-futuristic-neon-green rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-futuristic-text-primary">
            THE JOURNEY OF A
            <span className="block bg-gradient-futuristic-hero bg-clip-text text-transparent animate-neon-pulse">
              FARANG
            </span>
          </h1>
          <p className="text-xl text-futuristic-text-secondary max-w-3xl mx-auto font-body leading-relaxed">
            Your complete roadmap to forging a successful life in Thailand. 
            Follow the proven path that thousands of expats have taken.
          </p>
        </div>

        {/* Overall Progress */}
        <div className="card-futuristic mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-futuristic-text-primary mb-4">
              YOUR PROGRESS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-display font-bold text-futuristic-neon-blue mb-2">
                  {overallProgress}%
                </div>
                <div className="text-futuristic-text-secondary font-medium">Overall Progress</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-display font-bold text-futuristic-neon-green mb-2">
                  {completedLessons}/{totalLessons}
                </div>
                <div className="text-futuristic-text-secondary font-medium">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-display font-bold text-futuristic-neon-purple mb-2">
                  {journeyPhases.length}
                </div>
                <div className="text-futuristic-text-secondary font-medium">Journey Phases</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-display font-bold text-futuristic-neon-pink mb-2">
                  3-6
                </div>
                <div className="text-futuristic-text-secondary font-medium">Months to Complete</div>
              </div>
            </div>
            <div className="mt-6">
              <ProgressBar progress={overallProgress} size="lg" />
            </div>
          </div>
        </div>

        {/* Journey Phases */}
        <div className="grid gap-8 mb-12">
          {journeyPhases.map((phase, index) => (
            <div 
              key={phase.id}
              className="card-futuristic group hover:scale-105 transition-all duration-500 animate-slide-up cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedPhase(phase)}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Phase Icon & Header */}
                <div className="flex items-center gap-4 lg:w-1/3">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${phase.gradientColor} text-futuristic-bg-primary shadow-glow group-hover:scale-110 transition-transform duration-300`}>
                    <phase.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-futuristic-text-primary mb-1">
                      {phase.title}
                    </h3>
                    <p className="text-futuristic-text-tertiary font-medium">{phase.subtitle}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs bg-${phase.neonColor} text-futuristic-bg-primary`}
                      >
                        {phase.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {phase.duration}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Phase Content */}
                <div className="lg:w-2/3">
                  <p className="text-futuristic-text-secondary mb-4 font-body leading-relaxed">
                    {phase.description}
                  </p>
                  
                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-futuristic-text-tertiary">
                        {phase.completedLessons}/{phase.lessons} lessons completed
                      </span>
                      <span className="text-sm font-medium text-futuristic-text-primary">
                        {phase.progress}%
                      </span>
                    </div>
                    <ProgressBar progress={phase.progress} size="md" />
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-futuristic-neon-blue">{phase.estimatedCost}</div>
                      <div className="text-xs text-futuristic-text-tertiary">Estimated Cost</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-futuristic-neon-green">{phase.timeToComplete}</div>
                      <div className="text-xs text-futuristic-text-tertiary">Time to Complete</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-futuristic-neon-purple">{phase.lessons}</div>
                      <div className="text-xs text-futuristic-text-tertiary">Lessons</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="card-futuristic text-center">
          <h2 className="text-3xl font-display font-bold text-futuristic-text-primary mb-4">
            READY TO FORGE YOUR PATH?
          </h2>
          <p className="text-futuristic-text-secondary mb-8 max-w-2xl mx-auto font-body">
            Join thousands of expats who have successfully built their dream life in Thailand. 
            Start your journey today with our comprehensive course system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="btn-futuristic text-lg px-8 py-4 animate-pulse-glow group"
              onClick={() => navigate('/dashboard')}
            >
              <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button 
              variant="outline" 
              className="text-lg px-8 py-4 bg-futuristic-bg-glass border-futuristic-neon-purple text-futuristic-text-primary hover:bg-futuristic-bg-elevated hover:border-futuristic-neon-pink transition-all duration-300"
              onClick={() => navigate('/courses')}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Browse All Courses
            </Button>
          </div>
        </div>
      </div>

      {/* Phase Detail Modal */}
      {selectedPhase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-futuristic-bg-overlay backdrop-blur-lg" onClick={() => setSelectedPhase(null)} />
          <div className="card-futuristic max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-xl bg-gradient-to-br ${selectedPhase.gradientColor} text-futuristic-bg-primary shadow-glow`}>
                  <selectedPhase.icon className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-bold text-futuristic-text-primary">
                    {selectedPhase.title}
                  </h2>
                  <p className="text-futuristic-text-tertiary font-medium">{selectedPhase.subtitle}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedPhase(null)}
                className="text-futuristic-text-primary hover:text-futuristic-neon-blue"
              >
                ✕
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <h3 className="text-xl font-heading font-bold text-futuristic-text-primary mb-4">
                  What You'll Learn
                </h3>
                <div className="space-y-3 mb-6">
                  {selectedPhase.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-futuristic-neon-green flex-shrink-0" />
                      <span className="text-futuristic-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-heading font-bold text-futuristic-text-primary mb-4">
                  Next Steps
                </h3>
                <div className="space-y-3">
                  {selectedPhase.nextSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-futuristic-neon-blue flex-shrink-0" />
                      <span className="text-futuristic-text-secondary">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div>
                <h3 className="text-xl font-heading font-bold text-futuristic-text-primary mb-4">
                  Phase Details
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-futuristic-text-secondary">Difficulty:</span>
                    <Badge className={`bg-${selectedPhase.neonColor} text-futuristic-bg-primary`}>
                      {selectedPhase.difficulty}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-futuristic-text-secondary">Duration:</span>
                    <span className="text-futuristic-text-primary font-medium">{selectedPhase.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-futuristic-text-secondary">Lessons:</span>
                    <span className="text-futuristic-text-primary font-medium">{selectedPhase.lessons}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-futuristic-text-secondary">Estimated Cost:</span>
                    <span className="text-futuristic-text-primary font-medium">{selectedPhase.estimatedCost}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-futuristic-text-secondary">Progress:</span>
                    <span className="text-futuristic-text-primary font-medium">{selectedPhase.progress}%</span>
                  </div>
                </div>

                <div className="mt-6">
                  <ProgressBar progress={selectedPhase.progress} size="lg" />
                </div>

                <div className="mt-6">
                  <Button 
                    className="btn-futuristic w-full group"
                    onClick={() => {
                      setSelectedPhase(null);
                      navigate('/dashboard');
                    }}
                  >
                    <GraduationCap className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Continue Learning
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview; 