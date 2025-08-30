import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UserType } from '@/types/user';
import { useUser } from '@/contexts/user-context';
import JourneyNavigation, { JourneyStep } from '@/components/layout/JourneyNavigation';
import IncomeTypeSelector, { IncomeType } from './journey-steps/IncomeTypeSelector';
import CourseRecommendation, { Course } from './journey-steps/CourseRecommendation';
import CoursePreview from './journey-steps/CoursePreview';
import StartLearning from './journey-steps/StartLearning';

// Journey state interface
interface JourneyState {
  selectedIncomeType?: IncomeType;
  selectedCourse?: Course;
  completedSteps: Set<number>;
  userSelections: {
    incomeTypeId?: string;
    courseId?: string;
  };
}

const STORAGE_KEY = 'income-journey-state';

export default function IncomeJourney() {
  const { userType } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [journeyState, setJourneyState] = useState<JourneyState>({
    completedSteps: new Set(),
    userSelections: {}
  });

  // Initialize from URL and localStorage
  useEffect(() => {
    // Get step from URL
    const stepFromUrl = parseInt(searchParams.get('step') || '0');
    setCurrentStep(Math.max(0, Math.min(stepFromUrl, 3)));

    // Load saved state from localStorage
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        setJourneyState(prev => ({
          ...prev,
          userSelections: parsed.userSelections || {},
          completedSteps: new Set(parsed.completedSteps || [])
        }));
      }
    } catch (error) {
      console.warn('Failed to load journey state from localStorage:', error);
    }
  }, [searchParams]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      const stateToSave = {
        userSelections: journeyState.userSelections,
        completedSteps: Array.from(journeyState.completedSteps)
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.warn('Failed to save journey state to localStorage:', error);
    }
  }, [journeyState]);

  // Update URL when step changes
  const updateUrlStep = useCallback((step: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('step', step.toString());
    setSearchParams(newSearchParams);
  }, [searchParams, setSearchParams]);

  // Mark step as completed
  const markStepCompleted = (stepIndex: number) => {
    setJourneyState(prev => ({
      ...prev,
      completedSteps: new Set([...prev.completedSteps, stepIndex])
    }));
  };

  // Journey step handlers
  const handleIncomeTypeSelect = (incomeType: IncomeType) => {
    setJourneyState(prev => ({
      ...prev,
      selectedIncomeType: incomeType,
      userSelections: {
        ...prev.userSelections,
        incomeTypeId: incomeType.id
      }
    }));
  };

  const handleCourseSelect = (course: Course) => {
    setJourneyState(prev => ({
      ...prev,
      selectedCourse: course,
      userSelections: {
        ...prev.userSelections,
        courseId: course.id
      }
    }));
  };

  const handleStepNext = () => {
    markStepCompleted(currentStep);
    const nextStep = Math.min(currentStep + 1, steps.length - 1);
    setCurrentStep(nextStep);
    updateUrlStep(nextStep);
  };

  const handleStepPrevious = () => {
    const prevStep = Math.max(currentStep - 1, 0);
    setCurrentStep(prevStep);
    updateUrlStep(prevStep);
  };

  const handleStepChange = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    updateUrlStep(stepIndex);
  };

  const handleStartCourse = () => {
    // This would typically navigate to the actual course content
    // For now, we'll mark the journey as completed
    markStepCompleted(currentStep);
    console.log('Starting course:', journeyState.selectedCourse?.title);
    
    // You could navigate to a course viewer here
    // navigate(`/course/${journeyState.selectedCourse?.id}`);
  };

  // Define journey steps
  const steps: JourneyStep[] = [
    {
      id: 'income-type',
      title: 'Choose Your Income Path',
      description: 'Select the income strategy that best matches your skills and goals',
      component: IncomeTypeSelector,
      isCompleted: journeyState.completedSteps.has(0) || !!journeyState.selectedIncomeType,
      isAccessible: true,
      order: 0
    },
    {
      id: 'course-recommendation',
      title: 'Recommended Course',
      description: 'Get a personalized course recommendation based on your income path',
      component: CourseRecommendation,
      isCompleted: journeyState.completedSteps.has(1) || !!journeyState.selectedCourse,
      isAccessible: !!journeyState.selectedIncomeType,
      order: 1
    },
    {
      id: 'course-preview',
      title: 'Course Preview',
      description: 'Explore the course content and see what you\'ll learn',
      component: CoursePreview,
      isCompleted: journeyState.completedSteps.has(2),
      isAccessible: !!journeyState.selectedCourse,
      order: 2
    },
    {
      id: 'start-learning',
      title: 'Start Learning',
      description: 'Begin your learning journey with full access or free preview',
      component: StartLearning,
      isCompleted: journeyState.completedSteps.has(3),
      isAccessible: !!journeyState.selectedCourse,
      order: 3
    }
  ];

  // Determine navigation capabilities
  const canGoNext = () => {
    switch (currentStep) {
      case 0: return !!journeyState.selectedIncomeType;
      case 1: return !!journeyState.selectedCourse;
      case 2: return true; // Always can proceed from preview
      case 3: return false; // Final step
      default: return false;
    }
  };

  const canGoPrevious = () => {
    return currentStep > 0;
  };

  // Render current step component
  const renderCurrentStep = () => {
    const currentStepData = steps[currentStep];
    const StepComponent = currentStepData.component;

    switch (currentStep) {
      case 0:
        return (
          <IncomeTypeSelector
            selectedType={journeyState.userSelections.incomeTypeId}
            onTypeSelect={handleIncomeTypeSelect}
            onNext={handleStepNext}
          />
        );
      
      case 1:
        if (!journeyState.selectedIncomeType) {
          // Fallback if user navigated directly to this step
          setCurrentStep(0);
          updateUrlStep(0);
          return null;
        }
        return (
          <CourseRecommendation
            selectedIncomeType={journeyState.selectedIncomeType.id}
            userType={userType}
            onCourseSelect={handleCourseSelect}
            onNext={handleStepNext}
            onBack={handleStepPrevious}
          />
        );
      
      case 2:
        if (!journeyState.selectedCourse) {
          // Fallback if user navigated directly to this step
          setCurrentStep(1);
          updateUrlStep(1);
          return null;
        }
        return (
          <CoursePreview
            selectedCourse={journeyState.selectedCourse}
            userType={userType}
            onStartLearning={handleStepNext}
            onBack={handleStepPrevious}
          />
        );
      
      case 3:
        if (!journeyState.selectedCourse) {
          // Fallback if user navigated directly to this step
          setCurrentStep(2);
          updateUrlStep(2);
          return null;
        }
        return (
          <StartLearning
            selectedCourse={journeyState.selectedCourse}
            userType={userType}
            onStartCourse={handleStartCourse}
            onBack={handleStepPrevious}
          />
        );
      
      default:
        return (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Step not found</h2>
            <p className="text-muted-foreground mb-4">The requested step could not be found.</p>
            <button 
              onClick={() => {
                setCurrentStep(0);
                updateUrlStep(0);
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              Go to Start
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Journey Navigation */}
      <JourneyNavigation
        currentStep={currentStep}
        steps={steps}
        onStepChange={handleStepChange}
        onNext={handleStepNext}
        onPrevious={handleStepPrevious}
        userType={userType}
        canGoNext={canGoNext()}
        canGoPrevious={canGoPrevious()}
      />

      {/* Step Content */}
      <div className="container mx-auto">
        <div 
          key={currentStep}
          className="animate-in slide-in-from-right-4 fade-in duration-500 ease-out"
        >
          {renderCurrentStep()}
        </div>
      </div>

      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs font-mono opacity-50">
          Step: {currentStep} | 
          Income: {journeyState.selectedIncomeType?.id || 'none'} | 
          Course: {journeyState.selectedCourse?.id || 'none'}
        </div>
      )}
    </div>
  );
}
