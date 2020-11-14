const express = require('express');
const router = express.Router();
const DigitalMarketingController = require('../controllers/digital-marketing');

router.get('/update-field', DigitalMarketingController.updateField);
router.post('/add', DigitalMarketingController.addDigitalMarketing);
router.post('/set', DigitalMarketingController.setDigitalMarketing);
router.post('/fetch-one', DigitalMarketingController.fetchOneDigitalMarketing);
router.post('/fetch-custom', DigitalMarketingController.fetchCustomDigitalMarketing);
router.post('/fetch-all', DigitalMarketingController.fetchAllDigitalMarketing);
router.get('/fetch-total', DigitalMarketingController.fetchTotalDigitalMarketing);
router.post('/update', DigitalMarketingController.updateDigitalMarketing);
router.post('/delete', DigitalMarketingController.deleteDigitalMarketing);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;