var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports = {
    validateJWT: validateJWT,
};

function validateJWT(req, res, next) {
    var token = req.body.token || req.query.token || req.headers.token;
    if (token) {
        jwt.verify(token, config.server_secret, function (err, decoded) {
            if (err) {
                const errorData = err;
                if (errorData.message === 'jwt expired') {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'Session expired!',
                    });
                } else {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'Authentication failed!',
                    });
                }
            } else {
                res.status(200);
                return res.json({
                    success: true,
                    message: 'Authentication Successful!',
                    token: token
                });
            }
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unauthorized access!',
        });
    }
}
