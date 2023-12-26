const express = require('express');
const router = express.Router();
const otpController = require('../controller/otpController');

router.post('/send-otp/:email', otpController.sendOTP);
router.post('/verify/:email/:code', otpController.verifyOTP);

module.exports = router;
