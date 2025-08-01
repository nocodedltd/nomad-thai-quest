import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/layout/navigation";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Lesson from "./pages/Lesson";
import CourseOverview from "./pages/CourseOverview";
import CoursesListing from "./pages/CoursesListing";
import NomadOverview from "./pages/NomadOverview";
import Overview from "./pages/Overview";
import AmazonFBACourse from "./pages/AmazonFBACourse";
import DropshippingCourse from "./pages/DropshippingCourse";
import VisaGuideCourse from "./pages/VisaGuideCourse";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          <Route path="/course/dropshipping" element={<DropshippingCourse />} />
          <Route path="/course/visa-guide" element={<VisaGuideCourse />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
