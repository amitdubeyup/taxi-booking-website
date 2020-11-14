const config = require('../config');
const BookingCollection = config.db.collection('Booking');
const UserCollection = config.db.collection('User');
const VehicleCollection = config.db.collection('Vehicle');
const BookingModal = require('../modals/booking');
const SMS = require('./sms');
const Mail = require('./mail');
const Mailer = require('./mailer');
const _ = require('lodash');

module.exports = {
    updateField: updateField,
    addBooking: addBooking,
    setBooking: setBooking,
    fetchOneBooking: fetchOneBooking,
    fetchCustomBooking: fetchCustomBooking,
    fetchActiveBooking: fetchActiveBooking,
    fetchAllBooking: fetchAllBooking,
    fetchTotalBooking: fetchTotalBooking,
    updateBooking: updateBooking,
    updateCustom: updateCustom,
    deleteBooking: deleteBooking,
    sendBookingSMSEmail: sendBookingSMSEmail
};

function sendBookingSMSEmail(params) {
    // Send Customer SMS, Email Start
    if (params['booking_type'] === 'outstation') {
        const customer_mobile = `91${params['mobile']}`;
        const customer_message = `Dear ${params['first_name']}, Thank you for booking with us. Reference: ${params['created_at']}, From: ${params['pickup_address']}, To: ${params['drop_off_address']}, Fare: ${params['total_fare']}.00/-, DateTime: ${params['pickup_date']} ${params['pickup_time']}. NSG TAXI`;
        SMS.sendCustomerBookingSMS(customer_mobile, customer_message);

        const trip_type = parseInt(params['one_way_trip']) ? 'One Way' : 'Round Trip';
        params['note'] = parseInt(params['one_way_trip']) ? `If the car travels between 09:00 PM to 06:00 AM, then ₹250 will be charged. This charge should be paid directly to the driver.` : `Toll & state tax will be paid by the client. If the car travels between 09:00 PM to 06:00 AM, then ₹250 will be charged. This charge should be paid directly to the driver.`;
        const mailData = {
            to: params.email,
            subject: `Booking confirmation for ${trip_type} - ${params['car_type']}`,
            html: Mailer.returnBookingMailer(params)
        };
        Mail.sendCustomMail(mailData);
    } else {
        const customer_mobile = `91${params['mobile']}`;
        const customer_message = `Dear ${params['first_name']}, Thank you for booking with us. Reference: ${params['created_at']},Pickup: ${params['rental_pickup_address']}, DateTime: ${params['rental_pickup_date']} ${params['rental_pickup_time']}, Fare: ${params['total_fare']}.00/-. NSG TAXI`;
        SMS.sendCustomerBookingSMS(customer_mobile, customer_message);

        params['note'] = `Toll tax, state tax & parking charges are not included. This charge will be paid by the customer if applicable.`;
        const mailData = {
            to: params.email,
            subject: `Booking confirmation for Rental - ${params['rental_car_type']}`,
            html: Mailer.returnRentalBookingMailer(params)
        };
        Mail.sendCustomMail(mailData);
    }
    // Send Customer SMS, Email End

    // Send Vendor SMS, Email Start
    UserCollection.where('user_type', '==', 'vendor').where('status', '==', 'active').get().then((response) => {
        if (response.empty) {
            console.log('There is no vendor available');
        } else {
            const vendorsMobile = [];
            response.forEach((doc) => {
                const userData = doc.data();
                if (userData['parent'] == null) {
                    vendorsMobile.push((userData['mobile']).toString());
                }
            });
            SMS.sendVendorBookingSMS(params, vendorsMobile);
        }
    }).catch((error) => {
        console.log('Unable to fetch vendor list');
    });
    // Send Vendor SMS, Email End
}

function sendBookingCancelSMSEmail(params) {
    if ((params['status'] == 'cancelled') && (params['payment_status'] == 'success')) {
        SMS.sendCustomerCancelBookingSMS(params);
        if (params['vendor_mobile'] && params['driver_mobile']) {
            SMS.sendVendorCancelBookingSMS(params);
        }
    }
}

function sendBookingAcceptanceSMSEmail(bookingData) {
    if (bookingData['payment_status'] != 'success') {
        UserCollection.doc((parseInt(bookingData.driver_mobile)).toString()).get().then((response) => {
            const userData = response.data();
            VehicleCollection.doc(bookingData.vehicle_id).get().then((response) => {
                const vehicleData = response.data();
                const customer_mobile = `91${bookingData['mobile']}`;
                const customer_message = `Dear ${capitalize(bookingData['first_name'])}, Your booking has been assigned to ${capitalize(userData['salutation'])} ${capitalize(userData['first_name'])} ${capitalize(userData['last_name'])}. Vehicle No: ${uppercase(vehicleData['vehicle_number'])}, Contact No: ${userData['mobile']}. NSG TAXI`;
                SMS.sendCustomerBookingSMS(customer_mobile, customer_message);
                const vendor_mobile = `91${userData['mobile']}`;
                const vendor_message = `Dear ${capitalize(userData['first_name'])}, A new trip request on ${bookingData['pickup_date']} at ${bookingData['pickup_time']} has been assigned to you. NSG TAXI`;
                SMS.sendCustomerBookingSMS(vendor_mobile, vendor_message);
            }).catch((error) => {
                console.log('Unable to send booking acceptance SMS.');
            });
        }).catch((error) => {
            console.log('Unable to send booking acceptance SMS.');
        });
    }
}

function updateField(req, res) {
    BookingCollection.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const updatedData = BookingModal.returnUpdatedBookingCollectionField(doc.data());
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

function addBooking(req, res) {
    UserCollection.doc((parseInt(req.body.mobile)).toString()).get().then((response) => {
        if (!response.exists) {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to book, Please create account first!',
            });
        } else {
            const userData = response.data();
            if (userData['mobile_verified']) {
                const params = BookingModal.returnNewBookingData(req.body);
                BookingCollection.doc(params.document_id).set(params).then((response) => {
                    res.status(200);
                    return res.json({
                        success: true,
                        message: 'Booking done successfully!',
                        data: {
                            document_id: params.document_id,
                            created_at: params.created_at
                        }
                    });
                }).catch((error) => {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'Unable to book, Please try again!',
                        data: error
                    });
                });
            } else {
                res.status(400);
                return res.json({
                    success: false,
                    message: 'Unable to book, Your mobile is not verified!',
                });
            }
        }
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to book, please try again!',
        });
    });
}

function setBooking(req, res) {
    const params = BookingModal.returnNewBookingData(req.body);
    if (params.document_id) {
        BookingCollection.doc(params.document_id).set(params).then((response) => {
            if (req.body.canSendSMS) {
                sendBookingSMSEmail(params);
            }
            res.status(200);
            return res.json({
                success: true,
                message: 'Booking done successfully!',
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to book, Please try again!',
                data: error
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to book, document_id is required!',
        });
    }
}

function fetchOneBooking(req, res) {
    if (req.body.document_id) {
        BookingCollection.doc(req.body.document_id).get().then((response) => {
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

function fetchCustomBooking(req, res) {
    const params = req.body;
    BookingCollection.where(params.key, params.condition, params.value).get().then((response) => {
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

function fetchActiveBooking(req, res) {
    BookingCollection.where('status', '==', 'booked').where('payment_status', '==', 'success').get().then((response) => {
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

function fetchAllBooking(req, res) {
    const limit = req.body.limit ? req.body.limit : 10;
    const order_by = req.body.order_by ? req.body.order_by : null;
    const start_index = req.body.start_index ? req.body.start_index : null;
    let Query = BookingCollection;
    if ((order_by != null) && (start_index == null)) {
        Query = BookingCollection.orderBy(order_by.key, order_by.value);
    }
    if ((order_by != null) && (start_index != null)) {
        Query = BookingCollection.orderBy(order_by.key, order_by.value).startAfter(start_index);
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

function fetchTotalBooking(req, res) {
    BookingCollection.get().then((snapshot) => {
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
            message: 'Unable to fetch booking data!',
            data: error
        });
    });
}

function updateBooking(req, res) {
    if (req.body.document_id) {
        const params = BookingModal.returnUpdatedBookingData(req.body);
        BookingCollection.doc(req.body.document_id).update(params).then((response) => {
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
    BookingCollection.where(params.key, params.condition, params.value).get().then((response) => {
        if (response.empty) {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to update booking, please try again!',
            });
        } else {
            response.forEach((doc) => {
                const bookingData = doc.data();
                const updatedData = BookingModal.returnUpdatedBookingData(bookingData, req.body);
                doc.ref.update(updatedData).then((response) => {
                    if (req.body.canSendSMS) {
                        sendBookingSMSEmail(params);
                    }
                    if (req.body.canCancelBooking) {
                        sendBookingCancelSMSEmail(updatedData);
                    }
                    if (req.body.canAcceptBooking) {
                        sendBookingAcceptanceSMSEmail(updatedData);
                    }
                    res.status(200);
                    return res.json({
                        success: true,
                        message: 'Booking updated successfully!',
                    });
                }).catch((error) => {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'Unable to update booking, please try again!',
                    });
                });
            });
        }
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to update booking, please try again!',
        });
    });
}

function deleteBooking(req, res) {
    if (req.body.document_id) {
        BookingCollection.doc(req.body.document_id).delete().then((response) => {
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


function capitalize(s) {
    return s.toLowerCase().replace(/\b./g, function (a) { return a.toUpperCase(); });
};

function uppercase(s) {
    return s.toUpperCase();
};