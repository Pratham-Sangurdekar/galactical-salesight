##Salesight AI

Intelligent Sales Forecasting using Deep Neural Networks

⸻

📘 Overview

Salesight AI is a machine learning–driven sales forecasting system that predicts the profitability of automobile sales using a Feedforward Neural Network (FNN).
This project leverages advanced deep learning techniques, statistical preprocessing, and scalable architecture to forecast sales performance with improved accuracy and explainability.

The goal is to assist automotive businesses and analysts in identifying high-potential, profitable products and improving data-driven decision-making across operations and marketing pipelines.

⸻

🚀 Key Features
	•	Neural Network–based Prediction
Uses a multi-layer FNN trained on a diverse automotive dataset (8,000+ entries).
	•	Robust Preprocessing Pipeline
Employs One-Hot Encoding and Standard Scaling via ColumnTransformer.
	•	Performance Metrics Dashboard
Generates a confusion matrix, accuracy, precision, recall, F1 score, and AUC.
	•	CLI-Based Prediction
Test new data points directly via command line with real-time metric computation.
	•	Modular Architecture
Clean separation of training, evaluation, and prediction scripts to support frontend integration.

⸻

🧩 System Architecture
	1.	Dataset Module – Structured data of Indian car attributes and sales profitability.
	2.	Preprocessing Module – Encodes categorical and numerical data with OneHotEncoder and StandardScaler.
	3.	Neural Network Model –
	•	4 hidden layers using ReLU activations
	•	Dropout and L2 Regularization to prevent overfitting
	•	Optimized using Adam with adaptive learning rate scheduling
	4.	Evaluation Module –
Computes confusion matrix and key metrics via sklearn.metrics.
	5.	Visualization –
Confusion matrix image and summary tables generated post-training.

⸻

🧠 Model Details

Layer	Units	Activation	Regularization
Dense	256	ReLU	L2 + Dropout(0.3)
Dense	128	ReLU	L2 + Dropout(0.3)
Dense	64	ReLU	L2 + Dropout(0.2)
Dense	1	Sigmoid	–

Optimizer: Adam (lr=0.001)
Loss: Binary Crossentropy
Callbacks: EarlyStopping, ReduceLROnPlateau

⸻

⚙️ How to Run

1️⃣ Create Virtual Environment

python3 -m venv tfenv
source tfenv/bin/activate
pip install -r requirements.txt

2️⃣ Train the Model

python train_and_save.py

This saves:
	•	sales_forecasting_model.keras
	•	preprocessor.joblib

3️⃣ Test the Model via CLI

python test_cli.py

Input the required parameters for a new car entry to get predicted profitability and performance metrics.

⸻

📊 Evaluation Example

Metric	Score
Accuracy	0.85
Precision	0.88
Recall	0.83
F1 Score	0.85
AUC	0.87


⸻

🧩 Tech Stack
	•	Python 3.11
	•	TensorFlow / Keras
	•	Scikit-learn
	•	Pandas, NumPy
	•	Matplotlib, Joblib

⸻

🔬 Research & Context

This work is inspired by advancements in neural sales forecasting and predictive analytics.
The methodology follows the principles outlined in IEEE-grade studies focusing on multi-layer deep learning frameworks for structured business data.

⸻

🧾 Citation

If used for academic or industrial purposes, please cite as:

Pratham (2025). Salesight AI: Neural Network-Driven Sales Forecasting Model. Department of Artificial Intelligence Engineering, India.

