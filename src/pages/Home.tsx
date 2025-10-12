import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, TrendingUp, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroGalaxy from "@/assets/hero-galaxy.jpg";
import categoryCars from "@/assets/category-cars.jpg";
import categoryBikes from "@/assets/images.png";
import categoryAppliances from "@/assets/category-appliances.jpg";
import categoryFmcg from "@/assets/category-fmcg.jpg";

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: "cars",
      title: "Cars",
      description: "Predict automotive sales with precision",
      image: categoryCars,
      stats: [
        { label: "Avg Price Range", value: "₹10-25L" },
        { label: "Key Factor", value: "Fuel Efficiency" },
        { label: "Sweet Spot", value: "15+ km/l" },
      ],
    },
    {
      id: "bikes",
      title: "Bikes",
      description: "Forecast two-wheeler market trends",
      image: categoryBikes,
      stats: [
        { label: "Avg Price Range", value: "₹80K-2L" },
        { label: "Key Factor", value: "Mileage" },
        { label: "Sweet Spot", value: "45+ km/l" },
      ],
    },
    {
      id: "appliances",
      title: "Home Appliances",
      description: "Analyze home appliance demand",
      image: categoryAppliances,
      stats: [
        { label: "Avg Price Range", value: "₹15K-80K" },
        { label: "Key Factor", value: "Energy Rating" },
        { label: "Sweet Spot", value: "4-5 Star" },
      ],
    },
    {
      id: "fmcg",
      title: "FMCG",
      description: "Fast-moving consumer goods insights",
      image: categoryFmcg,
      stats: [
        { label: "Avg Price Range", value: "₹50-500" },
        { label: "Key Factor", value: "Shelf Life" },
        { label: "Sweet Spot", value: "6-12 months" },
      ],
    },
  ];

  const scrollToCategories = () => {
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative">
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${heroGalaxy})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="fixed inset-0 -z-10 bg-background/70" />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
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
            onClick={scrollToCategories}
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
            <Card className="p-6 bg-card/30 backdrop-blur-md border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accurate Predictions</h3>
              <p className="text-muted-foreground">
                Advanced AI algorithms analyze market trends to deliver precise sales forecasts
              </p>
            </Card>

            <Card className="p-6 bg-card/30 backdrop-blur-md border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Actionable Insights</h3>
              <p className="text-muted-foreground">
                Get specific recommendations to optimize your product for better market performance
              </p>
            </Card>

            <Card className="p-6 bg-card/30 backdrop-blur-md border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
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
          <div id="categories" className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Choose Your Product Category</h2>
            <p className="text-muted-foreground text-lg">
              Select a category to begin your sales forecast analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="relative overflow-hidden bg-card/20 backdrop-blur-md border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group hover:shadow-glow"
                onClick={() => navigate(`/forecast/${category.id}`)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {category.description}
                  </p>
                  
                  {/* Industry Infographics */}
                  <div className="space-y-2 mb-4 pb-4 border-b border-border/50">
                    {category.stats.map((stat, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{stat.label}:</span>
                        <span className="text-xs font-semibold text-primary">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-primary text-sm font-medium">
                    Analyze Now
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
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
