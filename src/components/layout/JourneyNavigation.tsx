import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Circle, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { UserType } from '@/types/user';

export interface JourneyStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  isCompleted: boolean;
  isAccessible: boolean;
  order: number;
}

export interface JourneyNavigationProps {
  currentStep: number;
  steps: JourneyStep[];
  onStepChange: (step: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  userType: UserType;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
  className?: string;
}

export default function JourneyNavigation({
  currentStep,
  steps,
  onStepChange,
  onNext,
  onPrevious,
  userType,
  canGoNext = true,
  canGoPrevious = true,
  className = ""
}: JourneyNavigationProps) {
  const currentStepData = steps[currentStep];
  const totalSteps = steps.length;
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  // Calculate completion stats
  const completedSteps = steps.filter(step => step.isCompleted).length;
  const accessibleSteps = steps.filter(step => step.isAccessible).length;

  const getStepStatus = (stepIndex: number) => {
    const step = steps[stepIndex];
    if (!step.isAccessible) return 'locked';
    if (step.isCompleted) return 'completed';
    if (stepIndex === currentStep) return 'current';
    if (stepIndex < currentStep) return 'available';
    return 'upcoming';
  };

  const getStepIcon = (stepIndex: number) => {
    const status = getStepStatus(stepIndex);
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-gray-400" />;
      case 'current':
        return <Circle className="w-5 h-5 text-primary fill-primary" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const handleStepClick = (stepIndex: number) => {
    const step = steps[stepIndex];
    if (step.isAccessible && (stepIndex <= currentStep || step.isCompleted)) {
      onStepChange(stepIndex);
    }
  };

  return (
    <div className={`bg-background border-b sticky top-0 z-50 ${className}`}>
      <div className="container mx-auto px-4 py-4">
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Income Journey</h2>
            <Badge variant="outline" className="text-sm">
              Step {currentStep + 1} of {totalSteps}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{completedSteps}/{totalSteps} completed</span>
            {userType !== 'paid' && accessibleSteps < totalSteps && (
              <Badge variant="secondary" className="text-xs">
                {totalSteps - accessibleSteps} locked
              </Badge>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <ProgressBar 
            progress={progressPercentage}
            showPercentage={false}
            size="sm"
            className="mb-2"
          />
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{currentStepData?.title}</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progressPercentage)}% complete
            </span>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between mb-6">
          {/* Step Breadcrumbs */}
          <div className="flex items-center gap-2 flex-1 overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const status = getStepStatus(index);
              const isClickable = step.isAccessible && (index <= currentStep || step.isCompleted);
              
              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => handleStepClick(index)}
                    disabled={!isClickable}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm whitespace-nowrap ${
                      index === currentStep 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : isClickable
                        ? 'hover:bg-muted text-foreground'
                        : 'text-muted-foreground cursor-not-allowed opacity-50'
                    }`}
                  >
                    {getStepIcon(index)}
                    <span className="hidden sm:inline">{step.title}</span>
                    <span className="sm:hidden">{index + 1}</span>
                  </button>
                  
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onPrevious}
              disabled={!canGoPrevious || currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            
            <Button
              size="sm"
              onClick={onNext}
              disabled={!canGoNext || (currentStep === totalSteps - 1 && !currentStepData?.isCompleted)}
              className="flex items-center gap-2"
            >
              <span className="hidden sm:inline">
                {currentStep === totalSteps - 1 ? 'Finish' : 'Next'}
              </span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Current Step Info */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
              {currentStep + 1}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{currentStepData?.title}</h3>
              <p className="text-muted-foreground text-sm">{currentStepData?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
