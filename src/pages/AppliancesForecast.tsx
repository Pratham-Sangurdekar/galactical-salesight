import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApplianceFormData {
  color: string;
  price: string;
  energyRating: string;
  type: string;
  brand: string;
  warranty: string;
  capacity: string;
  features: string;
  smartEnabled: string;
}

const AppliancesForecast = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<ApplianceFormData>({
    color: "",
    price: "",
    energyRating: "",
    type: "",
    brand: "",
    warranty: "",
    capacity: "",
    features: "",
    smartEnabled: "",
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

    navigate("/results", { state: { formData, category: "appliances" } });
  };

  const updateFormData = (field: keyof ApplianceFormData, value: string) => {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-4xl">🏠</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Home Appliance Sales Forecast</h1>
          <p className="text-muted-foreground text-lg">
            Enter your appliance specifications to predict market performance
          </p>
        </div>

        <Card className="p-8 bg-card/30 backdrop-blur-md border-border shadow-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type">Appliance Type</Label>
                <Select onValueChange={(value) => updateFormData("type", value)}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="refrigerator">Refrigerator</SelectItem>
                    <SelectItem value="washing-machine">Washing Machine</SelectItem>
                    <SelectItem value="microwave">Microwave</SelectItem>
                    <SelectItem value="air-conditioner">Air Conditioner</SelectItem>
                    <SelectItem value="dishwasher">Dishwasher</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand Category</Label>
                <Select onValueChange={(value) => updateFormData("brand", value)}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select brand category" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="mid-range">Mid-Range</SelectItem>
                    <SelectItem value="budget">Budget</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  placeholder="e.g., Stainless Steel"
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
                  placeholder="e.g., 45000"
                  value={formData.price}
                  onChange={(e) => updateFormData("price", e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="energyRating">Energy Rating</Label>
                <Select onValueChange={(value) => updateFormData("energyRating", value)}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="5-star">5 Star</SelectItem>
                    <SelectItem value="4-star">4 Star</SelectItem>
                    <SelectItem value="3-star">3 Star</SelectItem>
                    <SelectItem value="2-star">2 Star</SelectItem>
                    <SelectItem value="1-star">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  placeholder="e.g., 200L or 1.5 Ton"
                  value={formData.capacity}
                  onChange={(e) => updateFormData("capacity", e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="warranty">Warranty (years)</Label>
                <Input
                  id="warranty"
                  type="number"
                  placeholder="e.g., 2"
                  value={formData.warranty}
                  onChange={(e) => updateFormData("warranty", e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Premium Features</Label>
                <Select onValueChange={(value) => updateFormData("features", value)}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select features" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="advanced">Advanced (Multiple)</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="smartEnabled">Smart/IoT Enabled</Label>
                <Select onValueChange={(value) => updateFormData("smartEnabled", value)}>
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

export default AppliancesForecast;
