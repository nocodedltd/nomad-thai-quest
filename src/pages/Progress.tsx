import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { 
  Target,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  Zap,
  Calendar,
  Trophy,
  Fire,
  BookOpen,
  DollarSign,
  FileText,
  Building,
  Users,
  ArrowRight,
  Download,
  Share2
} from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { UserContent } from "@/components/shared/user-content";
import { UpgradePrompt } from "@/components/shared/upgrade-prompt";

const completedCourses = [
  {
    id: 1,
    title: "Amazon FBA Fundamentals",
    category: "Income",
    completedDate: "2024-01-15",
    xpEarned: 150,
    certificate: true,
    rating: 5
  },
  {
    id: 2,
    title: "Tourist Visa Guide",
    category: "Legal",
    completedDate: "2024-01-20", 
    xpEarned: 100,
    certificate: true,
    rating: 4
  }
];

const inProgressCourses = [
  {
    id: 3,
    title: "Remote Work Mastery",
    category: "Income",
    progress: 65,
    timeSpent: "3.5 hours",
    nextLesson: "Building Client Relationships",
    xpProgress: 65
  },
  {
    id: 4,
    title: "Bangkok Living Guide", 
    category: "Living",
    progress: 30,
    timeSpent: "1.2 hours",
    nextLesson: "Neighborhood Selection",
    xpProgress: 30
  }
];

const achievements = [
  {
    id: 1,
    title: "First Steps",
    description: "Completed your first lesson",
    icon: "🎯",
    category: "Milestone",
    unlockedDate: "2024-01-10",
    rarity: "Common"
  },
  {
    id: 2,
    title: "Income Explorer",
    description: "Started exploring income options",
    icon: "💰",
    category: "Income",
    unlockedDate: "2024-01-15",
    rarity: "Common"
  },
  {
    id: 3,
    title: "Course Completed",
    description: "Finished your first complete course",
    icon: "🏆",
    category: "Learning",
    unlockedDate: "2024-01-15",
    rarity: "Uncommon"
  },
  {
    id: 4,
    title: "Legal Eagle",
    description: "Mastered visa requirements",
    icon: "⚖️",
    category: "Legal",
    unlockedDate: "2024-01-20",
    rarity: "Rare"
  }
];

const learningGoals = [
  {
    id: 1,
    title: "Complete Income Track",
    description: "Finish all income-related courses",
    progress: 40,
    target: 100,
    deadline: "2024-03-01",
    priority: "High"
  },
  {
    id: 2,
    title: "Visa Application Ready",
    description: "Gather all required documentation",
    progress: 75,
    target: 100,
    deadline: "2024-02-15",
    priority: "High"
  },
  {
    id: 3,
    title: "Community Integration",
    description: "Connect with local expat groups",
    progress: 20,
    target: 100,
    deadline: "2024-04-01",
    priority: "Medium"
  }
];

const weeklyStats = [
  { week: "Week 1", xp: 150, lessons: 3, time: "2.5h" },
  { week: "Week 2", xp: 200, lessons: 4, time: "3.2h" },
  { week: "Week 3", xp: 180, lessons: 3, time: "2.8h" },
  { week: "Week 4", xp: 220, lessons: 5, time: "4.1h" },
];

export default function Progress() {
  const navigate = useNavigate();
  const { userType, userState } = useUser();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'courses' | 'achievements' | 'goals'>('overview');

  const totalXP = userState.progress?.totalXP || 1250;
  const currentLevel = Math.floor(totalXP / 500) + 1;
  const xpToNextLevel = ((currentLevel * 500) - totalXP);
  const levelProgress = ((totalXP % 500) / 500) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">📊 Progress Analytics</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Deep dive into your learning journey with detailed analytics, achievements, and performance insights
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-muted rounded-lg p-1">
            {[
              { id: 'overview', label: 'Analytics Overview', desc: 'Performance stats' },
              { id: 'courses', label: 'Course History', desc: 'Learning progress' },
              { id: 'achievements', label: 'Achievement Gallery', desc: 'All unlocked rewards' },
              { id: 'goals', label: 'Goal Tracking', desc: 'Custom objectives' }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={selectedTab === tab.id ? 'default' : 'ghost'}
                onClick={() => setSelectedTab(tab.id as any)}
                className="flex flex-col px-4 py-3 h-auto"
              >
                <span className="font-medium">{tab.label}</span>
                <span className="text-xs text-muted-foreground">{tab.desc}</span>
              </Button>
            ))}
          </div>
        </div>

        <UserContent
          guestContent={
            <div className="text-center">
              <div className="mb-8">
                <Trophy className="w-24 h-24 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold mb-4">Track Your Thailand Journey</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Create an account to track your progress, earn achievements, and monitor your learning journey
                </p>
              </div>
              
              <UpgradePrompt 
                title="Start Tracking Your Progress"
                description="Join thousands of learners who are successfully making their way to Thailand"
                features={[
                  "Personal progress dashboard",
                  "Achievement system",
                  "Learning analytics",
                  "Goal setting & tracking"
                ]}
              />
            </div>
          }
          
          freeContent={
            <div>
              {selectedTab === 'overview' && (
                <div>
                  {/* Level & XP Overview */}
                  <Card className="p-6 mb-8 bg-gradient-to-br from-primary/10 to-primary/5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold">Level {currentLevel}</h3>
                        <p className="text-muted-foreground">Thailand Journey Explorer</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">{totalXP}</div>
                        <div className="text-sm text-muted-foreground">Total XP</div>
                      </div>
                    </div>
                    
                    <ProgressBar 
                      progress={levelProgress}
                      showPercentage={false}
                      size="lg"
                      className="mb-2"
                    />
                    <div className="text-sm text-muted-foreground">
                      {xpToNextLevel} XP until Level {currentLevel + 1}
                    </div>
                  </Card>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <Card className="p-6 text-center">
                      <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                      <div className="text-2xl font-bold">{userState.progress?.completedLessons || 8}</div>
                      <div className="text-sm text-muted-foreground">Lessons Completed</div>
                    </Card>
                    <Card className="p-6 text-center">
                      <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                      <div className="text-2xl font-bold">{achievements.length}</div>
                      <div className="text-sm text-muted-foreground">Achievements</div>
                    </Card>
                    <Card className="p-6 text-center">
                      <Clock className="w-8 h-8 mx-auto mb-2 text-green-500" />
                      <div className="text-2xl font-bold">12.6h</div>
                      <div className="text-sm text-muted-foreground">Time Invested</div>
                    </Card>
                    <Card className="p-6 text-center">
                      <Target className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                      <div className="text-2xl font-bold">{userState.progress?.currentPhase || 2}</div>
                      <div className="text-sm text-muted-foreground">Current Phase</div>
                    </Card>
                  </div>

                  {/* Recent Achievements */}
                  <Card className="p-6 mb-8">
                    <h3 className="text-xl font-bold mb-4">Recent Achievements</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {achievements.slice(0, 4).map((achievement) => (
                        <div key={achievement.id} className="text-center p-4 border rounded-lg">
                          <div className="text-3xl mb-2">{achievement.icon}</div>
                          <div className="font-semibold text-sm">{achievement.title}</div>
                          <div className="text-xs text-muted-foreground">{achievement.description}</div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <UpgradePrompt 
                    compact
                    title="Unlock Advanced Analytics"
                    description="Get detailed insights, goal tracking, and comprehensive progress reports"
                  />
                </div>
              )}
              
              {selectedTab === 'courses' && (
                <div>
                  {/* Completed Courses */}
                  <Card className="p-6 mb-8">
                    <h3 className="text-xl font-bold mb-4">Completed Courses</h3>
                    <div className="space-y-4">
                      {completedCourses.slice(0, 2).map((course) => (
                        <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                            <div>
                              <h4 className="font-semibold">{course.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                Completed {course.completedDate} • {course.xpEarned} XP earned
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < course.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Certificate
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* In Progress */}
                  <Card className="p-6 mb-8">
                    <h3 className="text-xl font-bold mb-4">In Progress</h3>
                    <div className="space-y-4">
                      {inProgressCourses.slice(0, 1).map((course) => (
                        <div key={course.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-semibold">{course.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                Next: {course.nextLesson}
                              </p>
                            </div>
                            <Badge variant="outline">{course.category}</Badge>
                          </div>
                          
                          <ProgressBar 
                            progress={course.progress}
                            showPercentage={true}
                            size="sm"
                            className="mb-4"
                          />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              {course.timeSpent} spent • {course.xpProgress} XP earned
                            </span>
                            <Button size="sm">
                              Continue <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <UpgradePrompt 
                    compact
                    title="Access All Courses"
                    description="Unlock premium courses and advanced learning paths"
                  />
                </div>
              )}
              
              {selectedTab === 'achievements' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((achievement) => (
                      <Card key={achievement.id} className="p-6 text-center">
                        <div className="text-4xl mb-4">{achievement.icon}</div>
                        <h3 className="font-bold mb-2">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                        <div className="flex justify-between items-center text-xs">
                          <Badge variant="outline" className={`${
                            achievement.rarity === 'Rare' ? 'bg-purple-100' :
                            achievement.rarity === 'Uncommon' ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                            {achievement.rarity}
                          </Badge>
                          <span className="text-muted-foreground">{achievement.unlockedDate}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedTab === 'goals' && (
                <div>
                  <div className="space-y-6">
                    {learningGoals.slice(0, 2).map((goal) => (
                      <Card key={goal.id} className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold">{goal.title}</h3>
                            <p className="text-sm text-muted-foreground">{goal.description}</p>
                          </div>
                          <Badge variant={goal.priority === 'High' ? 'destructive' : 'secondary'}>
                            {goal.priority}
                          </Badge>
                        </div>
                        
                        <ProgressBar 
                          progress={goal.progress}
                          showPercentage={true}
                          size="sm"
                          className="mb-4"
                        />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Due: {goal.deadline}
                          </span>
                          <Button size="sm" variant="outline">Update Progress</Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  <UpgradePrompt 
                    compact
                    title="Advanced Goal Tracking"
                    description="Create custom goals, set reminders, and track detailed analytics"
                  />
                </div>
              )}
            </div>
          }
          
          paidContent={
            <div>
              {selectedTab === 'overview' && (
                <div>
                  {/* Level & XP Overview */}
                  <Card className="p-6 mb-8 bg-gradient-to-br from-primary/10 to-primary/5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold">Level {currentLevel}</h3>
                        <p className="text-muted-foreground">Thailand Journey Master</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">{totalXP}</div>
                        <div className="text-sm text-muted-foreground">Total XP</div>
                      </div>
                    </div>
                    
                    <ProgressBar 
                      progress={levelProgress}
                      showPercentage={false}
                      size="lg"
                      className="mb-2"
                    />
                    <div className="text-sm text-muted-foreground">
                      {xpToNextLevel} XP until Level {currentLevel + 1}
                    </div>
                  </Card>

                  {/* Enhanced Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <Card className="p-6 text-center">
                      <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                      <div className="text-2xl font-bold">{userState.progress?.completedLessons || 8}</div>
                      <div className="text-sm text-muted-foreground">Lessons Completed</div>
                      <div className="text-xs text-green-600 mt-1">+3 this week</div>
                    </Card>
                    <Card className="p-6 text-center">
                      <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                      <div className="text-2xl font-bold">{achievements.length}</div>
                      <div className="text-sm text-muted-foreground">Achievements</div>
                      <div className="text-xs text-green-600 mt-1">1 rare unlocked</div>
                    </Card>
                    <Card className="p-6 text-center">
                      <Clock className="w-8 h-8 mx-auto mb-2 text-green-500" />
                      <div className="text-2xl font-bold">12.6h</div>
                      <div className="text-sm text-muted-foreground">Time Invested</div>
                      <div className="text-xs text-green-600 mt-1">4.1h this week</div>
                    </Card>
                    <Card className="p-6 text-center">
                      <Target className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                      <div className="text-2xl font-bold">{userState.progress?.currentPhase || 2}</div>
                      <div className="text-sm text-muted-foreground">Current Phase</div>
                      <div className="text-xs text-green-600 mt-1">On track</div>
                    </Card>
                  </div>

                  {/* Weekly Progress Chart */}
                  <Card className="p-6 mb-8">
                    <h3 className="text-xl font-bold mb-4">Weekly Progress</h3>
                    <div className="grid grid-cols-4 gap-4">
                      {weeklyStats.map((week, index) => (
                        <div key={index} className="text-center">
                          <div className="bg-primary/10 p-4 rounded-lg mb-2">
                            <div className="text-lg font-bold">{week.xp}</div>
                            <div className="text-xs text-muted-foreground">XP</div>
                          </div>
                          <div className="text-sm font-medium">{week.week}</div>
                          <div className="text-xs text-muted-foreground">
                            {week.lessons} lessons • {week.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* All Achievements */}
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">All Achievements</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {achievements.map((achievement) => (
                        <div key={achievement.id} className="text-center p-4 border rounded-lg hover:shadow-lg transition-shadow">
                          <div className="text-3xl mb-2">{achievement.icon}</div>
                          <div className="font-semibold text-sm">{achievement.title}</div>
                          <div className="text-xs text-muted-foreground">{achievement.description}</div>
                          <Badge 
                            variant="outline" 
                            className={`mt-2 text-xs ${
                              achievement.rarity === 'Rare' ? 'bg-purple-100' :
                              achievement.rarity === 'Uncommon' ? 'bg-blue-100' : 'bg-gray-100'
                            }`}
                          >
                            {achievement.rarity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}
              
              {selectedTab === 'courses' && (
                <div>
                  {/* Completed Courses */}
                  <Card className="p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">Completed Courses</h3>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Progress
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {completedCourses.map((course) => (
                        <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-lg transition-shadow">
                          <div className="flex items-center gap-4">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                            <div>
                              <h4 className="font-semibold">{course.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                Completed {course.completedDate} • {course.xpEarned} XP earned
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < course.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Certificate
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* In Progress */}
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">In Progress</h3>
                    <div className="space-y-4">
                      {inProgressCourses.map((course) => (
                        <div key={course.id} className="p-4 border rounded-lg hover:shadow-lg transition-shadow">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-semibold">{course.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                Next: {course.nextLesson}
                              </p>
                            </div>
                            <Badge variant="outline">{course.category}</Badge>
                          </div>
                          
                          <ProgressBar 
                            progress={course.progress}
                            showPercentage={true}
                            size="sm"
                            className="mb-4"
                          />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              {course.timeSpent} spent • {course.xpProgress} XP earned
                            </span>
                            <Button size="sm">
                              Continue <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}
              
              {selectedTab === 'achievements' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((achievement) => (
                      <Card key={achievement.id} className="p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="text-4xl mb-4">{achievement.icon}</div>
                        <h3 className="font-bold mb-2">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                        <div className="flex justify-between items-center text-xs">
                          <Badge variant="outline" className={`${
                            achievement.rarity === 'Rare' ? 'bg-purple-100 text-purple-700' :
                            achievement.rarity === 'Uncommon' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'
                          }`}>
                            {achievement.rarity}
                          </Badge>
                          <span className="text-muted-foreground">{achievement.unlockedDate}</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-4">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedTab === 'goals' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Learning Goals</h2>
                    <Button>
                      <Target className="w-4 h-4 mr-2" />
                      Add New Goal
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {learningGoals.map((goal) => (
                      <Card key={goal.id} className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold">{goal.title}</h3>
                            <p className="text-sm text-muted-foreground">{goal.description}</p>
                          </div>
                          <Badge variant={goal.priority === 'High' ? 'destructive' : 'secondary'}>
                            {goal.priority}
                          </Badge>
                        </div>
                        
                        <ProgressBar 
                          progress={goal.progress}
                          showPercentage={true}
                          size="sm"
                          className="mb-4"
                        />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Due: {goal.deadline} • {goal.progress}% complete
                          </span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm">Update Progress</Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          }
        />
      </div>
    </div>
  );
}
