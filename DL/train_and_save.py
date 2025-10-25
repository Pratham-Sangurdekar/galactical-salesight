# train_and_save.py
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, BatchNormalization
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.regularizers import l2
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau

df = pd.read_csv("SalesCars.csv")  # Replace with your CSV path

features = ["Body_Type", "Transmission", "Fuel_Type", "Color", "Price_INR",
            "Horsepower", "Top_Speed", "Customisable_Interiors", "Mileage_kmpl"]

X = df[features]
y = df["Profitability"]

cat_cols = ["Body_Type", "Transmission", "Fuel_Type", "Color", "Customisable_Interiors"]
num_cols = ["Price_INR", "Horsepower", "Top_Speed", "Mileage_kmpl"]

preprocessor = ColumnTransformer(transformers=[
    ("cat", OneHotEncoder(handle_unknown="ignore"), cat_cols),
    ("num", StandardScaler(), num_cols)
])
X_processed = preprocessor.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(
    X_processed, y, test_size=0.2, random_state=42, stratify=y
)

model = Sequential([
    Dense(128, activation="relu", kernel_regularizer=l2(0.001), input_shape=(X_train.shape[1],)),
    BatchNormalization(),
    Dropout(0.2),

    Dense(64, activation="relu", kernel_regularizer=l2(0.001)),
    BatchNormalization(),
    Dropout(0.1),

    Dense(32, activation="relu", kernel_regularizer=l2(0.001)),
    BatchNormalization(),

    Dense(16, activation="relu", kernel_regularizer=l2(0.001)),  # Added new layer
    BatchNormalization(),

    Dense(1, activation="sigmoid")
])

optimizer = Adam(learning_rate=0.005)

reduce_lr = ReduceLROnPlateau(
    monitor="val_loss",
    factor=0.5,
    patience=5,
    min_lr=1e-4
)

model.compile(optimizer=optimizer, loss="binary_crossentropy", metrics=["accuracy"])

class_weight = {0: 1.5, 1: 1.0}

history = model.fit(
    X_train, y_train,
    epochs=100,
    batch_size=22,
    class_weight=class_weight,
    validation_split=0.2,
    callbacks=[reduce_lr],
    verbose=1
)

from sklearn.metrics import confusion_matrix, classification_report, accuracy_score, f1_score, precision_score, recall_score
import numpy as np

# Predict on test set
y_pred_prob = model.predict(X_test)
y_pred = (y_pred_prob >= 0.5).astype(int)

# Confusion matrix
cm = confusion_matrix(y_test, y_pred)
print("Confusion Matrix:\n", cm)

# Classification report
report = classification_report(y_test, y_pred, target_names=["Not Profitable", "Profitable"])
print("Classification Report:\n", report)

# Accuracy, Precision, Recall, F1
acc = accuracy_score(y_test, y_pred)
prec = precision_score(y_test, y_pred)
rec = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)

print(f"Accuracy: {acc:.2f}, Precision: {prec:.2f}, Recall: {rec:.2f}, F1 Score: {f1:.2f}")

# Save metrics for frontend display
np.savez("metrics.npz", cm=cm, acc=acc, prec=prec, rec=rec, f1=f1)

# ----------------- Save model and preprocessor -----------------
model.save("fnn_model.h5")
joblib.dump(preprocessor, "preprocessor.pkl")

print("✅ FNN model and preprocessor saved successfully!")
