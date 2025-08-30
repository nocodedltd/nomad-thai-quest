import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EnhancedCourseViewer } from "@/components/lesson/enhanced-course-viewer";
import MobileLessonViewer from "@/components/lesson/mobile-lesson-viewer";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock course data
const mockCourse = {
  id: "amazon-fba",
  title: "Amazon FBA Mastery",
  description: "Build a profitable Amazon FBA business from Thailand",
  mentor: "Digital Nomad Expert",
  mentorBio: "10+ years building online businesses",
  lessons: [
    {
      id: "1",
      title: "Amazon FBA Overview",
      description: "Learn the fundamentals of Amazon FBA and how to start your first business",
      duration: 15,
      xpReward: 25,
      keyPoints: [
        "Understanding Amazon FBA business model",
        "Why it's perfect for digital nomads",
        "Initial investment requirements ($3,000-$5,000)",
        "Time commitment (2-4 hours daily initially)"
      ]
    },
    {
      id: "2", 
      title: "Market Research Mastery",
      description: "Discover profitable products using proven research methods",
      duration: 20,
      xpReward: 30,
      keyPoints: [
        "Using Helium 10 for product research",
        "Analyzing competition and demand",
        "Finding profitable niches",
        "Validating product ideas"
      ]
    },
    {
      id: "3",
      title: "Product Sourcing Strategies", 
      description: "Source quality products from reliable suppliers",
      duration: 25,
      xpReward: 35,
      keyPoints: [
        "Finding reliable suppliers on Alibaba",
        "Negotiating best prices and terms",
        "Quality control and samples",
        "Managing international shipping"
      ]
    },
    {
      id: "4",
      title: "Listing Optimization",
      description: "Create high-converting Amazon listings that sell",
      duration: 18,
      xpReward: 28,
      keyPoints: [
        "Writing compelling product titles",
        "Optimizing bullet points and descriptions",
        "Professional product photography",
        "Keyword research and SEO"
      ]
    }
  ]
};

type ViewMode = 'course' | 'lesson';

export default function LessonDemo() {
  const [viewMode, setViewMode] = useState<ViewMode>('course');
  const [selectedLessonId, setSelectedLessonId] = useState('1');
  const isMobile = useIsMobile();

  const handleLessonSelect = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setViewMode('lesson');
  };

  const handleBackToCourse = () => {
    setViewMode('course');
  };

  if (viewMode === 'lesson') {
    return (
      <MobileLessonViewer
        courseId={mockCourse.id}
        lessonId={selectedLessonId}
        lessons={mockCourse.lessons}
        onBack={handleBackToCourse}
        userType="paid"
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Header */}
      <div className="border-b bg-card">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Lesson Experience Demo</h1>
              <p className="text-muted-foreground">
                Experience the new mobile-optimized lesson interface
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isMobile ? "default" : "outline"}>
                {isMobile ? "Mobile" : "Desktop"} View
              </Badge>
              <Button
                variant="outline"
                onClick={() => handleLessonSelect('1')}
              >
                Try Lesson 1
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Viewer */}
      <EnhancedCourseViewer
        courseId={mockCourse.id}
        courseTitle={mockCourse.title}
        courseDescription={mockCourse.description}
        mentor={mockCourse.mentor}
        mentorBio={mockCourse.mentorBio}
        lessons={mockCourse.lessons}
        onBack={() => console.log('Navigate to courses')}
        userType="paid"
        userProgress={{
          completedLessons: [],
          currentLesson: '1'
        }}
      />

      {/* Features Demo */}
      <div className="max-w-6xl mx-auto p-4 mt-8">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">New Features Implemented</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">📱 Mobile Optimized</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Bottom sheet for lesson details</li>
                <li>• Swipe left/right between lessons</li>
                <li>• Floating "Next Lesson" button</li>
                <li>• Collapsible course header</li>
                <li>• Touch-friendly lesson selection</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">🎯 Interaction Improvements</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Lesson preview on tap</li>
                <li>• Clear "Start" vs "Continue" CTAs</li>
                <li>• Progress animations</li>
                <li>• Celebration micro-animations</li>
                <li>• Smart lesson recommendations</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">🧭 Navigation Flow</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Better "Back to Courses" positioning</li>
                <li>• Breadcrumb navigation</li>
                <li>• Smart "Next Lesson" recommendations</li>
                <li>• Auto-advance option</li>
                <li>• Improved lesson filtering</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">👁️ Visual Hierarchy</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Current lesson: Prominent highlight</li>
                <li>• Next lesson: Secondary highlight</li>
                <li>• Completed lessons: Checkmark, dimmed</li>
                <li>• Locked lessons: Clear lock icon</li>
                <li>• Progress ring animations</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">🎉 Engagement</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Milestone celebrations</li>
                <li>• XP reward animations</li>
                <li>• Achievement badges</li>
                <li>• Progress visualization</li>
                <li>• Course completion ceremony</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">⚡ Performance</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Lazy loading components</li>
                <li>• Optimized animations</li>
                <li>• Responsive design</li>
                <li>• Fast swipe gestures</li>
                <li>• Smooth transitions</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
