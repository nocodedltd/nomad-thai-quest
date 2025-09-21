import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { UpgradePrompt } from "@/shared/components/paywall/upgrade-prompt";
import { UserType } from "@/types/user";
import { 
  Play, 
  CheckCircle, 
  Clock, 
  Award, 
  BookOpen, 
  Target, 
  ArrowLeft, 
  ArrowRight,
  Lightbulb,
  FileText,
  Video,
  Trophy,
  Lock
} from "lucide-react";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface HomeworkTask {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  deliverable: string;
  tips: string[];
}

export interface LessonContent {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  transcript?: string;
  keyPoints: string[];
  quiz: QuizQuestion[];
  homework: HomeworkTask;
  nextLesson?: string;
  previousLesson?: string;
}

interface LessonViewerProps {
  lesson: LessonContent;
  isCompleted: boolean;
  isLocked: boolean;
  onComplete: (lessonId: string) => void;
  onNavigate: (lessonId: string) => void;
  onBack: () => void;
  progress: number;
  userType?: UserType;
  isFirstLesson?: boolean;
}

export default function LessonViewer({ 
  lesson, 
  isCompleted, 
  isLocked, 
  onComplete, 
  onNavigate,
  onBack,
  progress,
  userType = 'paid',
  isFirstLesson = false
}: LessonViewerProps) {
  const [currentSection, setCurrentSection] = useState<'video' | 'quiz' | 'homework'>('video');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [homeworkSubmitted, setHomeworkSubmitted] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);

  if (isLocked) {
    return (
      <Card className="p-8 text-center">
        <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-bold mb-2">Lesson Locked</h3>
        <p className="text-muted-foreground mb-4">
          Complete the previous lesson to unlock this content
        </p>
        <Badge variant="outline">
          {lesson.duration} • {lesson.quiz.length} questions
        </Badge>
      </Card>
    );
  }

  const handleQuizSubmit = () => {
    let correct = 0;
    lesson.quiz.forEach(question => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    setQuizScore(correct);
    setQuizCompleted(true);
    
    if (correct >= lesson.quiz.length * 0.7) { // 70% pass rate
      if (videoWatched && homeworkSubmitted) {
        onComplete(lesson.id);
      }
    }
  };

  const handleHomeworkSubmit = () => {
    setHomeworkSubmitted(true);
    if (videoWatched && quizCompleted && quizScore >= lesson.quiz.length * 0.7) {
      onComplete(lesson.id);
    }
  };

  const canProceed = videoWatched && quizCompleted && homeworkSubmitted && quizScore >= lesson.quiz.length * 0.7;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="flex items-center gap-2 h-9 sm:h-10"
          size="sm"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Back to Course</span>
          <span className="sm:hidden">Back</span>
        </Button>
      </div>

      {/* Lesson Header */}
      <Card className="p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
            <p className="text-muted-foreground mb-4">{lesson.description}</p>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {lesson.duration}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                {lesson.quiz.length} Questions
              </Badge>
              {isCompleted && (
                <Badge className="bg-green-500 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Completed
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 p-2 subsection-nav-frosted">
          <button
            onClick={() => setCurrentSection('video')}
            className={`subsection-button-frosted flex items-center gap-2 ${currentSection === 'video' ? 'selected' : ''}`}
          >
            <Video className="w-4 h-4" />
            Watch Video
            {videoWatched && <CheckCircle className="w-4 h-4 text-green-500" />}
          </button>
          <button
            onClick={() => setCurrentSection('quiz')}
            className={`subsection-button-frosted flex items-center gap-2 ${currentSection === 'quiz' ? 'selected' : ''} ${!videoWatched ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!videoWatched}
          >
            <BookOpen className="w-4 h-4" />
            Take Quiz
            {quizCompleted && <CheckCircle className="w-4 h-4 text-green-500" />}
          </button>
          <button
            onClick={() => setCurrentSection('homework')}
            className={`subsection-button-frosted flex items-center gap-2 ${currentSection === 'homework' ? 'selected' : ''} ${(!quizCompleted || quizScore < lesson.quiz.length * 0.7) ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!quizCompleted || quizScore < lesson.quiz.length * 0.7}
          >
            <FileText className="w-4 h-4" />
            Homework
            {homeworkSubmitted && <CheckCircle className="w-4 h-4 text-green-500" />}
          </button>
        </div>
      </Card>

      {/* Video Section */}
      {currentSection === 'video' && (
        <Card className="p-6 mb-6">
          <div className="aspect-video bg-gray-900 rounded-lg mb-6 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <p className="text-lg font-medium mb-2">{lesson.title}</p>
                <p className="text-sm opacity-80">Video placeholder - {lesson.duration}</p>
                <Button 
                  className="mt-4"
                  onClick={() => setVideoWatched(true)}
                >
                  {videoWatched ? 'Rewatch Video' : 'Start Video'}
                </Button>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Key Takeaways
            </h3>
            <div className="grid gap-3">
              {lesson.keyPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-medium flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </div>

          {videoWatched && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Video completed!</span>
              </div>
              <p className="text-green-600 text-sm mt-1">
                Ready to test your knowledge? Take the quiz to continue.
              </p>
            </div>
          )}
        </Card>
      )}

      {/* Quiz Section */}
      {currentSection === 'quiz' && (
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            Knowledge Check
          </h3>

          {!quizCompleted ? (
            <div className="space-y-6">
              {lesson.quiz.map((question, questionIndex) => (
                <div key={question.id} className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-4">
                    Question {questionIndex + 1}: {question.question}
                  </h4>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <label key={optionIndex} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <input
                          type="radio"
                          name={question.id}
                          value={optionIndex}
                          onChange={() => setQuizAnswers({...quizAnswers, [question.id]: optionIndex})}
                          className="w-4 h-4"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <Button 
                onClick={handleQuizSubmit}
                className="w-full"
                disabled={Object.keys(quizAnswers).length !== lesson.quiz.length}
              >
                Submit Quiz
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className={`p-4 rounded-lg border ${quizScore >= lesson.quiz.length * 0.7 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className={`w-5 h-5 ${quizScore >= lesson.quiz.length * 0.7 ? 'text-green-500' : 'text-red-500'}`} />
                  <span className="font-medium">
                    Quiz Score: {quizScore}/{lesson.quiz.length} ({Math.round((quizScore / lesson.quiz.length) * 100)}%)
                  </span>
                </div>
                <p className={`text-sm ${quizScore >= lesson.quiz.length * 0.7 ? 'text-green-600' : 'text-red-600'}`}>
                  {quizScore >= lesson.quiz.length * 0.7 
                    ? 'Great job! You can now proceed to the homework.'
                    : 'You need 70% to pass. Review the video and try again.'
                  }
                </p>
              </div>

              {/* Show explanations */}
              {lesson.quiz.map((question, index) => (
                <div key={question.id} className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Question {index + 1}: {question.question}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Your answer: {question.options[quizAnswers[question.id]]}
                    {quizAnswers[question.id] === question.correctAnswer ? ' ✅' : ' ❌'}
                  </p>
                  <p className="text-sm text-green-600">
                    Correct answer: {question.options[question.correctAnswer]}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">{question.explanation}</p>
                </div>
              ))}

              {quizScore < lesson.quiz.length * 0.7 && (
                <Button 
                  onClick={() => {
                    setQuizCompleted(false);
                    setQuizAnswers({});
                    setQuizScore(0);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Retake Quiz
                </Button>
              )}
            </div>
          )}
        </Card>
      )}

      {/* Homework Section */}
      {currentSection === 'homework' && (
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-500" />
            Practical Assignment
          </h3>

          <div className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">{lesson.homework.title}</h4>
              <p className="text-blue-800 mb-3">{lesson.homework.description}</p>
              <div className="flex items-center gap-4 text-sm text-blue-700">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {lesson.homework.estimatedTime}
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  {lesson.homework.deliverable}
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                Tips for Success
              </h4>
              <ul className="space-y-2">
                {lesson.homework.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {!homeworkSubmitted ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Submit your completed assignment:
                  </label>
                  <textarea 
                    className="w-full p-3 border rounded-lg h-32 resize-none"
                    placeholder="Paste your work, upload link, or describe what you've completed..."
                  />
                </div>
                <Button 
                  onClick={handleHomeworkSubmit}
                  className="w-full"
                >
                  Submit Assignment
                </Button>
              </div>
            ) : (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Assignment submitted!</span>
                </div>
                <p className="text-green-600 text-sm mt-1">
                  Great work! You've completed this lesson.
                </p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Free User Upgrade Prompt */}
      {userType === 'free' && isFirstLesson && canProceed && (
        <UpgradePrompt 
          title="🎉 Great job completing your first lesson!"
          description="You've just completed the first lesson of this course! Upgrade now to unlock all remaining lessons and continue your learning journey."
        />
      )}

      {/* Navigation */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            {lesson.previousLesson && (
              <Button 
                variant="outline" 
                onClick={() => onNavigate(lesson.previousLesson!)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous Lesson
              </Button>
            )}
          </div>
          
          <div className="text-center">
            {canProceed && (
              <Badge className="bg-green-500">
                <Trophy className="w-4 h-4 mr-1" />
                Lesson Complete!
              </Badge>
            )}
          </div>
          
          <div>
            {lesson.nextLesson && canProceed && (
              userType === 'free' && isFirstLesson ? (
                <UpgradePrompt 
                  compact
                  title="Unlock Next Lesson"
                  description="Complete your upgrade to continue with the full course"
                />
              ) : (
                <Button 
                  onClick={() => onNavigate(lesson.nextLesson!)}
                  className="flex items-center gap-2"
                >
                  Next Lesson
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
