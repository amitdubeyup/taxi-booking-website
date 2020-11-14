const express = require('express');
const router = express.Router();
const PincodeController = require('../controllers/pincode');

router.post('/add-pincode', PincodeController.addPinCode);
router.get('/search-pincode/:pin_code', PincodeController.searchPinCode);

router.get('/', function(req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !'
    });
});

module.exports = router;