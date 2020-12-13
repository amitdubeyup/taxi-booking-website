const jwt = require('jsonwebtoken');

const config = require('../config');
const UserCollection = config.db.collection('User');
const UserModal = require('../modals/user');

const SMS = require('./sms');
const Mail = require('./mail');
const Mailer = require('./mailer');
const _ = require('lodash');

module.exports = {
    updateField: updateField,
    loginUser: loginUser,
    registerUser: registerUser,
    verifyUserAccount: verifyUserAccount,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    fetchSingleUser: fetchSingleUser,
    fetchAllUser: fetchAllUser,
    fetchCustomUser: fetchCustomUser,
    searchUser: searchUser,
    updateUser: updateUser,
    removeUser: removeUser,
    verifyBookingUserAccount: verifyBookingUserAccount,
    verifyHotelBookingUser: verifyHotelBookingUser,
    verifyHotelBookingCode: verifyHotelBookingCode,
};

function updateField(req, res) {
    UserCollection.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const updatedData = UserModal.returnUpdatedUserCollectionField(doc.data());
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

function generateCode(n) {
    return Math.floor(Math.random() * (9 * Math.pow(10, n - 1))) + Math.pow(10, n - 1);
}

function loginUser(req, res) {
    if (req.body.mobile && req.body.password) {
        UserCollection.doc((parseInt(req.body.mobile)).toString()).get().then((response) => {
            if (!response.exists) {
                res.status(400);
                return res.json({
                    success: false,
                    message: `Account doesn't exist, please create account!`,
                });
            } else {
                const userData = response.data();
                if (userData['mobile_verified']) {
                    if (req.body.password == userData['password']) {
                        const payload = {
                            parent: userData['parent'],
                            user_type: userData['user_type'],
                            salutation: userData['salutation'],
                            first_name: userData['first_name'],
                            last_name: userData['last_name'],
                            gender: userData['gender'],
                            mobile: userData['mobile'],
                            email: userData['email'],
                            profile_picture: userData['profile_picture'],
                            login_time: new Date()
                        };
                        const tokenData = jwt.sign({ data: payload }, config.server_secret, { expiresIn: config.token_expire });
                        res.status(200);
                        return res.json({
                            success: true,
                            message: 'Logged in successfully!',
                            token: tokenData
                        });
                    } else {
                        res.status(400);
                        return res.json({
                            success: false,
                            message: `Unable to login, password doesn't match!`,
                        });
                    }
                } else {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: `Unable to login, Your mobile or email is not verified!`,
                    });
                }
            }
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to login, please try again!',
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to login, mobile & password is required!',
        });
    }
}

function registerUser(req, res) {
    if (req.body.mobile) {
        UserCollection.doc((parseInt(req.body.mobile)).toString()).get().then((response) => {
            if (!response.exists) {
                const usersData = UserModal.returnNewUserData(req.body);
                UserCollection.doc((parseInt(req.body.mobile)).toString()).set(usersData).then((response) => {

                    // Send mobile verification code start
                    const smsData = {
                        mobile: usersData.mobile,
                        message: `Dear ${usersData.first_name}, Your mobile verification code is ${usersData.mobile_code}. Please do not share it with anyone. NSG TAXI`,
                    };
                    SMS.sendCustomSMS(smsData).then((smsResponse) => { });
                    // Send mobile verification code end

                    res.status(200);
                    return res.json({
                        success: true,
                        message: 'Account created successfully!',
                    });
                }).catch((error) => {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'Unable to register, please try again!',
                    });
                });
            } else {
                res.status(400);
                return res.json({
                    success: false,
                    message: `User(${req.body.mobile}) already exist, please try with another!`,
                });
            }
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to register, please try again!',
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to register, required field error!',
        });
    }
}

function verifyUserAccount(req, res) {
    if (req.body.mobile && req.body.mobile_code) {
        UserCollection.doc((parseInt(req.body.mobile)).toString()).get().then((response) => {
            if (response.exists) {
                const usersData = response.data();
                if ((parseInt(usersData['mobile_code']) == parseInt(req.body.mobile_code))) {
                    const updatedData = {
                        mobile_verified: true,
                        status: 'active'
                    };
                    UserCollection.doc((parseInt(req.body.mobile)).toString()).update(updatedData).then((response) => {
                        const mailData = {
                            to: usersData['email'],
                            subject: `Welcome to NSG TAXI`,
                            html: Mailer.returnRegisterAccountMailer(usersData),
                            pdfBase64Data: (usersData['user_type'] == 'customer') ? null : Mailer.returnVendorAgreementMailer(usersData),
                            pdfName: (usersData['user_type'] == 'customer') ? null : 'Agreement.pdf',
                        };
                        Mail.sendCustomMail(mailData);
                        res.status(200);
                        return res.json({
                            success: true,
                            message: 'User account verified successfully!',
                        });
                    }).catch((error) => {
                        res.status(400);
                        return res.json({
                            success: false,
                            message: 'Unable to verify user account, please try again!',
                        });
                    });
                } else {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: `Your email or mobile verification code doesn't match!`,
                    });
                }
            } else {
                res.status(400);
                return res.json({
                    success: false,
                    message: `Account doesn't exist, please create account!`,
                });
            }
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to verify user account, please try again!',
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to verify user account, required field error!',
        });
    }
}

function forgotPassword(req, res) {
    if (req.body.mobile) {
        UserCollection.doc((parseInt(req.body.mobile)).toString()).get().then((response_one) => {
            if (!response_one.exists) {
                res.status(400);
                return res.json({
                    success: false,
                    message: `Account doesn't exist, please create account!`,
                });
            } else {
                const updatedData = {
                    email_code: generateCode(6),
                    mobile_code: generateCode(6)
                };
                UserCollection.doc((parseInt(req.body.mobile)).toString()).update(updatedData).then((response_two) => {
                    const userData = response_one.data();

                    // Send verification code via sms start
                    const smsData = {
                        mobile: userData.mobile,
                        message: `Dear ${userData['first_name']}, Your mobile verification code is ${updatedData.mobile_code}. Please do not share it with anyone. NSG TAXI`,
                    };
                    SMS.sendCustomSMS(smsData);
                    // Send verification code via sms end

                    res.status(200);
                    return res.json({
                        success: true,
                        message: 'Verification code sent successfully!',
                    });
                }).catch((error) => {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'Unable to send verification code, please try again!',
                    });
                });
            }
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to fetch account details, please try again!',
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to process request, required field error!',
        });
    }
}

function resetPassword(req, res) {
    if (req.body.mobile && req.body.mobile_code && req.body.password) {
        UserCollection.doc((parseInt(req.body.mobile)).toString()).get().then((response) => {
            if (!response.exists) {
                res.status(400);
                return res.json({
                    success: false,
                    message: `Account doesn't exist, please create account!`,
                });
            } else {
                const usersData = response.data();
                if ((parseInt(usersData['mobile_code']) == parseInt(req.body.mobile_code))) {
                    const updateData = {
                        mobile_verified: true,
                        password: req.body.password,
                        status: 'active'
                    };
                    UserCollection.doc((parseInt(req.body.mobile)).toString()).update(updateData).then((response) => {
                        res.status(200);
                        return res.json({
                            success: true,
                            message: 'Password updated successfully!',
                        });
                    }).catch((error) => {
                        res.status(400);
                        return res.json({
                            success: false,
                            message: 'Unable to update password, please try again!',
                        });
                    });
                } else {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: `Unable to update password, verification code doesn't match!`,
                    });
                }
            }
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to fetch account details, please try again!',
                error: error
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to update password, required field error!',
        });
    }
}

function fetchSingleUser(req, res) {
    if (req.body.mobile) {
        UserCollection.doc((parseInt(req.body.mobile)).toString()).get().then((response) => {
            if (!response.exists) {
                res.status(400);
                return res.json({
                    success: false,
                    message: `Unable to fetch user details, account doesn't exist!`,
                });
            } else {
                const userData = response.data();
                res.status(200);
                return res.json({
                    success: true,
                    message: 'Data fetched successfully!',
                    data: userData
                });
            }
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to fetch user details, please try again!',
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch user details, required field error!',
        });
    }
}

function fetchAllUser(req, res) {
    UserCollection.get().then((snapshot) => {
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
            message: 'Unable to fetch user data!',
            data: error
        });
    });
}

function fetchCustomUser(req, res) {
    const params = req.body;
    UserCollection.where(params.key, params.condition, params.value).get().then((response) => {
        if (response.empty) {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to fetch data, No matching record found!',
            });
        } else {
            let finalData = [];
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
            if (req.body.sort_by) {
                finalData = _.sortBy(finalData, req.body.sort_by);
            } else {
                finalData = _.sortBy(finalData, 'created_at').reverse();
            }
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

function searchUser(req, res) {
    const params = req.body;
    UserCollection.where(params.key, params.condition, params.value).get().then((response) => {
        if (response.empty) {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to fetch data, No matching record found!',
            });
        } else {
            let finalData = [];
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

function updateUser(req, res) {
    if (req.body.mobile) {
        UserCollection.doc((parseInt(req.body.mobile)).toString()).get().then((response) => {
            if (!response.exists) {
                res.status(400);
                return res.json({
                    success: false,
                    message: `Account doesn't exist, please create account!`,
                });
            } else {
                const usersData = UserModal.returnUpdatedUserData(response.data(), req.body);
                UserCollection.doc((parseInt(req.body.mobile)).toString()).update(usersData).then((response) => {
                    res.status(200);
                    return res.json({
                        success: true,
                        message: 'Profile updated successfully!',
                    });
                }).catch((error) => {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'Unable to update profile, please try again!',
                    });
                });
            }
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to update profile, please try again!',
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to update profile, required field error!',
        });
    }
}

function removeUser(req, res) {
    res.status(200);
    return res.json({
        success: true,
        message: 'User removed successfully!',
    });
}

function verifyBookingUserAccount(req, res) {
    if (req.body.mobile) {
        UserCollection.doc((parseInt(req.body.mobile)).toString()).get().then((response) => {
            if (!response.exists) {
                sendBookingVerificationCode(req, res);
            } else {
                const userData = response.data();
                if (userData['user_type'] == 'customer') {
                    if (userData['mobile_verified'] || userData['email_verified']) {
                        const payload = {
                            parent: userData['parent'],
                            user_type: userData['user_type'],
                            salutation: userData['salutation'],
                            first_name: userData['first_name'],
                            last_name: userData['last_name'],
                            gender: userData['gender'],
                            mobile: userData['mobile'],
                            email: userData['email'],
                            profile_picture: userData['profile_picture'],
                            login_time: new Date()
                        };
                        const tokenData = jwt.sign({ data: payload }, config.server_secret, { expiresIn: config.token_expire });
                        res.status(200);
                        return res.json({
                            success: true,
                            message: 'User verified successfully!',
                            token: tokenData
                        });
                    } else {
                        sendBookingVerificationCode(req, res);
                    }
                } else {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'Unable to verify user account, you are a vendor. Please use another account!',
                    });
                }
            }
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to verify user account, please try again!',
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to verify user account, required field error!',
        });
    }
}

function sendBookingVerificationCode(req, res) {
    const usersData = UserModal.returnNewUserData(req.body);
    usersData['user_type'] = 'customer';
    UserCollection.doc((parseInt(req.body.mobile)).toString()).set(usersData).then((response) => {

        // Send mobile verification code start
        const smsData = {
            mobile: usersData.mobile,
            message: `Dear ${usersData.first_name}, Your mobile verification code is ${usersData.mobile_code}. Please do not share it with anyone. NSG TAXI`,
        };
        SMS.sendCustomSMS(smsData).then((smsResponse) => { });
        // Send mobile verification code end

        // Send email verification code start
        const mailData = {
            to: usersData['email'],
            subject: `Email Verification | NSG TAXI`,
            html: Mailer.returnMailVerificationMailer(usersData)
        };
        Mail.sendCustomMail(mailData).then((mailResponse) => { });
        // Send email verification code end

        res.status(200);
        return res.json({
            success: false,
            message: 'Verification code send successfully!',
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to verify user account, please try again!',
        });
    });
}

function verifyHotelBookingUser(req, res) {
    if (req.body.mobile) {
        UserCollection.doc((parseInt(req.body.mobile)).toString()).get().then((response) => {
            if (!response.exists) {
                sendHotelBookingCode(req, res);
            } else {
                const userData = response.data();
                if (userData['user_type'] == 'customer') {
                    sendHotelBookingCode(req, res);
                } else {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'This mobile number is already in use, please use another mobile number!',
                    });
                }
            }
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to send verification code, please try again!',
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to send verification code, required field error!',
        });
    }
}

function sendHotelBookingCode(req, res) {
    if (req.body.mobile) {
        const usersData = UserModal.returnNewUserData(req.body);
        usersData['user_type'] = 'customer';
        UserCollection.doc((parseInt(req.body.mobile)).toString()).set(usersData).then((response) => {

            // Send mobile verification code start
            const smsData = {
                mobile: usersData.mobile,
                message: `Dear ${usersData.first_name}, Your mobile verification code is ${usersData.mobile_code}. Please do not share it with anyone. NSG TAXI`,
            };
            SMS.sendCustomSMS(smsData).then((smsResponse) => { });
            // Send mobile verification code end

            res.status(200);
            return res.json({
                success: true,
                message: 'Verification code send successfully!',
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to send verification code, please try again!',
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to send verification code, required field error!',
        });
    }
}

function verifyHotelBookingCode(req, res) {
    if (req.body.mobile) {
        UserCollection.doc((parseInt(req.body.mobile)).toString()).get().then((response) => {
            if (!response.exists) {
                res.status(400);
                return res.json({
                    success: false,
                    message: 'Unable to verify code, Please create account first!',
                });
            } else {
                const userData = response.data();
                if (userData['mobile_code'] == req.body.mobile_code) {
                    res.status(200);
                    return res.json({
                        success: true,
                        message: 'Mobile verified successfully!',
                    });
                } else {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'Invalid verification code, please use correct verification code!',
                    });
                }
            }
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to verify code, please try again!',
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to verify code, required field error!',
        });
    }
}