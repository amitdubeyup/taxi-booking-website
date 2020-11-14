const express = require('express');
const router = express.Router();
const VehicleController = require('../controllers/vehicle');

router.get('/update-field', VehicleController.updateField);
router.post('/add', VehicleController.addVehicle);
router.post('/set', VehicleController.setVehicle);
router.post('/fetch-one', VehicleController.fetchOneVehicle);
router.post('/fetch-custom', VehicleController.fetchCustomVehicle);
router.post('/fetch-all', VehicleController.fetchAllVehicle);
router.post('/fetch-total', VehicleController.fetchTotalVehicle);
router.post('/update', VehicleController.updateVehicle);
router.post('/delete', VehicleController.deleteVehicle);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;