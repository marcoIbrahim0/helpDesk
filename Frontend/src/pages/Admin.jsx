// Admin.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faPaintRoller,
  faSignOutAlt,
  faUsers,
  faRobot,
  faBook // Add the FontAwesome icon for the knowledge base
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "../stylesheets/Admin.css";

const AdminNavbar = ({ openSidebar, setOpenSidebar }) => {
  const handleSignOut = () => {
    // Implement your sign-out logic here
    console.log("Signing out...");
  };

  return (
    <div>
      {/* Button to open the sidebar */}
      <span
        className="open-btn"
        onClick={() => setOpenSidebar(!openSidebar)}
        style={{ fontSize: "24px", color: "#524B49" }}
      >
        &#9776;
      </span>
    </div>
  );
};

const Admin = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div>
      {/* Use the new AdminNavbar component */}
      <AdminNavbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

      {/* Sidebar */}
      <div className="sidebar" style={{ width: openSidebar ? "80px" : "0", backgroundColor: "#524B49" }}>
        <span className="close-btn" onClick={() => setOpenSidebar(false)}>
          &times;
        </span>
        {/* Use Font Awesome icon for the "Home" link */}
        <Link to="/admin" onClick={() => setOpenSidebar(false)}>
          <FontAwesomeIcon icon={faHouse} size="lg" />
        </Link>
        {/* Use Font Awesome icon for the "Sign Out" link (for one user) */}
        <Link to="/register" onClick={() => { handleSignOut(); setOpenSidebar(false); }}>
          <FontAwesomeIcon icon={faUser} size="lg" />
        </Link>
        <Link to="/createAutomated" onClick={() => { handleSignOut(); setOpenSidebar(false); }}>
          <FontAwesomeIcon icon={faRobot} size="lg" />
        </Link>
        {/* Use Font Awesome icon for the "Users" link (for all users) */}
        <Link to="/users" onClick={() => setOpenSidebar(false)}>
          <FontAwesomeIcon icon={faUsers} size="lg" />
        </Link>
        {/* Use Font Awesome icon for the "Knowledge Base" link */}
        <Link to="/knowledgeAdmin" onClick={() => setOpenSidebar(false)}>
          <FontAwesomeIcon icon={faBook} size="lg" />
        </Link>
        {/* Use Font Awesome icon for the "Customize Appearance" link */}
        <Link to="/customization" onClick={() => setOpenSidebar(false)}>
          <FontAwesomeIcon icon={faPaintRoller} size="lg" />
        </Link>
        {/* Use Font Awesome icon for the "Sign Out" link (for all users) */}
        <Link to="/" onClick={() => setOpenSidebar(false)}>
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
        </Link>
      </div>

      {/* Content for Admin page */}
      <div className="main-content" style={{ marginLeft: openSidebar ? "80px" : "0" }}>
        <h1>Welcome to the Admin Page</h1>
        {/* Add any other content specific to the Admin page */}
      </div>
    </div>
  );
};

export default Admin;
