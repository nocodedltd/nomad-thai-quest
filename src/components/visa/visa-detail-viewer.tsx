import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Play, 
  Download, 
  ExternalLink, 
  CheckCircle, 
  XCircle, 
  Clock, 
  DollarSign, 
  FileText, 
  Globe, 
  Users, 
  Calendar,
  MapPin,
  AlertTriangle,
  ArrowLeft,
  Trophy,
  BookOpen,
  Link as LinkIcon,
  ChevronRight,
  Star
} from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { UserContent } from "@/components/shared/user-content";
import { Paywall } from "@/components/shared/paywall";

interface VisaDetail {
  id: string;
  title: string;
  type: string;
  duration: string;
  cost: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  requirements: string[];
  benefits: string[];
  process: string[];
  timeline: string;
  documents: string[];
  restrictions: string[];
  videoUrl?: string;
  quiz: {
    questions: {
      question: string;
      options: string[];
      correct: number;
      explanation: string;
    }[];
  };
  links: {
    government: string;
    agencies: string[];
  };
  downloadUrl: string;
  access: "free" | "paid";
}

interface VisaDetailViewerProps {
  visa: VisaDetail;
  onBack: () => void;
}

export default function VisaDetailViewer({ visa, onBack }: VisaDetailViewerProps) {
  const { userType } = useUser();
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const hasAccess = visa.access === "free" || userType === "paid";

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuizQuestion] = answerIndex;
    setQuizAnswers(newAnswers);

    if (currentQuizQuestion < visa.quiz.questions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const getQuizScore = () => {
    let correct = 0;
    quizAnswers.forEach((answer, index) => {
      if (answer === visa.quiz.questions[index].correct) {
        correct++;
      }
    });
    return Math.round((correct / visa.quiz.questions.length) * 100);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Hard": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const resetQuiz = () => {
    setCurrentQuizQuestion(0);
    setQuizAnswers([]);
    setQuizCompleted(false);
    setShowQuiz(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Visas
        </Button>
      </div>

      {/* Visa Header Card */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl sm:text-3xl mb-2">{visa.title}</CardTitle>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {visa.duration}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  {visa.cost}
                </Badge>
                <Badge className={getDifficultyColor(visa.difficulty)}>
                  {visa.difficulty}
                </Badge>
              </div>
              <p className="text-muted-foreground">{visa.description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                onClick={() => setVideoPlaying(true)}
                className="flex items-center gap-2"
                disabled={!hasAccess}
              >
                <Play className="w-4 h-4" />
                Watch Guide
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open(visa.downloadUrl, '_blank')}
                className="flex items-center gap-2"
                disabled={!hasAccess}
              >
                <Download className="w-4 h-4" />
                Download Guide
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <UserContent
        guestContent={
          <div className="space-y-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Create a free account to access the complete visa guide, video tutorial, and quiz.
              </AlertDescription>
            </Alert>
            
            <Card>
              <CardHeader>
                <CardTitle>Visa Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Requirements</h4>
                  <ul className="space-y-1">
                    {visa.requirements.slice(0, 3).map((req, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                    {visa.requirements.length > 3 && (
                      <li className="text-sm text-muted-foreground">
                        +{visa.requirements.length - 3} more requirements
                      </li>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        }

        freeContent={
          <div className="space-y-6">
            {/* Video Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Video Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                {videoPlaying ? (
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Video Coming Soon</h3>
                      <p className="text-sm text-gray-300 mb-4">
                        We're creating comprehensive video guides for each visa type
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => setVideoPlaying(false)}
                        className="text-white border-white hover:bg-white hover:text-black"
                      >
                        Close Preview
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setVideoPlaying(true)}
                  >
                    <div className="text-center text-white">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="w-10 h-10" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Watch Visa Guide</h3>
                      <p className="text-sm opacity-90">Click to start video tutorial</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quiz Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Knowledge Quiz
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!showQuiz ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Test Your Knowledge</h3>
                    <p className="text-muted-foreground mb-4">
                      Take our quiz to make sure you understand the {visa.title} requirements
                    </p>
                    <Button onClick={() => setShowQuiz(true)}>
                      Start Quiz ({visa.quiz.questions.length} questions)
                    </Button>
                  </div>
                ) : !quizCompleted ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Question {currentQuizQuestion + 1} of {visa.quiz.questions.length}
                      </span>
                      <Progress 
                        value={(currentQuizQuestion / visa.quiz.questions.length) * 100} 
                        className="w-32"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">
                        {visa.quiz.questions[currentQuizQuestion].question}
                      </h4>
                      <div className="space-y-2">
                        {visa.quiz.questions[currentQuizQuestion].options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full justify-start text-left h-auto p-4"
                            onClick={() => handleQuizAnswer(index)}
                          >
                            <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
                    <div className="text-3xl font-bold text-green-600 mb-2">{getQuizScore()}%</div>
                    <p className="text-muted-foreground mb-4">
                      {getQuizScore() >= 80 ? "Great job! You're ready to apply." : "Review the guide and try again."}
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button onClick={resetQuiz} variant="outline">
                        Retake Quiz
                      </Button>
                      <Button onClick={() => setShowQuiz(false)}>
                        View Results
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Requirements & Process */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {visa.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Process Steps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2">
                    {visa.process.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>

            {/* Timeline & Documents */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{visa.timeline}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {visa.documents.map((doc, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span className="text-sm">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Benefits & Restrictions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {visa.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Restrictions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {visa.restrictions.map((restriction, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{restriction}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Useful Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="w-5 h-5" />
                  Useful Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Government Website
                  </h4>
                  <Button 
                    variant="outline" 
                    onClick={() => window.open(visa.links.government, '_blank')}
                    className="w-full sm:w-auto"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Official Application Portal
                  </Button>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Recommended Agencies
                  </h4>
                  <div className="space-y-2">
                    {visa.links.agencies.map((agency, index) => (
                      <Button 
                        key={index}
                        variant="outline" 
                        onClick={() => window.open(agency, '_blank')}
                        className="w-full sm:w-auto mr-2 mb-2"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Agency {index + 1}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        }

        paidContent={
          <div className="space-y-6">
            {/* Video Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Video Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                {videoPlaying ? (
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Video Coming Soon</h3>
                      <p className="text-sm text-gray-300 mb-4">
                        We're creating comprehensive video guides for each visa type
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => setVideoPlaying(false)}
                        className="text-white border-white hover:bg-white hover:text-black"
                      >
                        Close Preview
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setVideoPlaying(true)}
                  >
                    <div className="text-center text-white">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="w-10 h-10" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Watch Visa Guide</h3>
                      <p className="text-sm opacity-90">Click to start video tutorial</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quiz Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Knowledge Quiz
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!showQuiz ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Test Your Knowledge</h3>
                    <p className="text-muted-foreground mb-4">
                      Take our quiz to make sure you understand the {visa.title} requirements
                    </p>
                    <Button onClick={() => setShowQuiz(true)}>
                      Start Quiz ({visa.quiz.questions.length} questions)
                    </Button>
                  </div>
                ) : !quizCompleted ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Question {currentQuizQuestion + 1} of {visa.quiz.questions.length}
                      </span>
                      <Progress 
                        value={(currentQuizQuestion / visa.quiz.questions.length) * 100} 
                        className="w-32"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">
                        {visa.quiz.questions[currentQuizQuestion].question}
                      </h4>
                      <div className="space-y-2">
                        {visa.quiz.questions[currentQuizQuestion].options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full justify-start text-left h-auto p-4"
                            onClick={() => handleQuizAnswer(index)}
                          >
                            <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
                    <div className="text-3xl font-bold text-green-600 mb-2">{getQuizScore()}%</div>
                    <p className="text-muted-foreground mb-4">
                      {getQuizScore() >= 80 ? "Great job! You're ready to apply." : "Review the guide and try again."}
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button onClick={resetQuiz} variant="outline">
                        Retake Quiz
                      </Button>
                      <Button onClick={() => setShowQuiz(false)}>
                        View Results
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Requirements & Process */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {visa.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Process Steps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2">
                    {visa.process.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>

            {/* Timeline & Documents */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{visa.timeline}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {visa.documents.map((doc, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span className="text-sm">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Benefits & Restrictions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {visa.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Restrictions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {visa.restrictions.map((restriction, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{restriction}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Useful Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="w-5 h-5" />
                  Useful Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Government Website
                  </h4>
                  <Button 
                    variant="outline" 
                    onClick={() => window.open(visa.links.government, '_blank')}
                    className="w-full sm:w-auto"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Official Application Portal
                  </Button>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Recommended Agencies
                  </h4>
                  <div className="space-y-2">
                    {visa.links.agencies.map((agency, index) => (
                      <Button 
                        key={index}
                        variant="outline" 
                        onClick={() => window.open(agency, '_blank')}
                        className="w-full sm:w-auto mr-2 mb-2"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Agency {index + 1}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        }
      />
    </div>
  );
}
