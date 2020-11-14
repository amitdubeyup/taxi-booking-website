const express = require('express');
const router = express.Router();
const SitemapController = require('../controllers/sitemap');

router.get('/generate', SitemapController.generateSitemap);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;