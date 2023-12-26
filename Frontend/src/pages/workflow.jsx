// workflow.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap"; // Assuming you have Bootstrap for styling
import "../stylesheets/workflow.css"; // Assuming you have a CSS file for styling

const Workflow = () => {
  const [tickets, setTickets] = useState([]);
  const [performanceInput, setPerformanceInput] = useState("");

  const fetchTicketInfo = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/tickets/user-ticket", { withCredentials: true });

      if (Array.isArray(response.data.tickets) && response.data.tickets.length > 0) {
        const ticketsWithWorkflow = await Promise.all(
          response.data.tickets.map(async (ticket) => {
            const workflowResponse = await axios.get(`http://localhost:3000/api/v1/workflow/${ticket._id}`, { withCredentials: true });
            const workflowDescription = workflowResponse.data.description || '';

            return { ...ticket, workflowDescription };
          })
        );

        setTickets(ticketsWithWorkflow);
      } else {
        console.error('No tickets found for the user.');
      }
    } catch (error) {
      console.error('Error fetching ticket information:', error);
    }
  };

  useEffect(() => {
    fetchTicketInfo();
  }, []);

  const handleUpdatePerformance = async (ticketId) => {
    try {
      const parsedPerformanceInput = parseInt(performanceInput, 10);

      if (isNaN(parsedPerformanceInput) || parsedPerformanceInput < 1 || parsedPerformanceInput > 5) {
        console.error('Invalid performance input. It must be a number between 1 and 5.');
        return;
      }

      await axios.put(
        `http://localhost:3000/api/v1/tickets/updateAssignedAgentPerformance/${ticketId}`,
        { AssignedAgentPerformance: parsedPerformanceInput },
        { withCredentials: true }
      );

      // After updating, fetch the updated ticket information
      fetchTicketInfo();
      setPerformanceInput(""); // Clear the input after updating
    } catch (error) {
      console.error('Error updating AssignedAgentPerformance:', error);
    }
  };

  if (tickets.length === 0) {
    return <div>No tickets found.</div>;
  }

  return (
    <div className="card-container">
      {tickets.map((ticket) => (
        <div className="card" key={ticket._id}>
          <p className="heading">Ticket Description</p>
          <p>{ticket.Description}</p>
          <p>Assigned Agent Email: {ticket.AssignedAgentEmail}</p>
          <p>Priority: {ticket.Priority}</p>
          <p>Workflow: {ticket.workflowDescription}</p>

          {/* Text input and Button for updating AssignedAgentPerformance */}
          <Form.Group controlId={`performanceInput-${ticket._id}`}>
            <Form.Control
              type="number"
              placeholder="Enter performance (1-5)"
              value={performanceInput}
              onChange={(e) => setPerformanceInput(e.target.value)}
              min="1"
              max="5"
            />
          </Form.Group>
          <Button variant="success" onClick={() => handleUpdatePerformance(ticket._id)}>
            Update Performance
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Workflow;
