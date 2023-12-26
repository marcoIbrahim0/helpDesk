import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load the trained RandomForestClassifier model
rf_model = joblib.load('rf_model.joblib')

# Load the label encoders
label_encoder_type = joblib.load('label_encoder_type.joblib')
label_encoder_priority = joblib.load('label_encoder_priority.joblib')

# Sample data for label encoding
sample_data = {'Type': ['software', 'hardware', 'network'],
               'Priority': ['high', 'medium', 'low']}
sample_df = pd.DataFrame(sample_data)

# Take user input for Priority and Type
user_priority = input("Enter Priority (high, medium, low): ")
user_type = input("Enter Type (software, hardware, network): ")

# Encode user input
try:
    user_priority_encoded = label_encoder_priority.transform([user_priority])[0]
    user_type_encoded = label_encoder_type.transform([user_type])[0]
except KeyError as e:
    print(f"Error: {str(e)} not found in the training data. Please enter valid values.")
    exit()

# Make predictions for user input
user_input = pd.DataFrame({'Type': [user_type_encoded], 'Priority': [user_priority_encoded]})
predictions = rf_model.predict_proba(user_input)

# Display predictions
print("Predictions (Probabilities for each class):")
for class_label, probability in zip(rf_model.classes_, predictions[0]):
    print(f"Class {class_label}: {probability:.4f}")
