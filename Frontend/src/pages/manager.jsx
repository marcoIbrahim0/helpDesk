// Manager.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt, // Icon for Reports
  faChartBar, // Icon for Analytics
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "../stylesheets/Manager.css";

const ManagerNavbar = ({ openSidebar, setOpenSidebar }) => {
  return (
    <div>
      {/* Button to open the sidebar */}
      <span
        className="open-btn"
        onClick={() => setOpenSidebar(!openSidebar)}
        style={{ fontSize: "24px", color: "#ab20fd" }}
      >
        &#9776;
      </span>
    </div>
  );
};

const Manager = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div>
      {/* Use the new ManagerNavbar component */}
      <ManagerNavbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

      {/* Sidebar */}
      <div className="sidebar" style={{ width: openSidebar ? "80px" : "0", backgroundColor: "#ab20fd" }}>
        <span className="close-btn" onClick={() => setOpenSidebar(false)}>
          &times;
        </span>
        {/* Reports */}
        <Link to="/reports" onClick={() => setOpenSidebar(false)}>
          <FontAwesomeIcon icon={faFileAlt} size="lg" />
        </Link>
        {/* Analytics */}
        <Link to="/analysis" onClick={() => setOpenSidebar(false)}>
          <FontAwesomeIcon icon={faChartBar} size="lg" />
        </Link>
      </div>

      {/* Content for Manager page */}
      <div className="main-content" style={{ marginLeft: openSidebar ? "80px" : "0" }}>
        <h1>Welcome to the Manager Page</h1>
        {/* Add Welcome message and Manager Specialization */}
        <p>Welcome, Manager! Your Specialization: [Manager Specialization]</p>
        {/* Add any other content specific to the Manager page */}
      </div>
    </div>
  );
};

export default Manager;
