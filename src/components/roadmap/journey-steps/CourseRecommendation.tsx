import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { 
  Package,
  Bot,
  GraduationCap,
  Users,
  Star,
  Clock,
  DollarSign,
  Award,
  ArrowRight,
  PlayCircle,
  BookOpen,
  Target,
  TrendingUp,
  CheckCircle,
  User
} from 'lucide-react';
import { UserType } from '@/types/user';

export interface Course {
  id: string;
  title: string;
  description: string;
  mentor: string;
  mentorBio: string;
  mentorAvatar?: string;
  category: string;
  difficulty: string;
  duration: string;
  lessons: number;
  estimatedIncome: string;
  timeToProfit: string;
  icon: React.ComponentType<any>;
  gradient: string;
  features: string[];
  learningOutcomes: string[];
  courseHighlights: string[];
  rating: number;
  studentsCount: number;
  successRate: string;
}

const courseDatabase: Record<string, Course[]> = {
  freelancing: [
    {
      id: 'freelance-mastery',
      title: 'Freelance Income Mastery',
      description: 'Master the art of freelancing with proven strategies to find high-paying clients and build a sustainable freelance business from Thailand.',
      mentor: 'Alex Thompson',
      mentorBio: 'Former corporate consultant, now earning $12k/month freelancing from Chiang Mai',
      category: 'Freelancing',
      difficulty: 'Beginner',
      duration: '3 weeks',
      lessons: 15,
      estimatedIncome: '$3,000-8,000/month',
      timeToProfit: '2-4 weeks',
      icon: Users,
      gradient: 'from-green-500 to-green-600',
      features: ['Client acquisition strategies', 'Pricing psychology', 'Portfolio optimization', 'Proposal templates'],
      learningOutcomes: [
        'Build a compelling freelance profile',
        'Price your services for maximum profit',
        'Find and pitch to high-value clients',
        'Create systems for recurring income'
      ],
      courseHighlights: [
        '50+ client outreach templates',
        'Pricing calculator toolkit',
        'Live client acquisition sessions',
        'Private freelancer community'
      ],
      rating: 4.8,
      studentsCount: 2340,
      successRate: '89% land first client within 30 days'
    }
  ],
  business: [
    {
      id: 'amazon-fba',
      title: 'Amazon FBA Mastery',
      description: 'Build a profitable Amazon business from Thailand with complete product research and scaling strategies.',
      mentor: 'Sarah Chen',
      mentorBio: '7-figure Amazon seller living in Bangkok',
      category: 'E-commerce',
      difficulty: 'Beginner',
      duration: '4 weeks',
      lessons: 12,
      estimatedIncome: '$2,000-10,000/month',
      timeToProfit: '3-6 months',
      icon: Package,
      gradient: 'from-orange-500 to-red-500',
      features: ['Product research', 'Supplier sourcing', 'Amazon optimization', 'Scaling strategies'],
      learningOutcomes: [
        'Find profitable products to sell',
        'Source products from Thai manufacturers',
        'Optimize Amazon listings for sales',
        'Scale to multiple product lines'
      ],
      courseHighlights: [
        'Product research tools access',
        'Supplier contact database',
        'Amazon listing templates',
        'Weekly group coaching calls'
      ],
      rating: 4.9,
      studentsCount: 1876,
      successRate: '76% profitable within 6 months'
    },
    {
      id: 'ai-automation',
      title: 'AI Automation Business',
      description: 'Create profitable AI automation services for businesses while living anywhere in the world.',
      mentor: 'Marcus Rodriguez',
      mentorBio: 'AI consultant earning $15k/month remotely',
      category: 'Technology',
      difficulty: 'Intermediate',
      duration: '6 weeks',
      lessons: 18,
      estimatedIncome: '$5,000-20,000/month',
      timeToProfit: '2-4 months',
      icon: Bot,
      gradient: 'from-purple-500 to-pink-500',
      features: ['AI tool mastery', 'Service packaging', 'Client acquisition', 'Automation workflows'],
      learningOutcomes: [
        'Master cutting-edge AI tools',
        'Package AI services for businesses',
        'Build automated client workflows',
        'Scale your AI consulting business'
      ],
      courseHighlights: [
        'AI tools subscription included',
        'Service package templates',
        'Client onboarding system',
        'Advanced automation blueprints'
      ],
      rating: 4.7,
      studentsCount: 892,
      successRate: '82% land first client within 60 days'
    }
  ],
  employment: [
    {
      id: 'remote-job-mastery',
      title: 'Remote Job Landing System',
      description: 'Land high-paying remote jobs with Thailand-friendly companies using proven application and interview strategies.',
      mentor: 'Jennifer Park',
      mentorBio: 'Recruitment specialist who helped 500+ land remote jobs',
      category: 'Career',
      difficulty: 'Beginner',
      duration: '2 weeks',
      lessons: 10,
      estimatedIncome: '$60,000-120,000/year',
      timeToProfit: '1-3 months',
      icon: Building,
      gradient: 'from-purple-500 to-purple-600',
      features: ['Resume optimization', 'Interview mastery', 'Job search strategy', 'Salary negotiation'],
      learningOutcomes: [
        'Create a remote-work optimized resume',
        'Master virtual interview techniques',
        'Negotiate Thailand-friendly arrangements',
        'Build a sustainable remote career'
      ],
      courseHighlights: [
        'ATS-optimized resume templates',
        'Interview question database',
        'Salary negotiation scripts',
        'Job board access premium'
      ],
      rating: 4.6,
      studentsCount: 3120,
      successRate: '71% land remote job within 90 days'
    }
  ],
  consulting: [
    {
      id: 'remote-consulting',
      title: 'Remote Consulting Empire',
      description: 'Leverage your expertise to build a high-value consulting business from Thailand.',
      mentor: 'David Kim',
      mentorBio: 'Former McKinsey consultant, now independent',
      category: 'Consulting',
      difficulty: 'Advanced',
      duration: '8 weeks',
      lessons: 24,
      estimatedIncome: '$10,000-50,000/month',
      timeToProfit: '1-3 months',
      icon: GraduationCap,
      gradient: 'from-blue-500 to-cyan-500',
      features: ['Expertise positioning', 'Premium pricing', 'Client acquisition', 'Service delivery'],
      learningOutcomes: [
        'Position yourself as the go-to expert',
        'Price consulting services at premium rates',
        'Build a pipeline of high-value clients',
        'Deliver exceptional consulting results'
      ],
      courseHighlights: [
        'Consulting toolkit library',
        'Proposal templates collection',
        'Client management system',
        'Expert positioning framework'
      ],
      rating: 4.9,
      studentsCount: 567,
      successRate: '94% increase rates within 90 days'
    }
  ]
};

interface CourseRecommendationProps {
  selectedIncomeType: string;
  userType: UserType;
  onCourseSelect: (course: Course) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function CourseRecommendation({ 
  selectedIncomeType, 
  userType, 
  onCourseSelect, 
  onNext, 
  onBack 
}: CourseRecommendationProps) {
  const recommendedCourses = courseDatabase[selectedIncomeType] || [];
  const primaryCourse = recommendedCourses[0];
  const alternativeCourses = recommendedCourses.slice(1);

  if (!primaryCourse) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">No recommendations found</h2>
        <p className="text-muted-foreground mb-4">We don't have course recommendations for this income type yet.</p>
        <Button onClick={onBack}>Go Back</Button>
      </div>
    );
  }

  const handleCourseSelect = (course: Course) => {
    onCourseSelect(course);
    onNext();
  };

  const PrimaryCourseIcon = primaryCourse.icon;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Perfect Course for You</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Based on your income path selection, here's our top recommendation to help you succeed.
        </p>
      </div>

      {/* Primary Recommendation */}
      <Card className="p-8 mb-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
        <div className="flex items-start gap-6 mb-6">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${primaryCourse.gradient} flex items-center justify-center flex-shrink-0`}>
            <PrimaryCourseIcon className="w-8 h-8 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge className="bg-primary text-primary-foreground">RECOMMENDED</Badge>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(primaryCourse.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-sm font-medium ml-1">{primaryCourse.rating}</span>
                <span className="text-sm text-muted-foreground">({primaryCourse.studentsCount} students)</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-2">{primaryCourse.title}</h2>
            <p className="text-muted-foreground mb-4">{primaryCourse.description}</p>
            
            {/* Mentor Info */}
            <div className="flex items-center gap-3 mb-4 p-3 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold">{primaryCourse.mentor}</p>
                <p className="text-sm text-muted-foreground">{primaryCourse.mentorBio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-background rounded-lg">
            <DollarSign className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <div className="font-bold">{primaryCourse.estimatedIncome}</div>
            <div className="text-xs text-muted-foreground">Income Potential</div>
          </div>
          <div className="text-center p-3 bg-background rounded-lg">
            <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <div className="font-bold">{primaryCourse.timeToProfit}</div>
            <div className="text-xs text-muted-foreground">Time to Profit</div>
          </div>
          <div className="text-center p-3 bg-background rounded-lg">
            <BookOpen className="w-6 h-6 mx-auto mb-2 text-purple-500" />
            <div className="font-bold">{primaryCourse.lessons} lessons</div>
            <div className="text-xs text-muted-foreground">{primaryCourse.duration}</div>
          </div>
          <div className="text-center p-3 bg-background rounded-lg">
            <Target className="w-6 h-6 mx-auto mb-2 text-orange-500" />
            <div className="font-bold">{primaryCourse.successRate}</div>
            <div className="text-xs text-muted-foreground">Success Rate</div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              What You'll Learn
            </h3>
            <ul className="space-y-2">
              {primaryCourse.learningOutcomes.map((outcome, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Course Highlights
            </h3>
            <ul className="space-y-2">
              {primaryCourse.courseHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            size="lg" 
            className="flex-1 flex items-center gap-2"
            onClick={() => handleCourseSelect(primaryCourse)}
          >
            <PlayCircle className="w-5 h-5" />
            Preview This Course
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={onBack}
          >
            Change Income Path
          </Button>
        </div>
      </Card>

      {/* Alternative Courses */}
      {alternativeCourses.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Other Options</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {alternativeCourses.map((course) => {
              const CourseIcon = course.icon;
              return (
                <Card key={course.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${course.gradient} flex items-center justify-center flex-shrink-0`}>
                      <CourseIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <span>{course.estimatedIncome}</span>
                        <span className="text-muted-foreground">•</span>
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span>{course.timeToProfit}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleCourseSelect(course)}
                  >
                    Preview Course
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
