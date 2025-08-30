import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { 
  PlayCircle,
  CheckCircle,
  Lock,
  ArrowRight,
  Star,
  Crown,
  Rocket,
  Gift,
  Clock,
  Users,
  Award,
  Target,
  BookOpen,
  Download,
  MessageCircle,
  Calendar,
  Zap,
  Heart,
  Trophy
} from 'lucide-react';
import { UserType } from '@/types/user';
import { Course } from './CourseRecommendation';
import { UpgradePrompt } from '@/components/shared/upgrade-prompt';

interface StartLearningProps {
  selectedCourse: Course;
  userType: UserType;
  onStartCourse: () => void;
  onBack: () => void;
}

const premiumFeatures = [
  {
    icon: BookOpen,
    title: 'Complete Course Access',
    description: 'Access all lessons, assignments, and bonus materials'
  },
  {
    icon: Download,
    title: 'Downloadable Resources',
    description: 'Templates, checklists, and tools to fast-track your success'
  },
  {
    icon: MessageCircle,
    title: 'Direct Mentor Support',
    description: 'Get answers directly from course instructors'
  },
  {
    icon: Users,
    title: 'Private Community',
    description: 'Connect with fellow students and share experiences'
  },
  {
    icon: Calendar,
    title: 'Live Q&A Sessions',
    description: 'Weekly live sessions with mentors and experts'
  },
  {
    icon: Award,
    title: 'Completion Certificate',
    description: 'Professional certificate upon course completion'
  }
];

const freeFeatures = [
  {
    icon: PlayCircle,
    title: 'Preview Lessons',
    description: 'Watch the first 3 lessons of every course'
  },
  {
    icon: BookOpen,
    title: 'Course Overview',
    description: 'Access to course curriculum and learning outcomes'
  },
  {
    icon: Users,
    title: 'Community Access',
    description: 'Join discussions in our public forums'
  }
];

const successStories = [
  {
    name: 'Maria S.',
    location: 'Bangkok, Thailand',
    income: '$8,500/month',
    timeframe: '4 months',
    story: 'Went from zero to $8.5k/month with Amazon FBA while living in Bangkok'
  },
  {
    name: 'James L.',
    location: 'Chiang Mai, Thailand', 
    income: '$12,000/month',
    timeframe: '6 months',
    story: 'Built a successful AI automation agency serving US clients remotely'
  },
  {
    name: 'Sarah K.',
    location: 'Phuket, Thailand',
    income: '$6,200/month',
    timeframe: '3 months',
    story: 'Transitioned from corporate job to freelance consulting in 3 months'
  }
];

export default function StartLearning({ selectedCourse, userType, onStartCourse, onBack }: StartLearningProps) {
  const [showUpgrade, setShowUpgrade] = useState(false);
  
  const canAccessFullCourse = userType === 'paid';
  const CourseIcon = selectedCourse.icon;

  const handleStartCourse = () => {
    if (canAccessFullCourse) {
      onStartCourse();
    } else {
      // Start with preview lessons
      onStartCourse();
    }
  };

  const handleUpgradeClick = () => {
    setShowUpgrade(true);
  };

  if (showUpgrade) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <UpgradePrompt
          title="Unlock Your Complete Learning Journey"
          description="Get full access to all courses, resources, and community support"
          features={[
            "All course lessons and materials",
            "Downloadable templates and tools", 
            "Direct mentor support",
            "Private student community",
            "Weekly live Q&A sessions",
            "Completion certificates"
          ]}
        />
        <div className="text-center mt-6">
          <Button variant="outline" onClick={() => setShowUpgrade(false)}>
            Continue with Free Preview
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${selectedCourse.gradient} flex items-center justify-center mx-auto mb-4`}>
          <CourseIcon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Ready to Start Learning?</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          You're about to begin your journey with <strong>{selectedCourse.title}</strong>. 
          Here's what you can expect based on your current plan.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Free Plan Card */}
        <Card className={`p-6 border-2 ${userType !== 'paid' ? 'border-primary bg-primary/5' : 'border-muted'}`}>
          <div className="flex items-center gap-3 mb-4">
            <Gift className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-bold">Free Preview</h2>
            {userType !== 'paid' && <Badge>Your Current Plan</Badge>}
          </div>
          
          <div className="space-y-4 mb-6">
            {freeFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{feature.title}</div>
                    <div className="text-sm text-muted-foreground">{feature.description}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {userType !== 'paid' ? (
            <Button size="lg" className="w-full" onClick={handleStartCourse}>
              <PlayCircle className="w-5 h-5 mr-2" />
              Start Free Preview
            </Button>
          ) : (
            <div className="text-center text-muted-foreground">
              You have access to the full course below
            </div>
          )}
        </Card>

        {/* Premium Plan Card */}
        <Card className={`p-6 border-2 relative overflow-hidden ${userType === 'paid' ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20' : 'border-muted'}`}>
          {userType === 'paid' && (
            <div className="absolute top-4 right-4">
              <Crown className="w-6 h-6 text-yellow-500" />
            </div>
          )}
          
          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold">Premium Access</h2>
            {userType === 'paid' && <Badge className="bg-yellow-500">Your Plan</Badge>}
          </div>
          
          <div className="space-y-4 mb-6">
            {premiumFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isAccessible = userType === 'paid';
              return (
                <div key={index} className={`flex items-start gap-3 ${!isAccessible ? 'opacity-60' : ''}`}>
                  {isAccessible ? (
                    <Icon className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Lock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <div className="font-medium">{feature.title}</div>
                    <div className="text-sm text-muted-foreground">{feature.description}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {userType === 'paid' ? (
            <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600" onClick={handleStartCourse}>
              <Rocket className="w-5 h-5 mr-2" />
              Start Full Course
            </Button>
          ) : (
            <Button size="lg" variant="outline" className="w-full" onClick={handleUpgradeClick}>
              <Crown className="w-5 h-5 mr-2" />
              Upgrade to Premium
            </Button>
          )}
        </Card>
      </div>

      {/* Success Stories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">Success Stories from Our Students</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {successStories.map((story, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-600 mb-1">{story.income}</div>
              <div className="text-sm text-muted-foreground mb-3">in {story.timeframe}</div>
              <div className="font-medium mb-2">{story.name}</div>
              <div className="text-sm text-muted-foreground mb-3">{story.location}</div>
              <p className="text-sm">{story.story}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Course Quick Stats */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold text-center mb-6">What You're Getting</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="font-bold text-lg">{selectedCourse.lessons}</div>
            <div className="text-sm text-muted-foreground">Lessons</div>
          </div>
          <div>
            <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="font-bold text-lg">{selectedCourse.duration}</div>
            <div className="text-sm text-muted-foreground">Duration</div>
          </div>
          <div>
            <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="font-bold text-lg">{selectedCourse.studentsCount.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Students</div>
          </div>
          <div>
            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="font-bold text-lg">{selectedCourse.rating}/5</div>
            <div className="text-sm text-muted-foreground">Rating</div>
          </div>
        </div>
      </Card>

      {/* Learning Path Preview */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-primary" />
          Your Learning Journey
        </h2>
        <div className="space-y-4">
          {selectedCourse.learningOutcomes.slice(0, 4).map((outcome, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="font-medium">{outcome}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </Card>

      {/* Call to Action */}
      <div className="text-center">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Ready to Transform Your Income?</h2>
          <p className="text-muted-foreground">
            Join thousands of students who have already started their journey to financial freedom in Thailand.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={handleStartCourse} className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            {canAccessFullCourse ? 'Start Full Course Now' : 'Start Free Preview'}
          </Button>
          <Button variant="outline" size="lg" onClick={onBack}>
            ← Go Back
          </Button>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          {canAccessFullCourse 
            ? 'You have full access to all course materials and features'
            : 'Start with free preview lessons, upgrade anytime for full access'
          }
        </div>
      </div>
    </div>
  );
}
