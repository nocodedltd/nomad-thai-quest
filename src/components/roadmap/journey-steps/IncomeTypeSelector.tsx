import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  TrendingUp, 
  Building, 
  Award,
  DollarSign,
  Clock,
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export interface IncomeType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<any>;
  gradient: string;
  incomeRange: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeToStart: string;
  features: string[];
  pros: string[];
  cons: string[];
}

const incomeTypes: IncomeType[] = [
  {
    id: 'freelancing',
    title: 'Quick Income',
    subtitle: 'Freelancing & Services',
    description: 'Leverage your existing skills to start earning immediately with freelance work and consulting.',
    icon: Users,
    gradient: 'from-green-500 to-green-600',
    incomeRange: '$2,000-8,000/month',
    difficulty: 'Easy',
    timeToStart: '1-2 weeks',
    features: ['Immediate income', 'Use existing skills', 'Flexible schedule', 'Global clients'],
    pros: ['Quick to start', 'Low barrier to entry', 'Flexible hours', 'Skills improvement'],
    cons: ['Time for money', 'Client dependency', 'Variable income', 'No passive income']
  },
  {
    id: 'business',
    title: 'Scalable Business',
    subtitle: 'Online Courses & Products',
    description: 'Build scalable income streams through online courses, digital products, and automated systems.',
    icon: TrendingUp,
    gradient: 'from-blue-500 to-blue-600',
    incomeRange: '$5,000-20,000/month',
    difficulty: 'Medium',
    timeToStart: '1-3 months',
    features: ['Scalable income', 'Passive revenue', 'Global reach', 'High margins'],
    pros: ['Passive income potential', 'Highly scalable', 'Location independent', 'High profit margins'],
    cons: ['Longer time to profit', 'Requires upfront work', 'Marketing needed', 'Competition']
  },
  {
    id: 'employment',
    title: 'Stable Employment',
    subtitle: 'Remote Jobs & Contracts',
    description: 'Secure location-independent employment with established companies offering remote work.',
    icon: Building,
    gradient: 'from-purple-500 to-purple-600',
    incomeRange: '$60,000-150,000/year',
    difficulty: 'Medium',
    timeToStart: '2-4 weeks',
    features: ['Stable income', 'Benefits package', 'Career growth', 'Team environment'],
    pros: ['Predictable income', 'Benefits included', 'Professional growth', 'Work-life balance'],
    cons: ['Fixed schedule', 'Limited flexibility', 'Salary ceiling', 'Company dependency']
  },
  {
    id: 'consulting',
    title: 'Expert Consulting',
    subtitle: 'High-Value Expertise',
    description: 'Monetize your deep expertise by providing high-value consulting services to premium clients.',
    icon: Award,
    gradient: 'from-orange-500 to-orange-600',
    incomeRange: '$10,000-50,000/month',
    difficulty: 'Hard',
    timeToStart: '1-2 months',
    features: ['Premium rates', 'Expert positioning', 'Strategic work', 'High impact'],
    pros: ['Highest income potential', 'Premium positioning', 'Strategic work', 'Professional respect'],
    cons: ['Requires expertise', 'Competitive market', 'Relationship dependent', 'Irregular income']
  }
];

interface IncomeTypeSelectorProps {
  selectedType?: string;
  onTypeSelect: (type: IncomeType) => void;
  onNext: () => void;
}

export default function IncomeTypeSelector({ selectedType, onTypeSelect, onNext }: IncomeTypeSelectorProps) {
  const [selectedIncomeType, setSelectedIncomeType] = useState<IncomeType | null>(
    selectedType ? incomeTypes.find(type => type.id === selectedType) || null : null
  );

  const handleTypeSelect = (type: IncomeType) => {
    setSelectedIncomeType(type);
    onTypeSelect(type);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Choose Your Income Path</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Select the income strategy that best matches your skills, timeline, and goals. 
          This will help us recommend the perfect course and roadmap for you.
        </p>
      </div>

      {/* Income Type Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {incomeTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedIncomeType?.id === type.id;
          
          return (
            <Card
              key={type.id}
              className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                isSelected 
                  ? 'ring-2 ring-primary shadow-lg scale-[1.02]' 
                  : 'hover:scale-[1.01]'
              }`}
              onClick={() => handleTypeSelect(type)}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${type.gradient} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold">{type.title}</h3>
                    {isSelected && <CheckCircle className="w-5 h-5 text-green-500" />}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">{type.subtitle}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-4">{type.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div className="text-center">
                  <DollarSign className="w-4 h-4 mx-auto mb-1 text-green-500" />
                  <div className="font-medium">{type.incomeRange}</div>
                  <div className="text-xs text-muted-foreground">Income Range</div>
                </div>
                <div className="text-center">
                  <div className={`w-4 h-4 rounded-full mx-auto mb-1 ${getDifficultyColor(type.difficulty)}`}></div>
                  <div className="font-medium">{type.difficulty}</div>
                  <div className="text-xs text-muted-foreground">Difficulty</div>
                </div>
                <div className="text-center">
                  <Clock className="w-4 h-4 mx-auto mb-1 text-blue-500" />
                  <div className="font-medium">{type.timeToStart}</div>
                  <div className="text-xs text-muted-foreground">Time to Start</div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-sm">Key Features</h4>
                <div className="grid grid-cols-2 gap-1">
                  {type.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-xs">
                      <Star className="w-3 h-3 mr-1 text-yellow-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pros & Cons - Only show for selected */}
              {isSelected && (
                <div className="border-t pt-4 mt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold mb-2 text-green-600">Pros</h5>
                      <ul className="space-y-1">
                        {type.pros.map((pro, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <CheckCircle className="w-3 h-3 mt-0.5 text-green-500 flex-shrink-0" />
                            <span className="text-xs">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2 text-orange-600">Considerations</h5>
                      <ul className="space-y-1">
                        {type.cons.map((con, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <div className="w-3 h-3 mt-0.5 rounded-full bg-orange-400 flex-shrink-0"></div>
                            <span className="text-xs">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Select Button */}
              <Button 
                className={`w-full mt-4 ${isSelected ? 'bg-primary' : 'bg-muted'}`}
                variant={isSelected ? 'default' : 'outline'}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTypeSelect(type);
                }}
              >
                {isSelected ? 'Selected' : 'Select This Path'}
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Next Button */}
      {selectedIncomeType && (
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={onNext}
            className="flex items-center gap-2"
          >
            Get My Personalized Recommendation
            <ArrowRight className="w-5 h-5" />
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            We'll recommend the perfect course based on your selection
          </p>
        </div>
      )}
    </div>
  );
}
