const config = require('../config');
const PaymentCollection = config.db.collection('Payment');
const PaymentModal = require('../modals/payment');
const _ = require('lodash');
const Razorpay = require('razorpay');
const instance = new Razorpay({ key_id: config.key, key_secret: config.secret });
const crypto = require("crypto");

module.exports = {
    updateField: updateField,
    addPayment: addPayment,
    setPayment: setPayment,
    fetchOnePayment: fetchOnePayment,
    fetchCustomPayment: fetchCustomPayment,
    fetchAllPayment: fetchAllPayment,
    fetchTotalPayment: fetchTotalPayment,
    updatePayment: updatePayment,
    deletePayment: deletePayment,
    createOrder: createOrder,
    fetchOrder: fetchOrder,
    fetchOrderPayment: fetchOrderPayment,
    fetchAllOrder: fetchAllOrder,
    capturePayment: capturePayment,
    fetchPaymentByID: fetchPaymentByID,
    fetchAllPayments: fetchAllPayments,
    fetchBankTransferPaymentDetails: fetchBankTransferPaymentDetails,
    createRefund: createRefund,
    fetchRefund: fetchRefund,
    fetchAllRefund: fetchAllRefund,
    createCustomer: createCustomer,
    editCustomer: editCustomer,
    fetchCustomer: fetchCustomer,
    fetchAllCustomer: fetchAllCustomer,
    fetchCustomerToken: fetchCustomerToken,
    deleteCustomerToken: deleteCustomerToken,
    createPlan: createPlan,
    fetchPlan: fetchPlan,
    fetchAllPlan: fetchAllPlan,
    createSubscription: createSubscription,
    fetchSubscription: fetchSubscription,
    fetchAllSubscription: fetchAllSubscription,
    cancelSubscription: cancelSubscription,
    createSubscriptionAddon: createSubscriptionAddon,
    fetchSubscriptionAddon: fetchSubscriptionAddon,
    deleteSubscriptionAddon: deleteSubscriptionAddon,
    createPaymentLink: createPaymentLink,
    editPaymentLink: editPaymentLink,
    issuePaymentLink: issuePaymentLink,
    fetchPaymentLinkByID: fetchPaymentLinkByID,
    fetchAllPaymentLink: fetchAllPaymentLink,
    cancelPaymentLink: cancelPaymentLink,
    sendNotification: sendNotification,
    deletePaymentLink: deletePaymentLink,
    createInvoice: createInvoice,
    editInvoice: editInvoice,
    issueInvoice: issueInvoice,
    fetchInvoiceByID: fetchInvoiceByID,
    fetchAllInvoice: fetchAllInvoice,
    cancelInvoice: cancelInvoice,
    sendInvoiceNotification: sendInvoiceNotification,
    deleteInvoice: deleteInvoice,
    createVirtualAccount: createVirtualAccount,
    fetchVirtualAccount: fetchVirtualAccount,
    fetchAllVirtualAccount: fetchAllVirtualAccount,
    fetchVirtualAccountPayment: fetchVirtualAccountPayment,
    closeVirtualAccount: closeVirtualAccount,
    createDirectTransfer: createDirectTransfer,
    createPaymentTransfer: createPaymentTransfer,
    editPaymentTransfer: editPaymentTransfer,
    fetchPaymentTransfer: fetchPaymentTransfer,
    fetchAllPaymentTransfer: fetchAllPaymentTransfer,
    reversePaymentTransfer: reversePaymentTransfer,
    validateSignature: validateSignature,
    validateWebhookSignature: validateWebhookSignature
};

function updateField(req, res) {
    PaymentCollection.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const updatedData = PaymentModal.returnUpdatedPaymentCollectionField(doc.data());
            doc.ref.set(updatedData);
        });
        res.status(200);
        return res.json({
            success: true,
            message: 'Collection field updated successfully!',
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to update collection field!',
        });
    });
}

function addPayment(req, res) {
    const params = PaymentModal.returnNewPaymentData(req.body);
    PaymentCollection.doc(params.document_id).set(params).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Data saved successfully!',
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to save data!',
            data: error
        });
    });
}

function setPayment(req, res) {
    const params = PaymentModal.returnNewPaymentData(req.body);
    if (params.document_id) {
        PaymentCollection.doc(params.document_id).set(params).then((response) => {
            res.status(200);
            return res.json({
                success: true,
                message: 'Data saved successfully!',
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to save data!',
                data: error
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to save data, document_id is required!',
        });
    }
}

function fetchOnePayment(req, res) {
    if (req.body.document_id) {
        PaymentCollection.doc(req.body.document_id).get().then((response) => {
            if (!response.exists) {
                res.status(400);
                return res.json({
                    success: false,
                    message: 'Unable to fetch data, No record found!',
                });
            } else {
                res.status(200);
                return res.json({
                    success: true,
                    message: 'Data fetched successfully!',
                    data: response.data()
                });
            }
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to fetch data!',
                data: error
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch data, document_id is required!',
        });
    }
}

function fetchCustomPayment(req, res) {
    const params = req.body;
    PaymentCollection.where(params.key, params.condition, params.value).get().then((response) => {
        if (response.empty) {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to fetch data, No matching record found!',
            });
        } else {
            const finalData = [];
            response.forEach((doc) => {
                finalData.push(doc.data());
            });
            res.status(200);
            return res.json({
                success: true,
                message: 'Data fetched successfully!',
                data: finalData
            });
        }
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch data!',
            data: error
        });
    });
}

function fetchAllPayment(req, res) {
    const limit = req.body.limit ? req.body.limit : 10;
    const order_by = req.body.order_by ? req.body.order_by : null;
    const start_index = req.body.start_index ? req.body.start_index : null;
    let Query = PaymentCollection;
    if ((order_by != null) && (start_index == null)) {
        Query = PaymentCollection.orderBy(order_by.key, order_by.value);
    }
    if ((order_by != null) && (start_index != null)) {
        Query = PaymentCollection.orderBy(order_by.key, order_by.value).startAfter(start_index);
    }
    Query.limit(limit).get().then((response) => {
        const finalData = [];
        response.forEach((doc) => {
            finalData.push(doc.data());
        });
        res.status(200);
        return res.json({
            success: true,
            message: 'Data fetched successfully!',
            data: finalData
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch data!',
            data: error
        });
    });
}

function fetchTotalPayment(req, res) {
    PaymentCollection.get().then((snapshot) => {
        const finalData = [];
        snapshot.forEach((doc) => {
            finalData.push(doc.data());
        });
        res.status(200);
        return res.json({
            success: true,
            message: 'Data fetched successfully!',
            data: (_.sortBy(finalData, 'created_at')).reverse()
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch data!',
            data: error
        });
    });
}

function updatePayment(req, res) {
    if (req.body.document_id) {
        const params = PaymentModal.returnUpdatedPaymentData(req.body);
        PaymentCollection.doc(req.body.document_id).update(params).then((response) => {
            res.status(200);
            return res.json({
                success: true,
                message: 'Data updated successfully!',
                data: params
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to update data!',
                data: error
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to update data, document_id is required!',
        });
    }
}

function deletePayment(req, res) {
    if (req.body.document_id) {
        PaymentCollection.doc(req.body.document_id).delete().then((response) => {
            res.status(200);
            return res.json({
                success: true,
                message: 'Data deleted successfully!',
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to delete data!',
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to delete data, document_id is required!',
        });
    }
}

function createOrder(req, res) {
    const amount = req.body.amount;
    const currency = req.body.currency;
    const receipt = req.body.receipt;
    const notes = req.body.notes;
    instance.orders.create({ amount, currency, receipt, notes }).then((responseOne) => {
        const params = PaymentModal.returnNewPaymentData(responseOne);
        params['customer_name'] = req.body.customer_name;
        params['customer_email'] = req.body.customer_email;
        params['customer_contact'] = req.body.customer_contact;
        PaymentCollection.doc(params.document_id).set(params).then((responseTwo) => {
            const data = {
                key: config.key,
                amount: params['amount'],
                currency: config.currency,
                name: config.name,
                description: config.description,
                image: config.image,
                order_id: params['id'],
                callback_url: config.url,
                customer_name: params['customer_name'],
                customer_email: params['customer_email'],
                customer_contact: params['customer_contact'],
                address: config.address,
                color: config.color
            };
            res.status(200);
            return res.json({
                success: true,
                message: 'Payment initiated...',
                data: data
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to process payment!',
                error: error
            });
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to process payment!',
            error: error
        });
    });
}

function fetchOrder(req, res) {
    const order_id = req.body.order_id;
    instance.orders.fetch(order_id).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Order fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch order!',
            error: error
        });
    });
}

function fetchOrderPayment(req, res) {
    const order_id = req.body.order_id;
    instance.orders.fetchPayments(order_id).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Order payment fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch order payment!',
            error: error
        });
    });
}

function fetchAllOrder(req, res) {
    const from = req.body.from;
    const to = req.body.to;
    const count = req.body.count;
    const skip = req.body.skip;
    const authorized = req.body.authorized;
    const receipt = req.body.receipt;
    instance.orders.all({ from, to, count, skip, authorized, receipt }).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Orders fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch orders!',
            error: error
        });
    });
}

function capturePayment(req, res) {
    const payment_id = req.body.payment_id;
    const amount = req.body.amount;
    const currency = req.body.currency;
    instance.payments.capture(payment_id, amount, currency).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Payment captured successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch capture payment!',
            error: error
        });
    });
}

function fetchPaymentByID(req, res) {
    const payment_id = req.body.payment_id;
    instance.payments.fetch(payment_id).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Payment fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch payment!',
            error: error
        });
    });
}

function fetchAllPayments(req, res) {
    const from = req.body.from;
    const to = req.body.to;
    const count = req.body.count;
    const skip = req.body.skip;
    instance.payments.all({ from, to, count, skip }).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Payments fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch payments!',
            error: error
        });
    });
}

function fetchBankTransferPaymentDetails(req, res) {
    const paymentId = req.body.paymentId;
    instance.payments.bankTransfer(paymentId).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Bank transfer details fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch bank transfer details!',
            error: error
        });
    });
}

function createRefund(req, res) {
    const payment_id = req.body.payment_id;
    const amount = req.body.amount;
    const notes = req.body.notes;
    instance.payments.refund(payment_id, { amount, notes }).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Refund created successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to create refund!',
            error: error
        });
    });
}

function fetchRefund(req, res) {
    const refund_id = req.body.refund_id;
    const payment_id = req.body.payment_id;
    instance.refunds.fetch(refund_id, { payment_id }).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Refund fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch refund!',
            error: error
        });
    });
}

function fetchAllRefund(req, res) {
    const from = req.body.from;
    const to = req.body.to;
    const count = req.body.count;
    const skip = req.body.skip;
    const payment_id = req.body.payment_id;
    instance.refunds.all({ from, to, count, skip, payment_id }).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Refunds fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch refunds!',
            error: error
        });
    });
}

function createCustomer(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const notes = req.body.notes;
    instance.customers.create({ name, email, contact, notes }).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Customer created successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to create customer!',
            error: error
        });
    });
}

function editCustomer(req, res) {
    const customer_id = req.body.customer_id;
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const notes = req.body.notes;
    instance.customers.edit(customer_id, { name, email, contact, notes }).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Customer updated successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to update customer!',
            error: error
        });
    });
}

function fetchCustomer(req, res) {
    const customer_id = req.body.customer_id;
    instance.customers.fetch(customer_id).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Customer fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch customer!',
            error: error
        });
    });
}

function fetchAllCustomer(req, res) {
    const customer_id = req.body.customer_id;
    instance.customers.fetchTokens(customer_id).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Customers fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch customers!',
            error: error
        });
    });
}

function fetchCustomerToken(req, res) {
    const customer_id = req.body.customer_id;
    const token_id = req.body.token_id;
    instance.customers.fetchToken(customer_id, token_id).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Token fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch token!',
            error: error
        });
    });
}

function deleteCustomerToken(req, res) {
    const customer_id = req.body.customer_id;
    const token_id = req.body.token_id;
    instance.customers.deleteToken(customer_id, token_id).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Token deleted successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to delete token!',
            error: error
        });
    });
}

function createPlan(req, res) {
    const params = req.body.params;
    instance.plans.create(params).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Plan created successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to create plan!',
            error: error
        });
    });
}

function fetchPlan(req, res) {
    const planId = req.body.planId;
    instance.plans.fetch(planId).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Plan fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch plan!',
            error: error
        });
    });
}

function fetchAllPlan(req, res) {
    const params = req.body.params;
    instance.plans.all(params).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Plans fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch plans!',
            error: error
        });
    });
}

function createSubscription(req, res) {
    const params = req.body.params;
    instance.subscriptions.create(params).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Subscription created successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to create subscription!',
            error: error
        });
    });
}

function fetchSubscription(req, res) {
    const subscriptionId = req.body.subscriptionId;
    instance.subscriptions.fetch(subscriptionId).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Subscription fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch subscription!',
            error: error
        });
    });
}

function fetchAllSubscription(req, res) {
    const params = req.body.params;
    instance.subscriptions.all(params).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Subscriptions fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch subscriptions!',
            error: error
        });
    })
}

function cancelSubscription(req, res) {
    const subscriptionId = req.body.subscriptionId;
    const cancelAtCycleEnd = req.body.cancelAtCycleEnd;
    instance.subscriptions.cancel(subscriptionId, cancelAtCycleEnd).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Subscription cancelled successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to cancel subscription!',
            error: error
        });
    })
}

function createSubscriptionAddon(req, res) {
    const subscriptionId = req.body.subscriptionId;
    const params = req.body.params;
    instance.subscriptions.createAddon(subscriptionId, params).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Subscription addon created successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to create subscription addon!',
            error: error
        });
    })
}

function fetchSubscriptionAddon(req, res) {
    const addonId = req.body.addonId;
    instance.addons.fetch(addonId).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Subscription addon fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch subscription addon!',
            error: error
        });
    })
}

function deleteSubscriptionAddon(req, res) {
    const addonId = req.body.addonId;
    instance.addons.delete(addonId).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Subscription addon deleted successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to deleted subscription addon!',
            error: error
        });
    })
}

function createPaymentLink(req, res) {
    const params = req.body.params;
    instance.invoices.create(params).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Payment link created successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to create payment link!',
            error: error
        });
    })
}

function editPaymentLink(req, res) {
    const params = req.body.params;
    instance.invoices.edit(params).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Payment link updated successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to update payment link!',
            error: error
        });
    })
}

function issuePaymentLink(req, res) {
    const invoiceId = req.body.invoiceId;
    instance.invoices.issue(invoiceId).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Payment link issued successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to issue payment link!',
            error: error
        });
    })
}

function fetchPaymentLinkByID(req, res) {
    const invoiceId = req.body.invoiceId;
    instance.invoices.fetch(invoiceId).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Payment link fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch payment link!',
            error: error
        });
    })
}

function fetchAllPaymentLink(req, res) {
    const params = req.body.params;
    instance.invoices.all(params).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Payment links fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch payment links!',
            error: error
        });
    })
}

function cancelPaymentLink(req, res) {
    const invoiceId = req.body.invoiceId;
    instance.invoices.cancel(invoiceId).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Payment link cancelled successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to cancel payment link!',
            error: error
        });
    })
}

function sendNotification(req, res) {
    const invoiceId = req.body.invoiceId;
    const medium = req.body.medium;
    instance.invoices.notifyBy(invoiceId, medium).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Notification send successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to send notification!',
            error: error
        });
    })
}

function deletePaymentLink(req, res) {
    const invoiceId = req.body.invoiceId;
    instance.invoices.delete(invoiceId).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Payment link deleted successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to delete payment link!',
            error: error
        });
    })
}

function createInvoice(req, res) {
    const params = req.body.params;
    instance.invoices.create(params).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Invoice created successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to create invoice!',
            error: error
        });
    })
}

function editInvoice(req, res) {
    const params = req.body.params;
    instance.invoices.edit(params).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Invoice updated successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to update invoice!',
            error: error
        });
    })
}

function issueInvoice(req, res) {
    const invoiceId = req.body.invoiceId;
    instance.invoices.issue(invoiceId).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Invoice issued successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to issue invoice!',
            error: error
        });
    })
}

function fetchInvoiceByID(req, res) {
    const invoiceId = req.body.invoiceId;
    instance.invoices.fetch(invoiceId).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Invoice fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch invoice!',
            error: error
        });
    })
}

function fetchAllInvoice(req, res) {
    const params = req.body.params;
    instance.invoices.all(params).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Invoices fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch invoices!',
            error: error
        });
    })
}

function cancelInvoice(req, res) {
    const invoiceId = req.body.invoiceId;
    instance.invoices.cancel(invoiceId).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Invoice cancelled successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to cancel invoice!',
            error: error
        });
    })
}

function sendInvoiceNotification(req, res) {
    const invoiceId = req.body.invoiceId;
    const medium = req.body.medium;
    instance.invoices.notifyBy(invoiceId, medium).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Invoice notification send successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to send invoice notification!',
            error: error
        });
    })
}

function deleteInvoice(req, res) {
    const invoiceId = req.body.invoiceId;
    instance.invoices.delete(invoiceId).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Invoice deleted successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to delete invoice!',
            error: error
        });
    })
}

function createVirtualAccount(req, res) {
    const params = req.body.params;
    instance.virtualAccounts.create({ params }).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Virtual account created successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to create virtual account!',
            error: error
        });
    })
}

function fetchVirtualAccount(req, res) {
    const virtualAccountId = req.body.virtualAccountId;
    instance.virtualAccounts.fetch(virtualAccountId).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Virtual account fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch virtual account!',
            error: error
        });
    })
}

function fetchAllVirtualAccount(req, res) {
    const params = req.body.params;
    instance.virtualAccounts.all({ params }).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Virtual accounts fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch virtual accounts!',
            error: error
        });
    })
}

function fetchVirtualAccountPayment(req, res) {
    const virtualAccountId = req.body.virtualAccountId;
    instance.virtualAccounts.fetchPayments(virtualAccountId).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Virtual account payment fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch virtual account payment!',
            error: error
        });
    })
}

function closeVirtualAccount(req, res) {
    const virtualAccountId = req.body.virtualAccountId;
    instance.virtualAccounts.close(virtualAccountId).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Virtual account closed successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to close virtual account!',
            error: error
        });
    })
}

function createDirectTransfer(req, res) {
    const params = req.body.params;
    instance.transfers.create({ params }).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Direct transfer created successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to create direct transfer!',
            error: error
        });
    })
}

function createPaymentTransfer(req, res) {
    const payment_id = req.body.payment_id;
    const params = req.body.params;
    instance.payments.transfer(payment_id, { params }).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Payment transfer created successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to create payment transfer!',
            error: error
        });
    })
}

function editPaymentTransfer(req, res) {
    const transfer_id = req.body.transfer_id;
    const on_hold = req.body.on_hold;
    const on_hold_until = req.body.on_hold_until;
    const notes = req.body.notes;
    instance.transfers.edit(transfer_id, { on_hold, on_hold_until, notes }).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Payment transfer updated successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to update payment transfer!',
            error: error
        });
    })
}

function fetchPaymentTransfer(req, res) {
    const transfer_id = req.body.transfer_id;
    instance.transfers.fetch(transfer_id).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Payment transfer fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch payment transfer!',
            error: error
        });
    })
}

function fetchAllPaymentTransfer(req, res) {
    const params = req.body.params;
    instance.transfers.all({ params }).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Payments transfer fetched successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch payments transfer!',
            error: error
        });
    })
}

function reversePaymentTransfer(req, res) {
    const transfer_id = req.body.transfer_id;
    const amount = req.body.amount;
    const currency = req.body.currency;
    const notes = req.body.notes;
    instance.transfers.reverse(transfer_id, { amount, currency, notes }).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Payment transfer reversed successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to reverse payment transfer!',
            error: error
        });
    })
}

function validateSignature(req, res) {
    const generatedSignature = crypto.createHmac("SHA256", req.body.secret)
        .update(req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id)
        .digest("hex");
    const isSignatureValid = generatedSignature == req.body.razorpay_signature;
    res.status(200);
    return res.json({
        status: isSignatureValid,
    });
}

function validateWebhookSignature(req, res) {
    const body = req.body.body;
    const signature = req.body.signature;
    const secret = req.body.secret;
    Razorpay.validateWebhookSignature(body, signature, secret).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Webhook signature validated successfully!',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to validate webhook signature!',
            error: error
        });
    });
}

