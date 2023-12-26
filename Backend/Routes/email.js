
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');
// Import necessary modules
const express = require('express');
const emailController = require('../controller/emailController');
// Create an Express router
const router = express.Router();
// Define the route for sending emails
router.post('/send-email/', emailController.sendEmail);
// Export the router
module.exports = router;