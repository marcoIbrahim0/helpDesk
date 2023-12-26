// Import necessary modules and dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../stylesheets/agentanswer.css"; // Import the CSS file

const backend_url = "http://localhost:3000/api/v1";

const AgentAnswer = () => {
  const { id } = useParams(); // Get the question ID from the URL parameters
  const [newAnswer, setNewAnswer] = useState("");
  const [question, setQuestion] = useState(null);
  const [chatData, setChatData] = useState([]);

  const fetchQuestion = async () => {
    try {
      // Fetch the question details based on the provided question ID
      const response = await axios.get(`${backend_url}/livechat/${id}`, {
        withCredentials: true,
      });

      setQuestion(response.data.question);
    } catch (error) {
      console.error("Error fetching question:", error);
      // Handle error, e.g., redirect to an error page
    }
  };

  const fetchChatData = async () => {
    try {
      // Fetch all chat messages for the given question ID
      const response = await axios.get(`${backend_url}/livechat/${id}`, {
        withCredentials: true,
      });

      setChatData(response.data);
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchQuestion();
    fetchChatData();

    // Set up an interval to fetch question and chat data every 5 seconds
    const intervalId = setInterval(() => {
      fetchQuestion();
      fetchChatData();
    }, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [id]);

  const handleAnswerUpdate = async () => {
    try {
      // Send a request to update the answer for the given question ID
      await axios.put(
        `${backend_url}/livechat/${id}`,
        { newAnswer },
        { withCredentials: true }
      );

      // Fetch updated chat data after updating the answer
      fetchChatData();
      setNewAnswer("");
    } catch (error) {
      console.error("Error updating answer:", error);
      // Handle error, e.g., display an error message to the user
    }
  };

  return (
    <div className="agent-answer-container">
      <h2>Agent Answer</h2>
      {question && (
        <div className="question-details">
          <h3>Question ID: {question._id}</h3>
          <p>Decrypted Question: {question.decryptedQuestion}</p>
          {/* Additional details from the question object as needed */}
        </div>
      )}
      <div className="chat-container">
        {chatData.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === "question" ? "question" : "answer"}`}
            style={{ color: message.role === "question" ? "red" : "black" }}
          >
            {message.decryptedMessage}
          </div>
        ))}
      </div>
      <div className="answer-input">
        <label>New Answer:</label>
        <textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
      </div>
      <button onClick={handleAnswerUpdate}>Update Answer</button>
    </div>
  );
};

export default AgentAnswer;