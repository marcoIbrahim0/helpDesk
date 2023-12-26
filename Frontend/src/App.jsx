import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";


import { Route  , Router, Routes } from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/register";
import Admin from "./pages/Admin";
import User from "./pages/user";
import Ticket from "./pages/ticket";
import Agent from "./pages/Agent";
import AutomatedWorkflow from "./pages/automatedWorkflow";
import Knowledge from "./pages/knowledge";
import Users from "./pages/users";
import CreateAutomated from "./pages/createAutomated";
import Manager from "./pages/manager";
import KnowledgeAdmin from "./pages/knowledgeAdmin";
import CreateKnowledge from "./pages/createKnowledge"
import Customization from "./pages/customization";
import AgentTickets from "./pages/agentTickets";
import Workflow from "./pages/workflow";
import Reports from "./pages/reports";
import UpdateProfile from "./pages/updateProfile";
import Livechat from "./pages/livechat";
import Showchat from "./pages/showchat";
import CurrentChats from "./pages/currentchats";
import AgentAnswer from "./pages/agentanswer";
import Otp from "./pages/otp";
import Analysis from "./pages/analysis";
import Email from "./pages/email";








function App() {
  return (
    <>
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/admin" element={<Admin />} />
         <Route path="/register" element={<Signup />} />        
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/agent" element={<Agent />} />
          <Route path="/automatedWorkflow" element={<AutomatedWorkflow />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/users" element={<Users />} />
          <Route path="/createAutomated" element={<CreateAutomated />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/customization" element={<Customization />} />
          <Route path="/knowledgeAdmin" element={< KnowledgeAdmin/>} />
          <Route path="/createKnowledge" element={< CreateKnowledge/>} />
          <Route path="/agentTickets" element={< AgentTickets/>} />
          <Route path="/workflow" element={< Workflow/>} />
          <Route path="/reports" element={< Reports/>} />
          <Route path="/updateProfile" element={< UpdateProfile/>} />
          <Route path="/currentchats" element={<CurrentChats />} />
          <Route path="/agentanswer/:id" element={<AgentAnswer />} />
          <Route path="/livechat" element={<Livechat />} />
          <Route path="/showchat" element={<Showchat />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/analysis" element={< Analysis/>} />
          <Route path="/email" element={< Email/>} />





        </Routes>
    </>
  );
}

export default App;