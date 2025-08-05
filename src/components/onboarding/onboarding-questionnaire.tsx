import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  DollarSign, 
  BookOpen, 
  Users, 
  Globe, 
  Home, 
  GraduationCap,
  TrendingUp,
  Bot,
  ShoppingCart,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Clock,
  MapPin
} from 'lucide-react';

interface OnboardingData {
  goals: string[];
  mainRoadblock: string;
  budget: number;
  timeline: string;
  experience: string;
}

interface Recommendation {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  type: 'online' | 'local' | 'business';
  difficulty: string;
  estimatedIncome: string;
  timeToStart: string;
  route: string;
  features: string[];
}

export default function OnboardingQuestionnaire() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    goals: [],
    mainRoadblock: '',
    budget: 0,
    timeline: '',
    experience: ''
  });
  const [showRecommendations, setShowRecommendations] = useState(false);

  const totalSteps = 5;

  const goals = [
    { id: 'digital-nomad', label: 'Become a Digital Nomad', icon: Globe },
    { id: 'online-business', label: 'Start an Online Business', icon: TrendingUp },
    { id: 'teaching', label: 'Teach English Abroad', icon: GraduationCap },
    { id: 'travel', label: 'Travel and Experience Thailand', icon: MapPin },
    { id: 'financial-freedom', label: 'Achieve Financial Freedom', icon: DollarSign },
    { id: 'community', label: 'Join a Community of Expats', icon: Users }
  ];

  const roadblocks = [
    { id: 'budget', label: 'Limited Budget', icon: DollarSign },
    { id: 'skills', label: 'Lack of Skills/Experience', icon: BookOpen },
    { id: 'visa', label: 'Visa Requirements', icon: Globe },
    { id: 'accommodation', label: 'Finding Accommodation', icon: Home },
    { id: 'income', label: 'Generating Income', icon: TrendingUp },
    { id: 'language', label: 'Language Barrier', icon: MessageSquare }
  ];

  const budgetRanges = [
    { id: 'under-500', label: 'Under $500', value: 500 },
    { id: '500-1000', label: '$500 - $1,000', value: 1000 },
    { id: '1000-2000', label: '$1,000 - $2,000', value: 2000 },
    { id: '2000-5000', label: '$2,000 - $5,000', value: 5000 },
    { id: 'over-5000', label: 'Over $5,000', value: 10000 }
  ];

  const timelines = [
    { id: 'immediate', label: 'Immediately (1-2 months)', icon: Clock },
    { id: 'soon', label: 'Soon (3-6 months)', icon: Clock },
    { id: 'planning', label: 'Planning Phase (6-12 months)', icon: Clock },
    { id: 'future', label: 'Future Goal (1+ years)', icon: Clock }
  ];

  const experienceLevels = [
    { id: 'beginner', label: 'Complete Beginner', icon: BookOpen },
    { id: 'some-experience', label: 'Some Experience', icon: Lightbulb },
    { id: 'experienced', label: 'Experienced', icon: CheckCircle },
    { id: 'expert', label: 'Expert Level', icon: TrendingUp }
  ];

  const handleGoalToggle = (goalId: string) => {
    setOnboardingData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowRecommendations(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getRecommendations = (): Recommendation[] => {
    const { budget, goals, mainRoadblock } = onboardingData;
    
    const recommendations: Recommendation[] = [];

    // Low budget recommendations
    if (budget <= 1000) {
      recommendations.push({
        title: 'Affiliate Marketing Program',
        description: 'Start earning online by promoting our courses and programs. Perfect for those with limited budget.',
        icon: TrendingUp,
        type: 'online',
        difficulty: 'Beginner',
        estimatedIncome: '$500-2000/month',
        timeToStart: '1-2 weeks',
        route: '/income',
        features: ['No upfront costs', 'Learn marketing skills', 'Flexible schedule', 'Work from anywhere']
      });

      recommendations.push({
        title: 'English Teaching Jobs',
        description: 'Teach English in Thailand with minimal requirements. Great for immediate local income.',
        icon: GraduationCap,
        type: 'local',
        difficulty: 'Beginner',
        estimatedIncome: '$800-1500/month',
        timeToStart: '2-4 weeks',
        route: '/income',
        features: ['No degree required', 'Immediate income', 'Cultural experience', 'Visa support']
      });
    }

    // Higher budget recommendations
    if (budget > 1000) {
      recommendations.push({
        title: 'AI Automation Business Course',
        description: 'Build profitable AI automation businesses. Leverage your budget for high-income potential.',
        icon: Bot,
        type: 'business',
        difficulty: 'Intermediate',
        estimatedIncome: '$2000-10000/month',
        timeToStart: '4-8 weeks',
        route: '/course/ai-automation',
        features: ['High income potential', 'Scalable business model', 'Future-proof skills', 'Global client base']
      });

      recommendations.push({
        title: 'Amazon FBA Business Course',
        description: 'Start an e-commerce business with inventory. Use your budget for product development.',
        icon: ShoppingCart,
        type: 'business',
        difficulty: 'Intermediate',
        estimatedIncome: '$3000-15000/month',
        timeToStart: '6-12 weeks',
        route: '/course/amazon-fba',
        features: ['Proven business model', 'Passive income potential', 'Product development', 'Global marketplace']
      });
    }

    // Always include community and visa guidance
    recommendations.push({
      title: 'Community & Visa Support',
      description: 'Join our community and get visa guidance for your Thailand journey.',
      icon: Users,
      type: 'online',
      difficulty: 'Beginner',
      estimatedIncome: 'Support network',
      timeToStart: 'Immediate',
      route: '/community',
      features: ['Discord community', 'Visa guidance', 'Accommodation help', 'Local connections']
    });

    return recommendations;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-futuristic-text-primary mb-4">
                What are your main goals?
              </h2>
              <p className="text-futuristic-text-secondary">
                Select all that apply to help us personalize your journey
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((goal) => {
                const Icon = goal.icon;
                const isSelected = onboardingData.goals.includes(goal.id);
                return (
                  <Card
                    key={goal.id}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                      isSelected
                        ? 'border-futuristic-neon-blue bg-futuristic-neon-blue/10'
                        : 'border-futuristic-border hover:border-futuristic-neon-blue/50'
                    }`}
                    onClick={() => handleGoalToggle(goal.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          isSelected ? 'bg-futuristic-neon-blue text-futuristic-bg-primary' : 'bg-futuristic-bg-secondary'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-futuristic-text-primary">
                            {goal.label}
                          </h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-futuristic-text-primary mb-4">
                What's your biggest roadblock?
              </h2>
              <p className="text-futuristic-text-secondary">
                This helps us provide targeted solutions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roadblocks.map((roadblock) => {
                const Icon = roadblock.icon;
                const isSelected = onboardingData.mainRoadblock === roadblock.id;
                return (
                  <Card
                    key={roadblock.id}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                      isSelected
                        ? 'border-futuristic-neon-green bg-futuristic-neon-green/10'
                        : 'border-futuristic-border hover:border-futuristic-neon-green/50'
                    }`}
                    onClick={() => setOnboardingData(prev => ({ ...prev, mainRoadblock: roadblock.id }))}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          isSelected ? 'bg-futuristic-neon-green text-futuristic-bg-primary' : 'bg-futuristic-bg-secondary'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-futuristic-text-primary">
                            {roadblock.label}
                          </h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-futuristic-text-primary mb-4">
                What's your current budget?
              </h2>
              <p className="text-futuristic-text-secondary">
                This helps us recommend the best income solutions for your situation
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {budgetRanges.map((budget) => {
                const isSelected = onboardingData.budget === budget.value;
                return (
                  <Card
                    key={budget.id}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                      isSelected
                        ? 'border-futuristic-neon-purple bg-futuristic-neon-purple/10'
                        : 'border-futuristic-border hover:border-futuristic-neon-purple/50'
                    }`}
                    onClick={() => setOnboardingData(prev => ({ ...prev, budget: budget.value }))}
                  >
                    <CardContent className="p-6">
                      <div className="text-center">
                        <DollarSign className="w-8 h-8 mx-auto mb-3 text-futuristic-neon-purple" />
                        <h3 className="font-semibold text-futuristic-text-primary text-lg">
                          {budget.label}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-futuristic-text-primary mb-4">
                When do you want to start?
              </h2>
              <p className="text-futuristic-text-secondary">
                This helps us prioritize your action plan
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {timelines.map((timeline) => {
                const Icon = timeline.icon;
                const isSelected = onboardingData.timeline === timeline.id;
                return (
                  <Card
                    key={timeline.id}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                      isSelected
                        ? 'border-futuristic-neon-orange bg-futuristic-neon-orange/10'
                        : 'border-futuristic-border hover:border-futuristic-neon-orange/50'
                    }`}
                    onClick={() => setOnboardingData(prev => ({ ...prev, timeline: timeline.id }))}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          isSelected ? 'bg-futuristic-neon-orange text-futuristic-bg-primary' : 'bg-futuristic-bg-secondary'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-futuristic-text-primary">
                            {timeline.label}
                          </h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-futuristic-text-primary mb-4">
                What's your experience level?
              </h2>
              <p className="text-futuristic-text-secondary">
                This helps us recommend the right starting point
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experienceLevels.map((experience) => {
                const Icon = experience.icon;
                const isSelected = onboardingData.experience === experience.id;
                return (
                  <Card
                    key={experience.id}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                      isSelected
                        ? 'border-futuristic-neon-cyan bg-futuristic-neon-cyan/10'
                        : 'border-futuristic-border hover:border-futuristic-neon-cyan/50'
                    }`}
                    onClick={() => setOnboardingData(prev => ({ ...prev, experience: experience.id }))}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          isSelected ? 'bg-futuristic-neon-cyan text-futuristic-bg-primary' : 'bg-futuristic-bg-secondary'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-futuristic-text-primary">
                            {experience.label}
                          </h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderRecommendations = () => {
    const recommendations = getRecommendations();

    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-futuristic-text-primary mb-4">
            Your Personalized Recommendations
          </h2>
          <p className="text-futuristic-text-secondary">
            Based on your budget of ${onboardingData.budget.toLocaleString()}, here are the best options for you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recommendations.map((rec, index) => {
            const Icon = rec.icon;
            return (
              <Card key={index} className="card-futuristic hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-futuristic-neon-blue to-futuristic-neon-purple text-futuristic-bg-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-futuristic-text-primary">
                        {rec.title}
                      </CardTitle>
                      <Badge variant="secondary" className="mt-2">
                        {rec.type === 'online' ? 'Online Income' : rec.type === 'local' ? 'Local Income' : 'Business'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-futuristic-text-secondary mb-4">
                    {rec.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-futuristic-bg-secondary rounded-lg">
                      <div className="text-sm text-futuristic-text-tertiary">Difficulty</div>
                      <div className="font-semibold text-futuristic-text-primary">{rec.difficulty}</div>
                    </div>
                    <div className="text-center p-3 bg-futuristic-bg-secondary rounded-lg">
                      <div className="text-sm text-futuristic-text-tertiary">Income Potential</div>
                      <div className="font-semibold text-futuristic-text-primary">{rec.estimatedIncome}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-futuristic-text-primary mb-2">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {rec.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-futuristic-text-secondary">
                          <CheckCircle className="w-4 h-4 text-futuristic-neon-green" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-futuristic-neon-blue to-futuristic-neon-purple hover:from-futuristic-neon-purple hover:to-futuristic-neon-blue"
                    onClick={() => navigate(rec.route)}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/overview')}
            className="mr-4"
          >
            Explore All Options
          </Button>
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-futuristic-neon-green to-futuristic-neon-cyan"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  };

  if (showRecommendations) {
    return (
      <div className="min-h-screen bg-futuristic-bg-primary p-4">
        <div className="max-w-6xl mx-auto">
          {renderRecommendations()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-futuristic-bg-primary p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-futuristic-text-tertiary">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-futuristic-text-primary">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="card-futuristic">
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="border-futuristic-border text-futuristic-text-primary hover:border-futuristic-neon-blue"
          >
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && onboardingData.goals.length === 0) ||
              (currentStep === 2 && !onboardingData.mainRoadblock) ||
              (currentStep === 3 && onboardingData.budget === 0) ||
              (currentStep === 4 && !onboardingData.timeline) ||
              (currentStep === 5 && !onboardingData.experience)
            }
            className="bg-gradient-to-r from-futuristic-neon-blue to-futuristic-neon-purple hover:from-futuristic-neon-purple hover:to-futuristic-neon-blue"
          >
            {currentStep === totalSteps ? 'Get Recommendations' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
} 