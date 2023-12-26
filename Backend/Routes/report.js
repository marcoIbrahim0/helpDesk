const express = require("express");
const router = express.Router();
const reportController = require("../controller/reportController");
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");



//create a report 
router.post("/", authorizationMiddleware(['manager']),reportController.createReport);

//get all reports
router.get("/",authorizationMiddleware(['agent']), reportController.getAllReports);


module.exports = router;