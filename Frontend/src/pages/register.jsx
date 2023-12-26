// Register.jsx
import "../stylesheets/register.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const backend_url = "http://localhost:3000/api/v1";

const Register = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    specialization: "",
    role: "user",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { email, password, username, firstName, lastName, specialization, role } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backend_url}/register`,
        { ...inputValue },
        { withCredentials: true }
      );

      const { status, data } = response;
      if (status === 201) {
        setSuccessMessage("Sign up successful");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage(error.response?.data?.message || "Server error");
    }
    setInputValue({
      email: "",
      password: "",
      username: "",
      firstName: "",
      lastName: "",
      specialization: "",
      role: "",
    });
  };
  return (
    <div className="register">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Sign up Account</h1>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            placeholder="Enter your first name"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            placeholder="Enter your last name"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="specialization">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={specialization}
            placeholder="Enter your specialization"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <input
            type="text"
            name="role"
            value={role}
            placeholder="Enter your role"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>{errorMessage || successMessage}</span>
        <span>
          Already have an account? <Link to={"/"}>Login</Link>
        </span>
      </form>
    </div>
  );
};
export default Register;
