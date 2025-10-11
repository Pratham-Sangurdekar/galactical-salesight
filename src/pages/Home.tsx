import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, TrendingUp, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroGalaxy from "@/assets/hero-galaxy.jpg";

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: "cars",
      title: "Cars",
      description: "Predict automotive sales with precision",
      icon: "🚗",
    },
    {
      id: "bikes",
      title: "Bikes",
      description: "Forecast two-wheeler market trends",
      icon: "🏍️",
    },
    {
      id: "appliances",
      title: "Home Appliances",
      description: "Analyze home appliance demand",
      icon: "🏠",
    },
    {
      id: "fmcg",
      title: "FMCG",
      description: "Fast-moving consumer goods insights",
      icon: "🛒",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroGalaxy})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-glow-pulse">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Forecasting</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-secondary">
            Salesight AI
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Predict product success with precision. Make data-driven decisions for cars, bikes, appliances, and FMCG.
          </p>
          
          <Button 
            size="lg" 
            onClick={() => navigate('/forecast')}
            className="group"
          >
            Start Forecasting
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accurate Predictions</h3>
              <p className="text-muted-foreground">
                Advanced AI algorithms analyze market trends to deliver precise sales forecasts
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Actionable Insights</h3>
              <p className="text-muted-foreground">
                Get specific recommendations to optimize your product for better market performance
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Category Support</h3>
              <p className="text-muted-foreground">
                Comprehensive analysis across automotive, appliances, and consumer goods
              </p>
            </Card>
          </div>

          {/* Category Selection */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Choose Your Product Category</h2>
            <p className="text-muted-foreground text-lg">
              Select a category to begin your sales forecast analysis
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="p-8 bg-gradient-cosmic border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group hover:shadow-glow"
                onClick={() => navigate(`/forecast/${category.id}`)}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {category.description}
                </p>
                <div className="flex items-center text-primary text-sm font-medium">
                  Select
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
