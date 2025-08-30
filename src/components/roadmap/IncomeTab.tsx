import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  DollarSign, 
  Package,
  Bot,
  GraduationCap,
  Play,
  TrendingUp,
  Users,
  Award,
  Building,
  Search,
  MapPin,
  Clock,
  ArrowRight,
  Lock
} from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { UserContent } from "@/components/shared/user-content";
import { Paywall } from "@/components/shared/paywall";
import { UpgradePrompt } from "@/components/shared/upgrade-prompt";
import CourseViewer from "@/components/lesson/course-viewer";
import { amazonFBACourse, aiAutomationCourse, consultingCourse } from "@/data/courses/amazon-fba-course";
import { CompactCourseCard } from "@/components/roadmap/CompactCourseCard";

const courses = [
  {
    id: "amazon-fba",
    title: "Amazon FBA Mastery",
    description: "Build a profitable Amazon business from Thailand with complete product research and scaling strategies.",
    mentor: "Sarah Chen",
    mentorBio: "7-figure Amazon seller living in Bangkok",
    category: "E-commerce",
    difficulty: "Beginner",
    duration: "4 weeks",
    lessons: 12,
    completedLessons: 3,
    xpReward: 450,
    icon: Package,
    gradient: "from-orange-500 to-red-500",
    preview: ["Product Research Basics", "Supplier Introduction", "Amazon Account Setup"],
    fullContent: [
      "Advanced Product Research", "Supplier Negotiation", "Listing Optimization", 
      "PPC Advertising", "Inventory Management", "Scaling Strategies",
      "Legal Considerations", "Tax Planning", "Exit Strategies"
    ],
    estimatedIncome: "$2,000-10,000/month",
    timeToProfit: "3-6 months",
    access: "preview" as const
  },
  {
    id: "ai-automation",
    title: "AI Automation Business",
    description: "Create profitable AI automation services for businesses while living anywhere in the world.",
    mentor: "Marcus Rodriguez",
    mentorBio: "AI consultant earning $15k/month remotely",
    category: "Technology", 
    difficulty: "Intermediate",
    duration: "6 weeks",
    lessons: 18,
    completedLessons: 0,
    xpReward: 650,
    icon: Bot,
    gradient: "from-purple-500 to-pink-500",
    preview: ["AI Tools Overview", "Market Research", "Service Packaging"],
    fullContent: [
      "Advanced AI Implementation", "Client Acquisition", "Pricing Strategies",
      "Service Delivery", "Team Building", "Scaling Operations",
      "Tool Development", "Partnership Creation", "Advanced Analytics"
    ],
    estimatedIncome: "$5,000-20,000/month", 
    timeToProfit: "2-4 months",
    access: "locked" as const
  },
  {
    id: "remote-consulting",
    title: "Remote Consulting Empire",
    description: "Leverage your expertise to build a high-value consulting business from Thailand.",
    mentor: "David Kim", 
    mentorBio: "Former McKinsey consultant, now independent",
    category: "Consulting",
    difficulty: "Advanced",
    duration: "8 weeks", 
    lessons: 24,
    completedLessons: 0,
    xpReward: 800,
    icon: GraduationCap,
    gradient: "from-blue-500 to-cyan-500",
    preview: ["Expertise Assessment", "Market Positioning", "Service Development"],
    fullContent: [
      "Premium Pricing Models", "Corporate Sales", "Proposal Writing",
      "Delivery Excellence", "Client Retention", "Referral Systems",
      "Team Building", "Knowledge Products", "Exit Planning"
    ],
    estimatedIncome: "$10,000-50,000/month",
    timeToProfit: "1-3 months", 
    access: "locked" as const
  }
];

const jobListings = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp Remote",
    location: "Remote (Thailand-friendly)",
    salary: "$80,000-120,000/year",
    type: "full-time" as const,
    posted: "2 days ago",
    applications: 23,
    tags: ["React", "TypeScript", "Remote", "Senior"]
  },
  {
    id: 2,
    title: "Digital Marketing Specialist", 
    company: "Growth Agency",
    location: "Remote Worldwide",
    salary: "$50,000-70,000/year",
    type: "full-time" as const,
    posted: "1 week ago",
    applications: 45,
    tags: ["Marketing", "SEO", "PPC", "Analytics"]
  },
  {
    id: 3,
    title: "Content Writer - Tech",
    company: "StartupBlog",
    location: "Remote",
    salary: "$30-50/hour",
    type: "contract" as const,
    posted: "3 days ago",
    applications: 12,
    tags: ["Writing", "Tech", "Content", "Freelance"]
  }
];

const incomeStrategies = [
  {
    title: "Freelancing",
    description: "Leverage your existing skills",
    potential: "$2,000-8,000/month",
    difficulty: "Easy",
    timeToStart: "1-2 weeks",
    icon: Users,
    color: "from-green-500 to-green-600"
  },
  {
    title: "Online Business",
    description: "Build scalable income streams", 
    potential: "$5,000-20,000/month",
    difficulty: "Medium",
    timeToStart: "1-3 months",
    icon: TrendingUp,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Remote Employment",
    description: "Secure location-independent job",
    potential: "$60,000-150,000/year", 
    difficulty: "Medium",
    timeToStart: "2-4 weeks",
    icon: Building,
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Consulting",
    description: "Monetize your expertise",
    potential: "$10,000-50,000/month",
    difficulty: "Hard", 
    timeToStart: "1-2 months",
    icon: Award,
    color: "from-orange-500 to-orange-600"
  }
];

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Course card error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Course Card Error Fallback Component
const CourseCardError = () => (
  <Card className="h-[120px] p-4 flex items-center justify-center bg-muted/20 border-destructive/20">
    <div className="text-center">
      <p className="text-sm font-medium text-muted-foreground">Failed to load course</p>
      <p className="text-xs text-muted-foreground mt-1">Please try refreshing the page</p>
    </div>
  </Card>
);

// Course Card Skeleton Component
const CourseCardSkeleton = () => (
  <Card className="h-[120px] p-4">
    <div className="flex items-center gap-4">
      <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
  </Card>
);

export default function IncomeTab() {
  const { userType } = useUser();
  const [selectedTab, setSelectedTab] = useState<'courses' | 'jobs' | 'strategies'>('courses');
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState<'overview' | 'course'>('overview');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const getCourseAccess = (courseId: string) => {
    if (userType === 'guest') return 'none';
    if (userType === 'free') {
      return 'preview'; // All courses now have preview access for free users
    }
    return 'full';
  };

  const filteredJobs = jobListings.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCourseData = (courseId: string) => {
    switch (courseId) {
      case 'amazon-fba':
        return amazonFBACourse;
      case 'ai-automation':
        return aiAutomationCourse;
      case 'remote-consulting':
        return consultingCourse;
      default:
        return [];
    }
  };

  const handleCourseSelect = (courseId: string) => {
    const access = getCourseAccess(courseId);
    if (access !== 'none') {
      setSelectedCourseId(courseId);
      setCurrentView('course');
    }
  };

  const handleMentorContact = (mentorName: string) => {
    console.log(`Contacting mentor: ${mentorName}`);
    // Implement mentor contact functionality
  };

  const handleBackToCourses = () => {
    setCurrentView('overview');
    setSelectedCourseId('');
  };

  // Show course viewer if a course is selected
  if (currentView === 'course' && selectedCourseId) {
    const selectedCourse = courses.find(c => c.id === selectedCourseId);
    const courseData = getCourseData(selectedCourseId);
    
    if (selectedCourse && courseData.length > 0) {
      return (
        <CourseViewer
          courseId={selectedCourse.id}
          courseTitle={selectedCourse.title}
          courseDescription={selectedCourse.description}
          mentor={selectedCourse.mentor}
          mentorBio={selectedCourse.mentorBio}
          lessons={courseData}
          onBack={handleBackToCourses}
          userType={userType}
          userProgress={{
            completedLessons: [], // This would come from user context in a real app
            currentLesson: courseData[0]?.id
          }}
        />
      );
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .course-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--grid-gap-mobile);
          padding: 0 var(--grid-padding-mobile);
          width: 100%;
          margin-bottom: 2rem;
        }

        @media (min-width: 768px) {
          .course-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--grid-gap-tablet);
            padding: 0 var(--grid-padding-tablet);
            max-width: 1024px;
            margin-left: auto;
            margin-right: auto;
          }
        }

        @media (min-width: 1024px) {
          .course-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: var(--grid-gap-desktop);
            padding: 0 var(--grid-padding-desktop);
            max-width: 1280px;
          }
        }

        .course-card-animation {
          animation: fadeInUp 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
          animation-delay: var(--animation-delay, 0ms);
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Touch interaction optimizations */
        @media (hover: none) and (pointer: coarse) {
          .course-grid {
            /* Larger touch targets on mobile */
            gap: calc(var(--grid-gap-mobile) * 1.2);
          }
        }

        /* Focus styles for keyboard navigation */
        .course-card-animation:focus-within {
          outline: 2px solid hsl(var(--primary));
          outline-offset: 2px;
          border-radius: var(--radius);
        }

        /* Smooth transitions between tabs */
        .tab-transition {
          transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }

        .tab-enter {
          opacity: 0;
          transform: translateX(10px);
        }

        .tab-enter-active {
          opacity: 1;
          transform: translateX(0);
        }
      `}} />
    <div>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">💰 Income Mastery</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Build sustainable income streams that support your Thailand lifestyle
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-muted rounded-lg p-1">
          {['courses', 'jobs', 'strategies'].map((tab) => (
            <Button
              key={tab}
              variant={selectedTab === tab ? 'default' : 'ghost'}
              onClick={() => setSelectedTab(tab as any)}
              className="capitalize"
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      <UserContent
        guestContent={
          <div>
            {selectedTab === 'courses' && (
              <div>
                <div 
                  className="course-grid"
                  style={{
                    '--grid-gap-mobile': '12px',
                    '--grid-gap-tablet': '24px',
                    '--grid-gap-desktop': '32px',
                    '--grid-padding-mobile': '16px',
                    '--grid-padding-tablet': '24px',
                    '--grid-padding-desktop': '32px',
                  } as React.CSSProperties}
                >
                  {isLoading ? (
                    // Show skeleton loaders while loading
                    Array.from({ length: 6 }).map((_, index) => (
                      <CourseCardSkeleton key={`skeleton-${index}`} />
                    ))
                  ) : (
                    // Show actual course cards when loaded
                    courses.map((course, index) => (
                      <ErrorBoundary key={course.id} fallback={<CourseCardError />}>
                        <CompactCourseCard
                          course={course}
                          userType={userType}
                          onCourseSelect={handleCourseSelect}
                          onMentorContact={handleMentorContact}
                          className="course-card-animation"
                          style={{
                            '--animation-delay': `${index * 100}ms`,
                            animationDelay: `${index * 100}ms`
                          } as React.CSSProperties}
                        />
                      </ErrorBoundary>
                    ))
                  )}
                </div>
                <UpgradePrompt 
                  title="Unlock Income Mastery Courses"
                  description="Get access to proven strategies that thousands have used to build location-independent income"
                />
              </div>
            )}
            
            {selectedTab === 'strategies' && (
              <div>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {incomeStrategies.map((strategy) => {
                    const Icon = strategy.icon;
                    return (
                      <Card key={strategy.title} className="p-6 opacity-75">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${strategy.color} flex items-center justify-center mb-4`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{strategy.title}</h3>
                        <p className="text-muted-foreground mb-4">{strategy.description}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Potential Income:</span>
                            <span className="font-medium">{strategy.potential}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Difficulty:</span>
                            <Badge variant="outline">{strategy.difficulty}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Time to Start:</span>
                            <span className="font-medium">{strategy.timeToStart}</span>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
                <UpgradePrompt 
                  title="Access Detailed Strategy Guides"
                  description="Get step-by-step implementation guides for each income strategy"
                />
              </div>
            )}
            
            {selectedTab === 'jobs' && (
              <div>
                <p className="text-center text-muted-foreground mb-8">
                  Create an account to access our curated remote job board
                </p>
                <UpgradePrompt 
                  title="Access Remote Job Board"
                  description="Find Thailand-friendly remote positions and freelance opportunities"
                />
              </div>
            )}
          </div>
        }
        
        freeContent={
          <div>
            {selectedTab === 'courses' && (
              <div>
                <div 
                  className="course-grid"
                  style={{
                    '--grid-gap-mobile': '12px',
                    '--grid-gap-tablet': '24px',
                    '--grid-gap-desktop': '32px',
                    '--grid-padding-mobile': '16px',
                    '--grid-padding-tablet': '24px',
                    '--grid-padding-desktop': '32px',
                  } as React.CSSProperties}
                >
                  {isLoading ? (
                    // Show skeleton loaders while loading
                    Array.from({ length: 6 }).map((_, index) => (
                      <CourseCardSkeleton key={`skeleton-${index}`} />
                    ))
                  ) : (
                    // Show actual course cards when loaded
                    courses.map((course, index) => (
                      <ErrorBoundary key={course.id} fallback={<CourseCardError />}>
                        <CompactCourseCard
                          course={course}
                          userType={userType}
                          onCourseSelect={handleCourseSelect}
                          onMentorContact={handleMentorContact}
                          className="course-card-animation"
                          style={{
                            '--animation-delay': `${index * 100}ms`,
                            animationDelay: `${index * 100}ms`
                          } as React.CSSProperties}
                        />
                      </ErrorBoundary>
                    ))
                  )}
                </div>
                
                <UpgradePrompt 
                  compact
                  title="Unlock Full Course Access"
                  description="Get access to all lessons in every course - currently you can only access the first lesson of each course"
                />
              </div>
            )}
            
            {selectedTab === 'jobs' && (
              <div>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search remote jobs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 mb-8">
                  {filteredJobs.slice(0, 2).map((job) => (
                    <Card key={job.id} className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold">{job.title}</h3>
                          <p className="text-muted-foreground">{job.company}</p>
                        </div>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {job.posted}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {job.applications} applications
                        </span>
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <UpgradePrompt 
                  compact
                  title="Access Full Job Board"
                  description="Browse 100+ Thailand-friendly remote positions"
                />
              </div>
            )}
            
            {selectedTab === 'strategies' && (
              <div>
                <div className="grid md:grid-cols-2 gap-6">
                  {incomeStrategies.map((strategy) => {
                    const Icon = strategy.icon;
                    return (
                      <Card key={strategy.title} className="p-6">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${strategy.color} flex items-center justify-center mb-4`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{strategy.title}</h3>
                        <p className="text-muted-foreground mb-4">{strategy.description}</p>
                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex justify-between">
                            <span>Potential Income:</span>
                            <span className="font-medium">{strategy.potential}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Difficulty:</span>
                            <Badge variant="outline">{strategy.difficulty}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Time to Start:</span>
                            <span className="font-medium">{strategy.timeToStart}</span>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          Learn More <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        }
        
        paidContent={
          <div>
            {selectedTab === 'courses' && (
              <div 
                className="course-grid"
                style={{
                  '--grid-gap-mobile': '12px',
                  '--grid-gap-tablet': '24px',
                  '--grid-gap-desktop': '32px',
                  '--grid-padding-mobile': '16px',
                  '--grid-padding-tablet': '24px',
                  '--grid-padding-desktop': '32px',
                } as React.CSSProperties}
              >
                {isLoading ? (
                  // Show skeleton loaders while loading
                  Array.from({ length: 6 }).map((_, index) => (
                    <CourseCardSkeleton key={`skeleton-${index}`} />
                  ))
                ) : (
                  // Show actual course cards when loaded
                  courses.map((course, index) => (
                    <ErrorBoundary key={course.id} fallback={<CourseCardError />}>
                      <CompactCourseCard
                        course={course}
                        userType={userType}
                        onCourseSelect={handleCourseSelect}
                        onMentorContact={handleMentorContact}
                        className="course-card-animation"
                        style={{
                          '--animation-delay': `${index * 100}ms`,
                          animationDelay: `${index * 100}ms`
                        } as React.CSSProperties}
                      />
                    </ErrorBoundary>
                  ))
                )}
              </div>
            )}
            
            {selectedTab === 'jobs' && (
              <div>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search remote jobs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="grid gap-4">
                  {filteredJobs.map((job) => (
                    <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold">{job.title}</h3>
                          <p className="text-muted-foreground">{job.company}</p>
                        </div>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {job.posted}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {job.applications} applications
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Save</Button>
                          <Button size="sm">Apply Now</Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {selectedTab === 'strategies' && (
              <div>
                <div className="grid md:grid-cols-2 gap-6">
                  {incomeStrategies.map((strategy) => {
                    const Icon = strategy.icon;
                    return (
                      <Card key={strategy.title} className="p-6 hover:shadow-lg transition-shadow">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${strategy.color} flex items-center justify-center mb-4`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{strategy.title}</h3>
                        <p className="text-muted-foreground mb-4">{strategy.description}</p>
                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex justify-between">
                            <span>Potential Income:</span>
                            <span className="font-medium">{strategy.potential}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Difficulty:</span>
                            <Badge variant="outline">{strategy.difficulty}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Time to Start:</span>
                            <span className="font-medium">{strategy.timeToStart}</span>
                          </div>
                        </div>
                        <Button className="w-full">
                          View Implementation Guide <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        }
      />
    </div>
    </>
  );
}
