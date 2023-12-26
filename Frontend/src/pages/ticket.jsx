// Ticket.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../stylesheets/ticket.css";
import { Link } from "react-router-dom";

const backend_url = "http://localhost:3000/api/v1";

const Ticket = ({ setOpenSidebar }) => {
  const [formData, setFormData] = useState({
    description: "",
    category: "network",
    subCategory: "",
    priority: "high",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backend_url}/tickets/`, {
        Description: formData.description,
        Category: formData.category,
        subCategory: formData.subCategory,
        Priority: formData.priority,
      },{ withCredentials: true });

      const { status, data } = response;
      if (status === 201) {
        setSuccessMessage("Ticket created successfully");
        // You can redirect or perform any other actions here
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      setErrorMessage(error.response?.data?.message || "Server error");
    }
    setFormData({
      description: "",
      category: "network",
      subCategory: "",
      priority: "high",
    });
  };

  const handleGoBack = () => {
    console.log("Going back...");
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleCreateTicket}>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
          />
        </div>

        <div className="form-group">
          <label htmlFor="subCategory">Subcategory</label>
          <input
            type="text"
            id="subCategory"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            placeholder="Enter subcategory"
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <button type="submit" className="form-submit-btn">
          Create Ticket
        </button>

        <span>{errorMessage || successMessage}</span>
        
      </form>
    </div>
  );
};

export default Ticket;