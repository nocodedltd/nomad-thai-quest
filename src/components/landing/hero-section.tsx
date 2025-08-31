import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap, Target, Users, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/user-context";
import heroImage from "@/assets/thailand-hero.jpg";

export function HeroSection() {
  const navigate = useNavigate();
  const { userType, setUserType, isDevelopment } = useUser();
  
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-futuristic-bg-primary">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-futuristic-hero opacity-20" />
        <div className="absolute inset-0 bg-futuristic-bg-primary" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-futuristic-neon-blue rounded-full animate-pulse-glow" />
        <div className="absolute top-40 right-32 w-3 h-3 bg-futuristic-neon-purple rounded-full animate-float" />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-futuristic-neon-green rounded-full animate-pulse-glow" />
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-futuristic-neon-pink rounded-full animate-float" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="animate-slide-up">
          {/* Compact Heading */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 leading-tight">
              <span className="text-futuristic-text-primary">MOVE TO THAILAND</span>
              <span className="block bg-gradient-futuristic-hero bg-clip-text text-transparent animate-neon-pulse">
                IN 9 MONTHS
              </span>
            </h1>
          </div>
          
          {/* Compact Subtitle */}
          <p className="text-lg md:text-xl mb-8 text-futuristic-text-secondary max-w-3xl mx-auto font-body leading-relaxed">
            Master the <span className="text-futuristic-neon-blue font-semibold">4 pillars</span> of expat life: 
            <span className="text-futuristic-neon-green"> Income</span>, 
            <span className="text-futuristic-neon-purple"> Visa</span>, 
            <span className="text-futuristic-neon-pink"> Accommodation</span> & 
            <span className="text-futuristic-neon-cyan"> Community</span>. 
            Forge your path to Thailand success.
          </p>
          
          {/* Compact CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              className="btn-futuristic text-lg px-10 py-4 animate-pulse-glow group"
              onClick={() => {
                if (isDevelopment && userType === 'guest') {
                  setUserType('free');
                } else if (userType === 'guest') {
                  navigate('/roadmap');
                } else {
                  navigate('/roadmap');
                }
              }}
            >
              <Target className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              {userType === 'guest' ? 'Get Started Free' : 'Continue Journey'}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            {userType !== 'guest' && (
              <Button 
                className="btn-futuristic-secondary text-lg px-10 py-4 group"
                onClick={() => navigate('/progress')}
              >
                <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                View Progress
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            )}
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 bg-futuristic-bg-glass border-futuristic-neon-purple text-futuristic-text-primary hover:bg-futuristic-bg-elevated hover:border-futuristic-neon-pink transition-all duration-300 group"
              onClick={() => navigate('/income')}
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              {userType === 'guest' ? 'Watch Demo' : 'Explore Courses'}
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="card-futuristic text-center group">
              <div className="text-4xl font-display font-bold text-futuristic-neon-blue mb-2 group-hover:scale-110 transition-transform duration-300">4</div>
              <div className="text-sm text-futuristic-text-secondary font-medium">Learning Paths</div>
            </div>
            <div className="card-futuristic text-center group">
              <div className="text-4xl font-display font-bold text-futuristic-neon-green mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
              <div className="text-sm text-futuristic-text-secondary font-medium">Practical Lessons</div>
            </div>
            <div className="card-futuristic text-center group">
              <div className="text-4xl font-display font-bold text-futuristic-neon-purple mb-2 group-hover:scale-110 transition-transform duration-300">1000+</div>
              <div className="text-sm text-futuristic-text-secondary font-medium">Success Stories</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-futuristic-neon-blue rounded-full flex justify-center">
          <div className="w-1 h-3 bg-futuristic-neon-blue rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}