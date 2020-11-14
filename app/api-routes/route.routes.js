const express = require('express');
const router = express.Router();
const RouteController = require('../controllers/route');

router.get('/update-field', RouteController.updateField);
router.post('/add', RouteController.addRoute);
router.post('/set', RouteController.setRoute);
router.post('/fetch-one', RouteController.fetchOneRoute);
router.post('/fetch-custom', RouteController.fetchCustomRoute);
router.post('/fetch-all', RouteController.fetchAllRoute);
router.post('/fetch-total', RouteController.fetchTotalRoute);
router.post('/update', RouteController.updateRoute);
router.post('/delete', RouteController.deleteRoute);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;