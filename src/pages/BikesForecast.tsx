import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BikeFormData {
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

const BikesForecast = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<BikeFormData>({
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
    
    if (Object.values(formData).some(value => !value)) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all fields to get an accurate forecast.",
        variant: "destructive",
      });
      return;
    }

    navigate("/results", { state: { formData, category: "bikes" } });
  };

  const updateFormData = (field: keyof BikeFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
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
          
          <h1 className="text-4xl font-bold mb-4">Bike Sales Forecast</h1>
          <p className="text-muted-foreground text-lg">
            Enter your bike specifications to predict market performance
          </p>
        </div>

        <Card className="p-8 bg-card/30 backdrop-blur-md border-border shadow-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  placeholder="e.g., Metallic Black"
                  value={formData.color}
                  onChange={(e) => updateFormData("color", e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g., 150000"
                  value={formData.price}
                  onChange={(e) => updateFormData("price", e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage (km/l)</Label>
                <Input
                  id="mileage"
                  type="number"
                  placeholder="e.g., 45"
                  value={formData.mileage}
                  onChange={(e) => updateFormData("mileage", e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bodyType">Body Type</Label>
                <Select onValueChange={(value) => updateFormData("bodyType", value)}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="sportbike">Sportbike</SelectItem>
                    <SelectItem value="cruiser">Cruiser</SelectItem>
                    <SelectItem value="commuter">Commuter</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="scooter">Scooter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission</Label>
                <Select onValueChange={(value) => updateFormData("transmission", value)}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="cvt">CVT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Select onValueChange={(value) => updateFormData("fuelType", value)}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="horsepower">Horsepower (HP)</Label>
                <Input
                  id="horsepower"
                  type="number"
                  placeholder="e.g., 20"
                  value={formData.horsepower}
                  onChange={(e) => updateFormData("horsepower", e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="topSpeed">Top Speed (km/h)</Label>
                <Input
                  id="topSpeed"
                  type="number"
                  placeholder="e.g., 140"
                  value={formData.topSpeed}
                  onChange={(e) => updateFormData("topSpeed", e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="customInteriors">Custom Accessories</Label>
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

export default BikesForecast;
