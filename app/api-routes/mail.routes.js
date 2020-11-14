const express = require('express');
const router = express.Router();
const MailController = require('../controllers/mail');
const authGuard = require('../auth/auth');

router.post('/send-mail', authGuard, MailController.sendMail);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;