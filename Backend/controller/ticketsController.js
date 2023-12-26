const TicketsModel = require("../Models/ticketsModel");
const cookie = require('cookie');
const nodemailer = require("nodemailer");
const userModel = require("../Models/userModel");
const AutomatedWorkflow = require('../Models/automatedWorkflow');
const mongoose = require('mongoose');
const { findAvailableAgent } = require('./helpers'); // Update the path accordingly
//const ticketsModel = require("../Models/ticketsModel");

const ticketsController = {

  createTicket: async (req, res) => {
    try {
      const {
        Description,
        Category,
        subCategory,
        Priority,
      } = req.body;

      // Get the user ID from the request
      const userId = req.user.userId;
  
      // Find recipient email from userModel
      const recipient = await userModel.findOne({ _id: userId });
      const recipientMail = recipient.email;
  
      // Initialize senderMail and agentID
      let senderMail;
      let agentID;

      
      let agentTicketCount;
      let result;

      let Agent;
      switch (Category) {
        case 'software':
          result = await TicketsModel.findOneAndUpdate(
            { Status: 'open' },
            {},
            { sort: { softwareCount: -1 }, projection: 'softwareCount', new: true }
          );
          agentTicketCount = (result && result.softwareCount)|| 0;
          break;
        case 'hardware':
          result = await TicketsModel.findOneAndUpdate(
            { Status: 'open' },
            {},
            { sort: { hardwareCount: -1 }, projection: 'hardwareCount', new: true }
          );
          agentTicketCount = (result && result.hardwareCount)|| 0;
          break;
        case 'network':
          result = await TicketsModel.findOneAndUpdate(
            { Status: 'open' },
            {},
            { sort: { networkCount: -1 }, projection: 'networkCount', new: true }
          );
          agentTicketCount = (result && result.networkCount) || 0;
          break;
        default:
          return res.status(400).json({ message: "Must enter a valid category" });
      }
      console.log("tickets of software", agentTicketCount);
      switch (Category) {
        case 'hardware':
        
        if(Priority === "medium" && agentTicketCount >= 5){
          Agent = await userModel.findOne({ specialization: 'network' });
          if (Agent) {
            senderMail = Agent.email;
            agentID = Agent._id;
          }
        }else if(Priority === "low" && agentTicketCount >= 5){
          Agent = await userModel.findOne({ specialization: 'software' });
          if (Agent) {
            senderMail = Agent.email;
            agentID = Agent._id;
          }
        }else {
          Agent = await userModel.findOne({ specialization: 'hardware' });
          if (Agent) {
            senderMail = Agent.email;
            agentID = Agent._id;
          }
        }
          break;
  
        case 'software':
          if(Priority === "medium" && agentTicketCount >= 5){
            Agent = await userModel.findOne({ specialization: 'hardware' });
            console.log(Agent);
            if (Agent) {
              senderMail = Agent.email;
              agentID = Agent._id;
            }
          }else if(Priority === "low" && agentTicketCount >= 5){
            Agent = await userModel.findOne({ specialization: 'network' });
            if (Agent) {
              senderMail = Agent.email;
              agentID = Agent._id;
            }
          }else {
            Agent = await userModel.findOne({ specialization: 'software' });
            if (Agent) {
              senderMail = Agent.email;
              agentID = Agent._id;
            }
          }
          break;
  
        case 'network':
          if(Priority === "low" && agentTicketCount >= 5){
            Agent = await userModel.findOne({ specialization: 'hardware' });
            if (Agent) {
              senderMail = Agent.email;
              agentID = Agent._id;
            }
          } else if(Priority === "medium" && agentTicketCount >= 5){
            Agent = await userModel.findOne({ specialization: 'software' });
            if (Agent) {
              senderMail = Agent.email;
              agentID = Agent._id;
            }
          } else {
            Agent = await userModel.findOne({ specialization: 'network' });
            if (Agent) {
              senderMail = Agent.email;
              agentID = Agent._id;
            }
          }
          break;
  
        default:
          console.log("Must enter a category");
          return res.status(400).json({ message: "Must enter a valid category" });
      }
      console.log("ticket count::",agentTicketCount);
      console.log("Priority", Priority);
      if (agentTicketCount < 5) {
      
        agentTicketCount = agentTicketCount + 1;  
        let Agent;
        // Find the appropriate agent based on the category

  
        // Check if the agent details are found
        if (!senderMail || !agentID) {
          console.log('Agent not found');
          return res.status(404).json({ message: "Agent not found" });
        }

        // Create a new ticket and assign it to the agent
        const newTicket = new TicketsModel({
          senderMail,
          userID: req.user._id,
          Description,
          AssignedAgentEmail: senderMail,
          recipientMail: recipientMail,
          Status: "open",
          AssignedAgentID: agentID,
          Category,
          subCategory,
          Priority,
          [`${Category}Count`]: agentTicketCount,
          [`${Category}Queue`]: 0,
        });
  
        // Save the ticket to the database
        await newTicket.save();
  
        // Retrieve automated workflows based on subCategory
        const automatedWorkflows = await AutomatedWorkflow.find({ subIssue: subCategory });
  
        // Send response with ticket and automated workflows
        res.status(201).json({ message: "Ticket created successfully", ticket: newTicket, automatedWorkflows });
  
        // Send notification email
        const subject = `Your ticket has been opened`;
        let agentMail = null;
        let mailPass = null;
  
        switch (Category) {
          case 'hardware':
            agentMail = "helpdeskgiu@hotmail.com";
            mailPass = "E137188013EC0A823E8A71BC9FEB1B850E4A";
            break;
  
          case 'software':
            agentMail = "helpdesksoftwaregiu@hotmail.com";
            mailPass = "9C1D604C2DE2A931A0A9C092D8621B68770A";
            break;
  
          case 'network':
            agentMail = "helpdiskgiu@gmail.com";
            mailPass = "7A93E9F2F134AE077C4B6BC504344C6F2A19";
            break;
  
          default:
            console.log("Must enter a category");
            return; // Handle this case according to your requirements
        }
  
        const transporter = nodemailer.createTransport({
          host: 'smtp.elasticemail.com',
          secure: true,
          port: 465,
          auth: {
            user: agentMail,
            pass: mailPass,
          },
        });
  
        const message = {
          from: 'helpdiskgiu@gmail.com',
          to: recipientMail,
          subject: subject,
          text: 'Your ticket is being viewed by an agent',
        };
  
        transporter.sendMail(message, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Email sent:', info.messageId);
          }
        });
  
      } else if (Priority === 'high' && agentTicketCount >= 5) {

        let newQueueNumber;
        // Determine the agent's queue based on the category
        switch (Category) {
          case 'software':
            result = await TicketsModel.find({}).sort({ softwareQueue: -1 }).limit(1).select('softwareQueue');
            newQueueNumber = (result[0] && result[0].softwareQueue) + 1;
            const softwareAgent = await userModel.findOne({ specialization: 'software' });
            if (softwareAgent) {
              senderMail = softwareAgent.email;
              agentID = softwareAgent._id;
            }
            break;
      
          case 'hardware':
            result = await TicketsModel.find({}).sort({ hardwareQueue: -1 }).limit(1).select('hardwareQueue');
            newQueueNumber = (result[0] && result[0].hardwareQueue) + 1|| 0;
            const hardwareAgent = await userModel.findOne({ specialization: 'hardware' });
            if (hardwareAgent) {
              senderMail = hardwareAgent.email;
              agentID = hardwareAgent._id;
            }
          break;
      
          case 'network':
            result = await TicketsModel.find({}).sort({ networkQueue: -1 }).limit(1).select('networkQueue');
            newQueueNumber = (result[0] && result[0].networkQueue) + 1 || 0;
            const networkAgent = await userModel.findOne({ specialization: 'network' });
            if (networkAgent) {
              senderMail = networkAgent.email;
              agentID = networkAgent._id;
            }
          break;
    
          default:
            console.log("Must enter a valid category");
            return res.status(400).json({ message: "Must enter a valid category" });
        }
        
        // Check if the agent details are found
        if (!senderMail || !agentID) {
          console.log('Agent not found');
          return res.status(404).json({ message: "Agent not found" });
        }
        console.log("newQueueNumber", newQueueNumber)
        // Agent has 5 tickets and incoming ticket is high priority
        // Add the new ticket to the agent's queue 
        const newTicket = new TicketsModel({
          senderMail,
          userID: req.user._id,
          Description,
          AssignedAgentEmail: senderMail,
          recipientMail: recipientMail,
          Status: "pending",
          AssignedAgentID: agentID,
          Category,
          subCategory,
          Priority,
          [`${Category}Queue`]: newQueueNumber,
        });
        await newTicket.save();
    
          res.status(201).json({
            message: "Ticket created successfully and added to the agent's queue",
            ticket: newTicket,
          });
      } else if ((Priority === 'low' || Priority === 'medium') && agentTicketCount < 5){
        // Agent has 5 tickets but incoming ticket is not high priority
        // Assign the new ticket to a different agent based on the agent's specialization

        let newAgentID;

        switch (Category) {
          case 'hardware':
            newAgentID = await findAvailableAgent('hardware');
            const hardwareAgent = await userModel.findOne({ specialization: 'hardware' });
            if (hardwareAgent) {
              senderMail = hardwareAgent.email;
              agentID = hardwareAgent._id;
            }
            break;
    
          case 'software':
            newAgentID = await findAvailableAgent('software');
            const softwareAgent = await userModel.findOne({ specialization: 'software' });
            if (softwareAgent) {
              senderMail = softwareAgent.email;
              agentID = softwareAgent._id;
            }
            break;
    
          case 'network':
            newAgentID = await findAvailableAgent('network');
            const networkAgent = await userModel.findOne({ specialization: 'network' });
            if (networkAgent) {
              senderMail = networkAgent.email;
              agentID = networkAgent._id;
            }
            break;
    
          default:
            console.log("Must enter a valid category");
            return res.status(400).json({ message: "Must enter a valid category" });
        }
          
        // Check if the agent details are found
        if (!senderMail || !agentID) {
          console.log('Agent not found');
          return res.status(404).json({ message: "Agent not found" });
        }
        

        switch (Category) {
          case 'software':
            result = await TicketsModel.findOneAndUpdate(
              { Status: 'open' },
              {},
              { sort: { softwareCount: -1 }, projection: 'softwareCount', new: true }
            );
            agentTicketCount = (result && result.softwareCount)||0;
            break;
          case 'hardware':
            result = await TicketsModel.findOneAndUpdate(
              { Status: 'open' },
              {},
              { sort: { hardwareCount: -1 }, projection: 'hardwareCount', new: true }
            );
            agentTicketCount = (result && result.hardwareCount)||0;
            console.log("Result:", agentTicketCount);
            break;
          case 'network':
            result = await TicketsModel.findOneAndUpdate(
              { Status: 'open' },
              {},
              { sort: { networkCount: -1 }, projection: 'networkCount', new: true }
            );
            agentTicketCount = (result && result.networkCount);
            break;
          default:
            return res.status(400).json({ message: "Must enter a valid category" });
        }
        agentTicketCount = agentTicketCount + 1;
        console.log("agentTicketCount", agentTicketCount);
        // Assign the new ticket to the found agent
        const newTicket = new TicketsModel({
          senderMail,
          userID: req.user._id,
          Description,
          AssignedAgentEmail: senderMail,
          recipientMail: recipientMail,
          Status: "open",
          AssignedAgentID: newAgentID,
          Category,
          subCategory,
          Priority,
          Queue: 0, // Not in the queue
        });
  
        // Save the ticket to the database
        await newTicket.save();
  
        // Retrieve automated workflows based on subCategory
        const automatedWorkflows = await AutomatedWorkflow.find({ subIssue: subCategory });
  
        // Send response with ticket and automated workflows
        res.status(201).json({ message: "Ticket created successfully", ticket: newTicket, automatedWorkflows });
  
        // Send notification email
        const subject = `Your ticket has been opened`;
        let newAgentMail = null;
        let newMailPass = null;
  
        switch (Category) {
          case 'hardware':
            newAgentMail = "helpdeskgiu@hotmail.com";
            newMailPass = "E137188013EC0A823E8A71BC9FEB1B850E4A";
            break;
  
          case 'software':
            newAgentMail = "helpdesksoftwaregiu@hotmail.com";
            newMailPass = "9C1D604C2DE2A931A0A9C092D8621B68770A";
            break;
  
          case 'network':
            newAgentMail = "helpdiskgiu@gmail.com";
            newMailPass = "7A93E9F2F134AE077C4B6BC504344C6F2A19";
            break;
  
          default:
            console.log("Must enter a category");
            return; // Handle this case according to your requirements
        }
  
        const newTransporter = nodemailer.createTransport({
          host: 'smtp.elasticemail.com',
          secure: true,
          port: 465,
          auth: {
            user: newAgentMail,
            pass: newMailPass,
          },
        });
  
        const newMessage = {
          from: 'helpdiskgiu@gmail.com',
          to: recipientMail,
          subject: subject,
          text: 'Your ticket is being viewed by an agent',
        };
  
        newTransporter.sendMail(newMessage, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Email sent:', info.messageId);
          }
        });
      } else if ((Priority === 'low' || Priority === 'medium') && agentTicketCount >= 5){
        
        let newAgentID;
        let Agent;
        let ACategory;
        switch (Priority.toLowerCase()) {
        
        ////////
          case 'low':
            switch (Category) {
              case 'software':
                result = await TicketsModel.findOneAndUpdate(
                  { Status: 'open' },
                  {},
                  { sort: { networkCount: -1 }, projection: 'networkCount', new: true }
                );
                
                Agent = await userModel.findOne({ specialization: 'network' });
                  if (Agent) {
                    senderMail = Agent.email;
                    agentID = Agent._id;
                  }
                agentTicketCount = (result && result.networkCount) || 0;
                ACategory = "network";
                ///
                
                if(agentTicketCount < 5){               
                
                  ACategory = "network";
                  
                }else{
                
                  result = await TicketsModel.findOneAndUpdate(
                    { Status: 'open' },
                    {},
                    { sort: { hardwareCount: -1 }, projection: 'hardwareCount', new: true }
                  );
                  Agent = await userModel.findOne({ specialization: 'hardware' });
                    if (Agent) {
                      senderMail = Agent.email;
                      agentID = Agent._id;
                    }
                    agentTicketCount = (result && result.hardwareCount) + 1 || 0;

                  ACategory = "hardware";
                }
                
                //
                break;
              case 'hardware':
                result = await TicketsModel.findOneAndUpdate(
                  { Status: 'open' },
                  {},
                  { sort: { softwareCount: -1 }, projection: 'softwareCount', new: true }
                );
                Agent = await userModel.findOne({ specialization: 'software' });
                  if (Agent) {
                    senderMail = Agent.email;
                    agentID = Agent._id;
                  }
                agentTicketCount = (result && result.softwareCount) || 0;
                ACategory = "software";
                ///
                
                if(agentTicketCount < 5){               
                
                  ACategory = "software";
                  
                }else{
                
                  result = await TicketsModel.findOneAndUpdate(
                    { Status: 'open' },
                    {},
                    { sort: { network: -1 }, projection: 'networkCount', new: true }
                  );
                  Agent = await userModel.findOne({ specialization: 'network' });
                    if (Agent) {
                      senderMail = Agent.email;
                      agentID = Agent._id;
                    }
                    agentTicketCount = (result && result.networkCount)  + 1 || 0;

                  ACategory = "network";
                }
                
                //
                break;
              case 'network':
                result = await TicketsModel.findOneAndUpdate(
                  { Status: 'open' },
                  {},
                  { sort: { hardwareCount: -1 }, projection: 'hardwareCount', new: true }
                );
                Agent = await userModel.findOne({ specialization: 'hardware' });
                if (Agent) {
                  senderMail = Agent.email;
                  agentID = Agent._id;
                }
                agentTicketCount = (result && result.hardwareCount)  || 0;
                ACategory = "hardware";
                ///
                
                if(agentTicketCount < 5){               
                
                  ACategory = "hardware";
                  
                }else{
                
                  result = await TicketsModel.findOneAndUpdate(
                    { Status: 'open' },
                    {},
                    { sort: { softwareCount: -1 }, projection: 'softwareCount', new: true }
                  );
                  Agent = await userModel.findOne({ specialization: 'software' });
                    if (Agent) {
                      senderMail = Agent.email;
                      agentID = Agent._id;
                    }
                    agentTicketCount = (result && result.softwareCount)  + 1 || 0;

                  ACategory = "software";
                }
                
                //
                break;
              default:
                return res.status(400).json({ message: "Must enter a valid category" });
            }
            switch (Category) {
              case 'hardware':
                newAgentID = await findAvailableAgent('software');
                break;
        
              case 'software':
                newAgentID = await findAvailableAgent('network');
                break;
        
              case 'network':
                newAgentID = await findAvailableAgent('hardware');
                break;
        
              default:
                console.log("Must enter a valid category");
                return res.status(400).json({ message: "Must enter a valid category" });
            }
            break;

        /////////////
          case 'medium':
            switch (Category) {
              case 'software':
                
                result = await TicketsModel.findOneAndUpdate(
                  { Status: 'open' },
                  {},
                  { sort: { hardwareCount: -1 }, projection: 'hardwareCount', new: true }
                );
                Agent = await userModel.findOne({ specialization: 'hardware' });
                  if (Agent) {
                    senderMail = Agent.email;
                    agentID = Agent._id;
                  }

                agentTicketCount = (result && result.hardwareCount)  || 0;
                
                if(agentTicketCount < 5){               
                
                  ACategory = "hardware";
                  
                }else{
                
                  result = await TicketsModel.findOneAndUpdate(
                    { Status: 'open' },
                    {},
                    { sort: { networkCount: -1 }, projection: 'networkCount', new: true }
                  );
                  Agent = await userModel.findOne({ specialization: 'network' });
                    if (Agent) {
                      senderMail = Agent.email;
                      agentID = Agent._id;
                    }
                    console.log("agenttttt",Agent);
                    agentTicketCount = (result && result.hardwareCount)  + 1 || 0;
                  ACategory = "network";
                }


                break;
              case 'hardware':
              
                result = await TicketsModel.findOneAndUpdate(
                  { Status: 'open' },
                  {},
                  { sort: { networkCount: -1 }, projection: 'networkCount', new: true }
                );
                Agent = await userModel.findOne({ specialization: 'network' });
                  if (Agent) {
                    senderMail = Agent.email;
                    agentID = Agent._id;
                  }
                                
                agentTicketCount = (result && result.networkCount)  || 0;
                
                if(agentTicketCount < 5){            
                  ACategory = "network";
                }else{
                  
                  result = await TicketsModel.findOneAndUpdate(
                    { Status: 'open' },
                    {},
                    { sort: { softwareCount: -1 }, projection: 'softwareCount', new: true }
                  );
                  Agent = await userModel.findOne({ specialization: 'software' });
                    if (Agent) {
                      senderMail = Agent.email;
                      agentID = Agent._id;
                    }
                    console.log("result afterrrrrrr",result.softwareCount);

                  agentTicketCount = (result && result.softwareCount)  || 0;
                  console.log("agentTicketCountinside: ", agentTicketCount);
                  ACategory = "software";
                }

                break;
              case 'network':
                result = await TicketsModel.findOneAndUpdate(
                  { Status: 'open' },
                  {},
                  { sort: { softwareCount: -1 }, projection: 'softwareCount', new: true }
                );
                Agent = await userModel.findOne({ specialization: 'software' });
                  if (Agent) {
                    senderMail = Agent.email;
                    agentID = Agent._id;
                  }
                
                agentTicketCount = (result && result.softwareCount)  || 0;
                if(agentTicketCount < 5){               
                  ACategory = "software";
                }else {
                  ACategory = "hardware"
                  
                
                  result = await TicketsModel.findOneAndUpdate(
                    { Status: 'open' },
                    {},
                    { sort: { hardwareCount: -1 }, projection: 'hardwareCount', new: true }
                  );
                  Agent = await userModel.findOne({ specialization: 'hardware' });
                    if (Agent) {
                      senderMail = Agent.email;
                      agentID = Agent._id;
                    }
                    agentTicketCount = (result && result.hardwareCount)  || 0;

                  ACategory = "hardware";
                }

                break;
              default:
                return res.status(400).json({ message: "Must enter a valid category" });
            }
            switch (Category) {
              case 'hardware':
                newAgentID = await findAvailableAgent('network');
                break;
        
              case 'software':
                newAgentID = await findAvailableAgent('hardware');
                break;
        
              case 'network':
                newAgentID = await findAvailableAgent('software');
                break;
        
              default:
                console.log("Must enter a valid category");
                return res.status(400).json({ message: "Must enter a valid category" });
            }
            break;
          default:
            console.log("Must enter a valid priority");
            return res.status(400).json({ message: "Must enter a valid priority" });
        }
        // Assign the new ticket to the found agent
        const newTicket = new TicketsModel({
          senderMail,
          userID: req.user._id,
          Description,
          AssignedAgentEmail: senderMail,
          recipientMail: recipientMail,
          Status: "open",
          AssignedAgentID: newAgentID,
          Category,
          subCategory,
          Priority,
          [`${ACategory}Count`]: agentTicketCount + 1,
          Queue: 0, // Not in the queue
        });
        // Save the ticket to the database
        await newTicket.save();
  
        // Retrieve automated workflows based on subCategory
        const automatedWorkflows = await AutomatedWorkflow.find({ subIssue: subCategory });
  
        // Send response with ticket and automated workflows
        res.status(201).json({ message: "Ticket created successfully", ticket: newTicket, automatedWorkflows });
  
        // Send notification email
        const subject = `Your ticket has been opened`;
        let newAgentMail = null;
        let newMailPass = null;
  
        switch (Category) {
          case 'hardware':
            newAgentMail = "helpdeskgiu@hotmail.com";
            newMailPass = "E137188013EC0A823E8A71BC9FEB1B850E4A";
            break;
  
          case 'software':
            newAgentMail = "helpdesksoftwaregiu@hotmail.com";
            newMailPass = "9C1D604C2DE2A931A0A9C092D8621B68770A";
            break;
  
          case 'network':
            newAgentMail = "helpdiskgiu@gmail.com";
            newMailPass = "7A93E9F2F134AE077C4B6BC504344C6F2A19";
            break;
  
          default:
            console.log("Must enter a category");
            return; // Handle this case according to your requirements
        }
  
        const newTransporter = nodemailer.createTransport({
          host: 'smtp.elasticemail.com',
          secure: true,
          port: 465,
          auth: {
            user: newAgentMail,
            pass: newMailPass,
          },
        });
  
        const newMessage = {
          from: 'helpdiskgiu@gmail.com',
          to: recipientMail,
          subject: subject,
          text: 'Your ticket is being viewed by an agent',
        };
  
        newTransporter.sendMail(newMessage, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Email sent:', info.messageId);
          }
        });
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

    refreshQueues: async (req, res) => {
      try {
        // Assuming the ticketId is received as a parameter or request body
        const ticketId = req.params.id;
        // Find the closed ticket
        const closedTicket = await TicketsModel.findById(ticketId);

        if (!closedTicket || closedTicket.Status !== 'Closed') {
          return res.status(404).json({ message: "Invalid or non-existent closed ticket" });
        }
    
        // Extract category and queue value from the closed ticket
        const category = closedTicket.Category;
        const closedQueueValue = closedTicket[`${category}Queue`];
    
        // Find the next ticket with the smallest queue value in the same category
        const nextTicket = await TicketsModel.findOne({
          Category: category,
          Status: 'pending',
        }).sort({ [`${category}Queue`]: 1 });

        if (nextTicket) {

          // Find the ticket with the largest count value and matching category that is open
          const largestOpenTicket = await TicketsModel.findOne({
            Category: category,
            Status: 'open',
          }).sort({ [`${category}Count`]: -1 });
          console.log("largest: ", largestOpenTicket);
          let largestOpenTicketCount;

          if (largestOpenTicket) {
            // Increment the category count of the ticket with the largest count value
            largestOpenTicketCount = largestOpenTicket[`${category}Count`];
            await TicketsModel.findByIdAndUpdate(
              nextTicket._id,
              { [`${category}Count`]: largestOpenTicketCount + 1 },
              { new: true }
            );
          }
          
          // Update its status to 'open'
          nextTicket.Status = 'open';
          await nextTicket.save();
    
        }
    
        return res.status(200).json({ message: "Queues refreshed successfully" });
      } catch (error) {
        console.error("Error refreshing queues:", error);
        return res.status(500).json({ message: "Server error" });
      }
    },
    
  updateTicket: async (req, res) => {
    try {
      const ticketId = req.params.id;
      const { Status, AssignedAgentID } = req.body;
  
      // Find the ticket by ID
      const ticket = await TicketsModel.findById(ticketId);
  
      // Check if the ticket exists
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
  
      // Only support agents can update tickets
      if (req.user.role !== 'agent') {
        return res.status(403).json({ message: "Permission denied" });
      }
  
      // Update ticket details
      ticket.Status = Status;
      ticket.Resolution = Resolution;
      ticket.AssignedAgentID = AssignedAgentID;
  
      await ticket.save();
  
      const recipientMail = ticket.recipientMail;
      const subject = `Ticket ${ticketId} Updated`;
      let agentMail=null;
      let mailPass=null;
      Category = ticket.Category;
      
      switch (Category) {
        case 'hardware':
          agentMail = "helpdeskgiu@hotmail.com";
          mailPass= "E137188013EC0A823E8A71BC9FEB1B850E4A";
          break;

        case 'software':
          agentMail = "helpdesksoftwaregiu@hotmail.com";
          mailPass= "9C1D604C2DE2A931A0A9C092D8621B68770A";

          break;

        case 'network':
          agentMail = "helpdiskgiu@gmail.com";
          mailPass= "7A93E9F2F134AE077C4B6BC504344C6F2A19";
          break;

        default:
          console.log("Must enter a category");
          senderMail = null;
          agentID = null;
      }
      
      const transporter = nodemailer.createTransport({
        host: 'smtp.elasticemail.com',
        secure: true,
        port: 465,
        auth: {
          user: agentMail,
          pass: mailPass,
        },
      });
      const message = {
        from: 'helpdiskgiu@gmail.com',
        to: recipientMail,
        subject: subject, 
        text: 'login to view your ticket',
      };
      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.messageId);
        }
      });
      
      res.status(200).json({ message: "Ticket updated successfully", ticket });
    } catch (error) {
      console.error("Error updating ticket:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  
   closeTicket: async (req, res) => {
    try {
      const ticketId = req.params.id;
  
      // Find the ticket by ID
      const ticket = await TicketsModel.findById(ticketId);
      // Check if the ticket exists
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
  
      if (ticket.Status === 'Closed') {
        return res.status(400).json({ message: "Ticket is already closed" });
      }


      const Category = ticket.Category;

      const currentCount = ticket[`${Category}Count`];
      // Decrement counts for all open tickets with a count greater than the one being closed
      try {
        const result = await TicketsModel.updateMany(
          { Status: 'open', [`${Category}Count`]: { $gt: currentCount } },
          { $inc: { [`${Category}Count`]: -1 } }
        );      
      
      } catch (error) {
        console.error("nothing ", error);
      }
      // Mark the ticket as closed
      ticket.Status = 'Closed';
      ticket.Resolution = 'Ticket closed by support agent';
  
      await ticket.save();
  
      await ticketsController.refreshQueues(req, res);
  
      //return res.status(200).json({ message: "Ticket closed successfully", ticket });
    } catch (error) {
      console.error("Error closing ticket:", error);
      return res.status(500).json({ message: "Server error" });
    }
  },

  getAllTickets: async (req, res) => {
    try {
      // Check if the user is an agent
      if (req.user.role !== 'agent') {
        return res.status(403).json({ message: "Permission denied" });
      }

      // Fetch all tickets
      const tickets = await TicketsModel.find();

      res.status(200).json({ tickets });
    } catch (error) {
      console.error("Error getting all tickets:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  getTicketById: async (req, res) => {
    try {
      const ticketId = req.params.id;

      // Check if the user is an agent
      if (req.user.role !== 'agent') {
        return res.status(403).json({ message: "Permission denied" });
      }

      // Find the ticket by ID
      const ticket = await TicketsModel.findById(ticketId);

      // Check if the ticket exists
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }

      res.status(200).json({ ticket });
    } catch (error) {
      console.error("Error getting ticket by ID:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  
  updateAssignedAgentPerformance: async (req, res) => {
    try {
      const ticketId = req.params.id;
      const { AssignedAgentPerformance } = req.body;
  
      // Find the ticket by ID
      const ticket = await TicketsModel.findById(ticketId);
  
      // Check if the ticket exists
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
  
      // Only the assigned agent can update AssignedAgentPerformance
      if (req.user.role !== 'user') {
        return res.status(403).json({ message: "Permission denied" });
      }
  
      // Only update if the ticket status is closed
      if (ticket.Status !== 'Closed') {
        return res.status(400).json({ message: "Can only update AssignedAgentPerformance for closed tickets" });
      }
  
      // Update AssignedAgentPerformance
      ticket.AssignedAgentPerformance = AssignedAgentPerformance;
  
      await ticket.save();
  
      res.status(200).json({ message: "AssignedAgentPerformance updated successfully", ticket });
    } catch (error) {
      console.error("Error updating AssignedAgentPerformance:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  
  getTicketsByAgent: async (req, res) => {
    try {
        // Get the agent ID from the token
        console.log('req.user:', req.user);
        const agentId = req.user && req.user.userId; // Assuming userId is the property storing agent ID
        console.log('Agent ID:', agentId);

        // Find all tickets assigned to the specific agent that are not closed
        const tickets = await TicketsModel.find({ AssignedAgentID: agentId, Status:'open' });

        res.status(200).json({ tickets });

    } catch (error) {
        console.error("Error getting tickets by agent:", error);
        res.status(500).json({ message: "Server error" });
    }
},

  getTicketsByUser: async (req, res) => {
    try {
      // Get the user ID from the token
      const userId = req.user && req.user.userId; // Assuming userId is the property storing user ID
      
      // Fetch the user from the userModel using the user ID
      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Use the retrieved email to find tickets
      const userEmail = user.email;
      console.log("userEmail", userEmail);
  
      // Find all tickets where senderMail is equal to the user's email
      const tickets = await TicketsModel.find({ recipientMail: userEmail, Status: 'Closed',AssignedAgentPerformance: { $exists: false }});
  
      res.status(200).json({ tickets });
    } catch (error) {
      console.error("Error getting tickets by user:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  getTicketsByCategory: async (req, res) => {
    try {
      // Get the Category from the URL params
      const { Category } = req.params;
  
      // Find all tickets where Category is equal to the specified Category
      // and AssignedAgentPerformance is not null
      const tickets = await TicketsModel.find({
        Category,
        Status: 'Closed',
        AssignedAgentPerformance: { $exists: true, $ne: null },
      });
  
      res.status(200).json({ tickets });
    } catch (error) {
      console.error("Error getting tickets by category and assigned agent performance:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  generateTicketsChartData: async (req, res) => {
    try {
      // Group tickets by Category and subCategory and count the number of tickets for each group
      const chartData = await TicketsModel.aggregate([
        {
          $group: {
            _id: {
              category: { $ifNull: ['$Category', 'Unknown'] }, // Handle null values gracefully
              subCategory: { $ifNull: ['$subCategory', 'Unknown'] },
            },
            totalCount: { $sum: 1 },
          },
        },
      ]);

      res.json(chartData);
    } catch (error) {
      console.error("Error generating tickets chart data:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  


  
};

module.exports = ticketsController;

