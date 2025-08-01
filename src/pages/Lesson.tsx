import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { QuizComponent } from "@/components/lesson/quiz-component";
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  Award,
  Clock,
  BookOpen
} from "lucide-react";

// Course-specific lesson data
const getCourseData = (courseId: string, lessonId: string) => {
  const courseData: Record<string, Record<string, any>> = {
    "amazon-fba": {
      "1": {
        id: "amazon-fba-getting-started",
        title: "Amazon FBA Overview",
        description: "Learn the fundamentals of Amazon FBA and how to start your first business",
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
      },
      "2": {
        id: "amazon-fba-market-research",
        title: "Market Research Tools",
        description: "Master the tools and techniques for finding profitable products",
        duration: 25,
        xpReward: 75,
        difficulty: "intermediate" as const,
        content: {
          video: {
            title: "Advanced Market Research Techniques",
            description: "Learn to use professional tools for product research",
            videoUrl: "https://example.com/market-research.mp4",
            keyPoints: [
              "Using Jungle Scout and Helium 10 effectively",
              "Analyzing competition and market demand",
              "Calculating profit margins and ROI",
              "Identifying seasonal trends and opportunities"
            ]
          },
          actionItems: [
            "Set up Jungle Scout account",
            "Analyze 10 products in your chosen niche",
            "Create a product scoring spreadsheet",
            "Identify top 3 product opportunities"
          ]
        }
      },
      "4": {
        id: "amazon-fba-product-criteria",
        title: "Product Criteria Deep Dive",
        description: "Learn the exact criteria for selecting winning products",
        duration: 20,
        xpReward: 25,
        difficulty: "intermediate" as const,
        content: {
          video: {
            title: "Product Selection Criteria",
            description: "Master the criteria for choosing profitable products",
            videoUrl: "https://example.com/product-criteria.mp4",
            keyPoints: [
              "Price range optimization ($15-$50)",
              "Competition analysis (less than 50 reviews)",
              "Weight and size considerations",
              "Market demand validation"
            ]
          },
          actionItems: [
            "Create your product criteria checklist",
            "Evaluate 20 potential products",
            "Score products using the criteria matrix",
            "Select your top 5 product candidates"
          ]
        }
      }
    },
    "dropshipping": {
      "1": {
        id: "dropshipping-introduction",
        title: "Dropshipping Fundamentals",
        description: "Understanding the dropshipping business model and getting started",
        duration: 40,
        xpReward: 45,
        difficulty: "beginner" as const,
        content: {
          video: {
            title: "What is Dropshipping?",
            description: "Complete introduction to the dropshipping business model",
            videoUrl: "https://example.com/dropshipping-intro.mp4",
            keyPoints: [
              "What is dropshipping and how it works",
              "Pros and cons of dropshipping business",
              "Choosing the right platform (Shopify, WooCommerce)",
              "Legal considerations and business setup"
            ]
          },
          actionItems: [
            "Choose your e-commerce platform",
            "Research supplier directories (AliExpress, Oberlo)",
            "Register your business entity",
            "Set up basic payment processing"
          ]
        }
      }
    },
    "visa-guide": {
      "1": {
        id: "visa-guide-tourist-visa",
        title: "Thailand Tourist Visa Guide",
        description: "Complete guide to obtaining and extending tourist visas for Thailand",
        duration: 30,
        xpReward: 35,
        difficulty: "beginner" as const,
        content: {
          video: {
            title: "Tourist Visa Requirements",
            description: "Step-by-step guide to Thailand tourist visa application",
            videoUrl: "https://example.com/thailand-tourist-visa.mp4",
            keyPoints: [
              "Different types of tourist visas available",
              "Application process and required documents",
              "Extension procedures and associated fees",
              "Common mistakes to avoid during application"
            ]
          },
          actionItems: [
            "Check your passport validity (6+ months)",
            "Gather required documents and photos",
            "Book embassy appointment in your country",
            "Prepare bank statements and financial proof"
          ]
        }
      }
    }
  };

  return courseData[courseId]?.[lessonId] || null;
};

// Course-specific quiz questions
const getCourseQuiz = (courseId: string, lessonId: string) => {
  const quizData: Record<string, Record<string, any[]>> = {
    "amazon-fba": {
      "1": [
        {
          id: "q1",
          question: "What does FBA stand for?",
          options: [
            { id: "a", text: "Fulfillment by Amazon", isCorrect: true },
            { id: "b", text: "Fresh Business Amazon", isCorrect: false },
            { id: "c", text: "First Business Account", isCorrect: false },
            { id: "d", text: "Full Business Application", isCorrect: false }
          ],
          explanation: "FBA stands for Fulfillment by Amazon, where Amazon handles storage, packaging, and shipping of your products."
        },
        {
          id: "q2",
          question: "What is the recommended initial investment for Amazon FBA?",
          options: [
            { id: "a", text: "$500-$1,000", isCorrect: false },
            { id: "b", text: "$3,000-$5,000", isCorrect: true },
            { id: "c", text: "$10,000+", isCorrect: false },
            { id: "d", text: "$100-$500", isCorrect: false }
          ],
          explanation: "Most successful FBA businesses start with $3,000-$5,000 to cover initial inventory, fees, and marketing costs."
        }
      ],
      "2": [
        {
          id: "q1",
          question: "Which tool is NOT commonly used for Amazon product research?",
          options: [
            { id: "a", text: "Jungle Scout", isCorrect: false },
            { id: "b", text: "Helium 10", isCorrect: false },
            { id: "c", text: "Google Analytics", isCorrect: true },
            { id: "d", text: "Viral Launch", isCorrect: false }
          ],
          explanation: "Google Analytics is for website analytics, not Amazon product research. The others are specialized Amazon research tools."
        }
      ],
      "4": [
        {
          id: "q1",
          question: "What's the ideal number of reviews for a competitive product?",
          options: [
            { id: "a", text: "Less than 50", isCorrect: true },
            { id: "b", text: "500-1000", isCorrect: false },
            { id: "c", text: "Over 2000", isCorrect: false },
            { id: "d", text: "Reviews don't matter", isCorrect: false }
          ],
          explanation: "Products with less than 50 reviews indicate lower competition and easier market entry opportunity."
        }
      ]
    },
    "dropshipping": {
      "1": [
        {
          id: "q1",
          question: "In dropshipping, who handles inventory?",
          options: [
            { id: "a", text: "The retailer", isCorrect: false },
            { id: "b", text: "The supplier", isCorrect: true },
            { id: "c", text: "Amazon", isCorrect: false },
            { id: "d", text: "The customer", isCorrect: false }
          ],
          explanation: "In dropshipping, the supplier handles all inventory management and shipping directly to customers."
        }
      ]
    },
    "visa-guide": {
      "1": [
        {
          id: "q1",
          question: "How long can you stay in Thailand with a tourist visa?",
          options: [
            { id: "a", text: "30 days", isCorrect: false },
            { id: "b", text: "60 days", isCorrect: true },
            { id: "c", text: "90 days", isCorrect: false },
            { id: "d", text: "180 days", isCorrect: false }
          ],
          explanation: "A Thailand tourist visa allows you to stay for 60 days, extendable for another 30 days at immigration."
        }
      ]
    }
  };

  return quizData[courseId]?.[lessonId] || [];
};

export default function Lesson() {
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();
  const [currentStep, setCurrentStep] = useState<'video' | 'quiz' | 'completion'>('video');
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [lessonData, setLessonData] = useState<any>(null);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (courseId && lessonId) {
      const data = getCourseData(courseId, lessonId);
      const quiz = getCourseQuiz(courseId, lessonId);
      
      if (data) {
        setLessonData(data);
        setQuizQuestions(quiz);
      } else {
        // Redirect to 404 or course overview if lesson not found
        navigate('/courses');
      }
    }
  }, [courseId, lessonId, navigate]);

  if (!lessonData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  const handleVideoComplete = () => {
    setCurrentStep('quiz');
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    setCurrentStep('completion');
  };

  const handleBackToCourse = () => {
    navigate(`/course/${courseId}`);
  };

  const progress = currentStep === 'video' ? 33 : currentStep === 'quiz' ? 66 : 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={handleBackToCourse}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
            <div className="text-sm text-muted-foreground">
              {courseId?.charAt(0).toUpperCase() + courseId?.slice(1).replace('-', ' ')} • Lesson {lessonId}
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">{lessonData.title}</h1>
          <p className="text-muted-foreground mb-4">{lessonData.description}</p>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {lessonData.duration} min
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              {lessonData.xpReward} XP
            </span>
            <span className="capitalize">{lessonData.difficulty}</span>
          </div>
          
          <ProgressBar progress={progress} showPercentage={true} size="md" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        {currentStep === 'video' && (
          <div className="space-y-6">
            {/* Video Section */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Play className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">{lessonData.content.video.title}</h2>
              </div>
              
              {/* Mock Video Player */}
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <Play className="w-16 h-16 text-primary mx-auto mb-2" />
                  <p className="text-muted-foreground">Video Player</p>
                  <p className="text-sm text-muted-foreground">{lessonData.content.video.description}</p>
                </div>
              </div>
              
              {/* Key Points */}
              <div>
                <h3 className="font-semibold mb-3">Key Points Covered:</h3>
                <ul className="space-y-2">
                  {lessonData.content.video.keyPoints.map((point: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Action Items */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Next Steps - Apply What You've Learned:</h3>
              <div className="space-y-3">
                {lessonData.content.actionItems.map((item: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                      {index + 1}
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex justify-center">
              <Button size="lg" onClick={handleVideoComplete}>
                Continue to Quiz
                <BookOpen className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'quiz' && quizQuestions.length > 0 && (
          <QuizComponent
            questions={quizQuestions}
            onComplete={handleQuizComplete}
            onBack={() => setCurrentStep('video')}
          />
        )}

        {currentStep === 'completion' && (
          <div className="text-center space-y-6">
            <Card className="p-8 bg-gradient-to-br from-accent/10 to-accent/5">
              <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Lesson Complete! 🎉</h2>
              <p className="text-lg text-muted-foreground mb-6">
                {quizScore !== null && quizQuestions.length > 0 
                  ? `You scored ${quizScore}/${quizQuestions.length} on the quiz`
                  : "You've completed this lesson successfully!"
                }
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-card p-4 rounded-lg">
                  <Award className="w-8 h-8 text-warning mx-auto mb-2" />
                  <div className="font-bold text-lg">+{lessonData.xpReward} XP</div>
                  <div className="text-sm text-muted-foreground">Experience Points</div>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-accent mx-auto mb-2" />
                  <div className="font-bold text-lg">Progress</div>
                  <div className="text-sm text-muted-foreground">Lesson Completed</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button size="lg" onClick={handleBackToCourse}>
                  Back to Course
                </Button>
                <div>
                  <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
                    Continue to Dashboard
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}