const https = require("https");
const msg91 = require("msg91")("331127AWuv6b9MBM5f06af85P1", "NSGTRA", 4);
const axios = require('axios');

module.exports = {
    sendSMS: sendSMS,
    sendCustomSMS: sendCustomSMS,
    getBalance: getBalance,
    sendCustomerBookingSMS: sendCustomerBookingSMS,
    sendCustomerCancelBookingSMS: sendCustomerCancelBookingSMS,
    sendVendorBookingSMS: sendVendorBookingSMS,
    sendVendorCancelBookingSMS: sendVendorCancelBookingSMS,
    sendPinnacleSMS: sendPinnacleSMS,
    sendCustomPinnacleSMS: sendCustomPinnacleSMS
};

function sendSMS(req, res) {
    const url = `http://api.msg91.com/api/sendhttp.php?sender=NSGTRA&route=4&mobiles=91${req.body.mobile}&authkey=331127AWuv6b9MBM5f06af85P1&country=91&message=${req.body.message}&response=json`;
    msg91.send(req.body.mobile, url, function (error, response) {
        if (error) {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to send SMS!',
            });
        } else {
            res.status(200);
            return res.json({
                success: true,
                message: 'SMS send successfully!',
            });
        }
    });
}

function sendCustomSMS(smsData) {
    return new Promise((resolve, reject) => {
        const url = `http://api.msg91.com/api/sendhttp.php?sender=NSGTRA&route=4&mobiles=91${smsData.mobile}&authkey=331127AWuv6b9MBM5f06af85P1&country=91&message=${smsData.message}&response=json`;
        msg91.send(smsData.mobile, url, function (error, response) {
            if (error) {
                resolve({
                    success: false,
                    message: 'Unable to send SMS!',
                });
            } else {
                resolve({
                    success: true,
                    message: 'SMS send successfully!',
                });
            }
        });
    });
}

function getBalance(req, res) {
    msg91.getBalance(function (error, response) {
        if (error) {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to fetch sms count!',
            });
        } else {
            res.status(200);
            return res.json({
                success: true,
                message: 'SMS count fetched successfully!',
                data: response
            });
        }
    });
}

function sendCustomerBookingSMS(mobile, message) {
    sendCustomPinnacleSMS(mobile, message).then(() => {
        console.log('Booking sms send to customer successfully!');
    }).catch((error) => {
        console.log('Unable to send booking sms to customer!');
    });
}

function sendCustomerCancelBookingSMS(bookingData) {
    let mobile = `91${bookingData['mobile']}`;
    const message = `Booking(ID: ${bookingData['created_at']}) cancelled for ${bookingData['car_type']} from ${bookingData['pickup_address']} to ${bookingData['drop_off_address']} at ${bookingData['pickup_time']} on ${bookingData['pickup_date']}. NSG TAXI`;
    sendCustomPinnacleSMS(mobile, message).then(() => {
        console.log('Booking cancellation sms send to customer successfully!');
    }).catch((error) => {
        console.log('Unable to send booking cancellation sms to customer!');
    });
}

function sendVendorBookingSMS(bookingData, vendorsMobile) {
    let mobile = ``;
    vendorsMobile.forEach((element) => {
        mobile = mobile + `91${element},`;
    });
    const message = `Dear Partner, A new trip request for ${bookingData['car_type']} from ${bookingData['pickup_address']} to ${bookingData['drop_off_address']} for ${bookingData['pickup_date']} ${bookingData['pickup_time']} is now available to pick. Earn Rs ${returnVendorAmount(bookingData['total_fare'], bookingData['deduction_rate'])}. NSG TAXI, Check https://www.dashboard.nsgtaxi.com/session/login.`;
    sendCustomPinnacleSMS(mobile, message).then(() => {
        console.log('Booking sms send to vendors successfully!');
    }).catch((error) => {
        console.log('Unable to send booking sms to vendors!');
    });
}

function sendVendorCancelBookingSMS(bookingData) {
    let mobile = `91${bookingData['vendor_mobile']},91${bookingData['driver_mobile']}`;
    const message = `Customer cancelled booking(ID: ${bookingData['created_at']}) for ${bookingData['car_type']} from ${bookingData['pickup_address']} to ${bookingData['drop_off_address']} at ${bookingData['pickup_time']} on ${bookingData['pickup_date']}. NSG TAXI`;
    sendCustomPinnacleSMS(mobile, message).then(() => {
        console.log('Booking cancellation sms send to vendor successfully!');
    }).catch((error) => {
        console.log('Unable to send booking cancellation sms to vendor!');
    });
}

function returnVendorAmount(amount, rate) {
    if (amount && rate) {
        return parseInt(amount, 10) - parseInt((parseInt(amount, 10) * parseInt(rate, 10) / 100).toString(), 10);
    } else {
        return 0;
    }
}

function sendPinnacleSMS(req, res) {
    const URL = `http://www.smsjust.com/sms/user/urlsms.php?username=nsgtravel&pass=e4_k@2ZR&senderid=NSGTRA&dest_mobileno=${req.body.mobile}&message=${req.body.message}&response=Y`;
    axios({
        method: 'GET',
        url: URL,
        headers: { 'content-type': 'application/json' }
    }).then((response) => {
        if ((response['status'] === 200) && (response['statusText'] === 'OK')) {
            const received_data = JSON.parse(JSON.stringify(response['data']));
            res.status(200);
            return res.json({
                success: true,
                message: 'SMS send successfully!',
                data: received_data
            });
        } else {
            res.status(400);
            return res.json({
                success: false,
                message: "Unable to send sms!"
            });
        }
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: "Unable to send sms!",
        });
    });
}

function sendCustomPinnacleSMS(mobile, message) {
    return new Promise((resolve, reject) => {
        const URL = `http://www.smsjust.com/sms/user/urlsms.php?username=nsgtravel&pass=e4_k@2ZR&senderid=NSGTRA&dest_mobileno=${mobile}&message=${message}&response=Y`;
        axios({
            method: 'GET',
            url: URL,
            headers: { 'content-type': 'application/json' }
        }).then((response) => {
            if ((response['status'] === 200) && (response['statusText'] === 'OK')) {
                const received_data = JSON.parse(JSON.stringify(response['data']));
                resolve({
                    success: true,
                    message: 'SMS send successfully!',
                    data: received_data
                });
            } else {
                reject({
                    success: false,
                    message: "Unable to send sms!"
                });
            }
        }).catch((error) => {
            reject({
                success: false,
                message: "Unable to send sms!",
            });
        });
    });
}