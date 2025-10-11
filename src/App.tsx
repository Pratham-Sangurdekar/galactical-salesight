import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CarForecast from "./pages/CarForecast";
import BikesForecast from "./pages/BikesForecast";
import AppliancesForecast from "./pages/AppliancesForecast";
import FmcgForecast from "./pages/FmcgForecast";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forecast/cars" element={<CarForecast />} />
          <Route path="/forecast/bikes" element={<BikesForecast />} />
          <Route path="/forecast/appliances" element={<AppliancesForecast />} />
          <Route path="/forecast/fmcg" element={<FmcgForecast />} />
          <Route path="/results" element={<Results />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
