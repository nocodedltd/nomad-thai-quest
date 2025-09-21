import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { 
  Globe, 
  Home, 
  Users, 
  MapPin, 
  Gift, 
  ExternalLink,
  CheckCircle,
  Star,
  Heart,
  Plane
} from "lucide-react";

export default function WorldpackersAffiliate() {
  const handleWorldpackersClick = () => {
    window.open('https://www.worldpackers.com/es/promo/RICHARDKLEIN22?utm_campaign=RICHARDKLEIN22&utm_medium=referral&utm_source=affiliate', '_blank');
  };

  const copyDiscountCode = () => {
    navigator.clipboard.writeText('RICHARDKLEIN22');
    // You could add a toast notification here
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Globe className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Worldpackers Volunteering
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Exchange your skills for free accommodation around the world. Perfect for digital nomads looking to reduce living costs while exploring Thailand and beyond.
        </p>
      </div>

      {/* Discount Alert */}
      <Alert className="glass">
        <Gift className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800 dark:text-green-200">
          <strong>Special Offer:</strong> Use code <code className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded text-sm font-mono">RICHARDKLEIN22</code> for $10 off your Worldpackers membership!
        </AlertDescription>
      </Alert>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* What is Worldpackers */}
        <Card className="border-2 border-blue-100 dark:border-blue-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <Home className="w-5 h-5" />
              What is Worldpackers?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Worldpackers is a platform that connects travelers with hosts who offer free accommodation in exchange for work. Perfect for digital nomads who want to:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Reduce accommodation costs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Experience local culture</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Build meaningful connections</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Gain new skills</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Benefits for Digital Nomads */}
        <Card className="border-2 border-purple-100 dark:border-purple-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
              <Users className="w-5 h-5" />
              Perfect for Digital Nomads
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Thailand Opportunities</h4>
                  <p className="text-sm text-muted-foreground">Find volunteering positions in Bangkok, Chiang Mai, and other popular nomad destinations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Flexible Work</h4>
                  <p className="text-sm text-muted-foreground">Choose positions that fit your remote work schedule</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <Plane className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Global Network</h4>
                  <p className="text-sm text-muted-foreground">Access opportunities in 170+ countries worldwide</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How it Works */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">How Worldpackers Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold">Sign Up</h3>
              <p className="text-sm text-muted-foreground">Create your profile and browse opportunities</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold">Apply</h3>
              <p className="text-sm text-muted-foreground">Connect with hosts and discuss your stay</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold">Volunteer</h3>
              <p className="text-sm text-muted-foreground">Work a few hours daily in exchange for free accommodation</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-2 border-blue-200 dark:border-blue-800">
        <CardContent className="text-center py-8">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <Gift className="w-4 h-4 mr-1" />
                $10 Off with Code: RICHARDKLEIN22
              </Badge>
            </div>
            <h3 className="text-xl font-bold">Ready to Start Your Volunteering Journey?</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Join thousands of digital nomads who have reduced their living costs while exploring the world
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button 
                onClick={handleWorldpackersClick}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Join Worldpackers Now
              </Button>
              <Button 
                variant="outline" 
                onClick={copyDiscountCode}
                className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950"
              >
                Copy Discount Code
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              * This is an affiliate link. We may earn a commission at no extra cost to you.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">What Digital Nomads Say</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm italic">
                "Worldpackers helped me save thousands on accommodation while working remotely in Thailand. The community is amazing!"
              </p>
              <p className="text-xs text-muted-foreground">- Sarah, Digital Nomad</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm italic">
                "Perfect for nomads who want to experience local culture while keeping costs low. Highly recommended!"
              </p>
              <p className="text-xs text-muted-foreground">- Mike, Remote Worker</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
