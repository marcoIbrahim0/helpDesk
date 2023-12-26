// Users.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faSignOutAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../stylesheets/users.css";

const backend_url = "http://localhost:3000/api/v1";

const UsersNavbar = ({ openSidebar, setOpenSidebar }) => {
  const handleSignOut = () => {
    console.log("Signing out...");
  };

  return (
    <div>
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

const Users = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${backend_url}/users`, { withCredentials: true });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAssignRole = async (userId, newRole) => {
    try {
      // Check if the selected role is "default" and handle it accordingly
      if (newRole === "default") {
        console.log('No role selected.'); // Optional: Add a message for debugging
      } else {
        console.log('Updating user role:', userId, newRole);

        // Send a request to update the user's role
        await axios.put(
          `${backend_url}/users/${userId}/updateRole`,
          { newRole }, // Ensure newRole is included in the request payload
          { withCredentials: true }
        );

        // Fetch updated user data
        const response = await axios.get(`${backend_url}/users`, {
          withCredentials: true,
        });
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  return (
    <div>
      <UsersNavbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

      <div className="sidebar" style={{ width: openSidebar ? "80px" : "0", backgroundColor: "#ab20fd" }}>
        <span className="close-btn" onClick={() => setOpenSidebar(false)}>
          &times;
        </span>
        <Link to="/admin" onClick={() => setOpenSidebar(false)}>
          <FontAwesomeIcon icon={faHouse} size="lg" />
        </Link>
        <Link to="/users" onClick={() => setOpenSidebar(false)}>
          <FontAwesomeIcon icon={faUsers} size="lg" />
        </Link>
        <Link to="/" onClick={() => setOpenSidebar(false)}>
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
        </Link>
      </div>

      <div className="main-content" style={{ marginLeft: openSidebar ? "80px" : "0" }}>
        <div>
          <ul className="user-list">
            {users.map((user) => (
              <li key={user._id} className="user-list-item">
                {user.username}
                <div className="assign-role-container">
                  <select defaultValue="role" onChange={(e) => handleAssignRole(user._id, e.target.value)}>
                    <option value="role" disabled hidden>
                      Role
                    </option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="agent">Agent</option>
                    <option value="manager">Manager</option>
                  </select>
                  <button onClick={() => handleAssignRole(user._id, e.target.previousSibling.value)}>Assign Role</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Add any other content specific to the Users page */}
      </div>
    </div>
  );
};

export default Users;