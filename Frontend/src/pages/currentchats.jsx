import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/currentchats.css"; // Import the CSS file

const backend_url = "http://localhost:3000/api/v1";

const CurrentChats = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`${backend_url}/livechat`, {
          withCredentials: true,
        });
        const fetchedChats = response.data;
        setChats(fetchedChats);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  const handleChatClick = (chatId) => {
    // Use the navigate function to redirect to the agentanswer.jsx page with the chat ID
    navigate(`/agentanswer/${chatId}`);
  };

  return (
    <div className="agent-chat-container">
      <h2>Agent Chat</h2>
      <div className="chat-box-container">
        {chats.map((chat) => (
          <div key={chat.chatId} className="chat-box">
            <h3>Chat ID: {chat.chatId}</h3>
            <p>Created At: {chat.createdAt}</p>
            <p>Updated At: {chat.updatedAt}</p>
            <div>
              <strong>Questions:</strong>
              {chat.questions.map((question, index) => (
                <p key={index}>{question.decryptedQuestion}</p>
              ))}
            </div>
            <div>
              <strong>Answers:</strong>
              {chat.answers.map((answer, index) => (
                <p key={index}>{answer.decryptedAnswer}</p>
              ))}
            </div>
            {/* Use onClick to handle the button click and call handleChatClick */}
            <button onClick={() => handleChatClick(chat.chatId)}>Chat</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentChats;