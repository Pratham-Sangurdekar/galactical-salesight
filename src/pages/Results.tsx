import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, TrendingDown, AlertCircle, CheckCircle2, Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, category } = location.state || {};
  const [prediction, setPrediction] = useState<"profitable" | "risky" | null>(null);

  useEffect(() => {
    if (!formData) {
      navigate("/");
      return;
    }

    // Simple prediction logic based on car attributes
    if (category === "cars") {
      const price = parseFloat(formData.price);
      const mileage = parseFloat(formData.mileage);
      const horsepower = parseFloat(formData.horsepower);
      
      // Scoring algorithm
      let score = 0;
      
      // Price sweet spot (10-25 lakhs is optimal)
      if (price >= 1000000 && price <= 2500000) score += 30;
      else if (price > 2500000 && price <= 4000000) score += 20;
      else score += 10;
      
      // Good mileage
      if (mileage >= 15) score += 25;
      else if (mileage >= 10) score += 15;
      
      // Performance
      if (horsepower >= 120 && horsepower <= 200) score += 20;
      else if (horsepower > 200) score += 15;
      
      // Body type preference
      if (formData.bodyType === "suv") score += 15;
      else if (formData.bodyType === "sedan") score += 10;
      
      // Fuel type
      if (formData.fuelType === "electric" || formData.fuelType === "hybrid") score += 15;
      else if (formData.fuelType === "petrol") score += 10;
      
      // Custom interiors
      if (formData.customInteriors === "yes") score += 10;
      
      setPrediction(score >= 60 ? "profitable" : "risky");
    }
  }, [formData, category, navigate]);

  if (!formData || !prediction) {
    return null;
  }

  const isProfitable = prediction === "profitable";

  const recommendations = isProfitable ? [
    "Your car configuration is well-positioned for the current market",
    "The price point aligns with consumer purchasing power",
    "Fuel efficiency meets market expectations",
    "Consider adding premium features to justify the price point",
  ] : [
    "Consider adjusting the price to ₹10-25 lakhs for optimal market response",
    "Improve fuel efficiency to at least 15 km/l for better appeal",
    "Add customizable interior options to increase perceived value",
    "Consider offering hybrid or electric variants to attract eco-conscious buyers",
    "Balance performance with efficiency - aim for 120-200 HP range",
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Prediction Result */}
        <Card className={`p-8 mb-8 border-2 ${isProfitable ? 'border-primary bg-primary/5' : 'border-destructive bg-destructive/5'}`}>
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isProfitable ? 'bg-primary/20' : 'bg-destructive/20'}`}>
              {isProfitable ? (
                <TrendingUp className="w-8 h-8 text-primary" />
              ) : (
                <TrendingDown className="w-8 h-8 text-destructive" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                {isProfitable ? "Profitable Sales Predicted" : "Sales Risk Detected"}
              </h1>
              <p className="text-lg text-muted-foreground">
                {isProfitable 
                  ? "Your car configuration shows strong market potential with favorable sales forecasts."
                  : "Current specifications may face market challenges. Review recommendations below."}
              </p>
            </div>
          </div>
        </Card>

        {/* Submitted Details */}
        <Card className="p-8 mb-8 bg-gradient-cosmic border-border">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            Your Product Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Color:</span>
              <span className="font-medium">{formData.color}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Price:</span>
              <span className="font-medium">₹{parseFloat(formData.price).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Mileage:</span>
              <span className="font-medium">{formData.mileage} km/l</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Body Type:</span>
              <span className="font-medium capitalize">{formData.bodyType}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Transmission:</span>
              <span className="font-medium capitalize">{formData.transmission}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Fuel Type:</span>
              <span className="font-medium capitalize">{formData.fuelType}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Horsepower:</span>
              <span className="font-medium">{formData.horsepower} HP</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Top Speed:</span>
              <span className="font-medium">{formData.topSpeed} km/h</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border md:col-span-2">
              <span className="text-muted-foreground">Customizable Interiors:</span>
              <span className="font-medium capitalize">{formData.customInteriors}</span>
            </div>
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-accent" />
            {isProfitable ? "Optimization Tips" : "Improvement Recommendations"}
          </h2>
          <ul className="space-y-4">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex gap-3">
                <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isProfitable ? 'text-primary' : 'text-accent'}`} />
                <span className="text-muted-foreground">{rec}</span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="mt-8 flex gap-4">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate(-1)}
            className="flex-1"
          >
            Modify Specifications
          </Button>
          <Button 
            size="lg"
            onClick={() => navigate("/")}
            className="flex-1"
          >
            Try Another Category
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
