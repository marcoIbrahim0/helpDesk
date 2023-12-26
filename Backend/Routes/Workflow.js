const express = require("express");
const router = express.Router();
const workflowController = require("../controller/workflowController");
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

router.post("/:ticketId", authorizationMiddleware(['agent']), workflowController.createWorkflow);

router.post("/", authorizationMiddleware(['admin']), workflowController.createAutomatedWorkflow);

router.get("/automatedWorkflow/:issue/:subIssue", authorizationMiddleware(['user']), workflowController.getAutomatedWorkflow);

router.get("/:ticketId", authorizationMiddleware(['user']), workflowController.getWorkflowByTicketId);


module.exports = router;