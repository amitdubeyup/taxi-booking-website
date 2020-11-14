const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contact');

router.get('/update-field', ContactController.updateField);
router.post('/add', ContactController.addContact);
router.post('/set', ContactController.setContact);
router.post('/fetch-one', ContactController.fetchOneContact);
router.post('/fetch-custom', ContactController.fetchCustomContact);
router.post('/fetch-all', ContactController.fetchAllContact);
router.post('/update', ContactController.updateContact);
router.post('/delete', ContactController.deleteContact);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;