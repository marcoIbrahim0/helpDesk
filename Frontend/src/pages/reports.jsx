import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card } from "react-bootstrap";
import moment from "moment"; // Import moment library
import "../stylesheets/reports.css";

const backend_url = "http://localhost:3000/api/v1";

const Reports = () => {
  const [selectedCategory, setSelectedCategory] = useState("software");
  const [tickets, setTickets] = useState([]);

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get(`${backend_url}/tickets/getByCategory/${selectedCategory}`, {
        withCredentials: true,
      });

      // Assuming response.data.tickets is an array
      const ticketsWithResolutionTime = response.data.tickets.map((ticket) => {
        const resolutionTime = moment(ticket.updatedAt).diff(moment(ticket.createdAt), 'minutes');
        return {
          ...ticket,
          resolutionTime,
        };
      });

      setTickets(ticketsWithResolutionTime);
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <div>
      <div className="report-form">
        <Form.Group controlId="categorySelect">
          <Form.Label>Select Category:</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="software">Software</option>
            <option value="network">Network</option>
            <option value="hardware">Hardware</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" onClick={handleGenerateReport}>
          Generate Report
        </Button>
      </div>

      <div className="report-container">
        {tickets.map((ticket) => (
          <Card key={ticket._id} className="report-card">
            <Card.Body>
              <Card.Title>Description: {ticket.Description}</Card.Title>
              <Card.Text>TicketId: {ticket._id}</Card.Text>
              <Card.Text>Resolution Time: {ticket.resolutionTime} minutes</Card.Text>
              <Card.Text>Performance: {ticket.AssignedAgentPerformance}</Card.Text>
              {/* Add other ticket information as needed */}
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;
