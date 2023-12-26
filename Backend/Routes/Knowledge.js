const express = require("express");
const router = express.Router();
const KnowledgeController = require('../controller/KnowledgeController');
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');


// Get all the questions 
router.get("/",  KnowledgeController.getAllQuestions);

//create kowledge
router.post("/", authorizationMiddleware(['admin']),KnowledgeController.createknowledge);


module.exports = router;