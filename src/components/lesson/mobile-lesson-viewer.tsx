import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSwipeGesture } from "@/hooks/use-swipe-gesture";
import { QuizComponent } from "@/components/lesson/quiz-component";
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  Award,
  Clock,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Star,
  Trophy,
  Target,
  Lightbulb,
  Video,
  FileText,
  Home,
  ArrowRight,
  Lock,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileLessonViewerProps {
  courseId: string;
  lessonId: string;
  lessons: any[];
  onBack: () => void;
  userType?: 'free' | 'paid';
}



// Progress animation component
const AnimatedProgress = ({ progress, showCelebration }: { progress: number; showCelebration: boolean }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="relative">
      <ProgressBar 
        progress={animatedProgress} 
        showPercentage 
        size="sm" 
        className={cn(
          "transition-all duration-700 ease-out",
          showCelebration && "animate-pulse"
        )}
      />
      {showCelebration && (
        <div className="absolute -top-2 -right-2 animate-bounce">
          <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
        </div>
      )}
    </div>
  );
};

// Celebration animation
const CelebrationAnimation = ({ show }: { show: boolean }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="animate-ping">
        <Trophy className="w-16 h-16 text-yellow-500" />
      </div>
      <div className="absolute animate-spin">
        {[...Array(8)].map((_, i) => (
          <Star 
            key={i} 
            className={cn(
              "w-4 h-4 text-yellow-400 fill-yellow-400 absolute",
              `transform rotate-[${i * 45}deg] translate-y-[-40px]`
            )}
          />
        ))}
      </div>
    </div>
  );
};



export default function MobileLessonViewer({ 
  courseId, 
  lessonId, 
  lessons, 
  onBack, 
  userType = 'paid' 
}: MobileLessonViewerProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Lesson state
  const [currentStep, setCurrentStep] = useState<'video' | 'quiz' | 'completion'>('video');
  const [quizScore, setQuizScore] = useState(0);
  const [showCelebration, setCelebration] = useState(false);
  const [showLessonPreview, setShowLessonPreview] = useState(false);
  const [previewLessonId, setPreviewLessonId] = useState<string>('');
  const [collapsedHeader, setCollapsedHeader] = useState(false);
  
  // Find current lesson and navigation
  const currentLessonIndex = lessons.findIndex(l => l.id === lessonId);
  const currentLesson = lessons[currentLessonIndex];
  const nextLesson = lessons[currentLessonIndex + 1];
  const prevLesson = lessons[currentLessonIndex - 1];
  
  // Mock lesson data - replace with actual data structure
  const lessonData = {
    id: lessonId,
    title: currentLesson?.title || "Amazon FBA Overview",
    description: currentLesson?.description || "Learn the fundamentals of Amazon FBA",
    duration: 15,
    xpReward: 25,
    difficulty: "beginner" as const,
    content: {
      video: {
        title: "Getting Started with Amazon FBA",
        description: "Watch this overview of how Amazon FBA works for digital nomads",
        videoUrl: "https://example.com/amazon-fba-intro.mp4",
        keyPoints: [
          "Understanding Amazon FBA business model",
          "Why it's perfect for digital nomads",
          "Initial investment requirements ($3,000-$5,000)", 
          "Time commitment (2-4 hours daily initially)"
        ]
      },
      actionItems: [
        "Research product categories on Amazon",
        "Set up your business structure", 
        "Create Amazon Seller Central account",
        "Find your first product opportunity"
      ]
    }
  };

  const progress = currentStep === 'video' ? 33 : currentStep === 'quiz' ? 66 : 100;

  // Swipe navigation
  const handleSwipeLeft = () => {
    if (nextLesson) {
      navigate(`/course/${courseId}/lesson/${nextLesson.id}`);
    }
  };

  const handleSwipeRight = () => {
    if (prevLesson) {
      navigate(`/course/${courseId}/lesson/${prevLesson.id}`);
    }
  };

  useSwipeGesture({ onSwipeLeft: handleSwipeLeft, onSwipeRight: handleSwipeRight });

  // Lesson completion handler
  const handleVideoComplete = () => {
    setCurrentStep('quiz');
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    setCurrentStep('completion');
    
    // Show celebration for good scores
    if (score >= 70) {
      setCelebration(true);
      setTimeout(() => setCelebration(false), 3000);
    }
  };

  const handleLessonPreview = (lessonId: string) => {
    setPreviewLessonId(lessonId);
    setShowLessonPreview(true);
  };

  const handleStartLesson = (lessonId: string) => {
    setShowLessonPreview(false);
    navigate(`/course/${courseId}/lesson/${lessonId}`);
  };

  const isLessonCompleted = (lesson: any) => {
    // Mock completion logic - replace with actual state
    return false;
  };

  const isLessonLocked = (lesson: any, index: number) => {
    if (index === 0) return false;
    if (userType === 'free' && index > 0) return true;
    // Check if previous lesson is completed
    return !isLessonCompleted(lessons[index - 1]);
  };

  // Generate breadcrumb
  const breadcrumb = `Courses > ${courseId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} > ${lessonData.title}`;

  return (
    <div className={cn("min-h-screen bg-background", isMobile && "pb-20")}>
      {/* Celebration Animation */}
      <CelebrationAnimation show={showCelebration} />
      
      {/* Mobile Header - Collapsible */}
      <div className={cn(
        "sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b",
        "transition-all duration-300",
        collapsedHeader && isMobile ? "h-12" : "h-auto"
      )}>
        <div className="max-w-4xl mx-auto p-4">
          {/* Navigation Bar */}
          <div className="flex items-center justify-between mb-2">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              {isMobile ? '' : 'Back to Course'}
            </Button>
            
            {isMobile && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCollapsedHeader(!collapsedHeader)}
              >
                {collapsedHeader ? 
                  <ChevronRight className="w-4 h-4" /> : 
                  <ChevronLeft className="w-4 h-4" />
                }
              </Button>
            )}
          </div>

          {/* Breadcrumb */}
          {!collapsedHeader && (
            <div className="text-xs text-muted-foreground mb-3 truncate">
              {breadcrumb}
            </div>
          )}

          {/* Lesson Progress */}
          <div className={cn(
            "transition-all duration-300",
            collapsedHeader && isMobile ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
          )}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <h1 className={cn(
                  "font-bold mb-1 truncate",
                  isMobile ? "text-lg" : "text-2xl"
                )}>
                  {lessonData.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{lessonData.duration} min</span>
                  <Award className="w-3 h-3" />
                  <span>{lessonData.xpReward} XP</span>
                </div>
              </div>
              
              <div className="text-right ml-4">
                <AnimatedProgress 
                  progress={progress} 
                  showCelebration={currentStep === 'completion'} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        
        {/* Video Section */}
        {currentStep === 'video' && (
          <Card className="overflow-hidden">
            <div className="aspect-video bg-gray-900 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-medium mb-2">{lessonData.title}</p>
                  <p className="text-sm opacity-80">Video placeholder - {lessonData.duration} min</p>
                  <Button 
                    className="mt-4"
                    onClick={handleVideoComplete}
                  >
                    Complete Video
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Key Takeaways
              </h3>
              <div className="space-y-2">
                {lessonData.content.video.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Quiz Section */}
        {currentStep === 'quiz' && (
          <Card className="p-4">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Knowledge Check
            </h3>
            <QuizComponent 
              questions={[
                {
                  id: "q1",
                  question: "What is the main benefit of Amazon FBA for digital nomads?",
                  options: [
                    { id: "a", text: "Low startup costs", isCorrect: false },
                    { id: "b", text: "Location independence", isCorrect: true },
                    { id: "c", text: "No inventory management", isCorrect: false },
                    { id: "d", text: "Guaranteed profits", isCorrect: false }
                  ],
                  explanation: "Amazon FBA allows you to run a business from anywhere in the world, making it perfect for digital nomads."
                }
              ]}
              onComplete={handleQuizComplete}
            />
          </Card>
        )}

        {/* Completion Section */}
        {currentStep === 'completion' && (
          <div className="space-y-4">
            <Card className="p-6 text-center bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-2xl font-bold text-green-700 mb-2">Lesson Complete!</h3>
              <p className="text-green-600 mb-4">
                You scored {quizScore}% on the quiz. Great work!
              </p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge className="bg-green-500">
                  <Award className="w-4 h-4 mr-1" />
                  +{lessonData.xpReward} XP
                </Badge>
                <Badge className="bg-blue-500">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Completed
                </Badge>
              </div>
              
              {nextLesson && (
                <Button 
                  onClick={() => handleStartLesson(nextLesson.id)}
                  className="w-full bg-green-500 hover:bg-green-600"
                >
                  Continue to Next Lesson
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </Card>

            {/* Action Items */}
            <Card className="p-4">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-500" />
                Action Items
              </h3>
              <div className="space-y-2">
                {lessonData.content.actionItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                    <div className="w-5 h-5 rounded border-2 border-primary"></div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Course Navigation - Mobile Bottom Sheet */}
      {isMobile ? (
        <Drawer open={showLessonPreview} onOpenChange={setShowLessonPreview}>
          <DrawerContent className="max-h-[80vh]">
            <DrawerHeader>
              <DrawerTitle>Course Lessons</DrawerTitle>
              <DrawerDescription>
                {lessons.length} lessons in this course
              </DrawerDescription>
            </DrawerHeader>
            
            <div className="px-4 pb-4 space-y-2 overflow-y-auto">
              {lessons.map((lesson, index) => {
                const isCompleted = isLessonCompleted(lesson);
                const isLocked = isLessonLocked(lesson, index);
                const isCurrent = lesson.id === lessonId;
                
                return (
                  <Card 
                    key={lesson.id}
                    className={cn(
                      "p-3 transition-all",
                      isCurrent && "border-primary border-2 bg-primary/5",
                      isLocked && "opacity-50",
                      !isLocked && "cursor-pointer hover:shadow-md"
                    )}
                    onClick={() => !isLocked && handleLessonPreview(lesson.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                        isCompleted ? "bg-green-500 text-white" :
                        isCurrent ? "bg-primary text-primary-foreground" :
                        isLocked ? "bg-gray-300 text-gray-600" :
                        "bg-blue-100 text-blue-600"
                      )}>
                        {isCompleted ? <CheckCircle className="w-4 h-4" /> :
                         isLocked ? <Lock className="w-4 h-4" /> :
                         index + 1}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{lesson.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{lesson.duration || '15 min'}</span>
                          {isCurrent && (
                            <Badge variant="outline" className="text-xs">Current</Badge>
                          )}
                        </div>
                      </div>
                      
                      {!isLocked && (
                        <Button 
                          size="sm" 
                          variant={isCurrent ? "default" : "outline"}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartLesson(lesson.id);
                          }}
                        >
                          {isCompleted ? "Review" : isCurrent ? "Continue" : "Start"}
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
            
            <DrawerFooter>
              <Button variant="outline" onClick={() => setShowLessonPreview(false)}>
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        /* Desktop Sheet */
        <Sheet open={showLessonPreview} onOpenChange={setShowLessonPreview}>
          <SheetContent side="right" className="w-96">
            <SheetHeader>
              <SheetTitle>Course Navigation</SheetTitle>
              <SheetDescription>
                Navigate between lessons in this course
              </SheetDescription>
            </SheetHeader>
            {/* Similar content as mobile but in sheet format */}
          </SheetContent>
        </Sheet>
      )}

      {/* Navigation Arrows - Desktop/Tablet */}
      {!isMobile && (
        <>
          {prevLesson && (
            <Button
              variant="outline"
              size="sm"
              className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40"
              onClick={handleSwipeRight}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          )}
          
          {nextLesson && (
            <Button
              variant="outline"
              size="sm"
              className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40"
              onClick={handleSwipeLeft}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </>
      )}

      {/* Floating Next Lesson Button */}
      <FloatingActionButton
        onClick={() => nextLesson && handleStartLesson(nextLesson.id)}
        isVisible={currentStep === 'completion' && !!nextLesson}
        variant="success"
      >
        <ArrowRight className="w-6 h-6" />
      </FloatingActionButton>

      {/* Lesson Navigation Bar - Mobile */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-30">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={!prevLesson}
              onClick={handleSwipeRight}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <Button 
              variant="outline"
              size="sm"
              onClick={() => setShowLessonPreview(true)}
              className="flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              {currentLessonIndex + 1} of {lessons.length}
            </Button>
            
            <Button 
              size="sm" 
              disabled={!nextLesson}
              onClick={handleSwipeLeft}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
