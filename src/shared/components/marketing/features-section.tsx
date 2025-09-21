import { Card } from "@/shared/components/ui/card";
import { 
  Trophy, 
  Target, 
  Zap, 
  Users, 
  BookOpen, 
  Award,
  Clock,
  MessageCircle,
  CheckCircle,
  Star,
  Rocket,
  Shield
} from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "Gamified Learning",
    description: "Earn XP, unlock badges, and track streaks as you progress through real-world skills.",
    neonColor: "futuristic-neon-green",
    gradientColor: "from-futuristic-neon-green to-futuristic-neon-cyan"
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description: "Every lesson leads to actionable outcomes: visas, jobs, housing, and connections.",
    neonColor: "futuristic-neon-blue",
    gradientColor: "from-futuristic-neon-blue to-futuristic-neon-purple"
  },
  {
    icon: Zap,
    title: "Bite-Sized Lessons",
    description: "Quick 5-10 minute lessons that fit into your busy expat lifestyle.",
    neonColor: "futuristic-neon-purple",
    gradientColor: "from-futuristic-neon-purple to-futuristic-neon-pink"
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Learn from real expats who've successfully made the move.",
    neonColor: "futuristic-neon-pink",
    gradientColor: "from-futuristic-neon-pink to-futuristic-neon-orange"
  },
  {
    icon: BookOpen,
    title: "Interactive Content",
    description: "Quizzes, drag-and-drop exercises, and real document examples.",
    neonColor: "futuristic-neon-orange",
    gradientColor: "from-futuristic-neon-orange to-futuristic-neon-cyan"
  },
  {
    icon: Award,
    title: "Verified Success",
    description: "Track real achievements: visa approvals, job offers, and housing secured.",
    neonColor: "futuristic-neon-cyan",
    gradientColor: "from-futuristic-neon-cyan to-futuristic-neon-green"
  }
];

const stats = [
  {
    icon: Clock,
    value: "2-3 weeks",
    label: "Average time to first visa approval",
    neonColor: "futuristic-neon-blue"
  },
  {
    icon: MessageCircle,
    value: "24/7",
    label: "Community support and guidance",
    neonColor: "futuristic-neon-purple"
  },
  {
    icon: CheckCircle,
    value: "95%",
    label: "Success rate for visa applications",
    neonColor: "futuristic-neon-green"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-6 bg-futuristic-bg-tertiary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-20 w-40 h-40 bg-futuristic-neon-blue rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-32 h-32 bg-futuristic-neon-purple rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Features Grid */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-futuristic-text-primary">
            WHY CHOOSE THE FARANG FORGE?
          </h2>
          <p className="text-xl text-futuristic-text-secondary max-w-3xl mx-auto font-body">
            We don't just teach concepts — we help you forge your path to Thailand success.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card-futuristic text-center group hover:scale-105 transition-all duration-500 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradientColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl`} />
              
              <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradientColor} text-futuristic-bg-primary mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-heading font-bold mb-4 text-futuristic-text-primary">{feature.title}</h3>
                <p className="text-futuristic-text-secondary font-body leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Success Stats */}
        <div className="card-futuristic p-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-futuristic-glass opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <h3 className="text-3xl font-display font-bold text-center mb-12 text-futuristic-text-primary">
              REAL RESULTS FROM REAL PEOPLE
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${stat.neonColor} text-futuristic-bg-primary mb-4 shadow-glow group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div className={`text-4xl font-display font-bold mb-2 text-${stat.neonColor}`}>{stat.value}</div>
                  <div className="text-futuristic-text-secondary font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}