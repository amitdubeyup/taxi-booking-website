const express = require('express');
const router = express.Router();
const RouteFareController = require('../controllers/route-fare');

router.get('/update-field', RouteFareController.updateField);
router.post('/add', RouteFareController.addRouteFare);
router.post('/set', RouteFareController.setRouteFare);
router.post('/fetch-one', RouteFareController.fetchOneRouteFare);
router.post('/fetch-custom', RouteFareController.fetchCustomRouteFare);
router.post('/fetch-all', RouteFareController.fetchAllRouteFare);
router.get('/fetch-total', RouteFareController.fetchTotalRouteFare);
router.post('/update', RouteFareController.updateRouteFare);
router.post('/delete', RouteFareController.deleteRouteFare);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;