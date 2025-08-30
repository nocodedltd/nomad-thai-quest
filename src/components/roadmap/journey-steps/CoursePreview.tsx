import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { 
  Play,
  Clock,
  BookOpen,
  Users,
  Star,
  CheckCircle,
  Lock,
  ArrowRight,
  Download,
  FileText,
  Video,
  Award,
  User,
  DollarSign,
  Target,
  ChevronRight,
  PlayCircle
} from 'lucide-react';
import { UserType } from '@/types/user';
import { Course } from './CourseRecommendation';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'text' | 'interactive' | 'assignment';
  isPreview: boolean;
  isCompleted?: boolean;
}

const sampleLessons: Record<string, Lesson[]> = {
  'amazon-fba': [
    {
      id: 'intro',
      title: 'Welcome to Amazon FBA Success',
      description: 'Get an overview of what you\'ll learn and how to succeed in this course.',
      duration: '8 min',
      type: 'video',
      isPreview: true
    },
    {
      id: 'thailand-advantages',
      title: 'Why Thailand is Perfect for Amazon FBA',
      description: 'Discover the unique advantages of running an Amazon business from Thailand.',
      duration: '12 min',
      type: 'video',
      isPreview: true
    },
    {
      id: 'product-research-basics',
      title: 'Product Research Fundamentals',
      description: 'Learn the basics of finding profitable products to sell on Amazon.',
      duration: '15 min',
      type: 'video',
      isPreview: true
    },
    {
      id: 'advanced-research',
      title: 'Advanced Product Research Techniques',
      description: 'Deep dive into professional research methods and tools.',
      duration: '25 min',
      type: 'video',
      isPreview: false
    },
    {
      id: 'supplier-sourcing',
      title: 'Finding and Vetting Suppliers',
      description: 'Master the art of supplier relationship and negotiation.',
      duration: '20 min',
      type: 'video',
      isPreview: false
    }
  ],
  'ai-automation': [
    {
      id: 'ai-intro',
      title: 'AI Automation Opportunity Overview',
      description: 'Understand the massive opportunity in AI automation services.',
      duration: '10 min',
      type: 'video',
      isPreview: true
    },
    {
      id: 'tools-overview',
      title: 'Essential AI Tools Tour',
      description: 'Get hands-on with the top AI tools you\'ll be using.',
      duration: '18 min',
      type: 'interactive',
      isPreview: true
    },
    {
      id: 'first-automation',
      title: 'Build Your First Automation',
      description: 'Create a simple but powerful automation workflow.',
      duration: '22 min',
      type: 'interactive',
      isPreview: true
    }
  ],
  'freelance-mastery': [
    {
      id: 'freelance-intro',
      title: 'The Freelance Success Blueprint',
      description: 'Learn the proven framework for freelance success.',
      duration: '12 min',
      type: 'video',
      isPreview: true
    },
    {
      id: 'profile-optimization',
      title: 'Profile Optimization Masterclass',
      description: 'Create a profile that attracts high-paying clients.',
      duration: '16 min',
      type: 'video',
      isPreview: true
    }
  ]
};

interface CoursePreviewProps {
  selectedCourse: Course;
  userType: UserType;
  onStartLearning: () => void;
  onBack: () => void;
}

export default function CoursePreview({ selectedCourse, userType, onStartLearning, onBack }: CoursePreviewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'instructor'>('overview');
  const [watchedLessons, setWatchedLessons] = useState<Set<string>>(new Set());
  
  const lessons = sampleLessons[selectedCourse.id] || [];
  const previewLessons = lessons.filter(lesson => lesson.isPreview);
  const lockedLessons = lessons.filter(lesson => !lesson.isPreview);
  
  const canAccessFullCourse = userType === 'paid';
  const canAccessPreview = userType !== 'guest';

  const handleLessonWatch = (lessonId: string) => {
    setWatchedLessons(prev => new Set([...prev, lessonId]));
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'interactive': return Target;
      case 'assignment': return FileText;
      default: return BookOpen;
    }
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Course Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <DollarSign className="w-6 h-6 mx-auto mb-2 text-green-500" />
                <div className="font-bold">{selectedCourse.estimatedIncome}</div>
                <div className="text-xs text-muted-foreground">Income Potential</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <div className="font-bold">{selectedCourse.timeToProfit}</div>
                <div className="text-xs text-muted-foreground">Time to Profit</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <BookOpen className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                <div className="font-bold">{selectedCourse.lessons}</div>
                <div className="text-xs text-muted-foreground">Lessons</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Users className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                <div className="font-bold">{selectedCourse.studentsCount}</div>
                <div className="text-xs text-muted-foreground">Students</div>
              </div>
            </div>

            {/* What You'll Learn */}
            <div>
              <h3 className="font-semibold text-lg mb-4">What You'll Learn</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {selectedCourse.learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Highlights */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Course Highlights</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {selectedCourse.courseHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Rate */}
            <Card className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-green-600" />
                <div>
                  <div className="font-bold text-green-700 dark:text-green-300">{selectedCourse.successRate}</div>
                  <div className="text-sm text-green-600 dark:text-green-400">Student Success Rate</div>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'curriculum':
        return (
          <div className="space-y-4">
            {/* Preview Lessons */}
            {previewLessons.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-green-500" />
                  Free Preview Lessons
                </h3>
                <div className="space-y-3">
                  {previewLessons.map((lesson, index) => {
                    const LessonIcon = getLessonIcon(lesson.type);
                    const isWatched = watchedLessons.has(lesson.id);
                    
                    return (
                      <Card 
                        key={lesson.id} 
                        className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                          isWatched ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : ''
                        }`}
                        onClick={() => canAccessPreview && handleLessonWatch(lesson.id)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isWatched ? 'bg-green-500' : 'bg-primary'
                            }`}>
                              {isWatched ? (
                                <CheckCircle className="w-4 h-4 text-white" />
                              ) : (
                                <span className="text-white text-sm font-bold">{index + 1}</span>
                              )}
                            </div>
                            <LessonIcon className="w-5 h-5 text-muted-foreground" />
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-medium">{lesson.title}</h4>
                            <p className="text-sm text-muted-foreground">{lesson.description}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{lesson.duration}</span>
                            {canAccessPreview && !isWatched && (
                              <Play className="w-4 h-4 text-primary" />
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Locked Lessons */}
            {lockedLessons.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-orange-500" />
                  Full Course Content
                </h3>
                <div className="space-y-3">
                  {lockedLessons.map((lesson, index) => {
                    const LessonIcon = getLessonIcon(lesson.type);
                    
                    return (
                      <Card key={lesson.id} className={`p-4 ${!canAccessFullCourse ? 'opacity-60' : ''}`}>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              canAccessFullCourse ? 'bg-primary' : 'bg-gray-400'
                            }`}>
                              {canAccessFullCourse ? (
                                <span className="text-white text-sm font-bold">{previewLessons.length + index + 1}</span>
                              ) : (
                                <Lock className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <LessonIcon className="w-5 h-5 text-muted-foreground" />
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-medium">{lesson.title}</h4>
                            <p className="text-sm text-muted-foreground">{lesson.description}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{lesson.duration}</span>
                            {!canAccessFullCourse && (
                              <Lock className="w-4 h-4 text-orange-500" />
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
                
                {!canAccessFullCourse && (
                  <Card className="p-4 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 mt-4">
                    <div className="text-center">
                      <Lock className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                      <h4 className="font-semibold mb-2">Unlock Full Course</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Get access to all {lockedLessons.length} remaining lessons plus exclusive bonuses
                      </p>
                      <Button size="sm">Upgrade to Premium</Button>
                    </div>
                  </Card>
                )}
              </div>
            )}
          </div>
        );

      case 'instructor':
        return (
          <div className="space-y-6">
            {/* Instructor Profile */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{selectedCourse.mentor}</h3>
                  <p className="text-muted-foreground mb-4">{selectedCourse.mentorBio}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-semibold">Teaching Experience</div>
                      <div className="text-muted-foreground">5+ years</div>
                    </div>
                    <div>
                      <div className="font-semibold">Students Taught</div>
                      <div className="text-muted-foreground">{selectedCourse.studentsCount}+</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Teaching Approach */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Teaching Approach</h3>
              <div className="space-y-3 text-sm">
                <p>My teaching philosophy is based on practical, real-world application. Every lesson is designed to give you immediately actionable insights that you can implement the same day.</p>
                <p>I believe in learning by doing, which is why this course includes hands-on projects, real case studies from my own business, and direct access to the tools and templates I use daily.</p>
                <p>You'll also get ongoing support through our private community where I personally answer questions and provide feedback on your progress.</p>
              </div>
            </div>

            {/* Student Reviews Preview */}
            <div>
              <h3 className="font-semibold text-lg mb-4">What Students Say</h3>
              <div className="space-y-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">Sarah M.</span>
                  </div>
                  <p className="text-sm">"This course literally changed my life. I went from struggling freelancer to 6-figure income in 8 months following {selectedCourse.mentor}'s system."</p>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">Mike R.</span>
                  </div>
                  <p className="text-sm">"The practical approach and real examples made all the difference. I implemented the strategies immediately and saw results within weeks."</p>
                </Card>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const CourseIcon = selectedCourse.icon;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${selectedCourse.gradient} flex items-center justify-center`}>
            <CourseIcon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{selectedCourse.title}</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(selectedCourse.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="ml-1 font-medium">{selectedCourse.rating}</span>
              </div>
              <Badge variant="secondary">{selectedCourse.difficulty}</Badge>
              <Badge variant="outline">{selectedCourse.duration}</Badge>
            </div>
          </div>
        </div>
        
        <p className="text-lg text-muted-foreground">{selectedCourse.description}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex border-b mb-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'curriculum', label: 'Curriculum' },
              { id: 'instructor', label: 'Instructor' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {getTabContent()}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Progress */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Your Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Preview Lessons</span>
                  <span>{watchedLessons.size}/{previewLessons.length}</span>
                </div>
                <ProgressBar 
                  progress={previewLessons.length > 0 ? (watchedLessons.size / previewLessons.length) * 100 : 0}
                  size="sm"
                />
              </div>
              
              {canAccessPreview && watchedLessons.size > 0 && (
                <div className="text-sm text-green-600 dark:text-green-400">
                  Great start! You've watched {watchedLessons.size} preview lesson{watchedLessons.size !== 1 ? 's' : ''}.
                </div>
              )}
            </div>
          </Card>

          {/* Action Card */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Ready to Start?</h3>
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full"
                onClick={onStartLearning}
              >
                {canAccessFullCourse ? 'Start Full Course' : 'Start Free Preview'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              {!canAccessFullCourse && (
                <Button variant="outline" size="lg" className="w-full">
                  Upgrade for Full Access
                </Button>
              )}
              
              <div className="text-xs text-muted-foreground text-center">
                {canAccessFullCourse 
                  ? 'Full course access included with your subscription'
                  : 'Preview lessons available with free account'
                }
              </div>
            </div>
          </Card>

          {/* Course Stats */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Course Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Total Lessons</span>
                <span className="font-medium">{selectedCourse.lessons}</span>
              </div>
              <div className="flex justify-between">
                <span>Course Duration</span>
                <span className="font-medium">{selectedCourse.duration}</span>
              </div>
              <div className="flex justify-between">
                <span>Students Enrolled</span>
                <span className="font-medium">{selectedCourse.studentsCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Success Rate</span>
                <span className="font-medium text-green-600">{selectedCourse.successRate}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
