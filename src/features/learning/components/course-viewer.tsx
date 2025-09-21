import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Users, 
  Play,
  Lock,
  Star
} from "lucide-react";
import LessonViewer, { LessonContent } from "./lesson-viewer";
import { UserType } from "@/types/user";

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

  const completionPercentage = (completedLessons.length / lessons.length) * 100;
  const selectedLesson = lessons.find(lesson => lesson.id === selectedLessonId);

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

  const handleLessonNavigation = (lessonId: string) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
      setSelectedLessonId(lessonId);
    }
  };

  const handleBackToCourseOverview = () => {
    setCurrentView('overview');
    setSelectedLessonId('');
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
        onBack={handleBackToCourseOverview}
        progress={progress}
        userType={userType}
        isFirstLesson={lessonIndex === 0}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-3 sm:mb-4 flex items-center gap-2 h-9 sm:h-10"
          size="sm"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Back to Courses</span>
          <span className="sm:hidden">Back</span>
        </Button>
        
        <Card className="p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6">
            <div className="flex-1 mb-4 sm:mb-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">{courseTitle}</h1>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-3 sm:mb-4 overflow-hidden">{courseDescription}</p>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium text-sm sm:text-base truncate">{mentor}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground truncate">{mentorBio}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-4">
                  <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                    <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{lessons.length} Lessons</span>
                    <span className="sm:hidden">{lessons.length}</span>
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{lessons.reduce((total, lesson) => {
                      const minutes = parseInt(lesson.duration.split(' ')[0]);
                      return total + minutes;
                    }, 0)} min</span>
                  </Badge>
                </div>
              </div>
            </div>
            
          </div>

        </Card>
      </div>

      {/* Lesson List - Mobile Optimized */}
      <Card className="p-3 sm:p-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6">Course Curriculum</h2>
        
        <div className="space-y-2 sm:space-y-4">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isLocked = isLessonLocked(lesson, index);
            const isCurrent = userProgress.currentLesson === lesson.id;
            
            return (
              <Card 
                key={lesson.id}
                className={`p-3 sm:p-4 transition-all cursor-pointer hover:shadow-md ${
                  isLocked ? 'opacity-50 cursor-not-allowed' : ''
                } ${
                  isCurrent ? 'border-primary border-2' : ''
                }`}
                onClick={() => !isLocked && handleLessonSelect(lesson.id)}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Visual Status Indicator */}
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCompleted ? 'bg-green-500 text-white' :
                    isLocked ? 'bg-gray-300 text-gray-600' :
                    isCurrent ? 'bg-primary text-primary-foreground' :
                    'bg-blue-500 text-white'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : isLocked ? (
                      <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </div>
                  
                  {/* Lesson Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm sm:text-base md:text-lg truncate">{lesson.title}</h3>
                        <p className="text-muted-foreground text-xs sm:text-sm overflow-hidden mt-1">{lesson.description}</p>
                        
                        {/* Mobile-optimized badges */}
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {lesson.duration}
                          </Badge>
                          <Badge variant="outline" className="text-xs flex items-center gap-1 hidden sm:flex">
                            <BookOpen className="w-3 h-3" />
                            {lesson.quiz.length} questions
                          </Badge>
                          {isCurrent && (
                            <Badge className="text-xs bg-primary">
                              Continue Here
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {/* Action Button */}
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        {isCompleted && (
                          <Badge className="bg-green-500 text-xs hidden sm:flex">
                            <Trophy className="w-3 h-3 mr-1" />
                            Complete
                          </Badge>
                        )}
                        
                        {!isLocked && (
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLessonSelect(lesson.id);
                            }}
                            className="h-8 px-3 text-xs sm:text-sm"
                          >
                            {isCompleted ? (
                              <span className="flex items-center gap-1">
                                <Trophy className="w-3 h-3 sm:hidden" />
                                <span className="hidden sm:inline">Review</span>
                                <span className="sm:hidden">Done</span>
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <Play className="w-3 h-3" />
                                <span className="hidden sm:inline">Start</span>
                              </span>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Course Completion Message - Mobile Optimized */}
        {completionPercentage === 100 && (
          <Card className="p-4 sm:p-6 mt-4 sm:mt-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <div className="text-center">
              <Trophy className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-yellow-500" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-700 mb-2">Congratulations!</h3>
              <p className="text-sm sm:text-base text-green-600 mb-4">
                You've completed the {courseTitle} course. You're now ready to apply your knowledge!
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Button className="bg-green-500 hover:bg-green-600 text-sm">
                  Download Certificate
                </Button>
                <Button variant="outline" className="text-sm">
                  Share Achievement
                </Button>
              </div>
            </div>
          </Card>
        )}
      </Card>
    </div>
  );
}
