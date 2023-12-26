const express = require("express");
const router = express.Router();
const livechatController = require("../controller/livechatController");
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");
//const encryption = require('../Middleware/encryptionMiddleware.js');
//const decryptMessage = require('../Middleware/decryptMiddleware.js');





// Get all the questions 
router.get("/:id",  livechatController.getAllChat);
router.get("/user/:id", authorizationMiddleware(['user']), livechatController.getLatestAnswer);
router.get("/agent/:id", authorizationMiddleware(['user']), livechatController.getLatestQuestion);
router.get("/", authorizationMiddleware(['agent']), livechatController.getChats);


//create a report 
router.put("/:id", authorizationMiddleware(['agent']),livechatController.updateAnswer);

//create a report 
router.post("/", authorizationMiddleware(['user']),livechatController.createQuestion);

router.post("/:id", authorizationMiddleware(['user']),livechatController.updateQuestion);


module.exports = router;