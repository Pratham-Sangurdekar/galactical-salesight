// API utility for backend communication
export async function fetchCarForecast(formData: any) {
  // Map frontend formData to backend expected keys and allowed categories
  const payload = {
    Body_Type: mapBodyType(formData.bodyType),
    Transmission: mapTransmission(formData.transmission),
    Fuel_Type: mapFuelType(formData.fuelType),
    Color: normalizeColor(formData.color),
    Horsepower: safeNumber(formData.horsepower),
    Top_Speed: safeNumber(formData.topSpeed),
    Customisable_Interiors: formData.customInteriors === "yes" ? "Yes" : "No",
    Mileage_kmpl: safeNumber(formData.mileage),
    Price_INR: safeNumber(formData.price),
  } as const;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000); // 45s timeout to allow first model load
  let res: Response;
  try {
  res = await fetch("http://localhost:3001/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (e: any) {
    clearTimeout(timeout);
    throw new Error(
      e?.name === "AbortError"
        ? "Backend request timed out (10s). Ensure a server is running."
        : "Backend unreachable. Since Flask was removed, start a small bridge server or restore the API."
    );
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Backend request failed");
  }

  const result = await res.json();
  return {
    profitable: result.profitable,
    probability: result.probability,
    prediction: result.prediction,
    metrics: result.metrics,
  };
}

function safeNumber(v: any): number {
  const n = typeof v === "number" ? v : parseFloat(String(v).replace(/,/g, ""));
  if (!isFinite(n)) throw new Error("Invalid number in request payload");
  return n;
}

function mapBodyType(v: string): "SUV" | "Sedan" | "Hatchback" | "Pickup" | "Coupe" {
  const key = (v || "").toLowerCase();
  if (key.includes("suv")) return "SUV";
  if (key.includes("sedan")) return "Sedan";
  if (key.includes("hatch")) return "Hatchback";
  if (key.includes("pickup") || key.includes("truck")) return "Pickup";
  if (key.includes("coupe")) return "Coupe";
  // Default to Sedan
  return "Sedan";
}

function mapTransmission(v: string): "Manual" | "Automatic" {
  const key = (v || "").toLowerCase();
  // Treat CVT/DCT/AMT as Automatic
  if (key.includes("auto") || key.includes("cvt") || key.includes("dct") || key.includes("amt")) return "Automatic";
  return "Manual";
}

function mapFuelType(v: string): "Petrol" | "Diesel" | "Hybrid" | "Electric" {
  const key = (v || "").toLowerCase();
  if (key.includes("diesel")) return "Diesel";
  if (key.includes("hybrid")) return "Hybrid";
  if (key.includes("electric") || key.includes("ev")) return "Electric";
  // Map CNG/others to Petrol for the model categories
  return "Petrol";
}

function normalizeColor(v: string): "Red" | "Blue" | "Black" | "White" | "Silver" | "Grey" | "Green" {
  const key = (v || "").toLowerCase();
  if (key.includes("red")) return "Red";
  if (key.includes("blue")) return "Blue";
  if (key.includes("white")) return "White";
  if (key.includes("silver")) return "Silver";
  if (key.includes("grey") || key.includes("gray")) return "Grey";
  if (key.includes("green")) return "Green";
  return "Black";
}
