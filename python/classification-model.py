# --- Section 1: Importing modules ---
# These 3 modules are essential for data manipulation and visualization.
# import numpy as np
# import pandas as pd
# import matplotlib.pyplot as plt
# We do not need them as we are using built-in datasets and simple models.
from sklearn.datasets import load_iris # used to load the iris dataset.
from sklearn.preprocessing import StandardScaler # will help us standardize the features.
from sklearn.model_selection import train_test_split # to split the dataset into training and testing sets.
from sklearn.linear_model import LogisticRegression # the classification model we are going to use.
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score # to evaluate our model's performance.

# --- Section 2: Loading the dataset: Load the Iris dataset, which is a classic dataset for classification tasks. ---
print("Loading the Iris dataset...")
iris = load_iris()
X = iris.data
y = iris.target
print(f"Dataset loaded successfully with {X.shape[0]} samples/rows and {X.shape[1]} features/columns.\n")

# --- Section 3: Splitting the dataset: Split the dataset into training and testing sets (80% train, 20% test). ---
print("Splitting the dataset into training and testing sets...")
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(f"Dataset split successfully into {X_train.shape[0]} training samples and {X_test.shape[0]} testing samples.\n")

# --- Section 4: Preprocessing the data: Standardize the features to have mean=0 and variance=1. ---
print("Standardizing the features...")
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
print("Features standardized successfully.\n")

# --- Section 5: Training the model: Initialize the Logistic Regression model. ---
print("Training the Logistic Regression model...")
model = LogisticRegression()
model.fit(X_train, y_train)
print(f"Model trained successfully!\n")

# --- Section 6: Making predictions: Use the trained model to make predictions on the test set. ---
print("Making predictions on the test set...")
y_pred = model.predict(X_test)
print(f"{len(y_pred)} predictions made successfully.\n")

# --- Section 7: Evaluating the model: Evaluate the model's performance using various metrics. ---
print("Evaluating the model's performance...")
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print("\nClassification Report:")
print(classification_report(y_test, y_pred))
print("Accuracy Score:", accuracy_score(y_test, y_pred))
print("Model evaluation completed.\n")