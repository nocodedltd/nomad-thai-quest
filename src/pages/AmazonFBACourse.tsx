import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Badge } from "@/components/ui/badge";
import { LessonCard } from "@/components/lesson/lesson-card";
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  Lock,
  Calendar,
  Target,
  DollarSign,
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  User,
  Star,
  Globe,
  Zap
} from "lucide-react";

interface LessonData {
  id: string;
  title: string;
  status: "locked" | "available" | "in-progress" | "completed";
  type: "video" | "quiz" | "interactive";
  duration: number;
}

const timelineWeeks = [
  {
    week: 1,
    title: "Foundation & Research",
    description: "Learn Amazon FBA basics and market research",
    status: "completed" as const,
    lessons: [
      { id: "1", title: "Amazon FBA Overview", status: "completed", type: "video", duration: 15 },
      { id: "2", title: "Market Research Tools", status: "completed", type: "interactive", duration: 25 },
      { id: "3", title: "Product Research Quiz", status: "completed", type: "quiz", duration: 10 }
    ] as LessonData[]
  },
  {
    week: 2,
    title: "Product Selection",
    description: "Find profitable products to sell",
    status: "in-progress" as const,
    lessons: [
      { id: "4", title: "Product Criteria Deep Dive", status: "completed", type: "video", duration: 20 },
      { id: "5", title: "Competitor Analysis", status: "in-progress", type: "interactive", duration: 30 },
      { id: "6", title: "Product Selection Workshop", status: "locked", type: "quiz", duration: 15 }
    ] as LessonData[]
  },
  {
    week: 3,
    title: "Supplier & Sourcing",
    description: "Connect with suppliers and source your products",
    status: "locked" as const,
    lessons: [
      { id: "7", title: "Finding Suppliers on Alibaba", status: "locked", type: "video", duration: 25 },
      { id: "8", title: "Negotiation Strategies", status: "locked", type: "video", duration: 20 },
      { id: "9", title: "Quality Control & Samples", status: "locked", type: "interactive", duration: 35 }
    ] as LessonData[]
  },
  {
    week: 4,
    title: "Launch & Optimization",
    description: "Launch your product and optimize for success",
    status: "locked" as const,
    lessons: [
      { id: "10", title: "Amazon Listing Creation", status: "locked", type: "video", duration: 30 },
      { id: "11", title: "Launch Strategy", status: "locked", type: "interactive", duration: 25 },
      { id: "12", title: "PPC Advertising Basics", status: "locked", type: "video", duration: 40 }
    ] as LessonData[]
  }
];

// Mentor data
const mentorData = {
  name: "Richard Klein",
  title: "Amazon FBA Expert & Digital Nomad",
  bio: "7-figure Amazon seller with 5+ years of experience in FBA wholesale and private labeling. Helped over 500+ students build profitable Amazon businesses from anywhere in the world.",
  avatar: "/richard-klein-avatar.jpg",
  location: "Thailand & Worldwide",
  experience: "5+ years",
  students: "500+",
  revenue: "$2M+",
  specialties: ["FBA Wholesale", "Private Label", "International Expansion", "Automation"],
  achievements: [
    "Generated $2M+ in Amazon sales",
    "Built 15+ profitable product lines",
    "Featured in Amazon Seller Central",
    "Speaker at eCommerce conferences"
  ],
  social: {
    linkedin: "https://linkedin.com/in/richardklein",
    youtube: "https://youtube.com/@richardklein",
    instagram: "https://instagram.com/richardklein"
  }
};

export default function AmazonFBACourse() {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState("timeline");
  
  const completedLessons = timelineWeeks.flatMap(week => week.lessons).filter(lesson => lesson.status === "completed").length;
  const totalLessons = timelineWeeks.flatMap(week => week.lessons).length;
  const progress = Math.round((completedLessons / totalLessons) * 100);

  const allLessons = timelineWeeks.flatMap(week => 
    week.lessons.map(lesson => {
      const weekData = timelineWeeks.find(w => w.lessons.includes(lesson));
      return {
        ...lesson,
        description: `Week ${weekData?.week} - ${weekData?.title}`,
        difficulty: "intermediate" as const,
        xpReward: lesson.type === "quiz" ? 50 : lesson.type === "interactive" ? 75 : 25,
        progress: lesson.status === "in-progress" ? 65 : 0
      };
    })
  );

  return (
    <div className="min-h-screen bg-background p-3 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Mobile Header */}
        <div className="mb-4 md:mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/overview")}
            className="mb-3 md:mb-4 text-sm"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Overview
          </Button>
          
          {/* Course Progress - Mobile First */}
          <Card className="p-4 mb-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 flex-shrink-0">
                <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-emerald-600" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl md:text-3xl font-bold">Amazon FBA Mastery</h1>
                <p className="text-sm md:text-lg text-muted-foreground">
                  Build a profitable Amazon business from Thailand
                </p>
              </div>
            </div>
            
            <ProgressBar progress={progress} size="lg" className="mb-3" />
            <div className="flex justify-between text-xs md:text-sm text-muted-foreground">
              <span>{completedLessons}/{totalLessons} lessons completed</span>
              <span>{progress}% complete</span>
            </div>
          </Card>

          {/* Stats Overview - Mobile Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
            <Card className="p-3 md:p-4">
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-primary">{progress}%</div>
                <div className="text-xs md:text-sm text-muted-foreground">Complete</div>
              </div>
            </Card>
            <Card className="p-3 md:p-4">
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-emerald-600">{completedLessons}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Lessons</div>
              </div>
            </Card>
            <Card className="p-3 md:p-4">
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-warning">4</div>
                <div className="text-xs md:text-sm text-muted-foreground">Weeks</div>
              </div>
            </Card>
            <Card className="p-3 md:p-4">
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-accent">$5K</div>
                <div className="text-xs md:text-sm text-muted-foreground">Target</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Navigation - Mobile Optimized */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="flex bg-muted p-1 rounded-lg">
            {[
              { id: "timeline", label: "Timeline", icon: Calendar },
              { id: "lessons", label: "All Lessons", icon: BookOpen },
              { id: "mentor", label: "Your Mentor", icon: User }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={selectedView === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedView(tab.id)}
                className="flex items-center gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-3"
              >
                <tab.icon className="w-3 h-3 md:w-4 md:h-4" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Timeline View */}
        {selectedView === "timeline" && (
          <div className="space-y-4 md:space-y-6">
            {timelineWeeks.map((week, index) => (
              <Card key={week.week} className={`p-4 md:p-6 ${
                week.status === "completed" ? "border-accent/50 bg-accent/5" :
                week.status === "in-progress" ? "border-warning/50 bg-warning/5" :
                "opacity-60"
              }`}>
                <CardHeader className="pb-3 md:pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-lg flex-shrink-0 ${
                        week.status === "completed" ? "bg-accent" :
                        week.status === "in-progress" ? "bg-warning" :
                        "bg-muted-foreground"
                      }`}>
                        {week.status === "completed" ? <CheckCircle className="w-5 h-5 md:w-6 md:h-6" /> :
                         week.status === "in-progress" ? <TrendingUp className="w-5 h-5 md:w-6 md:h-6" /> :
                         <Lock className="w-5 h-5 md:w-6 md:h-6" />}
                      </div>
                      <div className="min-w-0">
                        <CardTitle className="text-lg md:text-xl">Week {week.week}: {week.title}</CardTitle>
                        <p className="text-sm md:text-base text-muted-foreground">{week.description}</p>
                      </div>
                    </div>
                    <Badge variant={
                      week.status === "completed" ? "default" :
                      week.status === "in-progress" ? "secondary" :
                      "outline"
                    } className="text-xs self-start">
                      {week.status === "completed" ? "Completed" :
                       week.status === "in-progress" ? "In Progress" :
                       "Locked"}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid gap-4">
                    {week.lessons.map((lesson) => (
                      <LessonCard
                        key={lesson.id}
                        id={lesson.id}
                        title={lesson.title}
                        description={week.description}
                        duration={lesson.duration}
                        type={lesson.type}
                        status={lesson.status}
                        progress={lesson.status === "in-progress" ? 65 : 0}
                        difficulty="intermediate"
                        xpReward={lesson.type === "quiz" ? 50 : lesson.type === "interactive" ? 75 : 25}
                        onStart={() => navigate(`/course/amazon-fba/lesson/${lesson.id}`)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* All Lessons View */}
        {selectedView === "lessons" && (
          <div className="grid gap-4">
            {allLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                id={lesson.id}
                title={lesson.title}
                description={lesson.description}
                duration={lesson.duration}
                type={lesson.type}
                status={lesson.status}
                progress={lesson.progress}
                difficulty={lesson.difficulty}
                xpReward={lesson.xpReward}
                onStart={() => navigate(`/course/amazon-fba/lesson/${lesson.id}`)}
              />
            ))}
          </div>
        )}

        {/* Mentor Profile View */}
        {selectedView === "mentor" && (
          <div className="space-y-6">
            {/* Mentor Header */}
            <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <User className="w-12 h-12 md:w-16 md:h-16 text-emerald-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{mentorData.name}</h2>
                  <p className="text-lg text-emerald-600 font-semibold mb-3">{mentorData.title}</p>
                  <p className="text-muted-foreground mb-4">{mentorData.bio}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      {mentorData.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {mentorData.experience} experience
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-emerald-600 mb-1">{mentorData.revenue}</div>
                <div className="text-sm text-muted-foreground">Total Revenue</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-emerald-600 mb-1">{mentorData.students}</div>
                <div className="text-sm text-muted-foreground">Students Helped</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-emerald-600 mb-1">15+</div>
                <div className="text-sm text-muted-foreground">Product Lines</div>
              </Card>
            </div>

            {/* Specialties */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-600" />
                Specialties
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mentorData.specialties.map((specialty, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium">{specialty}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                Key Achievements
              </h3>
              <div className="space-y-3">
                {mentorData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <Star className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Teaching Philosophy */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Teaching Philosophy</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  "I believe that anyone can build a successful Amazon business with the right guidance and mindset. 
                  My approach focuses on practical, actionable strategies that you can implement immediately."
                </p>
                <p>
                  "Having built my own 7-figure Amazon business while living as a digital nomad, I understand the 
                  unique challenges and opportunities of running an online business from anywhere in the world."
                </p>
                <p>
                  "I'm committed to providing ongoing support and mentorship to ensure your success in the Amazon FBA space."
                </p>
              </div>
            </Card>

            {/* Contact & Social */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Connect & Follow</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button variant="outline" className="justify-start" onClick={() => window.open(mentorData.social.linkedin, '_blank')}>
                  <Globe className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => window.open(mentorData.social.youtube, '_blank')}>
                  <Play className="w-4 h-4 mr-2" />
                  YouTube
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => window.open(mentorData.social.instagram, '_blank')}>
                  <User className="w-4 h-4 mr-2" />
                  Instagram
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Course Completion CTA */}
        <Card className="mt-8 p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5">
          <div className="text-center">
            <Award className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Complete Your Amazon FBA Journey</h2>
            <p className="text-muted-foreground mb-4">
              Finish all lessons to unlock advanced strategies and bonus content
            </p>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Continue Learning
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}