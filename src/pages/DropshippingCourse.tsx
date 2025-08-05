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
  Bot,
  Zap,
  Cpu,
  Brain
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
    title: "AI Business Foundation",
    description: "Understand AI automation fundamentals and business models",
    status: "completed" as const,
    lessons: [
      { id: "1", title: "AI Automation Business Overview", status: "completed", type: "video", duration: 20 },
      { id: "2", title: "AI Business Models & Opportunities", status: "completed", type: "interactive", duration: 30 },
      { id: "3", title: "AI Tools & Platforms Deep Dive", status: "completed", type: "quiz", duration: 15 }
    ] as LessonData[]
  },
  {
    week: 2,
    title: "AI Service Development",
    description: "Build your first AI automation services",
    status: "in-progress" as const,
    lessons: [
      { id: "4", title: "Content Creation AI Services", status: "completed", type: "video", duration: 25 },
      { id: "5", title: "Customer Service Automation", status: "in-progress", type: "interactive", duration: 35 },
      { id: "6", title: "Data Analysis & Reporting AI", status: "locked", type: "quiz", duration: 20 }
    ] as LessonData[]
  },
  {
    week: 3,
    title: "Client Acquisition & Marketing",
    description: "Find clients and market your AI services",
    status: "locked" as const,
    lessons: [
      { id: "7", title: "AI Service Pricing Strategies", status: "locked", type: "video", duration: 30 },
      { id: "8", title: "Digital Marketing for AI Services", status: "locked", type: "video", duration: 25 },
      { id: "9", title: "Client Onboarding & Management", status: "locked", type: "interactive", duration: 40 }
    ] as LessonData[]
  },
  {
    week: 4,
    title: "Scaling & Optimization",
    description: "Scale your AI automation business",
    status: "locked" as const,
    lessons: [
      { id: "10", title: "AI Service Scaling Strategies", status: "locked", type: "video", duration: 35 },
      { id: "11", title: "Advanced AI Integration", status: "locked", type: "interactive", duration: 30 },
      { id: "12", title: "Business Automation & Systems", status: "locked", type: "video", duration: 45 }
    ] as LessonData[]
  }
];

export default function DropshippingCourse() {
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
          <Card className="p-4 mb-4 bg-gradient-to-br from-purple-500/10 to-purple-600/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 md:p-3 rounded-xl bg-purple-500/10 flex-shrink-0">
                <Bot className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl md:text-3xl font-bold">AI Automation Mastery</h1>
                <p className="text-sm md:text-lg text-muted-foreground">
                  Build profitable AI automation businesses from anywhere
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
                <div className="text-lg md:text-2xl font-bold text-purple-600">{completedLessons}</div>
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
                <div className="text-lg md:text-2xl font-bold text-accent">$10K</div>
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
              { id: "lessons", label: "All Lessons", icon: BookOpen }
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
                        onStart={() => navigate(`/course/ai-automation/lesson/${lesson.id}`)}
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
                onStart={() => navigate(`/course/ai-automation/lesson/${lesson.id}`)}
              />
            ))}
          </div>
        )}

        {/* Course Completion CTA */}
        <Card className="mt-8 p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5">
          <div className="text-center">
            <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Complete Your AI Automation Journey</h2>
            <p className="text-muted-foreground mb-4">
              Finish all lessons to unlock advanced AI strategies and bonus content
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Continue Learning
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}