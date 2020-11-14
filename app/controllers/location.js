const axios = require('axios');
const requestIp = require('request-ip');
const iplocation = require('iplocation').default;
const config = require('../config');

module.exports = {
    getIpLocation: getIpLocation,
    getLocationDetails: getLocationDetails,
    getLatLongFromPostalCode: getLatLongFromPostalCode,
    getCustomLatLongFromPostalCode: getCustomLatLongFromPostalCode,
    getDistanceBetweenLatLng: getDistanceBetweenLatLng,
};

function validateIP(ip) {
    const octet = '(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?|0)';
    const regex = new RegExp(`^${octet}\\.${octet}\\.${octet}\\.${octet}$`);
    return regex.test(ip);
}

function getIpLocation(req, res) {
    let ip = requestIp.getClientIp(req);
    if (req.params.ip && validateIP(req.params.ip)) {
        ip = req.params.ip;
    }
    iplocation(ip)
        .then(response => {
            res.status(200);
            return res.json({
                success: true,
                message: 'IP location detected successfully!',
                remote_address: ip,
                data: response,
            });
        })
        .catch(error => {
            res.status(200);
            return res.json({
                success: false,
                message: 'Unable to detect ip location!',
                remote_address: ip,
                error: error,
            });
        });
}

function getLocationDetails(req, res) {
    axios({
        method: 'GET',
        url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.params.latlng}&key=${config.google_api_key}`,
        headers: { 'content-type': 'application/json' },
    })
        .then(response => {
            if (response['status'] === 200 && response['statusText'] === 'OK') {
                const receivedData = JSON.parse(JSON.stringify(response['data']));
                if (receivedData['status'] === 'OK') {
                    res.status(200);
                    return res.json({
                        success: true,
                        message: 'Location details fetched successfully!',
                        data: receivedData['results'][0],
                    });
                } else {
                    res.status(200);
                    return res.json({
                        success: false,
                        message: 'Unable to fetch location details!',
                        error: receivedData['error_message'],
                    });
                }
            } else {
                res.status(200);
                return res.json({
                    success: false,
                    message: 'Unable to fetch location details!',
                });
            }
        })
        .catch(error => {
            res.status(200);
            return res.json({
                success: false,
                message: 'Unable to fetch location details!',
            });
        });
}

function getLatLongFromPostalCode(req, res) {
    const postalCodePattern = /^[0-9]{6}$/;
    const postalData = req.params.postalData;
    if (!postalCodePattern.test(postalData)) {
        res.status(200);
        return res.json({
            success: false,
            message: 'Invalid postal code!',
        });
    } else {
        axios({
            method: 'GET',
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${postalData}&key=${config.google_api_key}`,
        })
            .then(response => {
                if (response.status === 200 && response.statusText === 'OK') {
                    const receivedData = JSON.parse(JSON.stringify(response.data));
                    if (receivedData.status === 'OK') {
                        const location = receivedData.results[0].geometry.location;
                        res.status(200);
                        return res.json({
                            success: true,
                            message: 'Lat, lng fetched successfully!',
                            data: location,
                        });
                    } else {
                        res.status(200);
                        return res.json({
                            success: false,
                            message: 'Unable to fetch lat, lng!',
                        });
                    }
                } else {
                    res.status(200);
                    return res.json({
                        success: false,
                        message: 'Unable to fetch lat, lng!',
                    });
                }
            })
            .catch(error => {
                res.status(200);
                return res.json({
                    success: false,
                    message: 'Unable to fetch lat, lng!',
                });
            });
    }
}

function getCustomLatLongFromPostalCode(value) {
    return new Promise((resolve, reject) => {
        const postalCodePattern = /^[0-9]{6}$/;
        const postalData = value;
        if (!postalCodePattern.test(postalData)) {
            resolve({
                success: false,
                message: 'Invalid postal code!',
            });
        } else {
            axios({
                method: 'GET',
                url: `https://maps.googleapis.com/maps/api/geocode/json?address=${postalData}&key=${config.google_api_key}`,
            })
                .then(response => {
                    if (response.status === 200 && response.statusText === 'OK') {
                        const receivedData = JSON.parse(JSON.stringify(response.data));
                        if (receivedData.status === 'OK') {
                            const location = receivedData.results[0].geometry.location;
                            resolve({
                                success: true,
                                message: 'Lat, lng fetched successfully!',
                                data: location,
                            });
                        } else {
                            resolve({
                                success: false,
                                message: 'Unable to fetch lat, lng!',
                            });
                        }
                    } else {
                        resolve({
                            success: false,
                            message: 'Unable to fetch lat, lng!',
                        });
                    }
                })
                .catch(error => {
                    resolve({
                        success: false,
                        message: 'Unable to fetch lat, lng!',
                    });
                });
        }
    });
}

function getDistanceBetweenLatLng(req, res) {
    axios({
        method: 'GET',
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${req.body.latitudeOne},${req.body.longitudeOne}&destinations=${req.body.latitudeTwo},${req.body.longitudeTwo}&key=AIzaSyA7Yex8yK4j0xtvDo5G4TMj5ynu8LNZe_g`,
    }).then(response => {
        if (response.status === 200 && response.statusText === 'OK') {
            const receivedData = JSON.parse(JSON.stringify(response.data));
            if (receivedData.status === 'OK') {
                let rows = receivedData['rows'][0];
                let elements = (rows.elements)[0];
                let distance = parseInt((elements.distance.value / 1000), 10);
                res.status(200);
                return res.json({
                    success: true,
                    message: 'Distance calculated successfully!',
                    distance: distance,
                    origin: receivedData['origin_addresses'][0],
                    destination: receivedData['destination_addresses'][0]
                });
            } else {
                res.status(200);
                return res.json({
                    success: false,
                    message: 'Unable to fetch distance from addresses!',
                });
            }
        } else {
            res.status(200);
            return res.json({
                success: false,
                message: 'Unable to fetch distance from addresses!',
            });
        }
    })
    .catch(error => {
        res.status(200);
        return res.json({
            success: false,
            message: 'Unable to fetch distance from addresses!',
        });
    });
}