import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FmcgFormData {
  productName: string;
  price: string;
  category: string;
  packaging: string;
  brand: string;
  shelfLife: string;
  marketSegment: string;
  distribution: string;
  organic: string;
}

const FmcgForecast = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FmcgFormData>({
    productName: "",
    price: "",
    category: "",
    packaging: "",
    brand: "",
    shelfLife: "",
    marketSegment: "",
    distribution: "",
    organic: "",
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

    navigate("/results", { state: { formData, category: "fmcg" } });
  };

  const updateFormData = (field: keyof FmcgFormData, value: string) => {
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
          
          <h1 className="text-4xl font-bold mb-4">FMCG Sales Forecast</h1>
          <p className="text-muted-foreground text-lg">
            Enter your product specifications to predict market performance
          </p>
        </div>

        <Card className="p-8 bg-card/30 backdrop-blur-md border-border shadow-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  placeholder="e.g., Premium Coffee Blend"
                  value={formData.productName}
                  onChange={(e) => updateFormData("productName", e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Product Category</Label>
                <Select onValueChange={(value) => updateFormData("category", value)}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="beverages">Beverages</SelectItem>
                    <SelectItem value="snacks">Snacks</SelectItem>
                    <SelectItem value="personal-care">Personal Care</SelectItem>
                    <SelectItem value="household">Household Products</SelectItem>
                    <SelectItem value="dairy">Dairy Products</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g., 250"
                  value={formData.price}
                  onChange={(e) => updateFormData("price", e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand Type</Label>
                <Select onValueChange={(value) => updateFormData("brand", value)}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select brand type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="mainstream">Mainstream</SelectItem>
                    <SelectItem value="economy">Economy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="packaging">Packaging Type</Label>
                <Select onValueChange={(value) => updateFormData("packaging", value)}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select packaging" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="premium">Premium (Glass/Metal)</SelectItem>
                    <SelectItem value="standard">Standard (Plastic/Paper)</SelectItem>
                    <SelectItem value="eco-friendly">Eco-Friendly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shelfLife">Shelf Life (months)</Label>
                <Input
                  id="shelfLife"
                  type="number"
                  placeholder="e.g., 12"
                  value={formData.shelfLife}
                  onChange={(e) => updateFormData("shelfLife", e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="marketSegment">Market Segment</Label>
                <Select onValueChange={(value) => updateFormData("marketSegment", value)}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select segment" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="urban">Urban</SelectItem>
                    <SelectItem value="rural">Rural</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="distribution">Distribution Channel</Label>
                <Select onValueChange={(value) => updateFormData("distribution", value)}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select distribution" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="retail">Retail Stores</SelectItem>
                    <SelectItem value="online">Online Only</SelectItem>
                    <SelectItem value="both">Multi-Channel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="organic">Organic/Natural Product</Label>
                <Select onValueChange={(value) => updateFormData("organic", value)}>
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

export default FmcgForecast;
