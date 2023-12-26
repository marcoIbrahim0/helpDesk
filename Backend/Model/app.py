from flask import Flask, request, jsonify
import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)

# Load the trained RandomForestClassifier model
rf_model = joblib.load('rf_model.joblib')

# Load the label encoders
label_encoder_type = joblib.load('label_encoder_type.joblib')
label_encoder_priority = joblib.load('label_encoder_priority.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get user input
        user_input = request.json

        # Encode user input
        user_priority_encoded = label_encoder_priority.transform([user_input['Priority']])[0]
        user_type_encoded = label_encoder_type.transform([user_input['Type']])[0]

        # Make predictions for user input
        user_input_encoded = pd.DataFrame({'Type': [user_type_encoded], 'Priority': [user_priority_encoded]})
        predictions = rf_model.predict_proba(user_input_encoded)

        # Prepare and return predictions
        result = {class_label: float(probability) for class_label, probability in zip(rf_model.classes_, predictions[0])}
        return jsonify(result)

    except KeyError as e:
        return jsonify({'error': f"Error: {str(e)} not found in the training data. Please enter valid values."})

if __name__ == '__main__':
    app.run(debug=True)
