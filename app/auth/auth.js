var jwt = require('jsonwebtoken');
var config = require('../config');

function authGuard(req, res, next) {
    const host = req.headers.host;
    if ((host == 'localhost:3000') || (host == 'nsgtaxi.com') || (host == 'www.nsgtaxi.com')) {
        var token = req.body['token'] || req.query['token'] || req.headers['token'];
        if (token) {
            jwt.verify(token, config.server_secret, function (err, decoded) {
                if (err) {
                    const errorData = err;
                    if (errorData.message === 'jwt expired') {
                        res.status(200);
                        return res.json({
                            success: false,
                            message: 'Session expired!',
                        });
                    } else {
                        res.status(200);
                        return res.json({
                            success: false,
                            message: 'Authentication failed!',
                        });
                    }
                } else {
                    next();
                }
            });
        } else {
            res.status(200);
            return res.json({
                success: false,
                message: 'Unauthorized access!',
            });
        }
    } else {
        res.status(200);
        return res.json({
            success: false,
            message: 'Unauthorized request!',
        });
    }
}

module.exports = authGuard;