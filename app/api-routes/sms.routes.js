const express = require('express');
const router = express.Router();
const SMSController = require('../controllers/sms');

router.post('/send-sms', SMSController.sendSMS);
router.post('/send-custom', SMSController.sendCustomSMS);
router.post('/get-balance', SMSController.getBalance);
router.post('/send-pinnacle-sms', SMSController.sendPinnacleSMS);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;