import streamlit as st
import pandas as pd
import joblib
import tensorflow as tf

# --------------------
# Load model + preprocessor
# --------------------
model = tf.keras.models.load_model("car_sales_model.h5")   # Save your model as .h5 after training
preprocessor = joblib.load("preprocessor.pkl")             # Save preprocessor using joblib.dump(preprocessor, "preprocessor.pkl")

# --------------------
# UI Layout
# --------------------
st.set_page_config(page_title="Car Profitability Predictor", page_icon="🚗", layout="centered")

st.title("🚗 Car Profitability Predictor")
st.write("Enter car attributes to predict whether the product will be **Profitable** or **Not Profitable**.")

# --------------------
# User Input Form
# --------------------
with st.form("car_form"):
    col1, col2 = st.columns(2)

    with col1:
        body_type = st.selectbox("Body Type", ["Sedan", "SUV", "Pickup", "Coupe", "Hatchback"])
        transmission = st.selectbox("Transmission", ["Manual", "Automatic"])
        fuel_type = st.selectbox("Fuel Type", ["Petrol", "Diesel", "Hybrid", "Electric"])
        color = st.selectbox("Color", ["Red", "Black", "White", "Blue", "Silver", "Grey"])
        customisable_interiors = st.selectbox("Customisable Interiors", ["Yes", "No"])

    with col2:
        horsepower = st.number_input("Horsepower (hp)", min_value=50, max_value=1000, value=150, step=10)
        top_speed = st.number_input("Top Speed (km/h)", min_value=80, max_value=400, value=200, step=5)
        mileage = st.number_input("Mileage (km/l)", min_value=5.0, max_value=40.0, value=15.0, step=0.5)
        price = st.number_input("Price (INR)", min_value=300000, max_value=20000000, value=1500000, step=50000)

    submit = st.form_submit_button("Predict Profitability 🚀")

# --------------------
# Prediction Logic
# --------------------
if submit:
    user_df = pd.DataFrame([{
        "Body_Type": body_type,
        "Transmission": transmission,
        "Fuel_Type": fuel_type,
        "Color": color,
        "Horsepower": horsepower,
        "Top_Speed": top_speed,
        "Customisable_Interiors": customisable_interiors,
        "Mileage_kmpl": mileage,
        "Price_INR": price,
    }])

    # Preprocess
    user_processed = preprocessor.transform(user_df)

    # Predict
    prob = model.predict(user_processed)[0][0]
    prediction = "✅ Profitable" if prob >= 0.5 else "❌ Not Profitable"

    st.subheader(f"Prediction: {prediction}")
    st.progress(int(prob * 100))
    st.write(f"**Confidence: {prob:.2f}**")