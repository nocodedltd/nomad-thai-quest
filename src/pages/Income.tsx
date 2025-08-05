import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  DollarSign, 
  GraduationCap, 
  Heart, 
  BookOpen, 
  Share2,
  Globe,
  Users,
  Calendar,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  CheckCircle,
  Clock,
  Target,
  Zap,
  TrendingUp,
  Award
} from "lucide-react";

interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: "full-time" | "part-time" | "contract";
  requirements: string[];
  description: string;
  postedDate: string;
  applications: number;
}

interface Course {
  id: string;
  title: string;
  mentor: string;
  mentorBio: string;
  description: string;
  duration: string;
  lessons: number;
  price: string;
  originalPrice?: string;
  status: "free" | "premium" | "locked";
  progress: number;
  thumbnail: string;
  features: string[];
}

const teachingJobs: JobPosting[] = [
  {
    id: "1",
    title: "English Teacher - International School",
    company: "Bangkok International School",
    location: "Bangkok, Thailand",
    salary: "฿45,000 - ฿60,000/month",
    type: "full-time",
    requirements: ["Bachelor's degree", "TEFL certification", "2+ years experience"],
    description: "Teach English to students aged 6-12 in an international school setting.",
    postedDate: "2024-01-15",
    applications: 12
  },
  {
    id: "2",
    title: "Online English Tutor",
    company: "VIPKid Thailand",
    location: "Remote",
    salary: "฿300 - ฿500/hour",
    type: "part-time",
    requirements: ["Native English speaker", "Bachelor's degree", "Teaching experience"],
    description: "Teach English online to students in China and other Asian countries.",
    postedDate: "2024-01-10",
    applications: 8
  },
  {
    id: "3",
    title: "ESL Teacher - Language Center",
    company: "Wall Street English",
    location: "Chiang Mai, Thailand",
    salary: "฿35,000 - ฿45,000/month",
    type: "full-time",
    requirements: ["TEFL certification", "Bachelor's degree", "1+ year experience"],
    description: "Teach adult students in a modern language learning environment.",
    postedDate: "2024-01-08",
    applications: 15
  }
];

const volunteerOpportunities = [
  {
    id: "worldpackers",
    title: "Worldpackers Volunteer Program",
    company: "Worldpackers (Official Partner)",
    location: "Worldwide",
    duration: "1-12 weeks",
    benefits: ["Free accommodation", "Free meals", "Cultural exchange", "Official partner benefits"],
    description: "Access thousands of volunteer opportunities worldwide through our official partnership with Worldpackers. Perfect for budget-conscious travelers.",
    requirements: ["Worldpackers membership", "Flexible schedule", "Open-minded attitude"]
  },
  {
    id: "1",
    title: "Hostel Volunteer",
    company: "Revolutions Hostel",
    location: "Bangkok, Thailand",
    duration: "2-4 weeks",
    benefits: ["Free accommodation", "Free meals", "Cultural exchange"],
    description: "Help with daily hostel operations and meet travelers from around the world.",
    requirements: ["Friendly attitude", "Basic English", "Flexible schedule"]
  },
  {
    id: "2",
    title: "Beach Cleanup Volunteer",
    company: "Trash Hero Thailand",
    location: "Phuket, Thailand",
    duration: "1-2 weeks",
    benefits: ["Free accommodation", "Beach access", "Environmental impact"],
    description: "Help keep Thailand's beaches clean and beautiful.",
    requirements: ["Physical fitness", "Environmental awareness", "Team player"]
  },
  {
    id: "3",
    title: "Animal Shelter Volunteer",
    company: "Soi Dog Foundation",
    location: "Phuket, Thailand",
    duration: "1-4 weeks",
    benefits: ["Free accommodation", "Animal care experience", "Making a difference"],
    description: "Help care for rescued dogs and cats in Thailand's largest animal shelter.",
    requirements: ["Love for animals", "Physical fitness", "Patience"]
  }
];

const mentorshipCourses: Course[] = [
  {
    id: "amazon-fba",
    title: "Amazon FBA Mastery",
    mentor: "Richard Klein",
    mentorBio: "7-figure Amazon seller with 5+ years experience in FBA wholesale",
    description: "Build a profitable Amazon business from anywhere in Thailand.",
    duration: "4 weeks",
    lessons: 12,
    price: "฿2,500",
    originalPrice: "฿5,000",
    status: "premium",
    progress: 75,
    thumbnail: "/amazon-fba-thumbnail.jpg",
    features: ["Product Research", "Supplier Sourcing", "Amazon Optimization", "Profit Scaling"]
  },
  {
    id: "ai-automation",
    title: "AI Automation Business",
    mentor: "Sarah Chen",
    mentorBio: "AI automation expert helping businesses scale with AI tools",
    description: "Build profitable AI automation businesses from anywhere.",
    duration: "4 weeks",
    lessons: 12,
    price: "฿3,000",
    originalPrice: "฿6,000",
    status: "premium",
    progress: 60,
    thumbnail: "/ai-automation-thumbnail.jpg",
    features: ["AI Tools", "Service Development", "Client Acquisition", "Business Scaling"]
  },
  {
    id: "upwork-freelancing",
    title: "Upwork Freelancing Success",
    mentor: "Mike Rodriguez",
    mentorBio: "Top-rated Upwork freelancer earning $10K+ monthly",
    description: "Master freelancing on Upwork and build a sustainable remote income.",
    duration: "3 weeks",
    lessons: 8,
    price: "฿1,500",
    originalPrice: "฿3,000",
    status: "premium",
    progress: 0,
    thumbnail: "/upwork-thumbnail.jpg",
    features: ["Profile Optimization", "Proposal Writing", "Client Management", "Rate Negotiation"]
  }
];

export default function Income() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("teaching");
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

  const tabs = [
    { id: "teaching", label: "Teaching Jobs", icon: GraduationCap },
    { id: "volunteering", label: "Volunteering", icon: Heart },
    { id: "courses", label: "Mentorship", icon: BookOpen },
    { id: "affiliate", label: "Affiliate Program", icon: Share2 }
  ];

  const handleJobApplication = (job: JobPosting) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleWorldpackersRedirect = () => {
    // Redirect to Worldpackers with affiliate tracking
    window.open("https://www.worldpackers.com/es/promo/RICHARDKLEIN22?utm_campaign=RICHARDKLEIN22&utm_medium=referral&utm_source=affiliate", "_blank");
  };

  return (
    <div className="min-h-screen bg-background p-3 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/overview")}
            className="mb-4 text-sm"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Overview
          </Button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-green-500/10">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Income Module</h1>
              <p className="text-muted-foreground">Build your financial foundation in Thailand</p>
            </div>
          </div>

          {/* Progress */}
          <Card className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold">Module Progress</h3>
              <Badge variant="secondary">75% Complete</Badge>
            </div>
            <ProgressBar progress={75} size="lg" className="mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>3/4 sections completed</span>
              <span>750 XP earned</span>
            </div>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-muted p-1 rounded-lg">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 text-xs md:text-sm px-3 md:px-4"
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Teaching Jobs Tab */}
        {activeTab === "teaching" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">English Teaching Opportunities</h2>
              <Button onClick={() => setShowApplicationForm(true)}>
                Post a Job
              </Button>
            </div>

            <div className="grid gap-4">
              {teachingJobs.map((job) => (
                <Card key={job.id} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold">{job.title}</h3>
                        <Badge variant={job.type === "full-time" ? "default" : "secondary"}>
                          {job.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </span>
                      </div>
                      <p className="text-sm mb-3">{job.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {job.requirements.map((req, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Posted {job.postedDate}</span>
                        <span>{job.applications} applications</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleJobApplication(job)}
                      className="flex-shrink-0"
                    >
                      Apply Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Volunteering Tab */}
        {activeTab === "volunteering" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Volunteering Opportunities</h2>
              <Button onClick={handleWorldpackersRedirect} variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Browse Worldpackers
              </Button>
            </div>

            <div className="grid gap-4">
              {volunteerOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className={`p-4 ${opportunity.id === "worldpackers" ? "border-2 border-green-500 bg-green-50/5" : ""}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold">{opportunity.title}</h3>
                        {opportunity.id === "worldpackers" && (
                          <Badge variant="default" className="bg-green-600 text-white">
                            Official Partner
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          {opportunity.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {opportunity.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {opportunity.duration}
                        </span>
                      </div>
                      <p className="text-sm mb-3">{opportunity.description}</p>
                      <div className="space-y-2 mb-3">
                        <p className="text-xs font-medium text-muted-foreground">Benefits:</p>
                        <div className="flex flex-wrap gap-2">
                          {opportunity.benefits.map((benefit, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Requirements:</p>
                        <div className="flex flex-wrap gap-2">
                          {opportunity.requirements.map((req, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="flex-shrink-0"
                      onClick={opportunity.id === "worldpackers" ? handleWorldpackersRedirect : undefined}
                    >
                      {opportunity.id === "worldpackers" ? "Browse Opportunities" : "Apply"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Mentorship Courses Tab */}
        {activeTab === "courses" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Digital Mentorship Courses</h2>
              <p className="text-muted-foreground">Learn from successful digital nomads and entrepreneurs</p>
            </div>

            <div className="grid gap-6">
              {mentorshipCourses.map((course) => (
                <Card key={course.id} className="p-6">
                  <div className="flex gap-6">
                    <div className="w-32 h-24 bg-muted rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">by {course.mentor}</p>
                          <p className="text-sm mb-3">{course.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{course.price}</div>
                          {course.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              {course.originalPrice}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {course.lessons} lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          {course.progress}% complete
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <Button className="flex-1">
                          {course.status === "premium" ? "Enroll Now" : "Start Learning"}
                        </Button>
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Affiliate Program Tab */}
        {activeTab === "affiliate" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Affiliate Program</h2>
              <p className="text-muted-foreground">Earn commissions by promoting NCC to your network</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary rounded-lg">
                    <Share2 className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold">Your Affiliate Stats</h3>
                    <p className="text-sm text-muted-foreground">Track your performance</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">24</div>
                    <div className="text-xs text-muted-foreground">Clicks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">8</div>
                    <div className="text-xs text-muted-foreground">Signups</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">3</div>
                    <div className="text-xs text-muted-foreground">Conversions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">฿1,200</div>
                    <div className="text-xs text-muted-foreground">Earnings</div>
                  </div>
                </div>

                <Button className="w-full">
                  View Detailed Analytics
                </Button>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold">Affiliate Course</h3>
                    <p className="text-sm text-muted-foreground">Learn to promote effectively</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>How to promote NCC</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Content creation strategies</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Commission tracking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Payout methods</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Start Affiliate Course
                </Button>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-bold mb-4">Your Affiliate Links</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Main Affiliate Link</p>
                    <p className="text-xs text-muted-foreground">https://ncc.com/ref/yourusername</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Copy
                  </Button>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Course Affiliate Link</p>
                    <p className="text-xs text-muted-foreground">https://ncc.com/courses/ref/yourusername</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Copy
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Job Application Modal */}
        {showApplicationForm && selectedJob && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Apply for {selectedJob.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your full name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="Your country" />
                </div>
                <div>
                  <Label htmlFor="degree">Degree</Label>
                  <Input id="degree" placeholder="Your degree and field" />
                </div>
                <div>
                  <Label htmlFor="tefl">TEFL Certification</Label>
                  <Input id="tefl" placeholder="TEFL/TESOL certification details" />
                </div>
                <div>
                  <Label htmlFor="experience">Experience</Label>
                  <Textarea id="experience" placeholder="Describe your teaching experience" />
                </div>
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" placeholder="Any additional information" />
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1" onClick={() => setShowApplicationForm(false)}>
                    Submit Application
                  </Button>
                  <Button variant="outline" onClick={() => setShowApplicationForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
} 