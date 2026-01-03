import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EasterEggProvider } from "@/contexts/EasterEggContext";
import EasterEggIcon from "@/components/EasterEggIcon";
import EasterEggCompletionHandler from "@/components/EasterEggCompletionHandler";
import Index from "./pages/Index";
import Realness from "./pages/Realness";
import Secrets from "./pages/Secrets";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <EasterEggProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <EasterEggIcon />
          <EasterEggCompletionHandler />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/realness" element={<Realness />} />
            <Route path="/secrets" element={<Secrets />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </EasterEggProvider>
  </QueryClientProvider>
);

export default App;
