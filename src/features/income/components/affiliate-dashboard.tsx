import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Copy, 
  Share2, 
  Eye, 
  MousePointer,
  Award,
  Download,
  ExternalLink,
  Target,
  Zap,
  BarChart3,
  Gift,
  Link2,
  Mail,
  CreditCard,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  Play,
  BookOpen,
  Star,
  Clock,
  Smartphone,
  Monitor,
  Globe
} from "lucide-react";
import { useUser } from "@/shared/contexts/user-context";
import { UserContent } from "@/shared/components/paywall/user-content";
import { UpgradePrompt } from "@/shared/components/paywall/upgrade-prompt";

// Mock data for affiliate stats
const affiliateStats = {
  totalEarnings: 847.50,
  pendingEarnings: 156.75,
  thisMonthEarnings: 192.30,
  lastMonthEarnings: 234.50,
  totalReferrals: 23,
  activeReferrals: 12,
  conversionRate: 3.2,
  clicksThisMonth: 567,
  commissionsEarned: 8,
  tierLevel: "Bronze",
  nextTierTarget: 1000
};

const recentEarnings = [
  {
    id: 1,
    date: "2024-01-15",
    customer: "j***@email.com",
    product: "Premium Membership",
    commission: 25.00,
    status: "paid"
  },
  {
    id: 2,
    date: "2024-01-14",
    customer: "s***@email.com",
    product: "Course Bundle",
    commission: 18.50,
    status: "pending"
  },
  {
    id: 3,
    date: "2024-01-13",
    customer: "m***@email.com",
    product: "Annual Plan",
    commission: 45.00,
    status: "paid"
  }
];

const marketingMaterials = [
  {
    id: 1,
    type: "banner",
    title: "Thailand Journey - Mobile Banner",
    size: "320x100",
    format: "PNG",
    clicks: 89,
    conversions: 4,
    description: "Perfect for mobile apps and responsive sites"
  },
  {
    id: 2,
    type: "text",
    title: "Email Template - Getting Started",
    format: "HTML",
    clicks: 156,
    conversions: 8,
    description: "Ready-to-send welcome email template"
  },
  {
    id: 3,
    type: "social",
    title: "Instagram Story Template",
    size: "1080x1920",
    format: "PNG",
    clicks: 67,
    conversions: 3,
    description: "Eye-catching story template for social media"
  },
  {
    id: 4,
    type: "video",
    title: "30-Second Promo Video",
    size: "1920x1080",
    format: "MP4",
    clicks: 234,
    conversions: 12,
    description: "Short promotional video for any platform"
  }
];

const quickStartGuide = [
  {
    step: 1,
    title: "Get Your Link",
    description: "Copy your unique affiliate link below",
    icon: Link2,
    action: "Copy Link"
  },
  {
    step: 2,
    title: "Share Content",
    description: "Use our marketing materials to promote",
    icon: Share2,
    action: "Browse Materials"
  },
  {
    step: 3,
    title: "Track Progress",
    description: "Monitor clicks, conversions, and earnings",
    icon: BarChart3,
    action: "View Analytics"
  },
  {
    step: 4,
    title: "Get Paid",
    description: "Receive monthly payments via PayPal",
    icon: DollarSign,
    action: "Setup Payment"
  }
];

const commissionStructure = [
  {
    product: "Premium Membership",
    commission: "25%",
    amount: "$25/sale",
    description: "Monthly premium subscriptions"
  },
  {
    product: "Course Bundles", 
    commission: "30%",
    amount: "$15-30/sale",
    description: "Individual course purchases"
  },
  {
    product: "Annual Plans",
    commission: "35%",
    amount: "$45/sale",
    description: "Yearly subscription plans"
  }
];

export default function AffiliateDashboard() {
  const { userType } = useUser();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [copiedLink, setCopiedLink] = useState(false);
  
  const affiliateLink = `https://nomad-thai-quest.com/?ref=NTQ${Date.now().toString().slice(-6)}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = "text-primary", className = "" }: any) => (
    <Card className={className}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</p>
            <p className={`text-lg sm:text-2xl font-bold ${color} mt-1`}>{value}</p>
            {trend && (
              <div className="flex items-center mt-1">
                {trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                )}
                <span className={`text-xs sm:text-sm ml-1 ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          <div className={`p-2 sm:p-3 rounded-full bg-muted flex-shrink-0`}>
            <Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-3 sm:p-4 lg:p-6">
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3 lg:mb-4">
            🚀 Affiliate Program
          </h1>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Earn money by sharing Thailand Nomad Quest with your network
          </p>
        </div>

        <UserContent
          guestContent={
            <div className="text-center py-8 sm:py-12">
              <div className="max-w-md mx-auto px-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Join Our Affiliate Program</h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                  Earn up to 35% commission by promoting Thailand Nomad Quest to your audience
                </p>
                
                {/* Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                  <div className="p-3 sm:p-4 bg-muted rounded-lg">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Percent className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium">Up to 35% Commission</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-muted rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium">Monthly Payouts</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-muted rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Gift className="w-4 h-4 text-purple-600" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium">Marketing Materials</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-muted rounded-lg">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-2">
                      <BarChart3 className="w-4 h-4 text-orange-600" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium">Real-time Analytics</p>
                  </div>
                </div>
                
                <UpgradePrompt 
                  title="Start Earning Today"
                  description="Create a free account to access your affiliate dashboard and start earning commissions"
                />
              </div>
            </div>
          }
          
          freeContent={
            <div className="space-y-4 sm:space-y-6">
              {/* Welcome Banner for Free Users */}
              <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold mb-1">Welcome to the Affiliate Program!</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        Start earning immediately by sharing your unique affiliate link
                      </p>
                    </div>
                    <Button className="w-full sm:w-auto flex-shrink-0">
                      Get Started
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Start Guide */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Quick Start Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  {quickStartGuide.map((step) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.step} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-muted rounded-lg">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {step.step}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm sm:text-base">{step.title}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">{step.description}</p>
                        </div>
                        <Button size="sm" variant="outline" className="flex-shrink-0 text-xs">
                          {step.action}
                        </Button>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Stats Overview - Mobile Optimized */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                <StatCard
                  title="Total Earnings"
                  value={`$${affiliateStats.totalEarnings.toFixed(0)}`}
                  icon={DollarSign}
                  trend="up"
                  trendValue="+8.2%"
                  color="text-green-600"
                />
                <StatCard
                  title="This Month"
                  value={`$${affiliateStats.thisMonthEarnings.toFixed(0)}`}
                  icon={TrendingUp}
                  trend="up"
                  trendValue="+12%"
                  color="text-blue-600"
                />
                <StatCard
                  title="Referrals"
                  value={affiliateStats.totalReferrals}
                  icon={Users}
                  trend="up"
                  trendValue="+3"
                  color="text-purple-600"
                />
                <StatCard
                  title="Conversion"
                  value={`${affiliateStats.conversionRate}%`}
                  icon={Target}
                  trend="up"
                  trendValue="+0.5%"
                  color="text-orange-600"
                />
              </div>

              {/* Your Affiliate Link - Mobile Optimized */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                    <Link2 className="w-5 h-5" />
                    Your Affiliate Link
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Input 
                      value={affiliateLink} 
                      readOnly 
                      className="flex-1 text-xs sm:text-sm"
                    />
                    <Button 
                      onClick={handleCopyLink}
                      className="w-full sm:w-auto flex-shrink-0"
                      size="sm"
                    >
                      {copiedLink ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copiedLink ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    <div className="p-2 sm:p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium">{affiliateStats.clicksThisMonth}</p>
                      <p className="text-xs text-muted-foreground">Clicks</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <MousePointer className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium">{affiliateStats.conversionRate}%</p>
                      <p className="text-xs text-muted-foreground">CVR</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium">{affiliateStats.totalReferrals}</p>
                      <p className="text-xs text-muted-foreground">Referrals</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium">{affiliateStats.commissionsEarned}</p>
                      <p className="text-xs text-muted-foreground">Sales</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Commission Structure */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                    <Percent className="w-5 h-5" />
                    Commission Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {commissionStructure.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-muted rounded-lg">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm sm:text-base">{item.product}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <p className="font-bold text-sm sm:text-base text-green-600">{item.commission}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">{item.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Earnings */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Recent Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {recentEarnings.map((earning) => (
                      <div key={earning.id} className="flex items-center justify-between p-3 sm:p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm sm:text-base truncate">{earning.product}</p>
                            <p className="text-xs sm:text-sm text-muted-foreground">{earning.date}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <p className="font-bold text-sm sm:text-base text-green-600">${earning.commission.toFixed(2)}</p>
                          <Badge variant={earning.status === "paid" ? "default" : "secondary"} className="text-xs">
                            {earning.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <UpgradePrompt 
                      compact
                      title="Unlock Full Analytics"
                      description="Get detailed earnings reports, payment history, and advanced tracking"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Marketing Materials Preview */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                    <Gift className="w-5 h-5" />
                    Marketing Materials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {marketingMaterials.slice(0, 2).map((material) => (
                      <div key={material.id} className="p-3 sm:p-4 bg-muted rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm sm:text-base flex-1 min-w-0 pr-2">{material.title}</h4>
                          <Badge variant="outline" className="text-xs flex-shrink-0">{material.format}</Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-3">{material.description}</p>
                        <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-3">
                          <span>{material.clicks} clicks</span>
                          <span>{material.conversions} conversions</span>
                        </div>
                        <Button size="sm" className="w-full">
                          <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <UpgradePrompt 
                      compact
                      title="Access Full Material Library"
                      description="Get banners, email templates, videos, and social media content"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Device Optimization Notice */}
              <Card className="glass">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex gap-2">
                      <Smartphone className="w-5 h-5 text-blue-600" />
                      <Monitor className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm sm:text-base text-blue-900 dark:text-blue-100 mb-1">
                        Optimized for All Devices
                      </h4>
                      <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-200">
                        Your affiliate dashboard works perfectly on mobile, tablet, and desktop. Share your link anywhere!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          }
          
          paidContent={
            <div className="space-y-4 sm:space-y-6">
              {/* Premium Welcome Banner */}
              <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold mb-1 text-yellow-900 dark:text-yellow-100">Premium Affiliate Access</h3>
                      <p className="text-sm sm:text-base text-yellow-800 dark:text-yellow-200">
                        You have full access to all affiliate features with enhanced analytics and no restrictions!
                      </p>
                    </div>
                    <Badge className="bg-yellow-500 text-white flex-shrink-0">Premium</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Stats for Premium Users */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                <StatCard
                  title="Total Earnings"
                  value={`$${affiliateStats.totalEarnings.toFixed(0)}`}
                  icon={DollarSign}
                  trend="up"
                  trendValue="+8.2%"
                  color="text-green-600"
                />
                <StatCard
                  title="This Month"
                  value={`$${affiliateStats.thisMonthEarnings.toFixed(0)}`}
                  icon={TrendingUp}
                  trend="up"
                  trendValue="+12%"
                  color="text-blue-600"
                />
                <StatCard
                  title="Referrals"
                  value={affiliateStats.totalReferrals}
                  icon={Users}
                  trend="up"
                  trendValue="+3"
                  color="text-purple-600"
                />
                <StatCard
                  title="Conversion"
                  value={`${affiliateStats.conversionRate}%`}
                  icon={Target}
                  trend="up"
                  trendValue="+0.5%"
                  color="text-orange-600"
                />
              </div>

              {/* Enhanced Affiliate Links */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                    <Link2 className="w-5 h-5" />
                    Your Affiliate Links
                    <Badge variant="secondary" className="text-xs">Premium</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Input 
                      value={affiliateLink} 
                      readOnly 
                      className="flex-1 text-xs sm:text-sm"
                    />
                    <Button 
                      onClick={handleCopyLink}
                      className="w-full sm:w-auto flex-shrink-0"
                      size="sm"
                    >
                      {copiedLink ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copiedLink ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    <div className="p-2 sm:p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium">{affiliateStats.clicksThisMonth}</p>
                      <p className="text-xs text-muted-foreground">Clicks</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <MousePointer className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium">{affiliateStats.conversionRate}%</p>
                      <p className="text-xs text-muted-foreground">CVR</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium">{affiliateStats.totalReferrals}</p>
                      <p className="text-xs text-muted-foreground">Referrals</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium">{affiliateStats.commissionsEarned}</p>
                      <p className="text-xs text-muted-foreground">Sales</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rest of the content same as free users but without upgrade prompts */}
              {/* Commission Structure */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                    <Percent className="w-5 h-5" />
                    Commission Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {commissionStructure.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-muted rounded-lg">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm sm:text-base">{item.product}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <p className="font-bold text-sm sm:text-base text-green-600">{item.commission}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">{item.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Earnings */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Recent Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {recentEarnings.map((earning) => (
                      <div key={earning.id} className="flex items-center justify-between p-3 sm:p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm sm:text-base truncate">{earning.product}</p>
                            <p className="text-xs sm:text-sm text-muted-foreground">{earning.date}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <p className="font-bold text-sm sm:text-base text-green-600">${earning.commission.toFixed(2)}</p>
                          <Badge variant={earning.status === "paid" ? "default" : "secondary"} className="text-xs">
                            {earning.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Marketing Materials - Full Access */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                    <Gift className="w-5 h-5" />
                    Marketing Materials
                    <Badge variant="secondary" className="text-xs">Full Access</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {marketingMaterials.map((material) => (
                      <div key={material.id} className="p-3 sm:p-4 bg-muted rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm sm:text-base flex-1 min-w-0 pr-2">{material.title}</h4>
                          <Badge variant="outline" className="text-xs flex-shrink-0">{material.format}</Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-3">{material.description}</p>
                        <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-3">
                          <span>{material.clicks} clicks</span>
                          <span>{material.conversions} conversions</span>
                        </div>
                        <Button size="sm" className="w-full">
                          <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          }
        />
      </div>
    </div>
  );
}
