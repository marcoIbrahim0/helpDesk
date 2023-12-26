// AutomatedWorkflow.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";

const backend_url = "http://localhost:3000/api/v1";

const AutomatedWorkflow = () => {
  const navigate = useNavigate();

  const [workflowData, setWorkflowData] = useState({
    issue: "",
    subIssue: "",
  });
  const [workflowDescription, setWorkflowDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setWorkflowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGetWorkflow = async () => {
    try {
      const response = await axios.get(
        `${backend_url}/workflow/automatedWorkflow/${workflowData.issue}/${workflowData.subIssue}`,
        { withCredentials: true }
      );

      const { status, data } = response;
      if (status === 200) {
        setWorkflowDescription(data.description);
        setErrorMessage("");
      } else {
        setWorkflowDescription("");
        setErrorMessage(
          "Workflow not found for the provided issue and subissue"
        );
      }
    } catch (error) {
      console.error("Error fetching workflow:", error);
      setWorkflowDescription("");
      setErrorMessage("Server error. Check console for details.");
    }
  };

  const handleRedirectToTicket = () => {
    navigate("/ticket");
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={(e) => { e.preventDefault(); handleGetWorkflow(); }}>
        <div className="form-group">
          <label htmlFor="issue">Issue</label>
          <input
            type="text"
            id="issue"
            name="issue"
            value={workflowData.issue}
            onChange={handleOnChange}
            placeholder="Enter issue"
          />
        </div>

        <div className="form-group">
          <label htmlFor="subIssue">SubIssue</label>
          <input
            type="text"
            id="subIssue"
            name="subIssue"
            value={workflowData.subIssue}
            onChange={handleOnChange}
            placeholder="Enter subissue"
          />
        </div>

        <button type="button" className="form-submit-btn" onClick={handleGetWorkflow}>
          Get Workflow Description
        </button>

        <button type="button" className="form-submit-btn" onClick={handleRedirectToTicket}>
          Go to Ticket
        </button>

        <span>{errorMessage}</span>
      </form>

      {workflowDescription && (
        <div>
          <h2>Workflow Description:</h2>
          <p>{workflowDescription}</p>
        </div>
      )}
    </div>
  );
};

export default AutomatedWorkflow;
