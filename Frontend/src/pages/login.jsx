import "../stylesheets/Login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const backend_url = "http://localhost:3000/api/v1";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backend_url}/login`,
        { ...inputValue },
        { withCredentials: true, credentials: 'include' }
      );
  
      const { status, data } = response;
      if (status === 200) {
        const { token, user } = data;
  
        // Save the token in the headers for future API requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
        // Save the token in a cookie
        document.cookie = `token=${token}; path=/; samesite=None;`;
  
        // Save other user information if needed
        localStorage.setItem("userId", user._id);
        localStorage.setItem("role", user.role);
  
        // Redirect based on user role
        switch (user.role) {
          case "user":
            navigate("/user");
            break;
          case "admin":
            navigate("/admin");
            break;
          case "agent":
            navigate("/agent");
            break;
          case "manager":
            navigate("/manager");
            break;
          default:
            // Handle other roles or unknown roles
            break;
        }
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Server error");
    }
    setInputValue({
      email: "",
      password: "",
    });
  };
  return (
    <div className="login">
      <form className="form" onSubmit={handleSubmit}>
        <div className="h1">Login</div>
        <input
          pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
          placeholder="Email"
          id="email"
          name="email"
          type="text"
          className="input form-content"
          value={email}
          onChange={handleOnChange}
        />
        <input
          placeholder="Password"
          id="password"
          name="password"
          type="password"
          className="input form-content"
          value={password}
          onChange={handleOnChange}
        />
        <input value="Login" className="btn" type="submit" />
        <span className="sign-up-label">{errorMessage}</span>
      </form>

      <div className="rays">{/* SVG code for rays */}</div>

      <div className="emitter">{/* SVG code for emitter */}</div>

      <div className="buttons-container">
        <span className="sign-up-label">Don't have an account?</span>
        <Link className="sign-up-link" to={"/signup"}>
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Login;