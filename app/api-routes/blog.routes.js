const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blog');

router.get('/update-field', BlogController.updateField);
router.post('/add', BlogController.addBlog);
router.post('/set', BlogController.setBlog);
router.post('/fetch-one', BlogController.fetchOneBlog);
router.post('/fetch-custom', BlogController.fetchCustomBlog);
router.post('/fetch-all', BlogController.fetchAllBlog);
router.post('/fetch-total', BlogController.fetchTotalBlog);
router.post('/update', BlogController.updateBlog);
router.post('/delete', BlogController.deleteBlog);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;