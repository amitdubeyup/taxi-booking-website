const express = require('express');
const router = express.Router();
const OfferController = require('../controllers/offer');

router.get('/update-field', OfferController.updateField);
router.post('/add', OfferController.addOffer);
router.post('/set', OfferController.setOffer);
router.post('/fetch-one', OfferController.fetchOneOffer);
router.post('/fetch-total', OfferController.fetchTotalOffer);
router.post('/update', OfferController.updateOffer);
router.post('/delete', OfferController.deleteOffer);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;