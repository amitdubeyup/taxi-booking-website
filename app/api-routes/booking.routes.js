const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/booking');
const authGuard = require('../auth/auth');

router.get('/update-field', BookingController.updateField);
router.post('/add', BookingController.addBooking);
router.post('/set', BookingController.setBooking);
router.post('/fetch-one', BookingController.fetchOneBooking);
router.post('/fetch-custom', BookingController.fetchCustomBooking);
router.post('/fetch-active-booking', BookingController.fetchActiveBooking);
router.post('/fetch-all', BookingController.fetchAllBooking);
router.post('/fetch-total', BookingController.fetchTotalBooking);
router.post('/update', BookingController.updateBooking);
router.post('/update-custom', BookingController.updateCustom);
router.post('/delete', BookingController.deleteBooking);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;