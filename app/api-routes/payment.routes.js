const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/payment');


router.get('/update-field', PaymentController.updateField);
router.post('/add', PaymentController.addPayment);
router.post('/set', PaymentController.setPayment);
router.post('/fetch-one', PaymentController.fetchOnePayment);
router.post('/fetch-custom', PaymentController.fetchCustomPayment);
router.post('/fetch-all', PaymentController.fetchAllPayment);
router.post('/fetch-total', PaymentController.fetchTotalPayment);
router.post('/update', PaymentController.updatePayment);
router.post('/delete', PaymentController.deletePayment);
router.post('/create-order', PaymentController.createOrder);
router.post('/fetch-order', PaymentController.fetchOrder);
router.post('/fetch-order-payment', PaymentController.fetchOrderPayment);
router.post('/fetch-all-order', PaymentController.fetchAllOrder);
router.post('/capture-payment', PaymentController.capturePayment);
router.post('/fetch-payment', PaymentController.fetchPaymentByID);
router.post('/fetch-all-payment', PaymentController.fetchAllPayments);
router.post('/fetch-bank-transfer-details', PaymentController.fetchBankTransferPaymentDetails);
router.post('/create-refund', PaymentController.createRefund);
router.post('/fetch-refund', PaymentController.fetchRefund);
router.post('/fetch-all-refund', PaymentController.fetchAllRefund);
router.post('/create-customer', PaymentController.createCustomer);
router.post('/edit-customer', PaymentController.editCustomer);
router.post('/fetch-customer', PaymentController.fetchCustomer);
router.post('/fetch-all-customer', PaymentController.fetchAllCustomer);
router.post('/fetch-customer-token', PaymentController.fetchCustomerToken);
router.post('/delete-customer-token', PaymentController.deleteCustomerToken);
router.post('/create-plan', PaymentController.createPlan);
router.post('/fetch-plan', PaymentController.fetchPlan);
router.post('/fetch-all-plan', PaymentController.fetchAllPlan);
router.post('/create-subscription', PaymentController.createSubscription);
router.post('/fetch-subscription', PaymentController.fetchSubscription);
router.post('/fetch-all-subscription', PaymentController.fetchAllSubscription);
router.post('/cancel-subscription', PaymentController.cancelSubscription);
router.post('/create-subscription-addon', PaymentController.createSubscriptionAddon);
router.post('/fetch-subscription-addon', PaymentController.fetchSubscriptionAddon);
router.post('/delete-subscription-addon', PaymentController.deleteSubscriptionAddon);
router.post('/create-payment-link', PaymentController.createPaymentLink);
router.post('/edit-payment-link', PaymentController.editPaymentLink);
router.post('/issue-payment-link', PaymentController.issuePaymentLink);
router.post('/fetch-payment-link', PaymentController.fetchPaymentLinkByID);
router.post('/fetch-all-payment-link', PaymentController.fetchAllPaymentLink);
router.post('/send-notification', PaymentController.sendNotification);
router.post('/delete-payment-link', PaymentController.deletePaymentLink);
router.post('/create-invoice', PaymentController.createInvoice);
router.post('/edit-invoice', PaymentController.editInvoice);
router.post('/issue-invoice', PaymentController.issueInvoice);
router.post('/fetch-invoice', PaymentController.fetchInvoiceByID);
router.post('/fetch-all-invoice', PaymentController.fetchAllInvoice);
router.post('/cancel-invoice', PaymentController.cancelInvoice);
router.post('/send-invoice-notification', PaymentController.sendInvoiceNotification);
router.post('/delete-invoice', PaymentController.deleteInvoice);
router.post('/create-virtual-account', PaymentController.createVirtualAccount);
router.post('/fetch-virtual-account', PaymentController.fetchVirtualAccount);
router.post('/fetch-all-virtual-account', PaymentController.fetchAllVirtualAccount);
router.post('/fetch-virtual-account-payment', PaymentController.fetchVirtualAccountPayment);
router.post('/close-virtual-account', PaymentController.closeVirtualAccount);
router.post('/create-direct-transfer', PaymentController.createDirectTransfer);
router.post('/create-payment-transfer', PaymentController.createPaymentTransfer);
router.post('/edit-payment-transfer', PaymentController.editPaymentTransfer);
router.post('/fetch-payment-transfer', PaymentController.fetchPaymentTransfer);
router.post('/fetch-all-payment-transfer', PaymentController.fetchAllPaymentTransfer);
router.post('/reverse-payment-transfer', PaymentController.reversePaymentTransfer);
router.post('/validate-signature', PaymentController.validateSignature);
router.post('/validate-webhook-signature', PaymentController.validateWebhookSignature);


router.post('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});
    

module.exports = router;