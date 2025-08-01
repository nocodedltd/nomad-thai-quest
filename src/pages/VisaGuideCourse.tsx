import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { LessonCard } from "@/components/lesson/lesson-card";
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  Clock, 
  Award,
  FileText,
  Plane,
  MapPin
} from "lucide-react";

const lessons = [
  {
    id: "1",
    title: "Thailand Tourist Visa Guide",
    description: "Complete guide to obtaining and extending tourist visas for Thailand",
    duration: 30,
    xpReward: 35,
    difficulty: "beginner" as const,
    completed: false,
    locked: false
  },
  {
    id: "2", 
    title: "Education Visa (ED Visa)",
    description: "Long-term visa options through language schools and universities",
    duration: 25,
    xpReward: 40,
    difficulty: "intermediate" as const,
    completed: false,
    locked: true
  },
  {
    id: "3",
    title: "Elite Visa Program",
    description: "Premium visa option for long-term stays in Thailand",
    duration: 20,
    xpReward: 30,
    difficulty: "intermediate" as const,
    completed: false,
    locked: true
  },
  {
    id: "4",
    title: "Work Permits & Business Visas",
    description: "Legal requirements for working and doing business in Thailand",
    duration: 35,
    xpReward: 45,
    difficulty: "advanced" as const,
    completed: false,
    locked: true
  }
];

export default function VisaGuideCourse() {
  const navigate = useNavigate();
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const totalLessons = lessons.length;
  const progressPercentage = (completedLessons / totalLessons) * 100;
  const totalXP = lessons.reduce((sum, lesson) => sum + lesson.xpReward, 0);

  const handleStartLesson = (lessonId: string) => {
    navigate(`/course/visa-guide/lesson/${lessonId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary via-primary/90 to-secondary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/courses")}
              className="text-primary-foreground hover:bg-white/10 mb-2 sm:mb-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              All Courses
            </Button>
            <Badge variant="secondary" className="text-sm">
              Visa & Legal
            </Badge>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Thailand Visa Guide
              </h1>
              <p className="text-lg sm:text-xl mb-6 text-primary-foreground/90">
                Navigate Thailand's visa requirements with confidence. Master all visa types, application processes, and legal requirements for living in Thailand.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-xl sm:text-2xl font-bold">{totalLessons}</div>
                  <div className="text-sm opacity-90">Lessons</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-xl sm:text-2xl font-bold">{totalXP}</div>
                  <div className="text-sm opacity-90">Total XP</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-xl sm:text-2xl font-bold">2h</div>
                  <div className="text-sm opacity-90">Duration</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-xl sm:text-2xl font-bold">2024</div>
                  <div className="text-sm opacity-90">Updated</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Course Progress</span>
                  <span>{completedLessons}/{totalLessons} lessons</span>
                </div>
                <ProgressBar progress={progressPercentage} showPercentage={true} size="md" />
              </div>

              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => handleStartLesson("1")}
                className="w-full sm:w-auto"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
            </div>

            <div className="lg:flex justify-center hidden">
              <div className="relative">
                <div className="w-80 h-80 bg-white/10 rounded-full flex items-center justify-center">
                  <FileText className="w-32 h-32 text-white/80" />
                </div>
                <div className="absolute top-4 right-4">
                  <Plane className="w-16 h-16 text-white/60" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <MapPin className="w-20 h-20 text-white/60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">Complete</div>
              <div className="text-sm text-muted-foreground">All visa types covered</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="w-8 h-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold">Current</div>
              <div className="text-sm text-muted-foreground">2024 requirements</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">Legal</div>
              <div className="text-sm text-muted-foreground">Official requirements</div>
            </CardContent>
          </Card>
        </div>

        {/* Lessons */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">Course Lessons</h2>
          {lessons.map((lesson, index) => (
            <LessonCard
              key={lesson.id}
              id={lesson.id}
              title={lesson.title}
              description={lesson.description}
              duration={lesson.duration}
              type="video"
              status={lesson.completed ? "completed" : lesson.locked ? "locked" : "available"}
              difficulty={lesson.difficulty}
              xpReward={lesson.xpReward}
              onStart={() => handleStartLesson(lesson.id)}
            />
          ))}
        </div>

        {/* Course Benefits */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-accent" />
              What You'll Learn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Tourist visa application process</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Education visa requirements</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Elite visa program benefits</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Work permit procedures</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Visa extension processes</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Legal compliance requirements</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}