// User.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus, faSignOutAlt, faBook, faShoePrints, faUser, faMessage } from "@fortawesome/free-solid-svg-icons";
import "../stylesheets/user.css";

const UserSidebar = ({ openSidebar, setOpenSidebar }) => {
  return (
    <div className="sidebar" style={{ width: openSidebar ? "80px" : "0" }}>
      <span className="close-btn" onClick={() => setOpenSidebar(false)}>
        &times;
      </span>

      <Link to="/knowledge" onClick={() => setOpenSidebar(false)}>
        <FontAwesomeIcon icon={faBook} size="lg" />
      </Link>
      <Link to="/email" onClick={() => setOpenSidebar(false)}>
          <FontAwesomeIcon icon={faEnvelope} size="lg" />
        </Link>
      <Link to="/livechat" onClick={() => setOpenSidebar(false)}>
        <FontAwesomeIcon icon={faMessage} size="lg" />
      </Link>
      <Link to="/automatedWorkflow" onClick={() => setOpenSidebar(false)}>
        <FontAwesomeIcon icon={faPlus} size="lg" />
      </Link>
      <Link to="/updateprofile" onClick={() => setOpenSidebar(false)}>
        <FontAwesomeIcon icon={faUser} size="lg" />
      </Link>
      <Link to="/workflow" onClick={() => setOpenSidebar(false)}>
        <FontAwesomeIcon icon={faShoePrints} size="lg" />
      </Link>
      <Link to="/" onClick={() => setOpenSidebar(false)}>
        <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
      </Link>
    </div>
  );
};

const User = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="user-container">
      {/* Sidebar toggle button */}
      <button className="sidebar-toggle" onClick={() => setOpenSidebar(!openSidebar)}>
        &#9776;
      </button>

      {/* Conditional rendering of the sidebar */}
      {openSidebar && <UserSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />}

      {/* Content for User page */}
      <div className="main-content" style={{ marginLeft: openSidebar ? "80px" : "0" }}>
        <h1>Welcome to the User Page</h1>
        {/* Add any other content specific to the User page */}
      </div>
    </div>
  );
};

export default User;