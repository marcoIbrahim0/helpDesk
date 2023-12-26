// AgentTicket.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import "../stylesheets/agentTickets.css";

const backend_url = "http://localhost:3000/api/v1";

const AgentTicket = ({ ticket, onAddWorkflow }) => {
  const [workflowDescription, setWorkflowDescription] = useState("");

  const handleAddWorkflow = () => {
    onAddWorkflow(ticket._id, workflowDescription);
    setWorkflowDescription("");
  };

  return (
    <Form className="form">
      <Form.Group controlId={`description-${ticket._id}`}>
        <Form.Label>Description: </Form.Label>
        {/* Add a Form.Control to display the description */}
        <Form.Control
          as="textarea"
          rows={2}
          value={ticket.Description}
          readOnly
        />
      </Form.Group>
      <Form.Group controlId={`status-${ticket._id}`}>
        <Form.Label>Status: {ticket.Status}</Form.Label>
      </Form.Group>
      <Form.Group controlId={`senderMail-${ticket._id}`}>
        <Form.Label>Sender Mail: {ticket.recipientMail}</Form.Label>
      </Form.Group>
      <Form.Group controlId={`priority-${ticket._id}`}>
        <Form.Label>Priority: {ticket.Priority}</Form.Label>
      </Form.Group>
      <Form.Control
        type="text"
        placeholder="Enter workflow description"
        value={workflowDescription}
        onChange={(e) => setWorkflowDescription(e.target.value)}
      />
      <Button variant="primary" onClick={handleAddWorkflow}>
        Add Workflow
      </Button>
    </Form>
  );
};
const AgentTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchAgentTickets = async () => {
      try {
        const response = await axios.get(`${backend_url}/tickets/agent-tickets`, { withCredentials: true });

        // Check if the response.data.tickets is an array before setting state
        if (Array.isArray(response.data.tickets)) {
          setTickets(response.data.tickets);
        } else {
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchAgentTickets(); // Call the function to fetch agent tickets
  }, []);
  


  const handleAddWorkflow = async (ticketId, description) => {
    try {
      

    await axios.post(
      `${backend_url}/workflow/${ticketId}`, // Pass the stringified IDs in the URL
      { Description: description },
      { withCredentials: true }
    );
    

    await axios.put(
      `${backend_url}/tickets/close/${ticketId}`,
      {}, // Empty request body or provide any required data
      { withCredentials: true }
    );

    // Optionally, you can fetch the updated ticket list after adding the workflow
      // and update the state to reflect the changes.
    } catch (error) {
      console.error('Error adding workflow:', error);
    }
  };

  return (
    <div className="card-container">
      {tickets.map((ticket) => (
        <AgentTicket key={ticket._id} ticket={ticket} onAddWorkflow={handleAddWorkflow} />
      ))}
    </div>
  );
};

export default AgentTickets;
