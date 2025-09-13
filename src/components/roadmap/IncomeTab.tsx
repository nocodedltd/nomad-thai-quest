import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Input } from "@/components/ui/input";
import { 
  DollarSign, 
  Package,
  Bot,
  GraduationCap,
  Play,
  Search,
  MapPin,
  Clock,
  Lock
} from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { UserContent } from "@/components/shared/user-content";
import { Paywall } from "@/components/shared/paywall";
import { UpgradePrompt } from "@/components/shared/upgrade-prompt";
import CourseViewer from "@/components/lesson/course-viewer";
import { amazonFBACourse, aiAutomationCourse, consultingCourse } from "@/data/courses/amazon-fba-course";
import { CompactCourseCard } from "@/components/roadmap/CompactCourseCard";
import AffiliateDashboard from "@/components/income/affiliate-dashboard";
import EnglishTeachingBoard from "@/components/income/english-teaching-board";

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



type IncomeTabProps = {
  compact?: boolean;
};

export default function IncomeTab({ compact = false }: IncomeTabProps) {
  const { userType } = useUser();
  const [selectedTab, setSelectedTab] = useState<'courses' | 'jobs' | 'affiliate' | 'teaching'>('courses');
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState<'overview' | 'course'>('overview');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');

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
    <div>
      {!compact && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">💰 Income Mastery</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Build sustainable income streams that support your Thailand lifestyle
          </p>
        </div>
      )}


      {/* Compact Tabs */}
      <div className={`flex justify-center ${compact ? 'mb-4' : 'mb-6'}`}>
        <div className="subsection-nav-frosted">
          {[
            { key: 'courses', label: 'Courses' },
            { key: 'jobs', label: 'Jobs' },
            { key: 'teaching', label: 'Teaching' },
            { key: 'affiliate', label: 'Affiliate' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key as any)}
              className={`subsection-button-frosted capitalize ${selectedTab === tab.key ? 'selected' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <UserContent
        guestContent={
          <div>
            {selectedTab === 'courses' && (
              <div>
                <div className="grid gap-4 mb-8 md:grid-cols-2 lg:grid-cols-3">
                  {courses.map((course) => (
                    <CompactCourseCard
                      key={course.id}
                      course={course}
                      userType={userType}
                      onCourseSelect={handleCourseSelect}
                      onMentorContact={handleMentorContact}


                    />
                  ))}
                </div>
                <UpgradePrompt 
                  title="Unlock Income Mastery Courses"
                  description="Get access to proven strategies that thousands have used to build location-independent income"
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
            
            {selectedTab === 'teaching' && (
              <div>
                <div className="text-center py-8">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold mb-3">English Teaching Opportunities</h2>
                    <p className="text-muted-foreground mb-6">
                      Create a free account to access our English teaching job board and get matched with positions across Thailand
                    </p>
                    <UpgradePrompt 
                      title="Start Your Teaching Journey"
                      description="Join our network of English teachers and access exclusive job opportunities"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {selectedTab === 'affiliate' && (
              <div>
                <AffiliateDashboard />
              </div>
            )}
          </div>
        }
        
        freeContent={
          <div>
            {selectedTab === 'courses' && (
              <div>
                <div className="grid gap-4 mb-8 md:grid-cols-2 lg:grid-cols-3">
                  {courses.map((course) => (
                    <CompactCourseCard
                      key={course.id}
                      course={course}
                      userType={userType}
                      onCourseSelect={handleCourseSelect}
                      onMentorContact={handleMentorContact}


                    />
                  ))}
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
            
            {selectedTab === 'teaching' && (
              <div>
                <EnglishTeachingBoard />
              </div>
            )}
            
            {selectedTab === 'affiliate' && (
              <div>
                <AffiliateDashboard />
              </div>
            )}
          </div>
        }
        
        paidContent={
          <div>
            {selectedTab === 'courses' && (
              <div className="grid gap-4 mb-8 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <CompactCourseCard
                    key={course.id}
                    course={course}
                    userType={userType}
                    onCourseSelect={handleCourseSelect}
                    onMentorContact={handleMentorContact}

                  />
                ))}
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
            
            {selectedTab === 'teaching' && (
              <div>
                <EnglishTeachingBoard />
              </div>
            )}
            
            {selectedTab === 'affiliate' && (
              <div>
                <AffiliateDashboard />
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}
