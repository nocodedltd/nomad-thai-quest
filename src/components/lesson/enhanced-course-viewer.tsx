import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { useIsMobile } from "@/hooks/use-mobile";
import { EnhancedLessonCard } from "./enhanced-lesson-card";
import MobileLessonViewer from "./mobile-lesson-viewer";
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Award, 
  Users, 
  Target,
  Play,
  Trophy,
  Star,
  Zap,
  ChevronDown,
  ChevronUp,
  Filter,
  Grid,
  List
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserType } from "@/types/user";

interface EnhancedCourseViewerProps {
  courseId: string;
  courseTitle: string;
  courseDescription: string;
  mentor: string;
  mentorBio: string;
  lessons: any[];
  onBack: () => void;
  userType: UserType;
  userProgress?: {
    completedLessons: string[];
    currentLesson?: string;
  };
}

type ViewMode = 'grid' | 'list';
type FilterType = 'all' | 'available' | 'in-progress' | 'completed' | 'locked';

export function EnhancedCourseViewer({
  courseId,
  courseTitle,
  courseDescription,
  mentor,
  mentorBio,
  lessons,
  onBack,
  userType,
  userProgress = { completedLessons: [] }
}: EnhancedCourseViewerProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // State management
  const [currentView, setCurrentView] = useState<'overview' | 'lesson'>('overview');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const [completedLessons, setCompletedLessons] = useState<string[]>(userProgress.completedLessons);
  const [collapsedHeader, setCollapsedHeader] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>(isMobile ? 'list' : 'grid');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [showCelebration, setCelebration] = useState(false);

  // Course progress calculations
  const completionPercentage = (completedLessons.length / lessons.length) * 100;
  const totalDuration = lessons.reduce((total, lesson) => total + (lesson.duration || 15), 0);
  const earnedXP = completedLessons.reduce((total, lessonId) => {
    const lesson = lessons.find(l => l.id === lessonId);
    return total + (lesson?.xpReward || 25);
  }, 0);

  // Determine lesson statuses
  const getLessonStatus = (lesson: any, index: number) => {
    if (completedLessons.includes(lesson.id)) return 'completed';
    if (userProgress.currentLesson === lesson.id) return 'in-progress';
    if (index === 0) return 'available';
    if (userType === 'free' && index > 0) return 'locked';
    
    const previousLesson = lessons[index - 1];
    return completedLessons.includes(previousLesson.id) ? 'available' : 'locked';
  };

  // Find next recommended lesson
  const getNextRecommendedLesson = () => {
    const inProgressLesson = lessons.find(l => l.id === userProgress.currentLesson);
    if (inProgressLesson) return inProgressLesson;
    
    return lessons.find((lesson, index) => {
      const status = getLessonStatus(lesson, index);
      return status === 'available';
    });
  };

  const nextRecommended = getNextRecommendedLesson();

  // Filter lessons based on filter type
  const filteredLessons = lessons.filter((lesson, index) => {
    if (filterType === 'all') return true;
    const status = getLessonStatus(lesson, index);
    return status === filterType;
  });

  // Handle lesson completion
  const handleLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      const newCompleted = [...completedLessons, lessonId];
      setCompletedLessons(newCompleted);
      
      // Check for milestones
      const progressPercent = (newCompleted.length / lessons.length) * 100;
      const milestones = [25, 50, 75, 100];
      const reachedMilestone = milestones.find(m => 
        Math.floor(((newCompleted.length - 1) / lessons.length) * 100) < m &&
        Math.floor((newCompleted.length / lessons.length) * 100) >= m
      );
      
      if (reachedMilestone) {
        setCelebration(true);
        setTimeout(() => setCelebration(false), 3000);
      }
    }
  };

  const handleLessonSelect = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    if (isMobile) {
      setCurrentView('lesson');
    } else {
      navigate(`/course/${courseId}/lesson/${lessonId}`);
    }
  };

  const handleLessonPreview = (lessonId: string) => {
    // Preview functionality handled by EnhancedLessonCard
  };

  // Auto-advance to next lesson after completion
  const handleAutoAdvance = () => {
    const currentIndex = lessons.findIndex(l => l.id === selectedLessonId);
    const nextLesson = lessons[currentIndex + 1];
    if (nextLesson) {
      const nextStatus = getLessonStatus(nextLesson, currentIndex + 1);
      if (nextStatus === 'available') {
        setSelectedLessonId(nextLesson.id);
      }
    }
  };

  // Mobile lesson viewer
  if (currentView === 'lesson' && isMobile) {
    return (
      <MobileLessonViewer
        courseId={courseId}
        lessonId={selectedLessonId}
        lessons={lessons}
        onBack={() => setCurrentView('overview')}
        userType={userType}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Celebration animation */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="animate-ping">
            <Trophy className="w-20 h-20 text-yellow-500" />
          </div>
        </div>
      )}

      {/* Collapsible Header */}
      <div className={cn(
        "sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b",
        "transition-all duration-300"
      )}>
        <div className="max-w-6xl mx-auto p-4">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {isMobile ? 'Back' : 'Back to Courses'}
            </Button>
            
            {isMobile && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCollapsedHeader(!collapsedHeader)}
              >
                {collapsedHeader ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </Button>
            )}
          </div>

          {/* Course Header */}
          <Card className={cn(
            "transition-all duration-300",
            collapsedHeader && isMobile ? "p-3" : "p-6"
          )}>
            <div className={cn(
              "transition-all duration-300",
              collapsedHeader && isMobile ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
            )}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className={cn(
                    "font-bold mb-2",
                    isMobile ? "text-2xl" : "text-3xl"
                  )}>{courseTitle}</h1>
                  <p className="text-muted-foreground text-lg mb-4">{courseDescription}</p>
                  
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-medium">{mentor}</div>
                        <div className="text-sm text-muted-foreground">{mentorBio}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {lessons.length} Lessons
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {totalDuration} min total
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="text-right ml-4">
                  <div className="text-sm text-muted-foreground mb-2">Course Progress</div>
                  <div className="flex items-center gap-3">
                    <ProgressBar 
                      progress={completionPercentage} 
                      showPercentage 
                      size="sm" 
                      className="w-32" 
                    />
                    <Badge className={completionPercentage === 100 ? 'bg-green-500' : ''}>
                      {completedLessons.length}/{lessons.length}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Course Stats */}
              <div className={cn(
                "grid gap-4 text-center",
                isMobile ? "grid-cols-2" : "grid-cols-4"
              )}>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Trophy className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                  <div className="font-bold text-blue-700 dark:text-blue-400">{completedLessons.length}</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">Completed</div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Target className="w-6 h-6 mx-auto mb-2 text-green-500" />
                  <div className="font-bold text-green-700 dark:text-green-400">{Math.round(completionPercentage)}%</div>
                  <div className="text-xs text-green-600 dark:text-green-400">Progress</div>
                </div>
                {!isMobile && (
                  <>
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <Award className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                      <div className="font-bold text-purple-700 dark:text-purple-400">{earnedXP}</div>
                      <div className="text-xs text-purple-600 dark:text-purple-400">XP Earned</div>
                    </div>
                    <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <Star className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                      <div className="font-bold text-orange-700 dark:text-orange-400">
                        {completionPercentage === 100 ? 'Complete!' : 'In Progress'}
                      </div>
                      <div className="text-xs text-orange-600 dark:text-orange-400">Status</div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Minimal header when collapsed */}
            {collapsedHeader && isMobile && (
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-lg truncate">{courseTitle}</h2>
                  <div className="text-sm text-muted-foreground">
                    {completedLessons.length}/{lessons.length} completed
                  </div>
                </div>
                <ProgressBar 
                  progress={completionPercentage} 
                  size="sm" 
                  className="w-20" 
                />
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Lesson Controls */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Course Curriculum</h2>
          
          <div className="flex items-center gap-2">
            {/* Filter dropdown */}
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value as FilterType)}
              className="px-3 py-2 border rounded-lg text-sm bg-background"
            >
              <option value="all">All Lessons</option>
              <option value="available">Available</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="locked">Locked</option>
            </select>

            {!isMobile && (
              <div className="flex items-center border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Next Recommended Lesson */}
        {nextRecommended && (
          <Card className="p-4 mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 text-white rounded-lg">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-700 dark:text-blue-300">Continue Learning</h3>
                  <p className="text-blue-600 dark:text-blue-400">{nextRecommended.title}</p>
                </div>
              </div>
              <Button 
                onClick={() => handleLessonSelect(nextRecommended.id)}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Play className="w-4 h-4 mr-2" />
                {userProgress.currentLesson === nextRecommended.id ? 'Continue' : 'Start'}
              </Button>
            </div>
          </Card>
        )}

        {/* Lessons Grid/List */}
        <div className={cn(
          "gap-4",
          viewMode === 'grid' && !isMobile ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "space-y-4"
        )}>
          {filteredLessons.map((lesson, index) => {
            const originalIndex = lessons.findIndex(l => l.id === lesson.id);
            const status = getLessonStatus(lesson, originalIndex);
            const progress = userProgress.currentLesson === lesson.id ? 45 : 0; // Mock progress
            
            return (
              <EnhancedLessonCard
                key={lesson.id}
                id={String(originalIndex + 1)}
                title={lesson.title}
                description={lesson.description || `Learn about ${lesson.title.toLowerCase()}`}
                duration={lesson.duration || 15}
                type="video"
                status={status}
                progress={progress}
                difficulty="beginner"
                xpReward={lesson.xpReward || 25}
                keyPoints={lesson.keyPoints || [
                  "Understand core concepts",
                  "Apply practical techniques",
                  "Build real-world skills"
                ]}
                isCurrentLesson={userProgress.currentLesson === lesson.id}
                isNextRecommended={nextRecommended?.id === lesson.id}
                onStart={() => handleLessonSelect(lesson.id)}
                onPreview={() => handleLessonPreview(lesson.id)}
                completedLessons={completedLessons.length}
                totalLessons={lessons.length}
                className={viewMode === 'list' ? "max-w-none" : ""}
              />
            );
          })}
        </div>

        {/* Course Completion Message */}
        {completionPercentage === 100 && (
          <Card className="p-6 mt-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200">
            <div className="text-center">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">Congratulations!</h3>
              <p className="text-green-600 dark:text-green-400 mb-4">
                You've completed the {courseTitle} course. You're now ready to apply your knowledge!
              </p>
              <div className="flex justify-center gap-4">
                <Button className="bg-green-500 hover:bg-green-600">
                  <Award className="w-4 h-4 mr-2" />
                  Download Certificate
                </Button>
                <Button variant="outline">
                  <Star className="w-4 h-4 mr-2" />
                  Share Achievement
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Empty state for filtered results */}
        {filteredLessons.length === 0 && (
          <Card className="p-8 text-center">
            <Target className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No lessons found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filter to see more lessons.
            </p>
            <Button variant="outline" onClick={() => setFilterType('all')}>
              Show All Lessons
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
