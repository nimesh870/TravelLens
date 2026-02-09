import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Learn from "./pages/Learn";
import Community from "./pages/Community";
import Safety from "./pages/Safety";
import Passport from "./pages/Passport";
import Premium from "./pages/Premium";
import Destination from "./pages/Destination";
import Login from "./pages/Login";
import Stays from "./pages/Stays";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/community" element={<Community />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/passport" element={<Passport />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/stays" element={<Stays />} />
              <Route path="/destination/:id" element={<Destination />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
