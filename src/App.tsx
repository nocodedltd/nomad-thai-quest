import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import { UserProvider } from "@/contexts/user-context";
import Navigation from "./components/layout/navigation";
import { DevUserSwitcher } from "./components/layout/dev-user-switcher";
import { FloatingActionButton } from "./components/layout/floating-action-button";
import Home from "./pages/Home";
import Roadmap from "./pages/Roadmap";
import Progress from "./pages/Progress";
import Lesson from "./pages/Lesson";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navigation />
            <DevUserSwitcher />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/lesson" element={<Lesson />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <FloatingActionButton />
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
