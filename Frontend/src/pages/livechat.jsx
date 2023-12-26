import React, { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheets/livechat.css"; // Import the CSS file

import { Link, Navigate, useNavigate } from "react-router-dom";
import { setQuestionId } from "/Users/gergesdanial/Downloads/Project_software 2/Backend/questionState.js";
const backend_url = "http://localhost:3000/api/v1";
const LiveChat = () => {
  const [newQuestion, setNewQuestion] = useState("");
  const navigate = useNavigate();

  const createQuestion = async () => {
    try {
      const response = await axios.post(
        `${backend_url}/livechat/`,
        { question: newQuestion },
        { withCredentials: true }
      );

      // Update state with the new question
      setNewQuestion("");

      // Get the questionId from the response
      const questionId = response.data.questionId;
      setQuestionId(questionId);

      // Redirect to the new page with the questionId in the URL
      navigate("/showchat");

      // Fetch all chats using the updated URL
      const allChatsResponse = await axios.get(
        `${backend_url}/livechat/${questionId}`,
        { withCredentials: true }
      );

      // Process the response for all chats as needed
      const allChats = allChatsResponse.data;

      console.log("All Chats:", allChats);

    } catch (error) {
      console.error("Error creating or fetching question:", error);
    }
  };

  return (
    <div>
      <h2 id="liveChatTitle">Live Chat</h2>

      <div>
        <label>New Question: </label>
        <input type="text" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
        <button className="customButton" onClick={createQuestion}>
          <span>Create Question</span>
        </button>
      </div>
    </div>
  );
};

export default LiveChat;