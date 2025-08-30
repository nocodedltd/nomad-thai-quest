import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Award, 
  Users, 
  Target,
  Play,
  Lock,
  Trophy,
  Star,
  ChevronUp,
  ChevronDown,
  PlayCircle,
  ArrowRight,
  Calendar,
  TrendingUp
} from "lucide-react";
import LessonViewer, { LessonContent } from "./lesson-viewer";
import { UserType } from "@/types/user";
import { cn } from "@/lib/utils";

interface CourseViewerProps {
  courseId: string;
  courseTitle: string;
  courseDescription: string;
  mentor: string;
  mentorBio: string;
  lessons: LessonContent[];
  onBack: () => void;
  userType: UserType;
  userProgress?: {
    completedLessons: string[];
    currentLesson?: string;
  };
}

export default function CourseViewer({
  courseId,
  courseTitle,
  courseDescription,
  mentor,
  mentorBio,
  lessons,
  onBack,
  userType,
  userProgress = { completedLessons: [] }
}: CourseViewerProps) {
  const [currentView, setCurrentView] = useState<'overview' | 'lesson'>('overview');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const [completedLessons, setCompletedLessons] = useState<string[]>(userProgress.completedLessons);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const completionPercentage = (completedLessons.length / lessons.length) * 100;
  const selectedLesson = lessons.find(lesson => lesson.id === selectedLessonId);

  // Find current lesson (next incomplete lesson)
  const currentLessonId = userProgress.currentLesson || 
    lessons.find((lesson, index) => !completedLessons.includes(lesson.id) && !isLessonLocked(lesson, index))?.id || 
    lessons[0]?.id;

  const handleLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const handleLessonSelect = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setCurrentView('lesson');
  };

  const isLessonLocked = (lesson: LessonContent, index: number) => {
    if (index === 0) return false; // First lesson is always unlocked
    
    // For free users, only first lesson is accessible
    if (userType === 'free' && index > 0) return true;
    
    // For paid users, check if previous lesson is completed
    if (userType === 'paid') {
      const previousLesson = lessons[index - 1];
      return !completedLessons.includes(previousLesson.id);
    }
    
    return false;
  };

  const getLessonState = (lesson: LessonContent, index: number) => {
    const isCompleted = completedLessons.includes(lesson.id);
    const isLocked = isLessonLocked(lesson, index);
    const isCurrent = lesson.id === currentLessonId;
    
    if (isCompleted) return 'completed';
    if (isLocked) return 'locked';
    if (isCurrent) return 'current';
    return 'available';
  };

  const handleLessonNavigation = (lessonId: string) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
      setSelectedLessonId(lessonId);
    }
  };

  // Touch handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe || isRightSwipe) {
      // Implement swipe navigation logic here if needed
      console.log(isLeftSwipe ? 'Swiped left' : 'Swiped right');
    }
  };

  const handleContinueLearning = () => {
    if (currentLessonId) {
      handleLessonSelect(currentLessonId);
    }
  };

  if (currentView === 'lesson' && selectedLesson) {
    const lessonIndex = lessons.findIndex(l => l.id === selectedLessonId);
    const isCompleted = completedLessons.includes(selectedLessonId);
    const isLocked = isLessonLocked(selectedLesson, lessonIndex);
    const progress = isCompleted ? 100 : 0;

    return (
      <LessonViewer
        lesson={selectedLesson}
        isCompleted={isCompleted}
        isLocked={isLocked}
        onComplete={handleLessonComplete}
        onNavigate={handleLessonNavigation}
        progress={progress}
        userType={userType}
        isFirstLesson={lessonIndex === 0}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-optimized Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="px-4 py-3 md:px-6">
          <div className="flex items-center justify-between mb-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2 p-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Courses</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}
              className="md:hidden"
            >
              {isHeaderCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </Button>
          </div>

          {/* Collapsible Course Info */}
          <div className={cn(
            "transition-all duration-300 overflow-hidden",
            isHeaderCollapsed ? "max-h-20" : "max-h-none"
          )}>
            <div className="mb-4">
              <h1 className="text-xl md:text-2xl font-bold mb-1 line-clamp-2">{courseTitle}</h1>
              {!isHeaderCollapsed && (
                <p className="text-sm md:text-base text-muted-foreground mb-3 line-clamp-2">
                  {courseDescription}
                </p>
              )}
            </div>

            {/* Progress Circle and Stats */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                {/* Prominent Progress Circle */}
                <div className="relative w-16 h-16 md:w-20 md:h-20">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted-foreground/20"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - completionPercentage / 100)}`}
                      className="text-primary transition-all duration-500"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm md:text-base font-bold">{Math.round(completionPercentage)}%</div>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="text-sm font-medium">
                    {completedLessons.length} of {lessons.length} lessons completed
                  </div>
                  {!isHeaderCollapsed && (
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lessons.reduce((total, lesson) => {
                          const minutes = parseInt(lesson.duration.split(' ')[0]);
                          return total + minutes;
                        }, 0)} min total
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {mentor}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Stats Grid */}
            {!isHeaderCollapsed && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4">
                <div className="bg-blue-50 dark:bg-blue-950/50 p-2 md:p-3 rounded-lg text-center">
                  <Trophy className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-1 text-blue-500" />
                  <div className="text-sm md:text-base font-bold text-blue-700 dark:text-blue-300">{completedLessons.length}</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">Done</div>
                </div>
                <div className="bg-green-50 dark:bg-green-950/50 p-2 md:p-3 rounded-lg text-center">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-1 text-green-500" />
                  <div className="text-sm md:text-base font-bold text-green-700 dark:text-green-300">{lessons.length - completedLessons.length}</div>
                  <div className="text-xs text-green-600 dark:text-green-400">Left</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950/50 p-2 md:p-3 rounded-lg text-center">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-1 text-purple-500" />
                  <div className="text-sm md:text-base font-bold text-purple-700 dark:text-purple-300">
                    {Math.ceil((lessons.length - completedLessons.length) * 7 / lessons.length)}
                  </div>
                  <div className="text-xs text-purple-600 dark:text-purple-400">Days</div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-950/50 p-2 md:p-3 rounded-lg text-center">
                  <Star className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-1 text-orange-500" />
                  <div className="text-sm md:text-base font-bold text-orange-700 dark:text-orange-300">
                    {completionPercentage === 100 ? '✓' : '⏳'}
                  </div>
                  <div className="text-xs text-orange-600 dark:text-orange-400">Status</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Continue Learning Button */}
      {currentLessonId && completionPercentage < 100 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={handleContinueLearning}
            size="lg"
            className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3"
          >
            <PlayCircle className="w-5 h-5 mr-2" />
            Continue Learning
          </Button>
        </div>
      )}

      {/* Mobile-optimized Lesson Navigation */}
      <div 
        className="px-4 md:px-6 pb-20"
        ref={scrollContainerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg md:text-xl font-bold mb-4 px-2">Learning Path</h2>
          
          {/* Compact Lesson Tiles with Progress Line */}
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-6 md:left-8 top-6 bottom-6 w-0.5 bg-border"></div>
            <div 
              className="absolute left-6 md:left-8 top-6 w-0.5 bg-primary transition-all duration-1000"
              style={{ 
                height: `${(completedLessons.length / lessons.length) * 100}%` 
              }}
            ></div>

            <div className="space-y-2">
              {lessons.map((lesson, index) => {
                const state = getLessonState(lesson, index);
                const isCompleted = state === 'completed';
                const isLocked = state === 'locked';
                const isCurrent = state === 'current';
                
                return (
                  <Card 
                    key={lesson.id}
                    className={cn(
                      "relative ml-12 md:ml-16 p-3 md:p-4 transition-all duration-300 cursor-pointer",
                      "hover:shadow-md active:scale-98",
                      isLocked && "opacity-50 cursor-not-allowed",
                      isCurrent && "ring-2 ring-primary ring-offset-2 bg-primary/5",
                      isCompleted && "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                    )}
                    onClick={() => !isLocked && handleLessonSelect(lesson.id)}
                    style={{ minHeight: '80px' }}
                  >
                    {/* Lesson State Indicator */}
                    <div className={cn(
                      "absolute -left-12 md:-left-16 top-4 w-6 h-6 rounded-full flex items-center justify-center border-2 bg-background",
                      isCompleted && "border-green-500 bg-green-500 text-white",
                      isCurrent && "border-primary bg-primary text-primary-foreground animate-pulse",
                      isLocked && "border-muted-foreground bg-muted",
                      !isCompleted && !isCurrent && !isLocked && "border-muted-foreground"
                    )}>
                      {isCompleted && <CheckCircle className="w-4 h-4" />}
                      {isCurrent && <Play className="w-4 h-4" />}
                      {isLocked && <Lock className="w-3 h-3" />}
                      {!isCompleted && !isCurrent && !isLocked && <div className="w-2 h-2 rounded-full bg-muted-foreground" />}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm md:text-base truncate">{lesson.title}</h3>
                          {isCurrent && (
                            <Badge variant="secondary" className="text-xs shrink-0">
                              Current
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-2">
                          {lesson.description}
                        </p>
                        
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {lesson.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {lesson.quiz.length} quiz
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {isCompleted && (
                          <Badge className="bg-green-500 text-xs">
                            <Trophy className="w-3 h-3 mr-1" />
                            Done
                          </Badge>
                        )}
                        
                        {!isLocked && (
                          <Button
                            size="sm"
                            variant={isCurrent ? "default" : "ghost"}
                            className="text-xs px-3 py-1 h-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLessonSelect(lesson.id);
                            }}
                          >
                            {isCompleted ? 'Review' : isCurrent ? 'Continue' : 'Start'}
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Course Completion Message */}
          {completionPercentage === 100 && (
            <Card className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
              <div className="text-center">
                <Trophy className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-xl md:text-2xl font-bold text-green-700 dark:text-green-300 mb-2">
                  Course Complete! 🎉
                </h3>
                <p className="text-sm md:text-base text-green-600 dark:text-green-400 mb-4">
                  You've mastered {courseTitle}. Time to put your knowledge into action!
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <Button className="bg-green-500 hover:bg-green-600">
                    <Award className="w-4 h-4 mr-2" />
                    Get Certificate
                  </Button>
                  <Button variant="outline">
                    <Star className="w-4 h-4 mr-2" />
                    Share Success
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
