const config = require('../config');
const PackageBookingCollection = config.db.collection('PackageBooking');
const UserCollection = config.db.collection('User');
const PackageBookingModal = require('../modals/package-booking');
const SMS = require('./sms');
const Mail = require('./mail');
const Mailer = require('./mailer');
const _ = require('lodash');

module.exports = {
    updateField: updateField,
    addPackageBooking: addPackageBooking,
    setPackageBooking: setPackageBooking,
    fetchOnePackageBooking: fetchOnePackageBooking,
    fetchCustomPackageBooking: fetchCustomPackageBooking,
    fetchActivePackageBooking: fetchActivePackageBooking,
    fetchAllPackageBooking: fetchAllPackageBooking,
    fetchTotalPackageBooking: fetchTotalPackageBooking,
    updatePackageBooking: updatePackageBooking,
    updateCustom: updateCustom,
    deletePackageBooking: deletePackageBooking,
    sendPackageBookingSMSEmail: sendPackageBookingSMSEmail
};

function sendPackageBookingSMSEmail(params) {
    // Send custom sms start
    const smsData = {
        mobile: params['mobile'],
        message: `Booking has been confirmed for ${params['package_name']} on ${params['start_date']}. Reference number is ${params['created_at']}. NSG TAXI`,
    };
    SMS.sendCustomSMS(smsData).then((smsResponse) => { });

    const vendorSmsData = {
        mobile: params['package_owner_mobile'],
        message: `Hi, A new booking has arrived for ${params['package_name']} on ${params['start_date']}. The received payment is ${params['created_at']} INR. NSG TAXI`,
    };
    SMS.sendCustomSMS(vendorSmsData).then((smsResponse) => { });
    // Send custom sms end

    // Send custom mail start
    const mailData = {
        to: params.email,
        subject: `Booking confirmation for ${params['package_name']} on ${params['start_date']}`,
        html: Mailer.returnPackageBookingMailer(params)
    };
    Mail.sendCustomMail(mailData);
    // Send custom mail end
}

function sendPackageBookingCancelSMSEmail(params) {
    if ((params['status'] == 'cancelled') && (params['payment_status'] == 'success')) {
        const smsData = {
            mobile: params['mobile'],
            message: `Booking(ID: ${params['created_at']}) cancelled for ${params['package_name']} on ${params['start_date']}. NSG TAXI`,
        };
        SMS.sendCustomSMS(smsData).then((smsResponse) => { });
    }
}

function updateField(req, res) {
    PackageBookingCollection.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const updatedData = PackageBookingModal.returnUpdatedPackageBookingCollectionField(doc.data());
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

function addPackageBooking(req, res) {
    UserCollection.doc((parseInt(req.body.mobile)).toString()).get().then((response) => {
        if (!response.exists) {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to book Package, Please create account first!',
            });
        } else {
            const userData = response.data();
            if (parseInt(userData['mobile_code']) === parseInt(req.body.mobile_code)) {
                const params = PackageBookingModal.returnNewPackageBookingData(req.body);
                params['status'] = 'booked';
                PackageBookingCollection.doc(params.document_id).set(params).then((response) => {
                    sendPackageBookingSMSEmail(params);
                    res.status(200);
                    return res.json({
                        success: true,
                        message: 'Package booked successfully!',
                        data: {
                            document_id: params.document_id,
                            created_at: params.created_at
                        }
                    });
                }).catch((error) => {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'Unable to book Package, Please try again!',
                        data: error
                    });
                });
            } else {
                res.status(400);
                return res.json({
                    success: false,
                    message: 'Unable to book Package, Your mobile is not verified!',
                });
            }
        }
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to book Package, please try again!',
        });
    });
}

function setPackageBooking(req, res) {
    const params = PackageBookingModal.returnNewPackageBookingData(req.body);
    if (params.document_id) {
        PackageBookingCollection.doc(params.document_id).set(params).then((response) => {
            res.status(200);
            return res.json({
                success: true,
                message: 'Package booking done successfully!',
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to book Package, Please try again!',
                data: error
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to book Package, document_id is required!',
        });
    }
}

function fetchOnePackageBooking(req, res) {
    if (req.body.document_id) {
        PackageBookingCollection.doc(req.body.document_id).get().then((response) => {
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

function fetchCustomPackageBooking(req, res) {
    const params = req.body;
    PackageBookingCollection.where(params.key, params.condition, params.value).get().then((response) => {
        if (response.empty) {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to fetch data, No matching record found!',
            });
        } else {
            const finalData = [];
            if (req.body.status) {
                response.forEach((doc) => {
                    if (req.body.status == (doc.data())['status']) {
                        finalData.push(doc.data());
                    }
                });
            } else {
                response.forEach((doc) => {
                    finalData.push(doc.data());
                });
            }
            res.status(200);
            return res.json({
                success: true,
                message: 'Data fetched successfully!',
                data: (_.sortBy(finalData, 'created_at')).reverse()
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

function fetchActivePackageBooking(req, res) {
    const params = req.body;
    PackageBookingCollection.where('status', '==', 'booked').where('payment_status', '==', 'success').get().then((response) => {
        if (response.empty) {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to fetch data, No matching record found!',
            });
        } else {
            const finalData = [];
            if (req.body.status) {
                response.forEach((doc) => {
                    if (req.body.status == (doc.data())['status']) {
                        finalData.push(doc.data());
                    }
                });
            } else {
                response.forEach((doc) => {
                    finalData.push(doc.data());
                });
            }
            res.status(200);
            return res.json({
                success: true,
                message: 'Data fetched successfully!',
                data: (_.sortBy(finalData, 'created_at')).reverse()
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

function fetchAllPackageBooking(req, res) {
    const limit = req.body.limit ? req.body.limit : 10;
    const order_by = req.body.order_by ? req.body.order_by : null;
    const start_index = req.body.start_index ? req.body.start_index : null;
    let Query = PackageBookingCollection;
    if ((order_by != null) && (start_index == null)) {
        Query = PackageBookingCollection.orderBy(order_by.key, order_by.value);
    }
    if ((order_by != null) && (start_index != null)) {
        Query = PackageBookingCollection.orderBy(order_by.key, order_by.value).startAfter(start_index);
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

function fetchTotalPackageBooking(req, res) {
    PackageBookingCollection.get().then((snapshot) => {
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
            message: 'Unable to fetch PackageBooking data!',
            data: error
        });
    });
}

function updatePackageBooking(req, res) {
    if (req.body.document_id) {
        const params = PackageBookingModal.returnUpdatedPackageBookingData(req.body);
        PackageBookingCollection.doc(req.body.document_id).update(params).then((response) => {
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

function updateCustom(req, res) {
    const params = req.body;
    PackageBookingCollection.where(params.key, params.condition, params.value).get().then((response) => {
        if (response.empty) {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to update Package booking, please try again!',
            });
        } else {
            response.forEach((doc) => {
                const PackageBookingData = doc.data();
                const params = PackageBookingModal.returnUpdatedPackageBookingData(PackageBookingData, req.body);
                doc.ref.update(params).then((response) => {
                    sendPackageBookingCancelSMSEmail(params);
                    res.status(200);
                    return res.json({
                        success: true,
                        message: 'Package booking updated successfully!',
                    });
                }).catch((error) => {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'Unable to update Package booking, please try again!',
                    });
                });
            });
        }
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to update PackageBooking, please try again!',
        });
    });
}

function deletePackageBooking(req, res) {
    if (req.body.document_id) {
        PackageBookingCollection.doc(req.body.document_id).delete().then((response) => {
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
