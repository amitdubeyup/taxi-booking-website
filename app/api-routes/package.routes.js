const express = require('express');
const router = express.Router();
const PackageController = require('../controllers/package');

router.get('/update-field', PackageController.updateField);
router.post('/add', PackageController.addPackage);
router.post('/set', PackageController.setPackage);
router.post('/fetch-one', PackageController.fetchOnePackage);
router.post('/fetch-custom', PackageController.fetchCustomPackage);
router.post('/fetch-all', PackageController.fetchAllPackage);
router.post('/fetch-total', PackageController.fetchTotalPackage);
router.post('/update', PackageController.updatePackage);
router.post('/delete', PackageController.deletePackage);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;