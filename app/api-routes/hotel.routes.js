const express = require('express');
const router = express.Router();
const HotelController = require('../controllers/hotel');

router.get('/update-field', HotelController.updateField);
router.post('/add', HotelController.addHotel);
router.post('/set', HotelController.setHotel);
router.post('/fetch-one', HotelController.fetchOneHotel);
router.post('/fetch-custom', HotelController.fetchCustomHotel);
router.post('/fetch-all', HotelController.fetchAllHotel);
router.post('/fetch-total', HotelController.fetchTotalHotel);
router.post('/update', HotelController.updateHotel);
router.post('/delete', HotelController.deleteHotel);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;