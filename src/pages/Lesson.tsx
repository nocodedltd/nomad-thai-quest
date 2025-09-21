import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { ProgressBar } from "@/shared/components/ui/progress-bar";
import { QuizComponent } from "@/features/learning/components/quiz-component";
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
    "ai-automation": {
      "1": {
        id: "ai-automation-overview",
        title: "AI Automation Business Overview",
        description: "Understanding AI automation fundamentals and business opportunities",
        duration: 20,
        xpReward: 25,
        difficulty: "intermediate" as const,
        content: {
          video: {
            title: "What is AI Automation Business?",
            description: "Complete introduction to AI automation business models",
            videoUrl: "https://example.com/ai-automation-intro.mp4",
            keyPoints: [
              "What is AI automation and how it works",
              "Different AI business models and opportunities",
              "Popular AI tools and platforms (OpenAI, Claude, etc.)",
              "Legal considerations and business setup"
            ]
          },
          actionItems: [
            "Research AI automation opportunities in your niche",
            "Set up accounts on major AI platforms",
            "Register your business entity",
            "Create your first AI service portfolio"
          ]
        }
      },
      "2": {
        id: "ai-business-models",
        title: "AI Business Models & Opportunities",
        description: "Explore different AI automation business models and revenue streams",
        duration: 30,
        xpReward: 75,
        difficulty: "intermediate" as const,
        content: {
          video: {
            title: "AI Business Model Deep Dive",
            description: "Comprehensive guide to AI automation business models",
            videoUrl: "https://example.com/ai-business-models.mp4",
            keyPoints: [
              "Content creation AI services",
              "Customer service automation",
              "Data analysis and reporting services",
              "Process automation for businesses"
            ]
          },
          actionItems: [
            "Identify 3 AI business models that interest you",
            "Research pricing strategies for each model",
            "Create a business plan for your chosen model",
            "Set up your first AI service offering"
          ]
        }
      },
      "3": {
        id: "ai-tools-platforms",
        title: "AI Tools & Platforms Deep Dive",
        description: "Master the essential AI tools and platforms for automation",
        duration: 15,
        xpReward: 50,
        difficulty: "intermediate" as const,
        content: {
          video: {
            title: "Essential AI Tools for Business",
            description: "Complete guide to AI tools and platforms for automation",
            videoUrl: "https://example.com/ai-tools-platforms.mp4",
            keyPoints: [
              "OpenAI GPT and API integration",
              "Claude and Anthropic tools",
              "Automation platforms (Zapier, Make)",
              "AI workflow optimization"
            ]
          },
          actionItems: [
            "Set up accounts on OpenAI and Claude",
            "Learn basic API integration",
            "Explore automation platforms",
            "Create your first AI workflow"
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
    "ai-automation": {
      "1": [
        {
          id: "q1",
          question: "What is the primary advantage of AI automation businesses?",
          options: [
            { id: "a", text: "Low startup costs", isCorrect: false },
            { id: "b", text: "Scalability without inventory", isCorrect: true },
            { id: "c", text: "No technical skills required", isCorrect: false },
            { id: "d", text: "Guaranteed profits", isCorrect: false }
          ],
          explanation: "AI automation businesses can scale infinitely without physical inventory constraints, making them highly scalable."
        },
        {
          id: "q2",
          question: "Which AI tool is most commonly used for content creation?",
          options: [
            { id: "a", text: "ChatGPT", isCorrect: true },
            { id: "b", text: "Google Analytics", isCorrect: false },
            { id: "c", text: "Shopify", isCorrect: false },
            { id: "d", text: "WordPress", isCorrect: false }
          ],
          explanation: "ChatGPT is the most popular AI tool for content creation, used by millions of businesses worldwide."
        }
      ],
      "2": [
        {
          id: "q1",
          question: "What is the most profitable AI automation service?",
          options: [
            { id: "a", text: "Content creation", isCorrect: true },
            { id: "b", text: "Data entry", isCorrect: false },
            { id: "c", text: "Email management", isCorrect: false },
            { id: "d", text: "Social media posting", isCorrect: false }
          ],
          explanation: "Content creation AI services are in high demand and can command premium pricing due to their value to businesses."
        }
      ],
      "3": [
        {
          id: "q1",
          question: "Which platform is essential for AI workflow automation?",
          options: [
            { id: "a", text: "Zapier", isCorrect: true },
            { id: "b", text: "Shopify", isCorrect: false },
            { id: "c", text: "WordPress", isCorrect: false },
            { id: "d", text: "Google Analytics", isCorrect: false }
          ],
          explanation: "Zapier is the leading platform for connecting different apps and automating workflows, essential for AI automation businesses."
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
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('course');
  const lessonId = searchParams.get('lesson') || '1'; // Default to lesson 1 if not specified
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
        // Redirect to roadmap if lesson not found
        navigate('/roadmap');
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
    navigate('/roadmap');
  };

  const progress = currentStep === 'video' ? 33 : currentStep === 'quiz' ? 66 : 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Mobile Optimized */}
      <div className="border-b bg-card">
        <div className="max-w-4xl mx-auto p-3 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <Button variant="ghost" size="sm" onClick={handleBackToCourse} className="h-8 sm:h-9">
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Back to Course</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <div className="text-xs sm:text-sm text-muted-foreground truncate">
              {courseId?.charAt(0).toUpperCase() + courseId?.slice(1).replace('-', ' ')} • Lesson {lessonId}
            </div>
          </div>
          
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{lessonData.title}</h1>
          <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4 overflow-hidden">{lessonData.description}</p>
          
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              {lessonData.duration} min
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-3 h-3 sm:w-4 sm:h-4" />
              {lessonData.xpReward} XP
            </span>
            <span className="capitalize">{lessonData.difficulty}</span>
          </div>
          
          <ProgressBar progress={progress} showPercentage={true} size="sm" className="sm:size-md" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-3 sm:p-6">
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