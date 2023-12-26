// Agent.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faCog, // Icon for Automated Workflow
  faEnvelope, // Icon for Email
  faComments, // Icon for Live Chat
  faHome, // Home Icon
  faSignOutAlt, // Sign Out Icon
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "../stylesheets/Agent.css";

const AgentNavbar = ({ openSidebar, setOpenSidebar }) => {
  // Function to handle sign-out (you need to implement your sign-out logic here)
  const handleSignOut = () => {
    // Implement your sign-out logic (e.g., redirect to login page, clear session, etc.)
  };

  return (
    <div>
      {/* Button to open the sidebar */}
      <span
        className="open-btn"
        onClick={() => setOpenSidebar(!openSidebar)}
        style={{ fontSize: "24px", color: "#474342" }}
      >
        &#9776;
      </span>

      {/* Home Icon */}
      <Link to="/agent" className="home-icon" onClick={() => setOpenSidebar(false)}>
        <FontAwesomeIcon icon={faHome} size="lg" />
      </Link>

      {/* Sign Out Icon */}
      <span className="sign-out-icon" onClick={() => handleSignOut()}>
        <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
      </span>
    </div>
  );
};

const Agent = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  

  return (
    <div>
      {/* Use the new AgentNavbar component */}
      <AgentNavbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

      {/* Sidebar */}
      <div className="sidebar" style={{ width: openSidebar ? "80px" : "0", backgroundColor: "#ab20fd" }}>
        <span className="close-btn" onClick={() => setOpenSidebar(false)}>
          &times;
        </span>
        {/* Tickets */}
        <Link to="/agentTickets" onClick={() => setOpenSidebar(false)}>
           <FontAwesomeIcon icon={faTicket} size="lg" />
        </Link>
        {/* Email */}
        <Link to="/email" onClick={() => setOpenSidebar(false)}>
          <FontAwesomeIcon icon={faEnvelope} size="lg" />
        </Link>
        <Link to="/currentchats" onClick={() => setOpenSidebar(false)}>
          <FontAwesomeIcon icon={faComments} size="lg" />
        </Link>
      
      
      </div>

      {/* Content for Agent page */}
      <div className="main-content" style={{ marginLeft: openSidebar ? "80px" : "0" }}>
        <h1>Welcome to the Agent Page</h1>
        {/* Add Welcome message and Agent Specialization */}
        <p>Welcome, Agent! Your Specialization: [Agent Specialization]</p>
        {/* Add any other content specific to the Agent page */}
      </div>
    </div>
  );  
};

export default Agent;
