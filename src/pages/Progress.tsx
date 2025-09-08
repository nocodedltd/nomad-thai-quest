import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  User,
  MapPin,
  Calendar,
  Globe,
  Target,
  Clock,
  DollarSign,
  Briefcase,
  FileText,
  Settings,
  Save,
  Edit,
  CheckCircle,
  Star,
  Award,
  Users,
  ArrowRight,
  Plus,
  Trash2
} from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { UserContent } from "@/components/shared/user-content";
import { UpgradePrompt } from "@/components/shared/upgrade-prompt";

// User profile data structure
interface UserProfile {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  currentCountry: string;
  nationality: string;
  
  // Thailand Goals
  thailandGoal: string;
  targetTimeline: string;
  currentObstacles: string[];
  passports: string[];
  
  // Professional Information
  currentOccupation: string;
  incomeSource: string;
  employmentType: string;
  monthlyIncome: string;
  
  // Skills & Strengths
  skills: string[];
  strengths: string[];
  experience: string;
  
  // Preferences
  learningStyle: string;
  studyTime: string;
  notifications: {
    email: boolean;
    push: boolean;
    reminders: boolean;
  };
}

const defaultProfile: UserProfile = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  currentCountry: "",
  nationality: "",
  thailandGoal: "",
  targetTimeline: "",
  currentObstacles: [],
  passports: [],
  currentOccupation: "",
  incomeSource: "",
  employmentType: "",
  monthlyIncome: "",
  skills: [],
  strengths: [],
  experience: "",
  learningStyle: "",
  studyTime: "",
  notifications: {
    email: true,
    push: true,
    reminders: true
  }
};

const thailandGoals = [
  "Digital Nomad Lifestyle",
  "Retirement in Thailand",
  "Business Opportunities",
  "Education/Study",
  "Cultural Experience",
  "Cost of Living Benefits",
  "Climate & Weather",
  "Healthcare Access",
  "Other"
];

const timelineOptions = [
  "ASAP (Within 3 months)",
  "3-6 months",
  "6-12 months",
  "1-2 years",
  "2+ years",
  "Just exploring for now"
];

const obstacles = [
  "Financial constraints",
  "Visa requirements",
  "Job/Income concerns",
  "Family commitments",
  "Language barriers",
  "Healthcare concerns",
  "Cultural adaptation",
  "Legal documentation",
  "Housing uncertainty",
  "Other"
];

const employmentTypes = [
  "Full-time employee",
  "Part-time employee",
  "Freelancer/Contractor",
  "Business owner",
  "Remote worker",
  "Unemployed",
  "Student",
  "Retired"
];

const incomeSources = [
  "Online business",
  "Remote work",
  "Freelancing",
  "Investment income",
  "Traditional job",
  "Passive income",
  "Multiple sources",
  "Other"
];

const skills = [
  "Digital Marketing",
  "Web Development",
  "Graphic Design",
  "Content Writing",
  "Teaching/Tutoring",
  "Consulting",
  "Sales",
  "Customer Service",
  "Project Management",
  "Data Analysis",
  "Photography",
  "Video Editing",
  "Language Teaching",
  "Business Development",
  "Other"
];

export default function Profile() {
  const navigate = useNavigate();
  const { userType, userState } = useUser();
  const [selectedTab, setSelectedTab] = useState<'personal' | 'thailand-goals' | 'professional' | 'skills' | 'settings'>('personal');
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleProfileUpdate = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayUpdate = (field: keyof UserProfile, value: string, add: boolean) => {
    setProfile(prev => {
      const currentArray = prev[field] as string[];
      if (add) {
        return { ...prev, [field]: [...currentArray, value] };
      } else {
        return { ...prev, [field]: currentArray.filter(item => item !== value) };
      }
    });
  };

  const saveProfile = () => {
    // TODO: Implement profile saving logic
    setIsEditing(false);
    console.log('Profile saved:', profile);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">👤 Your Profile</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us about yourself and your Thailand goals to get a personalized experience
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-muted rounded-lg p-1 overflow-x-auto">
            {[
              { id: 'personal', label: 'Personal Info', desc: 'Basic details', icon: User },
              { id: 'thailand-goals', label: 'Thailand Goals', desc: 'Your objectives', icon: Target },
              { id: 'professional', label: 'Professional', desc: 'Work & income', icon: Briefcase },
              { id: 'skills', label: 'Skills & Strengths', desc: 'Your abilities', icon: Star },
              { id: 'settings', label: 'Settings', desc: 'Preferences', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={selectedTab === tab.id ? 'default' : 'ghost'}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className="flex flex-col px-4 py-3 h-auto min-w-[120px]"
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="font-medium text-xs">{tab.label}</span>
                  <span className="text-xs text-muted-foreground">{tab.desc}</span>
                </Button>
              );
            })}
          </div>
        </div>

        <UserContent
          guestContent={
            <div className="text-center">
              <div className="mb-8">
                <User className="w-24 h-24 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold mb-4">Create Your Profile</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Sign up to create your personalized profile and get tailored recommendations for your Thailand journey
                </p>
              </div>
              
              <UpgradePrompt 
                title="Start Your Thailand Journey"
                description="Create your profile to get personalized guidance and track your progress"
                features={[
                  "Personalized learning paths",
                  "Custom goal setting",
                  "Progress tracking",
                  "Community access"
                ]}
              />
            </div>
          }
          
          freeContent={
            <div>
              {/* Personal Information Tab */}
              {selectedTab === 'personal' && (
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Personal Information</h2>
                    <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Enter your first name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Enter your last name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => handleProfileUpdate('dateOfBirth', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="currentCountry">Current Country</Label>
                      <Select
                        value={profile.currentCountry}
                        onValueChange={(value) => handleProfileUpdate('currentCountry', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="UK">United Kingdom</SelectItem>
                          <SelectItem value="CA">Canada</SelectItem>
                          <SelectItem value="AU">Australia</SelectItem>
                          <SelectItem value="DE">Germany</SelectItem>
                          <SelectItem value="FR">France</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="nationality">Nationality</Label>
                      <Select
                        value={profile.nationality}
                        onValueChange={(value) => handleProfileUpdate('nationality', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="US">American</SelectItem>
                          <SelectItem value="UK">British</SelectItem>
                          <SelectItem value="CA">Canadian</SelectItem>
                          <SelectItem value="AU">Australian</SelectItem>
                          <SelectItem value="DE">German</SelectItem>
                          <SelectItem value="FR">French</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end mt-6">
                      <Button onClick={saveProfile}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </Card>
              )}

              {/* Thailand Goals Tab */}
              {selectedTab === 'thailand-goals' && (
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Thailand Goals</h2>
                    <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="thailandGoal">What's your main goal in Thailand?</Label>
                      <Select
                        value={profile.thailandGoal}
                        onValueChange={(value) => handleProfileUpdate('thailandGoal', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your main goal" />
                        </SelectTrigger>
                        <SelectContent>
                          {thailandGoals.map((goal) => (
                            <SelectItem key={goal} value={goal}>{goal}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="targetTimeline">When do you want to move to Thailand?</Label>
                      <Select
                        value={profile.targetTimeline}
                        onValueChange={(value) => handleProfileUpdate('targetTimeline', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {timelineOptions.map((timeline) => (
                            <SelectItem key={timeline} value={timeline}>{timeline}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>What's currently stopping you from moving tomorrow?</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                        {obstacles.map((obstacle) => (
                          <div key={obstacle} className="flex items-center space-x-2">
                            <Checkbox
                              id={obstacle}
                              checked={profile.currentObstacles.includes(obstacle)}
                              onCheckedChange={(checked) => 
                                handleArrayUpdate('currentObstacles', obstacle, checked as boolean)
                              }
                              disabled={!isEditing}
                            />
                            <Label htmlFor={obstacle} className="text-sm">{obstacle}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label>What passports do you hold?</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                        {['US', 'UK', 'CA', 'AU', 'EU', 'Other'].map((passport) => (
                          <div key={passport} className="flex items-center space-x-2">
                            <Checkbox
                              id={passport}
                              checked={profile.passports.includes(passport)}
                              onCheckedChange={(checked) => 
                                handleArrayUpdate('passports', passport, checked as boolean)
                              }
                              disabled={!isEditing}
                            />
                            <Label htmlFor={passport} className="text-sm">{passport}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end mt-6">
                      <Button onClick={saveProfile}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </Card>
              )}

              {/* Professional Information Tab */}
              {selectedTab === 'professional' && (
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Professional Information</h2>
                    <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="currentOccupation">Current Occupation</Label>
                      <Input
                        id="currentOccupation"
                        value={profile.currentOccupation}
                        onChange={(e) => handleProfileUpdate('currentOccupation', e.target.value)}
                        disabled={!isEditing}
                        placeholder="e.g., Software Developer, Teacher, Consultant"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="employmentType">Employment Type</Label>
                      <Select
                        value={profile.employmentType}
                        onValueChange={(value) => handleProfileUpdate('employmentType', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your employment type" />
                        </SelectTrigger>
                        <SelectContent>
                          {employmentTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="incomeSource">Primary Income Source</Label>
                      <Select
                        value={profile.incomeSource}
                        onValueChange={(value) => handleProfileUpdate('incomeSource', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your income source" />
                        </SelectTrigger>
                        <SelectContent>
                          {incomeSources.map((source) => (
                            <SelectItem key={source} value={source}>{source}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="monthlyIncome">Monthly Income Range</Label>
                      <Select
                        value={profile.monthlyIncome}
                        onValueChange={(value) => handleProfileUpdate('monthlyIncome', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your income range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1000">$0 - $1,000</SelectItem>
                          <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                          <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                          <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                          <SelectItem value="10000+">$10,000+</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end mt-6">
                      <Button onClick={saveProfile}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </Card>
              )}

              {/* Skills & Strengths Tab */}
              {selectedTab === 'skills' && (
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Skills & Strengths</h2>
                    <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <Label>What skills do you have?</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                        {skills.map((skill) => (
                          <div key={skill} className="flex items-center space-x-2">
                            <Checkbox
                              id={skill}
                              checked={profile.skills.includes(skill)}
                              onCheckedChange={(checked) => 
                                handleArrayUpdate('skills', skill, checked as boolean)
                              }
                              disabled={!isEditing}
                            />
                            <Label htmlFor={skill} className="text-sm">{skill}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="experience">Tell us about your experience</Label>
                      <Textarea
                        id="experience"
                        value={profile.experience}
                        onChange={(e) => handleProfileUpdate('experience', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Describe your professional background, achievements, and relevant experience..."
                        rows={4}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="strengths">What are your key strengths?</Label>
                      <Textarea
                        id="strengths"
                        value={profile.strengths.join(', ')}
                        onChange={(e) => handleProfileUpdate('strengths', e.target.value.split(', ').filter(s => s.trim()))}
                        disabled={!isEditing}
                        placeholder="e.g., Problem-solving, Communication, Leadership, Technical expertise..."
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end mt-6">
                      <Button onClick={saveProfile}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </Card>
              )}

              {/* Settings Tab */}
              {selectedTab === 'settings' && (
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Settings & Preferences</h2>
                    <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="learningStyle">Learning Style Preference</Label>
                      <Select
                        value={profile.learningStyle}
                        onValueChange={(value) => handleProfileUpdate('learningStyle', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your preferred learning style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="visual">Visual (Videos, Images, Charts)</SelectItem>
                          <SelectItem value="reading">Reading (Text, Articles, Guides)</SelectItem>
                          <SelectItem value="hands-on">Hands-on (Practice, Exercises)</SelectItem>
                          <SelectItem value="mixed">Mixed (Combination of all)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="studyTime">Preferred Study Time</Label>
                      <Select
                        value={profile.studyTime}
                        onValueChange={(value) => handleProfileUpdate('studyTime', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="When do you prefer to study?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (6 AM - 12 PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12 PM - 6 PM)</SelectItem>
                          <SelectItem value="evening">Evening (6 PM - 12 AM)</SelectItem>
                          <SelectItem value="flexible">Flexible (Any time)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Notification Preferences</Label>
                      <div className="space-y-3 mt-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive updates via email</p>
                          </div>
                          <Checkbox
                            id="email-notifications"
                            checked={profile.notifications.email}
                            onCheckedChange={(checked) => 
                              handleProfileUpdate('notifications', { ...profile.notifications, email: checked as boolean })
                            }
                            disabled={!isEditing}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="push-notifications">Push Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                          </div>
                          <Checkbox
                            id="push-notifications"
                            checked={profile.notifications.push}
                            onCheckedChange={(checked) => 
                              handleProfileUpdate('notifications', { ...profile.notifications, push: checked as boolean })
                            }
                            disabled={!isEditing}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="reminders">Study Reminders</Label>
                            <p className="text-sm text-muted-foreground">Get reminded to study</p>
                          </div>
                          <Checkbox
                            id="reminders"
                            checked={profile.notifications.reminders}
                            onCheckedChange={(checked) => 
                              handleProfileUpdate('notifications', { ...profile.notifications, reminders: checked as boolean })
                            }
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end mt-6">
                      <Button onClick={saveProfile}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </Card>
              )}
            </div>
          }
          
          paidContent={
            <div>
              {/* Personal Information Tab */}
              {selectedTab === 'personal' && (
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Personal Information</h2>
                    <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Enter your first name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Enter your last name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => handleProfileUpdate('dateOfBirth', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="currentCountry">Current Country</Label>
                      <Select
                        value={profile.currentCountry}
                        onValueChange={(value) => handleProfileUpdate('currentCountry', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="UK">United Kingdom</SelectItem>
                          <SelectItem value="CA">Canada</SelectItem>
                          <SelectItem value="AU">Australia</SelectItem>
                          <SelectItem value="DE">Germany</SelectItem>
                          <SelectItem value="FR">France</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="nationality">Nationality</Label>
                      <Select
                        value={profile.nationality}
                        onValueChange={(value) => handleProfileUpdate('nationality', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="US">American</SelectItem>
                          <SelectItem value="UK">British</SelectItem>
                          <SelectItem value="CA">Canadian</SelectItem>
                          <SelectItem value="AU">Australian</SelectItem>
                          <SelectItem value="DE">German</SelectItem>
                          <SelectItem value="FR">French</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end mt-6">
                      <Button onClick={saveProfile}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </Card>
              )}

              {/* Thailand Goals Tab */}
              {selectedTab === 'thailand-goals' && (
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Thailand Goals</h2>
                    <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="thailandGoal">What's your main goal in Thailand?</Label>
                      <Select
                        value={profile.thailandGoal}
                        onValueChange={(value) => handleProfileUpdate('thailandGoal', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your main goal" />
                        </SelectTrigger>
                        <SelectContent>
                          {thailandGoals.map((goal) => (
                            <SelectItem key={goal} value={goal}>{goal}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="targetTimeline">When do you want to move to Thailand?</Label>
                      <Select
                        value={profile.targetTimeline}
                        onValueChange={(value) => handleProfileUpdate('targetTimeline', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {timelineOptions.map((timeline) => (
                            <SelectItem key={timeline} value={timeline}>{timeline}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>What's currently stopping you from moving tomorrow?</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                        {obstacles.map((obstacle) => (
                          <div key={obstacle} className="flex items-center space-x-2">
                            <Checkbox
                              id={obstacle}
                              checked={profile.currentObstacles.includes(obstacle)}
                              onCheckedChange={(checked) => 
                                handleArrayUpdate('currentObstacles', obstacle, checked as boolean)
                              }
                              disabled={!isEditing}
                            />
                            <Label htmlFor={obstacle} className="text-sm">{obstacle}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label>What passports do you hold?</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                        {['US', 'UK', 'CA', 'AU', 'EU', 'Other'].map((passport) => (
                          <div key={passport} className="flex items-center space-x-2">
                            <Checkbox
                              id={passport}
                              checked={profile.passports.includes(passport)}
                              onCheckedChange={(checked) => 
                                handleArrayUpdate('passports', passport, checked as boolean)
                              }
                              disabled={!isEditing}
                            />
                            <Label htmlFor={passport} className="text-sm">{passport}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end mt-6">
                      <Button onClick={saveProfile}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </Card>
              )}

              {/* Professional Information Tab */}
              {selectedTab === 'professional' && (
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Professional Information</h2>
                    <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="currentOccupation">Current Occupation</Label>
                      <Input
                        id="currentOccupation"
                        value={profile.currentOccupation}
                        onChange={(e) => handleProfileUpdate('currentOccupation', e.target.value)}
                        disabled={!isEditing}
                        placeholder="e.g., Software Developer, Teacher, Consultant"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="employmentType">Employment Type</Label>
                      <Select
                        value={profile.employmentType}
                        onValueChange={(value) => handleProfileUpdate('employmentType', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your employment type" />
                        </SelectTrigger>
                        <SelectContent>
                          {employmentTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="incomeSource">Primary Income Source</Label>
                      <Select
                        value={profile.incomeSource}
                        onValueChange={(value) => handleProfileUpdate('incomeSource', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your income source" />
                        </SelectTrigger>
                        <SelectContent>
                          {incomeSources.map((source) => (
                            <SelectItem key={source} value={source}>{source}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="monthlyIncome">Monthly Income Range</Label>
                      <Select
                        value={profile.monthlyIncome}
                        onValueChange={(value) => handleProfileUpdate('monthlyIncome', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your income range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1000">$0 - $1,000</SelectItem>
                          <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                          <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                          <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                          <SelectItem value="10000+">$10,000+</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end mt-6">
                      <Button onClick={saveProfile}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </Card>
              )}

              {/* Skills & Strengths Tab */}
              {selectedTab === 'skills' && (
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Skills & Strengths</h2>
                    <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <Label>What skills do you have?</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                        {skills.map((skill) => (
                          <div key={skill} className="flex items-center space-x-2">
                            <Checkbox
                              id={skill}
                              checked={profile.skills.includes(skill)}
                              onCheckedChange={(checked) => 
                                handleArrayUpdate('skills', skill, checked as boolean)
                              }
                              disabled={!isEditing}
                            />
                            <Label htmlFor={skill} className="text-sm">{skill}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="experience">Tell us about your experience</Label>
                      <Textarea
                        id="experience"
                        value={profile.experience}
                        onChange={(e) => handleProfileUpdate('experience', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Describe your professional background, achievements, and relevant experience..."
                        rows={4}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="strengths">What are your key strengths?</Label>
                      <Textarea
                        id="strengths"
                        value={profile.strengths.join(', ')}
                        onChange={(e) => handleProfileUpdate('strengths', e.target.value.split(', ').filter(s => s.trim()))}
                        disabled={!isEditing}
                        placeholder="e.g., Problem-solving, Communication, Leadership, Technical expertise..."
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end mt-6">
                      <Button onClick={saveProfile}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </Card>
              )}

              {/* Settings Tab */}
              {selectedTab === 'settings' && (
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Settings & Preferences</h2>
                    <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="learningStyle">Learning Style Preference</Label>
                      <Select
                        value={profile.learningStyle}
                        onValueChange={(value) => handleProfileUpdate('learningStyle', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your preferred learning style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="visual">Visual (Videos, Images, Charts)</SelectItem>
                          <SelectItem value="reading">Reading (Text, Articles, Guides)</SelectItem>
                          <SelectItem value="hands-on">Hands-on (Practice, Exercises)</SelectItem>
                          <SelectItem value="mixed">Mixed (Combination of all)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="studyTime">Preferred Study Time</Label>
                      <Select
                        value={profile.studyTime}
                        onValueChange={(value) => handleProfileUpdate('studyTime', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="When do you prefer to study?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (6 AM - 12 PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12 PM - 6 PM)</SelectItem>
                          <SelectItem value="evening">Evening (6 PM - 12 AM)</SelectItem>
                          <SelectItem value="flexible">Flexible (Any time)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Notification Preferences</Label>
                      <div className="space-y-3 mt-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive updates via email</p>
                          </div>
                          <Checkbox
                            id="email-notifications"
                            checked={profile.notifications.email}
                            onCheckedChange={(checked) => 
                              handleProfileUpdate('notifications', { ...profile.notifications, email: checked as boolean })
                            }
                            disabled={!isEditing}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="push-notifications">Push Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                          </div>
                          <Checkbox
                            id="push-notifications"
                            checked={profile.notifications.push}
                            onCheckedChange={(checked) => 
                              handleProfileUpdate('notifications', { ...profile.notifications, push: checked as boolean })
                            }
                            disabled={!isEditing}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="reminders">Study Reminders</Label>
                            <p className="text-sm text-muted-foreground">Get reminded to study</p>
                          </div>
                          <Checkbox
                            id="reminders"
                            checked={profile.notifications.reminders}
                            onCheckedChange={(checked) => 
                              handleProfileUpdate('notifications', { ...profile.notifications, reminders: checked as boolean })
                            }
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end mt-6">
                      <Button onClick={saveProfile}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </Card>
              )}
            </div>
          }
        />
      </div>
    </div>
  );
}
