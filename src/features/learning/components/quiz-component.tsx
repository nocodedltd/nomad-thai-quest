import { useState } from "react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { ProgressBar } from "@/shared/components/ui/progress-bar";
import { CheckCircle, X, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  explanation?: string;
}

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  onBack?: () => void;
}

export function QuizComponent({ questions, onComplete, onBack }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (optionId: string) => {
    setSelectedAnswer(optionId);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const newAnswers = { ...answers, [currentQuestion.id]: selectedAnswer };
    setAnswers(newAnswers);

    const selectedOption = currentQuestion.options.find(opt => opt.id === selectedAnswer);
    if (selectedOption?.isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleContinue = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      onComplete(score);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(answers[questions[currentQuestionIndex - 1].id] || null);
      setShowResult(false);
    }
  };

  const selectedOption = currentQuestion.options.find(opt => opt.id === selectedAnswer);
  const isCorrect = selectedOption?.isCorrect || false;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Quiz Time!</h2>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
        <ProgressBar progress={progress} size="md" />
      </div>

      {/* Question Card */}
      <Card className="p-6 mb-6">
        <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => !showResult && handleAnswer(option.id)}
              disabled={showResult}
              className={cn(
                "w-full p-4 text-left rounded-lg border-2 transition-all",
                "hover:border-primary hover:bg-primary/5",
                selectedAnswer === option.id && !showResult && "border-primary bg-primary/10",
                showResult && option.isCorrect && "border-accent bg-accent/10 text-accent-foreground",
                showResult && selectedAnswer === option.id && !option.isCorrect && "border-destructive bg-destructive/10 text-destructive-foreground",
                showResult && selectedAnswer !== option.id && !option.isCorrect && "opacity-50"
              )}
            >
              <div className="flex items-center justify-between">
                <span>{option.text}</span>
                {showResult && option.isCorrect && (
                  <CheckCircle className="w-5 h-5 text-accent" />
                )}
                {showResult && selectedAnswer === option.id && !option.isCorrect && (
                  <X className="w-5 h-5 text-destructive" />
                )}
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Result Explanation */}
      {showResult && currentQuestion.explanation && (
        <Card className={cn(
          "p-4 mb-6",
          isCorrect ? "border-accent bg-accent/5" : "border-warning bg-warning/5"
        )}>
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
            ) : (
              <X className="w-5 h-5 text-warning mt-0.5" />
            )}
            <div>
              <h4 className="font-semibold mb-2">
                {isCorrect ? "Correct!" : "Not quite right"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {currentQuestion.explanation}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={currentQuestionIndex === 0 ? onBack : handlePrevious}
          disabled={!onBack && currentQuestionIndex === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {currentQuestionIndex === 0 ? "Back to Lesson" : "Previous"}
        </Button>

        {!showResult ? (
          <Button
            onClick={handleNext}
            disabled={!selectedAnswer}
            variant="default"
          >
            Submit Answer
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleContinue}
            variant="success"
          >
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Complete Quiz"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}