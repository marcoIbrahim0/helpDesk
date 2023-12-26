const express = require("express");
const router = express.Router();
const ticketsController = require("../controller/ticketsController");
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

// Create a new ticket
router.post("/", authorizationMiddleware(['user']), ticketsController.createTicket);

// Update a ticket

router.get("/user-ticket", authorizationMiddleware(['user']), ticketsController.getTicketsByUser);


// Close a ticket



// Get all tickets (only accessible by agents)
router.get("/", authorizationMiddleware(['agent','manager']), ticketsController.getAllTickets);

router.put("/close/:id", authorizationMiddleware(['agent']), ticketsController.closeTicket);
// Get a specific ticket by ID (only accessible by agents)


router.put("/updateAssignedAgentPerformance/:id", authorizationMiddleware(['user']), ticketsController.updateAssignedAgentPerformance);

router.get("/agent-tickets", authorizationMiddleware(['agent']), ticketsController.getTicketsByAgent);

router.get("/getByCategory/:Category", authorizationMiddleware(['manager']), ticketsController.getTicketsByCategory);

router.get("/ticketsAnalysis", authorizationMiddleware(['manager']), ticketsController.generateTicketsChartData);








// Add other ticket-related routes as needed

module.exports = router;