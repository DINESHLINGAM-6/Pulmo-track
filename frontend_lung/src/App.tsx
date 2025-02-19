import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner"; 
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNav from "./components/MainNav";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DoctorVisits from "./pages/DoctorVisits";
import Reports from "./pages/Reports";
import Timeline from "./pages/Timeline";
import Settings from "./pages/Settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen flex bg-gray-50">
        <BrowserRouter>
          <MainNav />
          <main className="flex-1 ml-64 p-8">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/visits" element={<DoctorVisits />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
