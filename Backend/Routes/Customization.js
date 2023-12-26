const express = require("express");
const router = express.Router();
const customizationController = require("../controller/customizationController");
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");




router.put("/:id", authorizationMiddleware(['admin']),customizationController.updateCustomization);


module.exports = router;
