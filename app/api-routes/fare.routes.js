const express = require('express');
const router = express.Router();
const FareController = require('../controllers/fare');

router.get('/update-field', FareController.updateField);
router.post('/add', FareController.addFare);
router.post('/set', FareController.setFare);
router.post('/fetch-one', FareController.fetchOneFare);
router.post('/fetch-custom', FareController.fetchCustomFare);
router.post('/fetch-all', FareController.fetchAllFare);
router.get('/fetch-total', FareController.fetchTotalFare);
router.post('/update', FareController.updateFare);
router.post('/delete', FareController.deleteFare);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;