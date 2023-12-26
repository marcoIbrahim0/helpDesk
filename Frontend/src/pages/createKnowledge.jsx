// CreateAutomatedWorkflow.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../stylesheets/createAutomated.css";



const backend_url = 'http://localhost:3000/api/v1';

const CreateKnowledge = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { title, content} = formData;

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
      const response = await axios.post(`${backend_url}/knowledge/`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { status, data } = response;
      if (status === 201) {
        setSuccessMessage('FAQ created successfully');
        setTimeout(() => {
          // Redirect or perform additional actions after successful creation
          // navigate('/'); // Redirect example
        }, 1000);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error creating an FAQ:', error);
      setErrorMessage(error.response?.data?.message || 'Server error');
    }
    setFormData({
      title: '',
      content: '',
    });
  };

  return (
    <div className="create-automated-workflow">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Create FAQ for the Knowledge base</h1>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" value={title} placeholder="Enter the title" onChange={handleOnChange} />
        </div>
        <div>
          <label htmlFor="content">Sub-Issue</label>
          <input type="text" name="content" value={content} placeholder="Enter the content" onChange={handleOnChange} />
        </div>
        
        <button type="submit">Create FAQ</button>
        <span>{errorMessage || successMessage}</span>
        <span>
          Back to <Link to="/">Home</Link>
        </span>
      </form>
    </div>
  );
};

export default CreateKnowledge;