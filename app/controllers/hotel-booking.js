const config = require('../config');
const HotelBookingCollection = config.db.collection('HotelBooking');
const UserCollection = config.db.collection('User');
const HotelBookingModal = require('../modals/hotel-booking');
const SMS = require('./sms');
const Mail = require('./mail');
const Mailer = require('./mailer');
const _ = require('lodash');

module.exports = {
    updateField: updateField,
    addHotelBooking: addHotelBooking,
    setHotelBooking: setHotelBooking,
    fetchOneHotelBooking: fetchOneHotelBooking,
    fetchCustomHotelBooking: fetchCustomHotelBooking,
    fetchActiveHotelBooking: fetchActiveHotelBooking,
    fetchAllHotelBooking: fetchAllHotelBooking,
    fetchTotalHotelBooking: fetchTotalHotelBooking,
    updateHotelBooking: updateHotelBooking,
    updateCustom: updateCustom,
    deleteHotelBooking: deleteHotelBooking,
    sendHotelBookingSMSEmail: sendHotelBookingSMSEmail
};

function sendHotelBookingSMSEmail(params) {
    // Send custom sms start
    const smsData = {
        mobile: params['mobile'],
        message: `Booking has been confirmed with ${params['hotel_name']} on ${params['check_in_date']}. Reference number is ${params['created_at']}. NSG TAXI`,
    };
    SMS.sendCustomSMS(smsData).then((smsResponse) => { });

    const vendorSmsData = {
        mobile: params['hotel_owner_mobile'],
        message: `Hi, A new booking has arrived for ${params['hotel_name']} on ${params['check_in_date']}. The received payment is ${params['created_at']} INR. NSG TAXI`,
    };
    SMS.sendCustomSMS(vendorSmsData).then((smsResponse) => { });
    // Send custom sms end

    // Send custom mail start
    const mailData = {
        to: params.email,
        subject: `Booking confirmation for ${params['hotel_name']} on ${params['check_in_date']}`,
        html: Mailer.returnHotelBookingMailer(params)
    };
    Mail.sendCustomMail(mailData);
    // Send custom mail end
}

function sendHotelBookingCancelSMSEmail(params) {
    if ((params['status'] == 'cancelled') && (params['payment_status'] == 'success')) {
        const smsData = {
            mobile: params['mobile'],
            message: `Booking(ID: ${params['created_at']}) cancelled for ${params['hotel_name']} on ${params['check_in_date']}. NSG TAXI`,
        };
        SMS.sendCustomSMS(smsData).then((smsResponse) => { });
    }
}

function updateField(req, res) {
    HotelBookingCollection.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const updatedData = HotelBookingModal.returnUpdatedHotelBookingCollectionField(doc.data());
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

function addHotelBooking(req, res) {
    UserCollection.doc((parseInt(req.body.mobile)).toString()).get().then((response) => {
        if (!response.exists) {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to book hotel, Please create account first!',
            });
        } else {
            const userData = response.data();
            if (parseInt(userData['mobile_code']) === parseInt(req.body.mobile_code)) {
                const params = HotelBookingModal.returnNewHotelBookingData(req.body);
                params['status'] = 'booked';
                HotelBookingCollection.doc(params.document_id).set(params).then((response) => {
                    sendHotelBookingSMSEmail(params);
                    res.status(200);
                    return res.json({
                        success: true,
                        message: 'Hotel booked successfully!',
                        data: {
                            document_id: params.document_id,
                            created_at: params.created_at
                        }
                    });
                }).catch((error) => {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'Unable to book hotel, Please try again!',
                        data: error
                    });
                });
            } else {
                res.status(400);
                return res.json({
                    success: false,
                    message: 'Unable to book hotel, Your mobile is not verified!',
                });
            }
        }
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to book hotel, please try again!',
        });
    });
}

function setHotelBooking(req, res) {
    const params = HotelBookingModal.returnNewHotelBookingData(req.body);
    if (params.document_id) {
        HotelBookingCollection.doc(params.document_id).set(params).then((response) => {
            res.status(200);
            return res.json({
                success: true,
                message: 'Hotel booking done successfully!',
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to book hotel, Please try again!',
                data: error
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to book hotel, document_id is required!',
        });
    }
}

function fetchOneHotelBooking(req, res) {
    if (req.body.document_id) {
        HotelBookingCollection.doc(req.body.document_id).get().then((response) => {
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

function fetchCustomHotelBooking(req, res) {
    const params = req.body;
    HotelBookingCollection.where(params.key, params.condition, params.value).get().then((response) => {
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

function fetchActiveHotelBooking(req, res) {
    const params = req.body;
    HotelBookingCollection.where('status', '==', 'booked').where('payment_status', '==', 'success').get().then((response) => {
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

function fetchAllHotelBooking(req, res) {
    const limit = req.body.limit ? req.body.limit : 10;
    const order_by = req.body.order_by ? req.body.order_by : null;
    const start_index = req.body.start_index ? req.body.start_index : null;
    let Query = HotelBookingCollection;
    if ((order_by != null) && (start_index == null)) {
        Query = HotelBookingCollection.orderBy(order_by.key, order_by.value);
    }
    if ((order_by != null) && (start_index != null)) {
        Query = HotelBookingCollection.orderBy(order_by.key, order_by.value).startAfter(start_index);
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

function fetchTotalHotelBooking(req, res) {
    HotelBookingCollection.get().then((snapshot) => {
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
            message: 'Unable to fetch HotelBooking data!',
            data: error
        });
    });
}

function updateHotelBooking(req, res) {
    if (req.body.document_id) {
        const params = HotelBookingModal.returnUpdatedHotelBookingData(req.body);
        HotelBookingCollection.doc(req.body.document_id).update(params).then((response) => {
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
    HotelBookingCollection.where(params.key, params.condition, params.value).get().then((response) => {
        if (response.empty) {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to update hotel booking, please try again!',
            });
        } else {
            response.forEach((doc) => {
                const HotelBookingData = doc.data();
                const params = HotelBookingModal.returnUpdatedHotelBookingData(HotelBookingData, req.body);
                doc.ref.update(params).then((response) => {
                    sendHotelBookingCancelSMSEmail(params);
                    res.status(200);
                    return res.json({
                        success: true,
                        message: 'Hotel booking updated successfully!',
                    });
                }).catch((error) => {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'Unable to update hotel booking, please try again!',
                    });
                });
            });
        }
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to update HotelBooking, please try again!',
        });
    });
}

function deleteHotelBooking(req, res) {
    if (req.body.document_id) {
        HotelBookingCollection.doc(req.body.document_id).delete().then((response) => {
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
