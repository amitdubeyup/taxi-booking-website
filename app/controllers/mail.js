const nodemailer = require('nodemailer');
const pdf = require('html-pdf');


module.exports = {
    sendMail: sendMail,
    sendCustomMail: sendCustomMail,
    sendBookingMail: sendBookingMail
}

function returnPDF(pdfBase64Data) {
    return new Promise((resolve, reject) => {
        const pdfHTML = base64Decode(pdfBase64Data);
        const pdfOption = {
            format: 'A4',
            orientation: 'portrait',
            orientation: 'portrait',
            border: {
                top: '20px',
                right: '0px',
                bottom: '20px',
                left: '0px'
            },
            paginationOffset: 1,
            header: {
                height: '40px',
                contents: `<div style="text-align: center;">NSG TAXI</div>`
            },
            footer: {
                height: '20px',
            }
        };
        pdf.create(pdfHTML, pdfOption).toBuffer(function (pdfError, pdfBuffer) {
            if (pdfError) {
                resolve({
                    success: false,
                    pdfBuffer: null
                });
            } else {
                resolve({
                    success: true,
                    pdfBuffer: pdfBuffer
                });
            }
        });
    });
}

function sendMail(req, res) {
    if (req.body.pdfBase64Data) {
        returnPDF(req.body.pdfBase64Data).then((pdfResponse) => {
            let mailOptions = null;
            if (pdfResponse['success']) {
                mailOptions = {
                    from: `NSG TAXI <info@nsgtaxi.com>`,
                    to: req.body.to,
                    subject: req.body.subject,
                    html: req.body.html,
                    attachments: [
                        {
                            filename: req.body.pdfName,
                            content: pdfResponse.pdfBuffer
                        }
                    ]
                };
            } else {
                mailOptions = {
                    from: `NSG TAXI <info@nsgtaxi.com>`,
                    to: req.body.to,
                    subject: req.body.subject,
                    html: req.body.html
                };
            }
            nodemailer.createTestAccount((err, account) => {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'info@nsgtaxi.com',
                        pass: 'Lifeistough@'
                    }
                });
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        res.status(400);
                        return res.json({
                            success: false,
                            message: 'Unable to send email with attachment!',
                            data: error
                        });
                    }
                    else {
                        res.status(200);
                        return res.json({
                            success: true,
                            message: 'Mail with attachment send successfully!',
                            data: info
                        });
                    }
                });
            });
        });
    } else {
        nodemailer.createTestAccount((err, account) => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'info@nsgtaxi.com',
                    pass: 'Lifeistough@'
                }
            });
            const mailOptions = {
                from: `NSG TAXI <info@nsgtaxi.com>`,
                to: req.body.to,
                subject: req.body.subject,
                html: req.body.html
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'Unable to send email!',
                        data: error
                    });
                }
                else {
                    res.status(200);
                    return res.json({
                        success: true,
                        message: 'Mail sent successfully!',
                        data: info
                    });
                }
            });
        });
    }
}

function sendCustomMail(mailData) {
    return new Promise((resolve, reject) => {
        if (mailData.pdfBase64Data) {
            returnPDF(mailData.pdfBase64Data).then((pdfResponse) => {
                let mailOptions = null;
                if (pdfResponse['success']) {
                    mailOptions = {
                        from: `NSG TAXI <info@nsgtaxi.com>`,
                        to: mailData.to,
                        subject: mailData.subject,
                        html: mailData.html,
                        attachments: [
                            {
                                filename: mailData.pdfName,
                                content: pdfResponse.pdfBuffer
                            }
                        ]
                    };
                } else {
                    mailOptions = {
                        from: `NSG TAXI <info@nsgtaxi.com>`,
                        to: mailData.to,
                        subject: mailData.subject,
                        html: mailData.html
                    };
                }
                nodemailer.createTestAccount((err, account) => {
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'info@nsgtaxi.com',
                            pass: 'Lifeistough@'
                        }
                    });
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            resolve({
                                success: false,
                                message: 'Unable to send email with attachment!',
                                data: error
                            });
                        }
                        else {
                            resolve({
                                success: true,
                                message: 'Mail with attachment send successfully!',
                                data: info
                            });
                        }
                    });
                });
            });
        } else {
            nodemailer.createTestAccount((err, account) => {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'info@nsgtaxi.com',
                        pass: 'Lifeistough@'
                    }
                });
                const mailOptions = {
                    from: `NSG TAXI <info@nsgtaxi.com>`,
                    to: mailData.to,
                    subject: mailData.subject,
                    html: mailData.html
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        resolve({
                            success: false,
                            message: 'Unable to send email!',
                            data: error
                        });
                    }
                    else {
                        resolve({
                            success: true,
                            message: 'Mail sent successfully!',
                            data: info
                        });
                    }
                });
            });
        }
    });
}

function base64Encode(data) {
    return Buffer.from(data).toString('base64');
}

function base64Decode(data) {
    return Buffer.from(data, 'base64').toString('utf-8');
}

function sendBookingMail(bookingData, vendorsEmail) {
    console.log(vendorsEmail);
}
