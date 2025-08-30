import { useState, useEffect } from "react";
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
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Button>
        
        <Card className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{courseTitle}</h1>
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
                    {lessons.reduce((total, lesson) => {
                      const minutes = parseInt(lesson.duration.split(' ')[0]);
                      return total + minutes;
                    }, 0)} min total
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="text-right">
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
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <div className="font-bold text-blue-700">{completedLessons.length}</div>
              <div className="text-xs text-blue-600">Completed</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Target className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <div className="font-bold text-green-700">{Math.round(completionPercentage)}%</div>
              <div className="text-xs text-green-600">Progress</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Award className="w-6 h-6 mx-auto mb-2 text-purple-500" />
              <div className="font-bold text-purple-700">{lessons.reduce((total, lesson) => total + lesson.quiz.length, 0)}</div>
              <div className="text-xs text-purple-600">Total Quizzes</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Star className="w-6 h-6 mx-auto mb-2 text-orange-500" />
              <div className="font-bold text-orange-700">{completionPercentage === 100 ? 'Complete!' : 'In Progress'}</div>
              <div className="text-xs text-orange-600">Status</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Lesson List */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
        
        <div className="space-y-4">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isLocked = isLessonLocked(lesson, index);
            const isCurrent = userProgress.currentLesson === lesson.id;
            
            return (
              <Card 
                key={lesson.id}
                className={`p-4 transition-all cursor-pointer hover:shadow-md ${
                  isLocked ? 'opacity-50 cursor-not-allowed' : ''
                } ${
                  isCurrent ? 'border-primary border-2' : ''
                }`}
                onClick={() => !isLocked && handleLessonSelect(lesson.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-500 text-white' :
                      isLocked ? 'bg-gray-300 text-gray-600' :
                      'bg-blue-500 text-white'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : isLocked ? (
                        <Lock className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{lesson.title}</h3>
                      <p className="text-muted-foreground">{lesson.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {lesson.duration}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {lesson.quiz.length} questions
                        </Badge>
                        {isCurrent && (
                          <Badge className="text-xs bg-blue-500">
                            Continue Here
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {isCompleted && (
                      <Badge className="bg-green-500">
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
                      >
                        {isCompleted ? 'Review' : 'Start'}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Course Completion Message */}
        {completionPercentage === 100 && (
          <Card className="p-6 mt-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <div className="text-center">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-2xl font-bold text-green-700 mb-2">Congratulations!</h3>
              <p className="text-green-600 mb-4">
                You've completed the {courseTitle} course. You're now ready to apply your knowledge!
              </p>
              <div className="flex justify-center gap-4">
                <Button className="bg-green-500 hover:bg-green-600">
                  Download Certificate
                </Button>
                <Button variant="outline">
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
