import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Sparkles,
  ChevronDown,
  Play
} from "lucide-react";

const CyberpunkHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#0e0e10' }}>
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div>
          {/* Main Headline */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight text-white">
              <span className="block">WELCOME TO THE</span>
              <span className="block text-cyan-400">NEON EDGE OF BANGKOK</span>
            </h1>
          </div>

          {/* Subheading */}
          <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Where <span className="text-cyan-400 font-semibold">digital dreams</span> meet 
            <span className="text-pink-400 font-semibold"> Thai reality</span>. 
            Forge your path in the city that never sleeps.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              className="text-lg px-10 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 text-white border-0 hover:from-cyan-600 hover:to-pink-600"
              onClick={() => navigate('/overview')}
            >
              <Zap className="w-6 h-6 mr-3" />
              ENTER THE FUTURE
              <Sparkles className="w-6 h-6 ml-3" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
              onClick={() => navigate('/courses')}
            >
              <Play className="w-6 h-6 mr-3" />
              EXPLORE COURSES
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">50+</div>
              <div className="text-sm text-gray-300 font-medium">Cyber Lessons</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">1000+</div>
              <div className="text-sm text-gray-300 font-medium">Digital Nomads</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-sm text-gray-300 font-medium">Neon Support</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">2077</div>
              <div className="text-sm text-gray-300 font-medium">Future Ready</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
          <ChevronDown className="w-4 h-4 text-cyan-400 mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default CyberpunkHero; 