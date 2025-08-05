import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ShoppingCart, 
  FileText,
  Package,
  Play,
  Clock,
  Award,
  TrendingUp,
  Bot
} from "lucide-react";

const courses = [
  {
    id: "amazon-fba",
    title: "Amazon FBA Mastery",
    description: "Build a profitable Amazon business from Thailand. Learn product research, sourcing, and scaling strategies.",
    category: "Business",
    difficulty: "Beginner",
    duration: "3.5 hours",
    lessons: 4,
    xpReward: 185,
    icon: Package,
    gradient: "from-orange-500 to-red-500",
    features: ["Product Research", "Supplier Sourcing", "Amazon Optimization", "Profit Scaling"]
  },
  {
    id: "ai-automation",
    title: "AI Automation Business",
    description: "Build profitable AI automation businesses from anywhere. Master AI tools, service development, and client acquisition.",
    category: "Business", 
    difficulty: "Intermediate",
    duration: "4 weeks",
    lessons: 12,
    xpReward: 450,
    icon: Bot,
    gradient: "from-purple-500 to-pink-500",
    features: ["AI Tools", "Service Development", "Client Acquisition", "Business Scaling"]
  },
  {
    id: "visa-guide",
    title: "Thailand Visa Guide",
    description: "Navigate Thailand's visa system with confidence. Complete guide to tourist, education, elite, and work visas.",
    category: "Legal",
    difficulty: "Beginner", 
    duration: "2 hours",
    lessons: 4,
    xpReward: 150,
    icon: FileText,
    gradient: "from-green-500 to-emerald-500",
    features: ["Tourist Visas", "Education Visas", "Elite Program", "Work Permits"]
  }
];

export default function CoursesListing() {
  const navigate = useNavigate();

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary/90 to-secondary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="text-primary-foreground hover:bg-white/10 mb-2 sm:mb-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              All Courses
            </h1>
            <p className="text-lg sm:text-xl mb-6 text-primary-foreground/90 max-w-3xl mx-auto">
              Master the skills you need to thrive as an expat in Thailand. From business to legal requirements, we've got you covered.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{courses.length}</div>
                <div className="text-sm opacity-90">Courses Available</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{courses.reduce((sum, course) => sum + course.lessons, 0)}</div>
                <div className="text-sm opacity-90">Total Lessons</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{courses.reduce((sum, course) => sum + course.xpReward, 0)}</div>
                <div className="text-sm opacity-90">Total XP</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const IconComponent = course.icon;
            
            return (
              <Card 
                key={course.id} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 overflow-hidden"
                onClick={() => handleCourseClick(course.id)}
              >
                {/* Course Header with Gradient */}
                <div className={`bg-gradient-to-br ${course.gradient} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="text-xs">
                      {course.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{course.title}</h3>
                      <p className="text-white/80 text-sm">{course.difficulty}</p>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -right-4 opacity-10">
                    <IconComponent className="w-24 h-24" />
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {course.description}
                  </p>

                  {/* Course Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                    <div className="bg-muted/50 rounded-lg p-2">
                      <div className="text-sm font-semibold">{course.lessons}</div>
                      <div className="text-xs text-muted-foreground">Lessons</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2">
                      <div className="text-sm font-semibold">{course.duration}</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2">
                      <div className="text-sm font-semibold">{course.xpReward}</div>
                      <div className="text-xs text-muted-foreground">XP</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full group-hover:scale-105 transition-transform"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCourseClick(course.id);
                    }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Course
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardContent className="p-8 text-center">
            <TrendingUp className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Ready to Transform Your Life?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of expats who have successfully built their dream lifestyle in Thailand. 
              Start with any course and begin your transformation today.
            </p>
            <Button size="lg" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}