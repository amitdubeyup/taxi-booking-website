const express = require('express');
const router = express.Router();
const CarDetailsController = require('../controllers/car-details');

router.get('/update-field', CarDetailsController.updateField);
router.post('/add', CarDetailsController.addCarDetails);
router.post('/set', CarDetailsController.setCarDetails);
router.post('/fetch-one', CarDetailsController.fetchOneCarDetails);
router.post('/fetch-custom', CarDetailsController.fetchCustomCarDetails);
router.post('/fetch-all', CarDetailsController.fetchAllCarDetails);
router.post('/fetch-total', CarDetailsController.fetchTotalCarDetails);
router.post('/update', CarDetailsController.updateCarDetails);
router.post('/delete', CarDetailsController.deleteCarDetails);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;