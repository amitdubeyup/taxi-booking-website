const express = require('express');
const router = express.Router();
const VideoController = require('../controllers/video');

router.get('/update-field', VideoController.updateField);
router.post('/add', VideoController.addVideo);
router.post('/set', VideoController.setVideo);
router.post('/fetch-one', VideoController.fetchOneVideo);
router.post('/fetch-custom', VideoController.fetchCustomVideo);
router.post('/fetch-all', VideoController.fetchAllVideo);
router.post('/fetch-total', VideoController.fetchTotalVideo);
router.post('/update', VideoController.updateVideo);
router.post('/delete', VideoController.deleteVideo);
router.post('/login', VideoController.loginUser);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;