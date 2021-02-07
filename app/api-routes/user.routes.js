const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const authGuard = require('../auth/auth');

router.get('/update-field', UserController.updateField);
router.post('/login', UserController.loginUser);
router.post('/register', UserController.registerUser);
router.post('/verify', UserController.verifyUserAccount);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/reset-password', UserController.resetPassword);
router.post('/fetch-single', UserController.fetchSingleUser);
router.post('/fetch-all', UserController.fetchAllUser);
router.post('/fetch-custom', UserController.fetchCustomUser);
router.post('/search', UserController.searchUser);
router.post('/update', UserController.updateUser);
router.post('/remove', UserController.removeUser);
router.post('/verify-booking-user', UserController.verifyBookingUserAccount);
router.post('/verify-hotel-booking-user', UserController.verifyHotelBookingUser);
router.post('/verify-hotel-booking-code', UserController.verifyHotelBookingCode);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;