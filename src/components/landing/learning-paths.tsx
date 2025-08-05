import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { 
  DollarSign, 
  FileText, 
  Home, 
  Users, 
  Lock,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  MapPin,
  Heart
} from "lucide-react";

const learningPaths = [
  {
    id: "income",
    title: "Income",
    description: "Build sustainable income streams while living in Thailand",
    icon: DollarSign,
    lessons: 12,
    completedLessons: 0,
    neonColor: "futuristic-neon-green",
    gradientColor: "from-futuristic-neon-green to-futuristic-neon-cyan",
    isLocked: false,
    topics: ["Amazon FBA", "Remote Work Jobs", "Teaching English", "Freelancing"]
  },
  {
    id: "visa",
    title: "Visa",
    description: "Navigate Thai visa requirements and stay legally long-term",
    icon: FileText,
    lessons: 8,
    completedLessons: 0,
    neonColor: "futuristic-neon-blue",
    gradientColor: "from-futuristic-neon-blue to-futuristic-neon-purple",
    isLocked: false,
    topics: ["Long-term Visas", "Education vs Elite", "Visa Runs", "Requirements"]
  },
  {
    id: "accommodation",
    title: "Accommodation",
    description: "Find the perfect place to call home in Thailand",
    icon: Home,
    lessons: 10,
    completedLessons: 0,
    neonColor: "futuristic-neon-purple",
    gradientColor: "from-futuristic-neon-purple to-futuristic-neon-pink",
    isLocked: true,
    topics: ["Best Areas", "Renting Condos", "Budget Living", "Neighborhoods"]
  },
  {
    id: "community",
    title: "Community",
    description: "Connect with locals and expats to build your network",
    icon: Users,
    lessons: 6,
    completedLessons: 0,
    neonColor: "futuristic-neon-pink",
    gradientColor: "from-futuristic-neon-pink to-futuristic-neon-orange",
    isLocked: true,
    topics: ["Finding Events", "Expat Hotspots", "Local Culture", "Networking"]
  }
];

export function LearningPaths() {
  return (
    <section className="py-20 px-6 bg-futuristic-bg-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-futuristic-neon-blue rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-futuristic-neon-purple rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-futuristic-neon-green rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-futuristic-text-primary">
            YOUR LEARNING JOURNEY
          </h2>
          <p className="text-xl text-futuristic-text-secondary max-w-3xl mx-auto font-body">
            Master the four essential pillars of Thai expat life through interactive lessons and real-world applications.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {learningPaths.map((path, index) => (
            <div 
              key={path.id} 
              className="card-futuristic group hover:scale-105 transition-all duration-500 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${path.gradientColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${path.gradientColor} text-futuristic-bg-primary shadow-glow group-hover:scale-110 transition-transform duration-300`}>
                      <path.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-futuristic-text-primary">{path.title}</h3>
                      <p className="text-sm text-futuristic-text-tertiary">{path.lessons} lessons</p>
                    </div>
                  </div>
                  
                  {path.isLocked && (
                    <div className="flex items-center gap-2 text-futuristic-text-muted">
                      <Lock className="w-5 h-5" />
                      <span className="text-xs font-medium">LOCKED</span>
                    </div>
                  )}
                </div>
                
                <p className="text-futuristic-text-secondary mb-6 font-body leading-relaxed">{path.description}</p>
                
                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {path.topics.map((topic) => (
                    <span 
                      key={topic}
                      className="px-3 py-1 bg-futuristic-bg-tertiary border border-futuristic-border-primary rounded-lg text-xs text-futuristic-text-secondary font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                
                {/* Progress */}
                <div className="mb-6">
                  <ProgressBar 
                    progress={(path.completedLessons / path.lessons) * 100}
                    showPercentage={true}
                    size="md"
                  />
                </div>
                
                {/* Action Button */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm text-futuristic-text-muted">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">{path.completedLessons}/{path.lessons} completed</span>
                  </div>
                  
                  <Button 
                    className={`btn-futuristic text-sm px-6 py-2 group-hover:scale-105 transition-transform duration-300 ${
                      path.isLocked ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={path.isLocked}
                  >
                    {path.isLocked ? (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Complete previous paths
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}