import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { ArrowRight, Star, Users, CheckCircle, Zap, Crown, Rocket } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 px-6 bg-gradient-futuristic-hero relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-futuristic-bg-primary opacity-90" />
        <div className="absolute inset-0 bg-gradient-futuristic-hero opacity-30" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-6 h-6 bg-futuristic-neon-blue rounded-full animate-pulse-glow" />
        <div className="absolute top-40 right-20 w-4 h-4 bg-futuristic-neon-purple rounded-full animate-float" />
        <div className="absolute bottom-20 left-1/3 w-5 h-5 bg-futuristic-neon-green rounded-full animate-pulse-glow" />
        <div className="absolute bottom-40 right-1/4 w-3 h-3 bg-futuristic-neon-pink rounded-full animate-float" />
      </div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current text-futuristic-neon-green animate-pulse" />
              ))}
            </div>
            <span className="text-futuristic-neon-green font-heading font-semibold text-lg">
              4.9/5 from 500+ students
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight text-futuristic-text-primary">
            READY TO START YOUR
            <span className="block bg-gradient-futuristic-hero bg-clip-text text-transparent animate-neon-pulse">
              THAILAND JOURNEY?
            </span>
          </h2>
          
          <p className="text-xl text-futuristic-text-secondary mb-12 max-w-3xl mx-auto font-body leading-relaxed">
            Join thousands who've successfully forged their path to Thailand using our proven system. 
            Start with our free lessons today.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card-futuristic group hover:scale-105 transition-all duration-500">
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-futuristic-neon-green mb-3">FREE PLAN</div>
              <div className="text-sm text-futuristic-text-tertiary mb-6 font-medium">Perfect to get started</div>
              
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-futuristic-neon-green" />
                  <span className="text-futuristic-text-secondary font-medium">4 foundation lessons</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-futuristic-neon-green" />
                  <span className="text-futuristic-text-secondary font-medium">Basic progress tracking</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-futuristic-neon-green" />
                  <span className="text-futuristic-text-secondary font-medium">Community access</span>
                </li>
              </ul>
              
              <Button 
                className="btn-futuristic w-full group-hover:scale-105 transition-transform duration-300"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Free
              </Button>
            </div>
          </div>
          
          <div className="card-futuristic group hover:scale-105 transition-all duration-500 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-futuristic-accent text-futuristic-bg-primary px-4 py-2 rounded-full text-xs font-display font-bold shadow-glow">
                MOST POPULAR
              </span>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-futuristic-neon-purple mb-3">PRO PLAN</div>
              <div className="text-sm text-futuristic-text-tertiary mb-6 font-medium">Complete Thailand mastery</div>
              
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-futuristic-neon-purple" />
                  <span className="text-futuristic-text-secondary font-medium">All 50+ lessons unlocked</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-futuristic-neon-purple" />
                  <span className="text-futuristic-text-secondary font-medium">Document templates</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-futuristic-neon-purple" />
                  <span className="text-futuristic-text-secondary font-medium">1-on-1 visa support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-futuristic-neon-purple" />
                  <span className="text-futuristic-text-secondary font-medium">Job board access</span>
                </li>
              </ul>
              
              <Button 
                className="btn-futuristic w-full group-hover:scale-105 transition-transform duration-300"
              >
                <Crown className="w-5 h-5 mr-2" />
                Upgrade to Pro
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            className="btn-futuristic text-lg px-10 py-4 animate-pulse-glow group"
          >
            <Rocket className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
            Begin Your Journey Now
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          
          <div className="flex items-center gap-3 text-sm text-futuristic-text-secondary">
            <Users className="w-5 h-5 text-futuristic-neon-cyan" />
            <span className="font-medium">1,247 people started this week</span>
          </div>
        </div>
      </div>
    </section>
  );
}