import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Progress } from "@/shared/components/ui/progress";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
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
import { useUser } from "@/shared/contexts/user-context";
import { UserContent } from "@/shared/components/paywall/user-content";
import { Paywall } from "@/shared/components/paywall/paywall";

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
            
            {/* Compact Overview Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
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
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{visa.duration}</div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{visa.cost}</div>
                    <div className="text-sm text-muted-foreground">Cost</div>
                  </div>
                  <div className="text-center">
                    <Badge className={getDifficultyColor(visa.difficulty)}>
                      {visa.difficulty}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        }

        freeContent={
          <div className="space-y-6">
            {/* Main Content Grid - Video + Quiz Side by Side */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Video Section - Smaller */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Play className="w-4 h-4" />
                    Video Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {videoPlaying ? (
                    <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-12 h-12 bg-frosted-bg-glass rounded-full flex items-center justify-center mx-auto mb-3">
                          <Play className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-semibold mb-2">Video Coming Soon</h3>
                        <p className="text-xs text-gray-300 mb-3">
                          We're creating comprehensive video guides for each visa type
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setVideoPlaying(false)}
                          className="btn-frosted-ghost"
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
                        <div className="w-16 h-16 bg-frosted-bg-glass rounded-full flex items-center justify-center mx-auto mb-3">
                          <Play className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-semibold mb-1">Watch Visa Guide</h3>
                        <p className="text-xs opacity-90">Click to start video tutorial</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quiz Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Trophy className="w-4 h-4" />
                    Knowledge Quiz
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!showQuiz ? (
                    <div className="text-center py-6">
                      <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Trophy className="w-6 h-6 text-yellow-600" />
                      </div>
                      <h3 className="text-base font-semibold mb-2">Test Your Knowledge</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Take our quiz to make sure you understand the {visa.title} requirements
                      </p>
                      <Button onClick={() => setShowQuiz(true)} size="sm">
                        Start Quiz ({visa.quiz.questions.length} questions)
                      </Button>
                    </div>
                  ) : !quizCompleted ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Question {currentQuizQuestion + 1} of {visa.quiz.questions.length}
                        </span>
                        <Progress 
                          value={(currentQuizQuestion / visa.quiz.questions.length) * 100} 
                          className="w-24"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-base font-semibold">
                          {visa.quiz.questions[currentQuizQuestion].question}
                        </h4>
                        <div className="space-y-2">
                          {visa.quiz.questions[currentQuizQuestion].options.map((option, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="w-full justify-start text-left h-auto p-3 text-sm"
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
                    <div className="text-center py-6">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Trophy className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">Quiz Complete!</h3>
                      <div className="text-2xl font-bold text-green-600 mb-2">{getQuizScore()}%</div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {getQuizScore() >= 80 ? "Great job! You're ready to apply." : "Review the guide and try again."}
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Button onClick={resetQuiz} variant="outline" size="sm">
                          Retake Quiz
                        </Button>
                        <Button onClick={() => setShowQuiz(false)} size="sm">
                          View Results
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Compact Information Grid - 3 columns on desktop */}
            <div className="grid lg:grid-cols-3 gap-4">
              {/* Requirements */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="w-4 h-4" />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1">
                    {visa.requirements.slice(0, 4).map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-xs">{req}</span>
                      </li>
                    ))}
                    {visa.requirements.length > 4 && (
                      <li className="text-xs text-muted-foreground">
                        +{visa.requirements.length - 4} more...
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>

              {/* Process Steps */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Calendar className="w-4 h-4" />
                    Process
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ol className="space-y-1">
                    {visa.process.slice(0, 4).map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-xs">{step}</span>
                      </li>
                    ))}
                    {visa.process.length > 4 && (
                      <li className="text-xs text-muted-foreground">
                        +{visa.process.length - 4} more steps...
                      </li>
                    )}
                  </ol>
                </CardContent>
              </Card>

              {/* Timeline & Documents */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Clock className="w-4 h-4" />
                    Timeline & Docs
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-1">Timeline:</div>
                    <p className="text-xs">{visa.timeline}</p>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-1">Documents:</div>
                    <ul className="space-y-1">
                      {visa.documents.slice(0, 3).map((doc, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <FileText className="w-3 h-3 text-blue-500 flex-shrink-0" />
                          <span className="text-xs">{doc}</span>
                        </li>
                      ))}
                      {visa.documents.length > 3 && (
                        <li className="text-xs text-muted-foreground">
                          +{visa.documents.length - 3} more...
                        </li>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Benefits & Restrictions - Side by Side */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Star className="w-4 h-4" />
                    Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1">
                    {visa.benefits.slice(0, 4).map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-xs">{benefit}</span>
                      </li>
                    ))}
                    {visa.benefits.length > 4 && (
                      <li className="text-xs text-muted-foreground">
                        +{visa.benefits.length - 4} more...
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <AlertTriangle className="w-4 h-4" />
                    Restrictions
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1">
                    {visa.restrictions.slice(0, 4).map((restriction, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <XCircle className="w-3 h-3 text-red-500 flex-shrink-0 mt-1" />
                        <span className="text-xs">{restriction}</span>
                      </li>
                    ))}
                    {visa.restrictions.length > 4 && (
                      <li className="text-xs text-muted-foreground">
                        +{visa.restrictions.length - 4} more...
                      </li>
                    )}
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
            {/* Main Content Grid - Video + Quiz Side by Side */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Video Section - Smaller */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Play className="w-4 h-4" />
                    Video Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {videoPlaying ? (
                    <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-12 h-12 bg-frosted-bg-glass rounded-full flex items-center justify-center mx-auto mb-3">
                          <Play className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-semibold mb-2">Video Coming Soon</h3>
                        <p className="text-xs text-gray-300 mb-3">
                          We're creating comprehensive video guides for each visa type
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setVideoPlaying(false)}
                          className="btn-frosted-ghost"
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
                        <div className="w-16 h-16 bg-frosted-bg-glass rounded-full flex items-center justify-center mx-auto mb-3">
                          <Play className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-semibold mb-1">Watch Visa Guide</h3>
                        <p className="text-xs opacity-90">Click to start video tutorial</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quiz Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Trophy className="w-4 h-4" />
                    Knowledge Quiz
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!showQuiz ? (
                    <div className="text-center py-6">
                      <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Trophy className="w-6 h-6 text-yellow-600" />
                      </div>
                      <h3 className="text-base font-semibold mb-2">Test Your Knowledge</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Take our quiz to make sure you understand the {visa.title} requirements
                      </p>
                      <Button onClick={() => setShowQuiz(true)} size="sm">
                        Start Quiz ({visa.quiz.questions.length} questions)
                      </Button>
                    </div>
                  ) : !quizCompleted ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Question {currentQuizQuestion + 1} of {visa.quiz.questions.length}
                        </span>
                        <Progress 
                          value={(currentQuizQuestion / visa.quiz.questions.length) * 100} 
                          className="w-24"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-base font-semibold">
                          {visa.quiz.questions[currentQuizQuestion].question}
                        </h4>
                        <div className="space-y-2">
                          {visa.quiz.questions[currentQuizQuestion].options.map((option, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="w-full justify-start text-left h-auto p-3 text-sm"
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
                    <div className="text-center py-6">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Trophy className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">Quiz Complete!</h3>
                      <div className="text-2xl font-bold text-green-600 mb-2">{getQuizScore()}%</div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {getQuizScore() >= 80 ? "Great job! You're ready to apply." : "Review the guide and try again."}
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Button onClick={resetQuiz} variant="outline" size="sm">
                          Retake Quiz
                        </Button>
                        <Button onClick={() => setShowQuiz(false)} size="sm">
                          View Results
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Compact Information Grid - 3 columns on desktop */}
            <div className="grid lg:grid-cols-3 gap-4">
              {/* Requirements */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="w-4 h-4" />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1">
                    {visa.requirements.slice(0, 4).map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-xs">{req}</span>
                      </li>
                    ))}
                    {visa.requirements.length > 4 && (
                      <li className="text-xs text-muted-foreground">
                        +{visa.requirements.length - 4} more...
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>

              {/* Process Steps */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Calendar className="w-4 h-4" />
                    Process
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ol className="space-y-1">
                    {visa.process.slice(0, 4).map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-xs">{step}</span>
                      </li>
                    ))}
                    {visa.process.length > 4 && (
                      <li className="text-xs text-muted-foreground">
                        +{visa.process.length - 4} more steps...
                      </li>
                    )}
                  </ol>
                </CardContent>
              </Card>

              {/* Timeline & Documents */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Clock className="w-4 h-4" />
                    Timeline & Docs
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-1">Timeline:</div>
                    <p className="text-xs">{visa.timeline}</p>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-1">Documents:</div>
                    <ul className="space-y-1">
                      {visa.documents.slice(0, 3).map((doc, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <FileText className="w-3 h-3 text-blue-500 flex-shrink-0" />
                          <span className="text-xs">{doc}</span>
                        </li>
                      ))}
                      {visa.documents.length > 3 && (
                        <li className="text-xs text-muted-foreground">
                          +{visa.documents.length - 3} more...
                        </li>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Benefits & Restrictions - Side by Side */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Star className="w-4 h-4" />
                    Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1">
                    {visa.benefits.slice(0, 4).map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-xs">{benefit}</span>
                      </li>
                    ))}
                    {visa.benefits.length > 4 && (
                      <li className="text-xs text-muted-foreground">
                        +{visa.benefits.length - 4} more...
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <AlertTriangle className="w-4 h-4" />
                    Restrictions
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1">
                    {visa.restrictions.slice(0, 4).map((restriction, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <XCircle className="w-3 h-3 text-red-500 flex-shrink-0 mt-1" />
                        <span className="text-xs">{restriction}</span>
                      </li>
                    ))}
                    {visa.restrictions.length > 4 && (
                      <li className="text-xs text-muted-foreground">
                        +{visa.restrictions.length - 4} more...
                      </li>
                    )}
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
