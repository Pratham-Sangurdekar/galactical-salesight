import argparse
import json
import sys
from typing import Dict, Any

import pandas as pd
import joblib
import numpy as np
import os
os.environ.setdefault("TF_CPP_MIN_LOG_LEVEL", "2")
os.environ.setdefault("OMP_NUM_THREADS", "1")
os.environ.setdefault("TF_NUM_INTRAOP_THREADS", "1")
os.environ.setdefault("TF_NUM_INTEROP_THREADS", "1")
os.environ.setdefault("PYTHONUNBUFFERED", "1")
from tensorflow.keras.models import load_model
from pathlib import Path

# ---------------- Load model, preprocessor, metrics ----------------
BASE_DIR = Path(__file__).resolve().parent
model = load_model(str(BASE_DIR / "fnn_model.h5"))
preprocessor = joblib.load(str(BASE_DIR / "preprocessor.pkl"))
metrics = np.load(str(BASE_DIR / "metrics.npz"))
cm = metrics["cm"]
accuracy = metrics["acc"].item()
precision = metrics["prec"].item()
recall = metrics["rec"].item()
f1_score_val = metrics["f1"].item()

# ---------------- Canonical feature names ----------------
FEATURES = [
    "Body_Type",
    "Transmission",
    "Fuel_Type",
    "Color",
    "Price_INR",
    "Horsepower",
    "Top_Speed",
    "Customisable_Interiors",
    "Mileage_kmpl",
]

# Allowed/expected categories for safer normalization
BODY_TYPES = {"sedan": "Sedan", "suv": "SUV", "pickup": "Pickup", "coupe": "Coupe", "hatchback": "Hatchback"}
TRANSMISSIONS = {"manual": "Manual", "automatic": "Automatic", "cvt": "Automatic", "dct": "Automatic"}
FUEL_TYPES = {"petrol": "Petrol", "diesel": "Diesel", "hybrid": "Hybrid", "electric": "Electric", "cng": "Petrol"}


def normalize_input(data: Dict[str, Any]) -> Dict[str, Any]:
    """Accepts either frontend-style keys or canonical backend keys and returns a canonical dict.
    Frontend keys:
      bodyType, transmission, fuelType, color, horsepower, topSpeed, customInteriors, mileage, price
    Backend keys:
      Body_Type, Transmission, Fuel_Type, Color, Horsepower, Top_Speed, Customisable_Interiors, Mileage_kmpl, Price_INR
    """
    # If already canonical, just copy
    canonical = {}

    # Map possible keys
    body_type = data.get("Body_Type", data.get("bodyType"))
    transmission = data.get("Transmission", data.get("transmission"))
    fuel_type = data.get("Fuel_Type", data.get("fuelType"))
    color = data.get("Color", data.get("color"))
    horsepower = data.get("Horsepower", data.get("horsepower"))
    top_speed = data.get("Top_Speed", data.get("topSpeed"))
    custom_interiors = data.get("Customisable_Interiors", data.get("customInteriors"))
    mileage = data.get("Mileage_kmpl", data.get("mileage"))
    price = data.get("Price_INR", data.get("price"))

    # Normalize categorical values
    if isinstance(body_type, str):
        body_type = BODY_TYPES.get(body_type.strip().lower(), body_type.title())
    if isinstance(transmission, str):
        transmission = TRANSMISSIONS.get(transmission.strip().lower(), transmission.title())
    if isinstance(fuel_type, str):
        fuel_type = FUEL_TYPES.get(fuel_type.strip().lower(), fuel_type.title())
    if isinstance(color, str):
        color = color.strip().title()
    if isinstance(custom_interiors, str):
        custom_interiors = "Yes" if custom_interiors.strip().lower() in ("yes", "y", "true", "1") else "No"

    # Numeric conversions
    def to_float(x):
        try:
            return float(x)
        except Exception:
            return None

    horsepower = to_float(horsepower)
    top_speed = to_float(top_speed)
    mileage = to_float(mileage)
    price = to_float(price)

    canonical.update({
        "Body_Type": body_type,
        "Transmission": transmission,
        "Fuel_Type": fuel_type,
        "Color": color,
        "Horsepower": horsepower,
        "Top_Speed": top_speed,
        "Customisable_Interiors": custom_interiors,
        "Mileage_kmpl": mileage,
        "Price_INR": price,
    })

    # Basic validation
    missing = [k for k, v in canonical.items() if v is None or v == ""]
    if missing:
        raise ValueError(f"Missing or invalid fields: {', '.join(missing)}")

    return canonical


def predict_user_input(body_type, transmission, fuel_type, color, horsepower, top_speed,
                       customisable_interiors, mileage_kmpl, price):
    user_df = pd.DataFrame([{
        "Body_Type": body_type,
        "Transmission": transmission,
        "Fuel_Type": fuel_type,
        "Color": color,
        "Horsepower": float(horsepower),
        "Top_Speed": float(top_speed),
        "Customisable_Interiors": customisable_interiors,
        "Mileage_kmpl": float(mileage_kmpl),
        "Price_INR": float(price)
    }])
    user_processed = preprocessor.transform(user_df)
    prob = float(model.predict(user_processed)[0][0])
    prediction = 1 if prob >= 0.5 else 0
    return prediction, prob


def predict_from_dict(data: Dict[str, Any]) -> Dict[str, Any]:
    d = normalize_input(data)
    pred, prob = predict_user_input(
        body_type=d["Body_Type"],
        transmission=d["Transmission"],
        fuel_type=d["Fuel_Type"],
        color=d["Color"],
        horsepower=d["Horsepower"],
        top_speed=d["Top_Speed"],
        customisable_interiors=d["Customisable_Interiors"],
        mileage_kmpl=d["Mileage_kmpl"],
        price=d["Price_INR"],
    )
    return {
        "profitable": bool(pred == 1),
        "probability": prob,
        "prediction": "Profitable" if pred == 1 else "Not Profitable",
        "metrics": {
            "accuracy": float(accuracy),
            "precision": float(precision),
            "recall": float(recall),
            "f1_score": float(f1_score_val),
        },
        "input": d,
    }


def _parse_args():
    parser = argparse.ArgumentParser(description="Car sales profitability predictor (no server)")
    parser.add_argument("--json", type=str, help="JSON string with either frontend or backend keys")
    parser.add_argument("--stdio-server", action="store_true", help="Run in stdio server mode: read JSON per line from stdin and write JSON per line to stdout")
    return parser.parse_args()


def main():
    args = _parse_args()
    try:
        if args.stdio_server:
            # Persistent loop: one JSON per line -> one JSON response per line
            for line in sys.stdin:
                line = line.strip()
                if not line:
                    continue
                try:
                    data = json.loads(line)
                    result = predict_from_dict(data)
                    sys.stdout.write(json.dumps(result, ensure_ascii=False) + "\n")
                    sys.stdout.flush()
                except Exception as e:
                    sys.stdout.write(json.dumps({"error": str(e)}) + "\n")
                    sys.stdout.flush()
            return
        else:
            if args.json:
                data = json.loads(args.json)
            else:
                # Read one JSON document from stdin
                raw = sys.stdin.read().strip()
                if not raw:
                    raise ValueError("No input provided. Pass --json '{...}' or pipe JSON via stdin.")
                data = json.loads(raw)

            result = predict_from_dict(data)
            print(json.dumps(result, ensure_ascii=False))
    except Exception as e:
        err = {"error": str(e)}
        print(json.dumps(err, ensure_ascii=False))
        sys.exit(1)


if __name__ == "__main__":
    main()