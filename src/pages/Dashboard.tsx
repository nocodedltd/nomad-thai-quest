import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Badge } from "@/components/ui/badge";
import { BadgeComponent } from "@/components/ui/badge-component";
import { LessonCard } from "@/components/lesson/lesson-card";
import { 
  Trophy, 
  Zap, 
  Target, 
  Calendar,
  DollarSign,
  FileText,
  Home,
  Users,
  ArrowRight,
  Flame
} from "lucide-react";

// Mock data - in real app this would come from backend
const userStats = {
  xp: 1250,
  streak: 7,
  completedLessons: 12,
  totalLessons: 50,
  nextBadge: "Visa Expert",
  level: 3
};

const badges = [
  { icon: DollarSign, title: "First Income", description: "Completed income basics", earned: true },
  { icon: FileText, title: "Visa Starter", description: "Started visa path", earned: true },
  { icon: Zap, title: "Quick Learner", description: "Completed 5 lessons in a day", earned: false },
  { icon: Trophy, title: "Achiever", description: "Reached level 5", earned: false }
];

const recentLessons = [
  {
    id: "1",
    title: "Amazon FBA Basics for Nomads",
    description: "Learn how to start an Amazon FBA business while traveling",
    duration: 8,
    type: "video" as const,
    status: "completed" as const,
    difficulty: "beginner" as const,
    xpReward: 50
  },
  {
    id: "2", 
    title: "Visa Requirements Quiz",
    description: "Test your knowledge of Thai visa requirements",
    duration: 5,
    type: "quiz" as const,
    status: "in-progress" as const,
    progress: 60,
    difficulty: "intermediate" as const,
    xpReward: 75
  },
  {
    id: "3",
    title: "Digital Nomad Tax Strategy",
    description: "Essential tax planning for location-independent workers",
    duration: 12,
    type: "interactive" as const,
    status: "available" as const,
    difficulty: "intermediate" as const,
    xpReward: 100
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState("income");
  
  const progressPercentage = (userStats.completedLessons / userStats.totalLessons) * 100;

  return (
    <div className="min-h-screen bg-background p-3 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Progress First - Mobile Priority */}
        <Card className="p-4 mb-4 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg md:text-xl font-bold">Learning Progress</h3>
            <Badge variant="secondary" className="text-xs">{Math.round(progressPercentage)}% Complete</Badge>
          </div>
          <ProgressBar 
            progress={progressPercentage}
            showPercentage={false}
            size="lg"
            className="mb-2"
          />
          <div className="flex justify-between text-xs md:text-sm text-muted-foreground">
            <span>{userStats.completedLessons} lessons completed</span>
            <span>{userStats.totalLessons - userStats.completedLessons} remaining</span>
          </div>
        </Card>

        {/* Header - Mobile Optimized */}
        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <h1 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">Welcome back, Alex! 👋</h1>
            <p className="text-sm md:text-base text-muted-foreground">Ready to continue your Thailand journey?</p>
          </div>
          <Button 
            onClick={() => navigate("/overview")}
            variant="outline"
            size="sm"
            className="self-start sm:self-auto"
          >
            <span className="hidden sm:inline">View Thailand Roadmap</span>
            <span className="sm:hidden">View Roadmap</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Stats Overview - Mobile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <Card className="p-3 md:p-6 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-1.5 md:p-2 bg-primary rounded-lg flex-shrink-0">
                <Zap className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <div className="text-lg md:text-2xl font-bold">{userStats.xp}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Total XP</div>
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-6 bg-gradient-to-br from-warning/10 to-warning/5">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-1.5 md:p-2 bg-warning rounded-lg flex-shrink-0">
                <Flame className="w-4 h-4 md:w-5 md:h-5 text-warning-foreground" />
              </div>
              <div className="min-w-0">
                <div className="text-lg md:text-2xl font-bold">{userStats.streak}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-6 bg-gradient-to-br from-accent/10 to-accent/5">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-1.5 md:p-2 bg-accent rounded-lg flex-shrink-0">
                <Target className="w-4 h-4 md:w-5 md:h-5 text-accent-foreground" />
              </div>
              <div className="min-w-0">
                <div className="text-lg md:text-2xl font-bold">{userStats.level}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Level</div>
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-6 bg-gradient-to-br from-secondary/10 to-secondary/5">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-1.5 md:p-2 bg-secondary rounded-lg flex-shrink-0">
                <Trophy className="w-4 h-4 md:w-5 md:h-5 text-secondary-foreground" />
              </div>
              <div className="min-w-0">
                <div className="text-lg md:text-2xl font-bold">{userStats.completedLessons}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Lessons</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">

            {/* Continue Learning */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Continue Learning</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/courses")}
                >
                  View All Lessons
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentLessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    {...lesson}
                    onStart={() => navigate('/lesson')}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Goal */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="font-bold">Today's Goal</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Complete 2 lessons</span>
                  <span className="text-muted-foreground">1/2</span>
                </div>
                <ProgressBar progress={50} size="sm" />
                <p className="text-xs text-muted-foreground">
                  You're halfway there! Complete one more lesson to earn bonus XP.
                </p>
              </div>
            </Card>

            {/* Badges */}
            <Card className="p-6">
              <h3 className="font-bold mb-4">Your Badges</h3>
              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge, index) => (
                  <BadgeComponent
                    key={index}
                    {...badge}
                    className="text-xs"
                  />
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                View All Badges
              </Button>
            </Card>

            {/* Next Badge */}
            <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5">
              <h3 className="font-bold mb-3">Next Badge: {userStats.nextBadge}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Complete 3 more visa lessons to unlock this badge
              </p>
              <ProgressBar progress={60} size="sm" variant="success" />
              <p className="text-xs text-muted-foreground mt-2">3/5 lessons completed</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}