// CreateAutomatedWorkflow.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../stylesheets/createAutomated.css";

const backend_url = 'http://localhost:3000/api/v1';

const CreateAutomatedWorkflow = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Issue: '',
    subIssue: '',
    description: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { Issue, subIssue, description } = formData;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backend_url}/workflow/`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { status, data } = response;
      if (status === 201) {
        setSuccessMessage('Automated Workflow created successfully');
        setTimeout(() => {
          // Redirect or perform additional actions after successful creation
          // navigate('/'); // Redirect example
        }, 1000);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error creating Automated Workflow:', error);
      setErrorMessage(error.response?.data?.message || 'Server error');
    }
    setFormData({
      Issue: '',
      subIssue: '',
      description: '',
    });
  };

  return (
    <div className="create-automated-workflow">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Create Automated Workflow</h1>
        <div>
          <label htmlFor="Issue">Issue</label>
          <input type="text" name="Issue" value={Issue} placeholder="Enter the issue" onChange={handleOnChange} />
        </div>
        <div>
          <label htmlFor="subIssue">Sub-Issue</label>
          <input type="text" name="subIssue" value={subIssue} placeholder="Enter the sub-issue" onChange={handleOnChange} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea name="description" value={description} placeholder="Enter the description" onChange={handleOnChange} />
        </div>
        <button type="submit">Create Workflow</button>
        <span>{errorMessage || successMessage}</span>
        <span>
          Back to <Link to="/">Home</Link>
        </span>
      </form>
    </div>
  );
};

export default CreateAutomatedWorkflow;
