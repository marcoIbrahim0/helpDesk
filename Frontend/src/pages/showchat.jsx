import React, { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheets/showchat.css";

import {
  getQuestionId,
  setQuestionId,
} from "/Users/gergesdanial/Downloads/Project_software 2/Backend/questionState.js";
const backend_url = "http://localhost:3000/api/v1";

const ShowChat = () => {
  const [chatData, setChatData] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const storedQuestionId = sessionStorage.getItem("questionId");
  const initialQuestionId = getQuestionId() || storedQuestionId;
  const [questionId, setLocalQuestionId] = useState(initialQuestionId);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const allChatsResponse = await axios.get(
          `${backend_url}/livechat/${questionId}`,
          { withCredentials: true }
        );
        const allChats = allChatsResponse.data;
        console.log("Chat Data:", allChats);

        setChatData(allChats);
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };

    if (questionId) {
      fetchChatData();
    }
  }, [questionId]);

  useEffect(() => {
    sessionStorage.setItem("questionId", questionId);
    setQuestionId(questionId);
  }, [questionId]);

  useEffect(() => {
    // Set up an interval to fetch chat data every 5 seconds
    const intervalId = setInterval(fetchChatData, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handleTypeButtonClick = async () => {
    try {
      // Make the API call to update the question
      const response = await axios.post(
        `${backend_url}/livechat/${questionId}`,
        { newQuestion },
        { withCredentials: true }
      );

      const updatedQuestion = response.data.question;
      console.log("Updated Question:", updatedQuestion);

      // Trigger a refetch of chat data after updating the question
      setChatData([]);
      fetchChatData();

      // Clear the input field after submitting the question
      setNewQuestion("");
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const fetchChatData = async () => {
    try {
      const allChatsResponse = await axios.get(
        `${backend_url}/livechat/${questionId}`,
        { withCredentials: true }
      );
      const allChats = allChatsResponse.data;
      console.log("Chat Data:", allChats);

      setChatData(allChats);
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };

  return (
    <div className="chat-box">
      <h2>Chat for Question ID: {questionId}</h2>

      <div className="chat-container">
        {chatData.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === "question" ? "answer" : "question"}`}
            style={{ color: message.role === "question" ? "white" : "red" }}
            
          >
            {message.decryptedMessage}
          </div>
        ))}
      </div>

      {/* Input field for typing a new question */}
      <input
        type="text"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
      />

      {/* Button to add a new question */}
      <button onClick={handleTypeButtonClick}>Type</button>
    </div>
  );
};

export default ShowChat;