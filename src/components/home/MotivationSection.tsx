import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Flame,
  TrendingDown,
  TrendingUp as TrendingUpIcon,
  Crown,
  AlertTriangle,
  Timer,
  Banknote,
  Zap,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Thailand motivation facts and statistics
const thailandFacts = {
  costComparison: {
    thailand: {
      rent: 400,
      food: 200,
      transport: 50,
      utilities: 60,
      entertainment: 150,
      total: 860
    },
    western: {
      rent: 1200,
      food: 400,
      transport: 200,
      utilities: 150,
      entertainment: 300,
      total: 2250
    }
  },
  millionaireData: {
    ukExodus: {
      leaving: 9500,
      arriving: 1000,
      netChange: -8500
    },
    thailandInflux: {
      leaving: 200,
      arriving: 3200,
      netChange: +3000
    }
  },
  achievements: {
    bangkokRanking: 1,
    totalDigitalNomads: 47000,
    avgIncomeIncrease: 65,
    visaApprovalRate: 94
  }
};

const urgencyTriggers = [
  {
    title: "Visa prices increasing 15% next year",
    timeLeft: "4 months",
    impact: "Save $400+",
    color: "red"
  },
  {
    title: "Remote work revolution accelerating", 
    timeLeft: "Limited time",
    impact: "First mover advantage",
    color: "orange"
  },
  {
    title: "Bangkok property prices up 8% this year",
    timeLeft: "Act now", 
    impact: "Lock in current rates",
    color: "yellow"
  }
];

export function MotivationSection() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-lg mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Flame className="w-5 h-5" />
          <span className="font-bold text-lg">⚡ The Thailand Window is Closing Fast</span>
          <Flame className="w-5 h-5" />
        </div>
        <p className="text-sm opacity-90">Visa costs rising 15% in 2024 • Remote work competition intensifying • Property prices surging</p>
      </div>

      {/* Cost Comparison Hero */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 p-8 rounded-xl mb-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">💰 The Thailand Money Hack</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Earn $2,000/month in Thailand = More purchasing power than $3,500/month in the West
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Western Costs */}
          <Card className="p-6 border-red-200 bg-red-50 dark:bg-red-950">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-red-700 dark:text-red-300">🇺🇸🇬🇧 Western Life</div>
              <div className="text-sm text-muted-foreground">Making $3,500/month</div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Rent</span>
                <span className="font-semibold">${thailandFacts.costComparison.western.rent}</span>
              </div>
              <div className="flex justify-between">
                <span>Food</span>
                <span className="font-semibold">${thailandFacts.costComparison.western.food}</span>
              </div>
              <div className="flex justify-between">
                <span>Transport</span>
                <span className="font-semibold">${thailandFacts.costComparison.western.transport}</span>
              </div>
              <div className="flex justify-between">
                <span>Utilities</span>
                <span className="font-semibold">${thailandFacts.costComparison.western.utilities}</span>
              </div>
              <div className="flex justify-between">
                <span>Entertainment</span>
                <span className="font-semibold">${thailandFacts.costComparison.western.entertainment}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total Expenses</span>
                <span className="text-red-600">${thailandFacts.costComparison.western.total}</span>
              </div>
              <div className="bg-red-100 dark:bg-red-900 p-3 rounded text-center">
                <div className="text-2xl font-bold text-red-700 dark:text-red-300">${3500 - thailandFacts.costComparison.western.total}</div>
                <div className="text-sm text-red-600 dark:text-red-400">Left after expenses</div>
              </div>
            </div>
          </Card>

          {/* Thailand Costs */}
          <Card className="p-6 border-green-200 bg-green-50 dark:bg-green-950">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">🇹🇭 Thailand Life</div>
              <div className="text-sm text-muted-foreground">Making $2,000/month</div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Rent (Nice condo)</span>
                <span className="font-semibold">${thailandFacts.costComparison.thailand.rent}</span>
              </div>
              <div className="flex justify-between">
                <span>Food (Restaurants)</span>
                <span className="font-semibold">${thailandFacts.costComparison.thailand.food}</span>
              </div>
              <div className="flex justify-between">
                <span>Transport</span>
                <span className="font-semibold">${thailandFacts.costComparison.thailand.transport}</span>
              </div>
              <div className="flex justify-between">
                <span>Utilities</span>
                <span className="font-semibold">${thailandFacts.costComparison.thailand.utilities}</span>
              </div>
              <div className="flex justify-between">
                <span>Entertainment</span>
                <span className="font-semibold">${thailandFacts.costComparison.thailand.entertainment}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total Expenses</span>
                <span className="text-green-600">${thailandFacts.costComparison.thailand.total}</span>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded text-center">
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">${2000 - thailandFacts.costComparison.thailand.total}</div>
                <div className="text-sm text-green-600 dark:text-green-400">Left after expenses</div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="text-center mt-8">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-lg inline-block">
            <div className="text-2xl font-bold">🎯 You save $390+ per month moving to Thailand</div>
            <div className="text-sm opacity-90">That's $4,680+ extra per year in your pocket!</div>
          </div>
        </div>
      </div>

      {/* Millionaire Migration FOMO */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-8 rounded-xl mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">📈 The Great Wealth Migration</h2>
          <p className="text-xl text-muted-foreground">Smart money is moving to Thailand. Don't get left behind.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 text-center border-red-200">
            <div className="mb-4">
              <TrendingDown className="w-12 h-12 mx-auto text-red-500 mb-2" />
              <h3 className="text-xl font-bold text-red-700">🇬🇧 UK Exodus</h3>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-red-600">-8,500</div>
              <div className="text-sm text-muted-foreground">Net millionaire outflow (2023)</div>
              <div className="text-xs bg-red-100 dark:bg-red-900 p-2 rounded">
                9,500 left • Only 1,000 arrived
              </div>
            </div>
          </Card>
          
          <Card className="p-6 text-center border-green-200">
            <div className="mb-4">
              <TrendingUpIcon className="w-12 h-12 mx-auto text-green-500 mb-2" />
              <h3 className="text-xl font-bold text-green-700">🇹🇭 Thailand Influx</h3>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">+3,000</div>
              <div className="text-sm text-muted-foreground">Net millionaire inflow (2023)</div>
              <div className="text-xs bg-green-100 dark:bg-green-900 p-2 rounded">
                3,200 arrived • Only 200 left
              </div>
            </div>
          </Card>
        </div>
        
        <div className="text-center mt-6">
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
            💡 Millionaires are voting with their feet - and choosing Thailand
          </Badge>
        </div>
      </div>

      {/* Thailand Achievements */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 p-8 rounded-xl mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">🏆 Thailand: World's #1 Choice</h2>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-600 mb-2">#1</div>
            <div className="text-sm font-semibold">Digital Nomad City</div>
            <div className="text-xs text-muted-foreground">Bangkok 2024</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">47K+</div>
            <div className="text-sm font-semibold">Digital Nomads</div>
            <div className="text-xs text-muted-foreground">Living in Thailand</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">+65%</div>
            <div className="text-sm font-semibold">Avg Income Boost</div>
            <div className="text-xs text-muted-foreground">After moving</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">94%</div>
            <div className="text-sm font-semibold">Visa Approval</div>
            <div className="text-xs text-muted-foreground">Success rate</div>
          </div>
        </div>
      </div>

      {/* Urgency Triggers */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {urgencyTriggers.map((trigger, index) => (
          <Card key={index} className={`p-6 border-l-4 ${
            trigger.color === 'red' ? 'border-red-500 bg-red-50 dark:bg-red-950' :
            trigger.color === 'orange' ? 'border-orange-500 bg-orange-50 dark:bg-orange-950' :
            'border-yellow-500 bg-yellow-50 dark:bg-yellow-950'
          }`}>
            <div className="flex items-start gap-3">
              <AlertTriangle className={`w-5 h-5 mt-1 ${
                trigger.color === 'red' ? 'text-red-500' :
                trigger.color === 'orange' ? 'text-orange-500' :
                'text-yellow-500'
              }`} />
              <div>
                <h3 className="font-semibold mb-1">{trigger.title}</h3>
                <div className="text-sm text-muted-foreground mb-2">{trigger.timeLeft}</div>
                <div className={`text-sm font-medium ${
                  trigger.color === 'red' ? 'text-red-600' :
                  trigger.color === 'orange' ? 'text-orange-600' :
                  'text-yellow-600'
                }`}>{trigger.impact}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform"
          onClick={() => navigate('/roadmap')}
        >
          <Zap className="w-6 h-6 mr-2" />
          Start Your Thailand Journey Now
          <ArrowRight className="w-6 h-6 ml-2" />
        </Button>
        <div className="mt-4 text-sm text-muted-foreground">
          ⚡ Join 1,247 people who started this week
        </div>
      </div>
    </div>
  );
}
