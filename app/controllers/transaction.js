const config = require('../config');
const TransactionCollection = config.db.collection('Transaction');
const TransactionModal = require('../modals/transaction');
const _ = require('lodash');
const https = require('https');
const PaytmChecksum = require('../paytm-checksum');

module.exports = {
    updateField: updateField,
    addTransaction: addTransaction,
    setTransaction: setTransaction,
    fetchOneTransaction: fetchOneTransaction,
    fetchCustomTransaction: fetchCustomTransaction,
    fetchAllTransaction: fetchAllTransaction,
    fetchTotalTransaction: fetchTotalTransaction,
    updateTransaction: updateTransaction,
    deleteTransaction: deleteTransaction,
    initiateTransaction: initiateTransaction,
};

function updateField(req, res) {
    TransactionCollection.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const updatedData = TransactionModal.returnUpdatedTransactionCollectionField(doc.data());
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

function addTransaction(req, res) {
    const params = TransactionModal.returnNewTransactionData(req.body);
    TransactionCollection.doc(params.document_id).set(params).then((response) => {
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

function setTransaction(req, res) {
    const params = TransactionModal.returnNewTransactionData(req.body);
    if (params.document_id) {
        TransactionCollection.doc(params.document_id).set(params).then((response) => {
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

function fetchOneTransaction(req, res) {
    if (req.body.document_id) {
        TransactionCollection.doc(req.body.document_id).get().then((response) => {
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

function fetchCustomTransaction(req, res) {
    const params = req.body;
    TransactionCollection.where(params.key, params.condition, params.value).get().then((response) => {
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

function fetchAllTransaction(req, res) {
    const limit = req.body.limit ? req.body.limit : 10;
    const order_by = req.body.order_by ? req.body.order_by : null;
    const start_index = req.body.start_index ? req.body.start_index : null;
    let Query = TransactionCollection;
    if ((order_by != null) && (start_index == null)) {
        Query = TransactionCollection.orderBy(order_by.key, order_by.value);
    }
    if ((order_by != null) && (start_index != null)) {
        Query = TransactionCollection.orderBy(order_by.key, order_by.value).startAfter(start_index);
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

function fetchTotalTransaction(req, res) {
    TransactionCollection.get().then((snapshot) => {
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

function updateTransaction(req, res) {
    if (req.body.document_id) {
        const params = TransactionModal.returnUpdatedTransactionData(req.body);
        TransactionCollection.doc(req.body.document_id).update(params).then((response) => {
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

function deleteTransaction(req, res) {
    if (req.body.document_id) {
        TransactionCollection.doc(req.body.document_id).delete().then((response) => {
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


function initiatePaytmTransaction(req, res) {
    let paytmParams = {};
    paytmParams.body = {
        requestType: config.request_type,
        mid: config.merchant_id,
        websiteName: config.website_name,
        orderId: req.body.order_id,
        callbackUrl: config.callback_url,
        txnAmount: {
            value: req.body.order_amount,
            currency: config.currency,
        },
        userInfo: {
            custId: req.body.customer_id,
        },
    };
    console.log(paytmParams.body);
    PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), config.merchant_key).then(function (checksum) {
        paytmParams.head = { signature: checksum };
        var post_data = JSON.stringify(paytmParams);
        var options = {
            hostname: config.hostname,
            port: 443,
            path: `/theia/api/v1/initiateTransaction?mid=${config.merchant_id}&orderId=${req.body.order_id}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': post_data.length
            }
        };
        var response = "";
        var post_req = https.request(options, function (post_res) {
            post_res.on('data', function (chunk) {
                response += chunk;
            });
            post_res.on('end', function () {
                const checksum_response = JSON.parse(response);
                console.log(checksum_response);
                if (checksum_response['body']['resultInfo']['resultStatus'] == 'S') {
                    const transaction_data = {
                        transaction_token: checksum_response['body']['txnToken'],
                        order_id: req.body.order_id,
                        order_amount: req.body.order_amount,
                        customer_id: req.body.customer_id,
                    };
                    const params = TransactionModal.returnNewTransactionData(transaction_data);
                    TransactionCollection.doc(params.document_id).set(params).then((response) => {
                        res.status(200);
                        return res.json({
                            success: true,
                            message: 'Payment initiated...',
                            data: params.document_id
                        });
                    }).catch((error) => {
                        res.status(400);
                        return res.json({
                            success: false,
                            message: 'Unable to initiate transaction!',
                            error: error
                        });
                    });
                } else {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'Unable to initiate transaction!',
                        error: checksum_response
                    });
                }
            });
        });
        post_req.write(post_data);
        post_req.end();
    });
}

function updatePaytmTransaction(req, res, transactionData) {
    let paytmParams = {};
    paytmParams.body = {
        txnAmount: {
            value: req.body.order_amount,
            currency: config.currency,
        },
        userInfo: {
            custId: req.body.customer_id,
        },
    };
    console.log(paytmParams.body);
    PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), config.merchant_key).then(function (checksum) {
        paytmParams.head = {
            txnToken: transactionData.transaction_token,
            signature: checksum
        };
        var post_data = JSON.stringify(paytmParams);
        var options = {
            hostname: config.hostname,
            port: 443,
            path: `/theia/api/v1/updateTransactionDetail?mid=${config.merchant_id}&orderId=${transactionData.order_id}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': post_data.length
            }
        };
        var response = "";
        var post_req = https.request(options, function (post_res) {
            post_res.on('data', function (chunk) {
                response += chunk;
            });
            post_res.on('end', function () {
                const checksum_response = JSON.parse(response);
                console.log(checksum_response);
                if (checksum_response['body']['resultInfo']['resultStatus'] == 'S') {
                    const updateData = { order_amount: req.body.order_amount };
                    TransactionCollection.doc(transactionData.document_id).update(updateData).then((response) => {
                        res.status(200);
                        return res.json({
                            success: true,
                            message: 'Payment initiated...',
                            data: transactionData.document_id
                        });
                    }).catch((error) => {
                        res.status(400);
                        return res.json({
                            success: false,
                            message: 'Unable to initiate transaction!',
                            error: error
                        });
                    });
                } else {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'Unable to initiate transaction!',
                        error: checksum_response
                    });
                }
            });
        });
        post_req.write(post_data);
        post_req.end();
    });
}

function initiateTransaction(req, res) {
    TransactionCollection.where('order_id', '==', req.body.order_id).get().then((response) => {
        if (response.empty) {
            console.log('Initiate...');
            initiatePaytmTransaction(req, res);
        } else {
            const transactionData = [];
            response.forEach((doc) => {
                transactionData.push(doc.data());
            });
            console.log('Update...');
            updatePaytmTransaction(req, res, transactionData[0]);
        }
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to process your payment request!',
        });
    });
}
