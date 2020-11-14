const express = require('express');
const router = express.Router();
const HotelBookingController = require('../controllers/hotel-booking');
const authGuard = require('../auth/auth');

router.get('/update-field', HotelBookingController.updateField);
router.post('/add', HotelBookingController.addHotelBooking);
router.post('/set', HotelBookingController.setHotelBooking);
router.post('/fetch-one', HotelBookingController.fetchOneHotelBooking);
router.post('/fetch-custom', HotelBookingController.fetchCustomHotelBooking);
router.post('/fetch-active-hotel-booking', HotelBookingController.fetchActiveHotelBooking);
router.post('/fetch-all', HotelBookingController.fetchAllHotelBooking);
router.post('/fetch-total', HotelBookingController.fetchTotalHotelBooking);
router.post('/update', HotelBookingController.updateHotelBooking);
router.post('/update-custom', HotelBookingController.updateCustom);
router.post('/delete', HotelBookingController.deleteHotelBooking);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;