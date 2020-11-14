const express = require('express');
const router = express.Router();
const DemoController = require('../controllers/demo');

router.get('/update-field', DemoController.updateField);
router.post('/add', DemoController.addDemo);
router.post('/set', DemoController.setDemo);
router.post('/fetch-one', DemoController.fetchOneDemo);
router.post('/fetch-custom', DemoController.fetchCustomDemo);
router.post('/fetch-all', DemoController.fetchAllDemo);
router.post('/update', DemoController.updateDemo);
router.post('/delete', DemoController.deleteDemo);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;