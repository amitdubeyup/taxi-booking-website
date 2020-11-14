const express = require('express');
const router = express.Router();
const PackageBookingController = require('../controllers/package-booking');
const authGuard = require('../auth/auth');

router.get('/update-field', PackageBookingController.updateField);
router.post('/add', PackageBookingController.addPackageBooking);
router.post('/set', PackageBookingController.setPackageBooking);
router.post('/fetch-one', PackageBookingController.fetchOnePackageBooking);
router.post('/fetch-custom', PackageBookingController.fetchCustomPackageBooking);
router.post('/fetch-active-package-booking', PackageBookingController.fetchActivePackageBooking);
router.post('/fetch-all', PackageBookingController.fetchAllPackageBooking);
router.post('/fetch-total', PackageBookingController.fetchTotalPackageBooking);
router.post('/update', PackageBookingController.updatePackageBooking);
router.post('/update-custom', PackageBookingController.updateCustom);
router.post('/delete', PackageBookingController.deletePackageBooking);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;