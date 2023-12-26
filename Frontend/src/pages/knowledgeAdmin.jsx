// Knowledge.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSignOutAlt, faBook, faSearch } from "@fortawesome/free-solid-svg-icons";

const backend_url = "http://localhost:3000/api/v1";

const KnowledgeAdmin = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [knowledgeData, setKnowledgeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch knowledge base data from the backend when the component mounts
    fetchKnowledgeData();
  }, []);

  const fetchKnowledgeData = async () => {
    try {
      const response = await fetch(`${backend_url}/knowledge`, { credentials: "include" });

      if (!response.ok) {
        throw new Error(`Failed to fetch knowledge base data: ${response.statusText}`);
      }

      const data = await response.json();
      setKnowledgeData(data);
    } catch (error) {
      console.error("Error fetching knowledge base data:", error.message);
    }
  };

  const handleSearch = () => {
    // Filter knowledgeData based on searchQuery
    const filteredData = knowledgeData.filter((knowledge) =>
      knowledge.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setKnowledgeData(filteredData);
  };

  return (
    <div>
      {/* ... (existing code) */}

      {/* Content for KnowledgeAdmin page */}
      <div className="main-content" style={{ marginLeft: openSidebar ? "250px" : "0", paddingTop: "64px" }}>
        <h1>Welcome to the Knowledge Admin Page</h1>

        {/* Display knowledge base data */}
        <ul>
          {knowledgeData.map((knowledge) => (
            <li key={knowledge._id}>
              <h3>{knowledge.title}</h3>
              <p>{knowledge.content}</p>
            </li>
          ))}
        </ul>

        {/* Button to redirect to CreateKnowledge */}
        <Link to="/createKnowledge">
          <button>Create Knowledge</button>
        </Link>
      </div>
    </div>
  );
};

export default KnowledgeAdmin;