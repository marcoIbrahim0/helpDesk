import React, { useState } from "react";
import axios from "axios";

const backend_url = "http://localhost:3000/api/v1";

const AutomatedWorkflow = () => {
  const [workflowData, setWorkflowData] = useState({
    issue: "",
    subIssue: "",
  });

  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { issue, subIssue } = workflowData;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setWorkflowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.get(`${backend_url}/workflow/automatedWorkflow`, {
      params: {
        issue,
        subIssue,
      },
      withCredentials: true,
    });

    const { status, data } = response;
    if (status === 200) {
      setDescription(data.description);
      setErrorMessage("");
    } else {
      setDescription("");
      setErrorMessage("Workflow not found for the provided issue and subissue");
    }
  } catch (error) {
    console.error("Error fetching workflow:", error);
    setDescription("");
    setErrorMessage("Server error. Check console for details.");
  }
};


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Issue"
            name="issue"
            type="text"
            value={issue}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <input
            placeholder="SubIssue"
            name="subIssue"
            type="text"
            value={subIssue}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <button type="submit">Get Workflow Description</button>
        </div>
        <div>
          <span>{errorMessage}</span>
        </div>
      </form>

      {/* Display the workflow description */}
      {description && (
        <div>
          <h2>Workflow Description:</h2>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default AutomatedWorkflow;
