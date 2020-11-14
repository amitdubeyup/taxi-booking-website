const express = require('express');
const router = express.Router();
const PromoCodeController = require('../controllers/promo-code');

router.get('/update-field', PromoCodeController.updateField);
router.post('/add', PromoCodeController.addPromoCode);
router.post('/set', PromoCodeController.setPromoCode);
router.post('/fetch-one', PromoCodeController.fetchOnePromoCode);
router.post('/fetch-total', PromoCodeController.fetchTotalPromoCode);
router.post('/update', PromoCodeController.updatePromoCode);
router.post('/delete', PromoCodeController.deletePromoCode);
router.post('/apply', PromoCodeController.applyPromoCode);
router.post('/remove', PromoCodeController.removePromoCode);
router.get('/fetch-active', PromoCodeController.fetchActiveCode);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;