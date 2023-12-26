// Knowledge.jsx
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faSearch } from "@fortawesome/free-solid-svg-icons";
import "../stylesheets/knowledge.css";

const backend_url = "http://localhost:3000/api/v1";

const Knowledge = () => {
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
    <div className="form-container">
      <div className="searchBox">
        <input
          type="text"
          className="searchInput"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="searchButton" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} size="lg" />
        </button>
      </div>

      <div className="main-content">
        <h1>Welcome to the Knowledge Base Page</h1>

        <ul>
          {knowledgeData.map((knowledge) => (
            <li key={knowledge._id}>
              <h3>{knowledge.title}</h3>
              <p>{knowledge.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Knowledge;
