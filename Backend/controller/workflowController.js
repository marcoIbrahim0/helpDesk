const WorkflowModel = require("../Models/workflow");
const AutomatedWorkflow = require('../Models/automatedWorkflow');
const TicketsModel = require("../Models/ticketsModel");

const workflowController = {
  createWorkflow: async (req, res) => {
    const { Description } = req.body;
    const ticketId = req.params.ticketId;
    

    const workflow = new WorkflowModel({
      Description,
      TicketId: ticketId,
    
    });

    try {
      const newWorkflow = await workflow.save();
      return res.status(201).json(newWorkflow);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
 
  


  createAutomatedWorkflow: async (req, res) => {
    try {
      // Extract data from the request body
      const { Issue,subIssue, description } = req.body;

      // Create the automated workflow
      const automatedWorkflow = new AutomatedWorkflow({
        subIssue,
        Issue,
        description,
    
      });

      // Save the automated workflow to the database
      const newAutomatedWorkflow = await automatedWorkflow.save();

      // Respond with success message
      return res.status(201).json(newAutomatedWorkflow);
    } catch (error) {
      console.error('Error creating automated workflow:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAutomatedWorkflow: async (req, res) => {
    try {
      console.log("hiiii");
      const { issue, subIssue } = req.params;
  
      // Validate if issue and subIssue are provided
      if (!issue || !subIssue) {
        return res.status(400).json({ message: "Issue and subIssue are required in the request body" });
      }
  
      // Find automated workflow based on issue and subIssue
      const automatedWorkflow = await AutomatedWorkflow.findOne({ Issue: issue, subIssue: subIssue });
  
      if (!automatedWorkflow) {
        return res.status(404).json({ message: "Automated workflow not found for the provided issue and subIssue" });
      }
      console.log("hiiii");
      res.status(200).json({ description: automatedWorkflow.description });
    } catch (error) {
      console.log("hiiii");
      console.error("Error getting automated workflow:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

   getWorkflowByTicketId: async (req, res) => {
    try {
        // Get the ticket ID from the request parameters
        const ticketId = req.params.ticketId;

        // Check if the ticket ID is provided
        if (!ticketId) {
            return res.status(400).json({ message: "Ticket ID is required" });
        }

        // Find the workflow using the ticket ID
        const workflow = await WorkflowModel.findOne({ TicketId: ticketId });

        console.log(ticketId);

        // Check if the workflow exists
        if (!workflow) {
            return res.status(404).json({ message: "Workflow not found" });
        }

        // Return the description of the workflow
        return res.status(200).json({ description: workflow.Description });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
},
  



};
module.exports = workflowController;
