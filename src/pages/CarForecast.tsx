import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CarFormData {
  color: string;
  price: string;
  mileage: string;
  bodyType: string;
  transmission: string;
  fuelType: string;
  horsepower: string;
  topSpeed: string;
  customInteriors: string;
}

const CarForecast = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<CarFormData>({
    color: "",
    price: "",
    mileage: "",
    bodyType: "",
    transmission: "",
    fuelType: "",
    horsepower: "",
    topSpeed: "",
    customInteriors: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (Object.values(formData).some(value => !value)) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all fields to get an accurate forecast.",
        variant: "destructive",
      });
      return;
    }

    // Navigate to results with form data
    navigate("/results", { state: { formData, category: "cars" } });
  };

  const updateFormData = (field: keyof CarFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Categories
        </Button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-4xl">🚗</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Car Sales Forecast</h1>
          <p className="text-muted-foreground text-lg">
            Enter your car specifications to predict market performance
          </p>
        </div>

        <Card className="p-8 bg-gradient-cosmic border-border shadow-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Color */}
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  placeholder="e.g., Midnight Blue"
                  value={formData.color}
                  onChange={(e) => updateFormData("color", e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g., 1500000"
                  value={formData.price}
                  onChange={(e) => updateFormData("price", e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              {/* Mileage */}
              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage (km/l)</Label>
                <Input
                  id="mileage"
                  type="number"
                  placeholder="e.g., 18.5"
                  value={formData.mileage}
                  onChange={(e) => updateFormData("mileage", e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              {/* Body Type */}
              <div className="space-y-2">
                <Label htmlFor="bodyType">Body Type</Label>
                <Select onValueChange={(value) => updateFormData("bodyType", value)}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="hatchback">Hatchback</SelectItem>
                    <SelectItem value="pickup">Pickup</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Transmission */}
              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission</Label>
                <Select onValueChange={(value) => updateFormData("transmission", value)}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="cvt">CVT</SelectItem>
                    <SelectItem value="dct">DCT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Fuel Type */}
              <div className="space-y-2">
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Select onValueChange={(value) => updateFormData("fuelType", value)}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="cng">CNG</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Horsepower */}
              <div className="space-y-2">
                <Label htmlFor="horsepower">Horsepower (HP)</Label>
                <Input
                  id="horsepower"
                  type="number"
                  placeholder="e.g., 150"
                  value={formData.horsepower}
                  onChange={(e) => updateFormData("horsepower", e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              {/* Top Speed */}
              <div className="space-y-2">
                <Label htmlFor="topSpeed">Top Speed (km/h)</Label>
                <Input
                  id="topSpeed"
                  type="number"
                  placeholder="e.g., 180"
                  value={formData.topSpeed}
                  onChange={(e) => updateFormData("topSpeed", e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              {/* Customizable Interiors */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="customInteriors">Customizable Interiors</Label>
                <Select onValueChange={(value) => updateFormData("customInteriors", value)}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full group">
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Forecast
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CarForecast;
