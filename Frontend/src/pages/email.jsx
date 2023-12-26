// Email.jsx
import React, { useState } from 'react';
import axios from 'axios';
const backend_url = "http://localhost:3000/api/v1";

const Email = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendEmail = async () => {
    try {
      // Make a POST request to your server endpoint with the email address
      await axios.post(`${backend_url}/email/send-email/`, {
        subject: 'Your Subject', // Provide a default subject or fetch it from another source
        text: 'Your Email Body', // Provide a default email body or fetch it from another source
        Category: 'user', // Set the category based on your requirement
      },
      { withCredentials: true });

      // Handle success, e.g., show a success message to the user
      console.log('Email sent successfully');
    } catch (error) {
      // Handle error, e.g., show an error message to the user
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
      />
      <button onClick={handleSendEmail}>Send Email</button>
    </div>
  );
};

export default Email;
