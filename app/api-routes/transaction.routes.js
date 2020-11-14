const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transaction');

router.get('/update-field', TransactionController.updateField);
router.post('/add', TransactionController.addTransaction);
router.post('/set', TransactionController.setTransaction);
router.post('/fetch-one', TransactionController.fetchOneTransaction);
router.post('/fetch-custom', TransactionController.fetchCustomTransaction);
router.post('/fetch-all', TransactionController.fetchAllTransaction);
router.post('/fetch-total', TransactionController.fetchTotalTransaction);
router.post('/update', TransactionController.updateTransaction);
router.post('/delete', TransactionController.deleteTransaction);
router.post('/initiate', TransactionController.initiateTransaction);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;