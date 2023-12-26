// Import necessary components and libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import"../stylesheets/otp.css"

const backend_url = "http://localhost:3000/api/v1"; // Replace with your actual backend URL

const OTP = ({ setLoggedIn }) => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
  
    const handleOtpChange = (e) => {
      setOtp(e.target.value);
    };
  
    const handleSendOTP = async () => {
        try {
          const response = await axios.post(
            `${backend_url}/otp/verify/${email}/${otp}`,
            {},
            { withCredentials: true }
          );
          console.log(response.data);
      
          console.log('Send OTP Response:', response.data); // Add this line for debugging
          console.log(response.status);
      
          if (response.status === 200) {
            const { role } = response.data;
      
            console.log('User Role:', role); // Add this line for debugging
      
            if (role === 'user') {
              navigate("/user");
            } else if (role === 'agent') {
              navigate("/agent");
            } else if (role === 'admin') {
              navigate("/admin");
            } else if (role === 'manager') {
              navigate("/manager");
            } else {
              console.error(`Unsupported role: ${role}`);
            }
          } else {
            console.error('Invalid response status:', response.status);
          }
        } catch (error) {
          console.error('Error in OTP request:', error);
        }
      };
  
      return (
        <div className="otp-container"> {/* Update class name here */}
          <h2>Enter OTP</h2>
          <label>
            OTP:
            <input type="text" value={otp} onChange={handleOtpChange} />
          </label>
          <button onClick={handleSendOTP} className="form-submit-btn">Verify OTP</button>
        </div>
      );
    };
  
  export default OTP;