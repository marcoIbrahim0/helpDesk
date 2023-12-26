const express = require("express");
const router = express.Router();
const communicationController = require("../controller/communicationController");
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

module.exports = router;