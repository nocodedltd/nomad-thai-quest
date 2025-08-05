import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import Navigation from "./components/layout/navigation";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Lesson from "./pages/Lesson";
import CourseOverview from "./pages/CourseOverview";
import CoursesListing from "./pages/CoursesListing";
import NomadOverview from "./pages/NomadOverview";
import Overview from "./pages/Overview";
import AmazonFBACourse from "./pages/AmazonFBACourse";
import AIAutomationCourse from "./pages/AIAutomationCourse";
import VisaGuideCourse from "./pages/VisaGuideCourse";
import Income from "./pages/Income";
import Accommodation from "./pages/Accommodation";
import Community from "./pages/Community";
import OnboardingQuestionnaire from "./components/onboarding/onboarding-questionnaire";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/course/:courseId/lesson/:lessonId" element={<Lesson />} />
            <Route path="/courses" element={<CoursesListing />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/nomad-overview" element={<NomadOverview />} />
            <Route path="/course/amazon-fba" element={<AmazonFBACourse />} />
            <Route path="/course/ai-automation" element={<AIAutomationCourse />} />
            <Route path="/course/visa-guide" element={<VisaGuideCourse />} />
                          <Route path="/income" element={<Income />} />
                <Route path="/accommodation" element={<Accommodation />} />
                <Route path="/community" element={<Community />} />
                <Route path="/onboarding" element={<OnboardingQuestionnaire />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
