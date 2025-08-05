import { ArrowLeft, BookOpen, CheckCircle, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const CourseOverview = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: "income",
      title: "Income & Work",
      description: "Learn how to earn money while living in Thailand",
      icon: "💰",
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      lessons: [
        { id: 1, title: "How to Start Amazon FBA", completed: true, duration: "15 min" },
        { id: 2, title: "Getting Paid as a Digital Nomad", completed: true, duration: "20 min" },
        { id: 3, title: "Teaching English Jobs in Thailand", completed: true, duration: "18 min" },
        { id: 4, title: "Freelancing from Thailand", completed: false, duration: "22 min" },
        { id: 5, title: "Setting Up a Thai Business", completed: false, duration: "25 min" },
      ]
    },
    {
      id: "visa",
      title: "Visa & Legal",
      description: "Navigate Thailand's visa requirements and legal processes",
      icon: "📋",
      progress: 60,
      totalLessons: 10,
      completedLessons: 6,
      lessons: [
        { id: 6, title: "How to Get a Long-Term Visa", completed: true, duration: "12 min" },
        { id: 7, title: "Education vs Elite Visa", completed: true, duration: "16 min" },
        { id: 8, title: "Avoiding Visa Runs in 2025", completed: true, duration: "14 min" },
        { id: 9, title: "Work Permit Requirements", completed: false, duration: "20 min" },
        { id: 10, title: "Retirement Visa Guide", completed: false, duration: "18 min" },
      ]
    },
    {
      id: "accommodation",
      title: "Accommodation",
      description: "Find and secure the perfect place to live",
      icon: "🏠",
      progress: 40,
      totalLessons: 8,
      completedLessons: 3,
      lessons: [
        { id: 11, title: "Best Areas to Live in Thailand", completed: true, duration: "16 min" },
        { id: 12, title: "Renting Condos in Chiang Mai", completed: true, duration: "19 min" },
        { id: 13, title: "What $500/Month Gets You", completed: true, duration: "13 min" },
        { id: 14, title: "Buying Property as a Foreigner", completed: false, duration: "24 min" },
        { id: 15, title: "Short-term vs Long-term Rentals", completed: false, duration: "17 min" },
      ]
    },
    {
      id: "community",
      title: "Community & Culture",
      description: "Connect with locals and fellow expats",
      icon: "👥",
      progress: 80,
      totalLessons: 9,
      completedLessons: 7,
      lessons: [
        { id: 16, title: "Finding Events and Friends Fast", completed: true, duration: "14 min" },
        { id: 17, title: "Nomad Hotspots", completed: true, duration: "12 min" },
        { id: 18, title: "Navigating Local Culture", completed: true, duration: "21 min" },
        { id: 19, title: "Learning Basic Thai", completed: false, duration: "30 min" },
        { id: 20, title: "Dealing with Culture Shock", completed: false, duration: "18 min" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/dashboard")}
            className="mb-4 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary-foreground mb-4">
              Complete Thailand Move Course
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Master every aspect of relocating to Thailand with our comprehensive learning paths
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {categories.map((category) => (
            <Card key={category.id} className="bg-card/95 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{category.icon}</span>
                    <div>
                      <CardTitle className="text-2xl">{category.title}</CardTitle>
                      <CardDescription className="text-lg">
                        {category.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {category.completedLessons}/{category.totalLessons} Complete
                  </Badge>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{category.progress}%</span>
                  </div>
                  <Progress value={category.progress} className="h-3" />
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid gap-3">
                  {category.lessons.map((lesson) => (
                    <div 
                      key={lesson.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors cursor-pointer"
                      onClick={() => navigate("/lesson")}
                    >
                      <div className="flex items-center space-x-3">
                        {lesson.completed ? (
                          <CheckCircle className="w-5 h-5 text-accent" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                        )}
                        <div>
                          <h4 className="font-medium">{lesson.title}</h4>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 mr-1" />
                            {lesson.duration}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {lesson.completed && (
                          <Badge variant="secondary">Completed</Badge>
                        )}
                        <Button variant="ghost" size="sm">
                          <BookOpen className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-card/95 backdrop-blur-sm shadow-xl max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">🎯 Your Learning Journey</CardTitle>
              <CardDescription className="text-lg">
                Complete all lessons to unlock your Thailand relocation success
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">45</div>
                  <div className="text-sm text-muted-foreground">Total Lessons</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">25</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-warning">20</div>
                  <div className="text-sm text-muted-foreground">Remaining</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary">65%</div>
                  <div className="text-sm text-muted-foreground">Progress</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;