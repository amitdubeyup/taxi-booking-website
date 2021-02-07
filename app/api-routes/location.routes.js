const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location');
const authGuard = require('../auth/auth');

router.get('/get-ip-location/:ip?', locationController.getIpLocation);
router.get('/get-latlng-details/:latlng?', locationController.getLocationDetails);
router.get('/get-lat-lng-from-postal-code/:postal_code', locationController.getLatLongFromPostalCode);
router.post('/calculate-distance', locationController.getDistanceBetweenLatLng);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;