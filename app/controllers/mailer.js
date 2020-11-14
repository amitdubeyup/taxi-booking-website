module.exports = {
  returnBookingMailer: returnBookingMailer,
  returnRentalBookingMailer: returnRentalBookingMailer,
  returnForgotPasswordMailer: returnForgotPasswordMailer,
  returnRegisterAccountMailer: returnRegisterAccountMailer,
  returnContactMailer: returnContactMailer,
  returnMailVerificationMailer: returnMailVerificationMailer,
  returnVendorAgreementMailer: returnVendorAgreementMailer,
  returnHotelBookingMailer: returnHotelBookingMailer,
  returnPackageBookingMailer: returnPackageBookingMailer
}

function returnBookingMailer(bookingData) {
  return `<!DOCTYPE html>
    <html>

    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }

            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }

            img {
                -ms-interpolation-mode: bicubic;
            }

            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }

            table {
                border-collapse: collapse !important;
            }

            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
            }

            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }

            @media screen and (max-width: 480px) {
                .mobile-hide {
                    display: none !important;
                }

                .mobile-center {
                    text-align: center !important;
                }
            }

            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }
        </style>
    </head>

    <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                        <tr>
                            <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#ef6437">
                                <div
                                    style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                        style="max-width:300px;">
                                        <tr>
                                            <td align="left" valign="top"
                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;"
                                                class="mobile-center">
                                                <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">
                                                    NSG TAXI</h1>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;"
                                    class="mobile-hide">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                        style="max-width:300px;">
                                        <tr>
                                            <td align="right" valign="top"
                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                                <table cellspacing="0" cellpadding="0" border="0" align="right">
                                                    <tr>
                                                        <td
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
                                                            <p
                                                                style="font-size: 18px; font-weight: 400; margin: 0; color: #ffffff;">
                                                                <a href="https://www.nsgtaxi.com/" target="_blank"
                                                                    style="color: #ffffff; text-decoration: none;">Booking
                                                                    &nbsp;</a></p>
                                                        </td>
                                                        <td
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;">
                                                            <img
                                                                    src="https://www.nsgtaxi.com/assets/images/mailer/car.png" width="27" height="23"
                                                                    style="display: block; border: 0px;" />
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;"
                                bgcolor="#ffffff">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:600px;">
                                    <tr>
                                        <td align="center"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 50px;">
                                            <img src="https://www.nsgtaxi.com/assets/images/mailer/check.png" width="150" height="120"
                                                style="display: block; border: 0px;" /><br>
                                            <h2
                                                style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">
                                                Thank You For Your Booking!
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                            <p
                                                style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;">
                                                Dear Customer, Your booking has been confirmed with <strong>${bookingData['car_type']}</strong> at <strong>${bookingData['pickup_time']}</strong> on <strong>${bookingData['pickup_date']}</strong>. Your reference number is <strong>${bookingData['created_at']}</strong>.
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                        Personal Details
                                                    </td>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                        Name
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                        ${bookingData['first_name']} ${bookingData['last_name']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Gender
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        ${bookingData['gender']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Mobile
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        +91-${bookingData['mobile']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Email
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        ${bookingData['email']}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                        Address Details
                                                    </td>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                        Pickup Address
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                        ${bookingData['pickup_address']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Drop-off Address
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        ${bookingData['drop_off_address']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                        Distance
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                        ${bookingData['actual_distance']}KM
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                        Fare Details
                                                    </td>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Total Amount
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        &#8377;${bookingData['total_fare']}.00
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Discount Amount
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        &#8377;${bookingData['discount_amount']}.00
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Paid Amount
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        &#8377;${bookingData['payment_amount']}.00
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                                        Total Payable Amount
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                                        &#8377;${bookingData['total_fare'] - bookingData['discount_amount'] - bookingData['payment_amount']}.00
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                           <div style="padding: 5px;font-size: 0.9rem;"><strong>Note 1:</strong> ${bookingData['note']}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left">
                                            <div style="padding: 5px;font-size: 0.9rem;"><strong>Note 2:</strong> If vehicle travels more than ${bookingData['actual_distance']}KM then you have to pay &#8377;${bookingData['fare_per_kilometer']} per kilometer extra.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                           <div style="padding: 5px;">We wish you a happy & safe journey.</div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" height="100%" valign="top" width="100%"
                                style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:660px;">
                                    <tr>
                                        <td align="center" valign="top" style="font-size:0;">
                                            <div
                                                style="display:inline-block; min-width:240px; vertical-align:top; width:100%;">

                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                    style="max-width:300px;">
                                                    <tr>
                                                        <td align="left" valign="top"
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                            <p style="margin-bottom: 0px;">Thanks & Regards</p>
                                                            <p style="margin-top: 5px;">NSG Taxi Team</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style=" padding: 35px; background-color: #ef6437;" bgcolor="#ef6437">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:600px;">
                                    <tr>
                                        <td align="center"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 50px;">
                                            <h2
                                                style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;">
                                                Planning Journey?
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="padding: 50px 0 15px 0;">
                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center" style="border-radius: 5px;" bgcolor="#66b3b7">
                                                        <a href="https://www.nsgtaxi.com/customer-login" target="_blank"
                                                            style="font-size: 18px; font-family: Open Sans, Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 5px; background-color: #94b347; padding: 15px 30px; display: block;">Book Now</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:600px;">
                                    <tr>
                                        <td align="center">
                                            <img src="https://www.nsgtaxi.com/assets/images/company/logo-110-40.png" style="display: block; border: 0px;" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px; padding: 5px 0 10px 0;">
                                            <p
                                                style="font-size: 14px; font-weight: 800; line-height: 18px; color: #333333;">
                                                Address: Shop No. 209, Central Arcade, DLF-2<br>
                                Gurugram, Haryana 122002 - India
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;">
                                            <p
                                                style="font-size: 14px; font-weight: 400; line-height: 20px; color: #777777;">
                                                We are available 24X7. You can reach us at  <a href="mailto:info@nsgtaxi.com" style="    color: #b656e6;
                                                text-decoration: none;">info@nsgtaxi.com</a> or <a href="tel:+911244077634" style="    color: #b656e6;
        text-decoration: none;">+91-124-4077634</a>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td bgcolor="#ffffff" align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#ffffff" align="center"
                                style="padding: 30px 30px 30px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;">
                                <p style="margin: 0;"><a
                                        href="https://www.nsgtaxi.com/"
                                        style="color: #5db3ec;text-decoration: none;">NSG TAXI</a></p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>

    </html>`
}

function returnRentalBookingMailer(rentalBookingData) {
  return `<!DOCTYPE html>
    <html>

    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }

            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }

            img {
                -ms-interpolation-mode: bicubic;
            }

            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }

            table {
                border-collapse: collapse !important;
            }

            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
            }

            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }

            @media screen and (max-width: 480px) {
                .mobile-hide {
                    display: none !important;
                }

                .mobile-center {
                    text-align: center !important;
                }
            }

            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }
        </style>
    </head>

    <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                        <tr>
                            <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#ef6437">
                                <div
                                    style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                        style="max-width:300px;">
                                        <tr>
                                            <td align="left" valign="top"
                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;"
                                                class="mobile-center">
                                                <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">
                                                    NSG TAXI</h1>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;"
                                    class="mobile-hide">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                        style="max-width:300px;">
                                        <tr>
                                            <td align="right" valign="top"
                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                                <table cellspacing="0" cellpadding="0" border="0" align="right">
                                                    <tr>
                                                        <td
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
                                                            <p
                                                                style="font-size: 18px; font-weight: 400; margin: 0; color: #ffffff;">
                                                                <a href="https://www.nsgtaxi.com/" target="_blank"
                                                                    style="color: #ffffff; text-decoration: none;">Booking
                                                                    &nbsp;</a></p>
                                                        </td>
                                                        <td
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;">
                                                            <img src="https://www.nsgtaxi.com/assets/images/mailer/car.png"
                                                                width="27" height="23"
                                                                style="display: block; border: 0px;" />
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;"
                                bgcolor="#ffffff">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:600px;">
                                    <tr>
                                        <td align="center"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 50px;">
                                            <img src="https://www.nsgtaxi.com/assets/images/mailer/check.png" width="150"
                                                height="120" style="display: block; border: 0px;" /><br>
                                            <h2
                                                style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">
                                                Thank You For Your Booking!
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                            <p
                                                style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;">
                                                Dear Customer, Your booking has been confirmed with
                                                <strong>${rentalBookingData['rental_car_type']}</strong> at
                                                <strong>${rentalBookingData['rental_pickup_time']}</strong> on
                                                <strong>${rentalBookingData['rental_pickup_date']}</strong>. Your reference
                                                number is <strong>${rentalBookingData['created_at']}</strong>.
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                        Personal Details
                                                    </td>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                        Name
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;text-transform: capitalize;">
                                                        ${rentalBookingData['salutation']} ${rentalBookingData['first_name']} ${rentalBookingData['last_name']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Gender
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        ${rentalBookingData['gender']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Mobile
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        +91-${rentalBookingData['mobile']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Email
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        ${rentalBookingData['email']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Pickup Address
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        ${rentalBookingData['rental_pickup_address']}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                        Fare Details
                                                    </td>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                        Package Details
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                        ${rentalBookingData['package_type'].split(',')[0]} Hour -
                                                        ${rentalBookingData['package_type'].split(',')[1]} KM
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Amount
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        &#8377;${rentalBookingData['base_fare']}.00
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        GST(5%)
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        &#8377;${rentalBookingData['gst_charge']}.00
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Fare Amount
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        &#8377;${rentalBookingData['total_fare']}.00
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Discount Amount
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        &#8377;${rentalBookingData['discount_amount']}.00
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Paid Amount
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        &#8377;${rentalBookingData['payment_amount']}.00
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                                        Total Payable Amount
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                                        &#8377;${rentalBookingData['total_fare'] -
        rentalBookingData['discount_amount'] -
        rentalBookingData['payment_amount']}.00
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <div style="padding: 5px;font-size: 0.9rem;"><strong>Note 1:</strong>${rentalBookingData['note']}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left">
                                          <div style="padding: 5px;font-size: 0.9rem;"><strong>Note 2:</strong> If vehicle travels more than ${rentalBookingData['actual_distance']}KM then you have to pay &#8377;${rentalBookingData['fare_per_kilometer']} per kilometer extra.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <div style="padding: 5px;">We wish you a happy & safe journey.</div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" height="100%" valign="top" width="100%"
                                style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:660px;">
                                    <tr>
                                        <td align="center" valign="top" style="font-size:0;">
                                            <div
                                                style="display:inline-block; min-width:240px; vertical-align:top; width:100%;">

                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                    style="max-width:300px;">
                                                    <tr>
                                                        <td align="left" valign="top"
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                            <p style="margin-bottom: 0px;">Thanks & Regards</p>
                                                            <p style="margin-top: 5px;">NSG Taxi Team</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style=" padding: 35px; background-color: #ef6437;" bgcolor="#ef6437">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:600px;">
                                    <tr>
                                        <td align="center"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 50px;">
                                            <h2
                                                style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;">
                                                Planning another journey?
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="padding: 50px 0 15px 0;">
                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center" style="border-radius: 5px;" bgcolor="#66b3b7">
                                                        <a href="https://www.nsgtaxi.com/" target="_blank"
                                                            style="font-size: 18px; font-family: Open Sans, Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 5px; background-color: #94b347; padding: 15px 30px; display: block;">Book
                                                            Now</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:600px;">
                                    <tr>
                                        <td align="center">
                                            <img src="https://www.nsgtaxi.com/assets/images/company/logo-110-40.png"
                                                style="display: block; border: 0px;" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px; padding: 5px 0 10px 0;">
                                            <p
                                                style="font-size: 14px; font-weight: 800; line-height: 18px; color: #333333;">
                                                Address: Shop No. 209, Central Arcade, DLF-2<br>
                                                Gurugram, Haryana 122002 - India
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;">
                                            <p
                                                style="font-size: 14px; font-weight: 400; line-height: 20px; color: #777777;">
                                                We are available 24X7. You can reach us at <a href="mailto:info@nsgtaxi.com"
                                                    style="    color: #b656e6;
                                                    text-decoration: none;">info@nsgtaxi.com</a> or <a
                                                    href="tel:+911244077634" style="    color: #b656e6;
            text-decoration: none;">+91-124-4077634</a>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td bgcolor="#ffffff" align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#ffffff" align="center"
                                style="padding: 30px 30px 30px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;">
                                <p style="margin: 0;"><a href="https://www.nsgtaxi.com/"
                                        style="color: #5db3ec;text-decoration: none;">NSG TAXI</a></p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>

    </html>`;
}

function returnForgotPasswordMailer(forgotData) {
  return `<!DOCTYPE html>
    <html>

    <head>

        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Forgot Password</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Source Sans Pro';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                }

                @font-face {
                    font-family: 'Source Sans Pro';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                }
            }

            body,
            table,
            td,
            a {
                -ms-text-size-adjust: 100%;
                /* 1 */
                -webkit-text-size-adjust: 100%;
                /* 2 */
            }

            table,
            td {
                mso-table-rspace: 0pt;
                mso-table-lspace: 0pt;
            }

            img {
                -ms-interpolation-mode: bicubic;
            }

            a[x-apple-data-detectors] {
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                color: inherit !important;
                text-decoration: none !important;
            }

            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }

            body {
                width: 100% !important;
                height: 100% !important;
                padding: 0 !important;
                margin: 0 !important;
            }

            table {
                border-collapse: collapse !important;
            }

            a {
                color: #1a82e2;
            }

            img {
                height: auto;
                line-height: 100%;
                text-decoration: none;
                border: 0;
                outline: none;
            }
        </style>

    </head>

    <body style="background-color: #e9ecef;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td align="center" bgcolor="#e9ecef">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="center" valign="top" style="padding: 36px 24px;">
                                <a href="https://www.nsgtaxi.com/" target="_blank" style="display: inline-block;">
                                <img src="https://www.nsgtaxi.com/assets/images/company/logo-110-40.png" border="0"
                                style="display: block;">
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td align="center" bgcolor="#e9ecef">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="left" bgcolor="#ffffff"
                                style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                                <h1
                                    style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                                    Forgot Password</h1>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td align="center" bgcolor="#e9ecef">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="left" bgcolor="#ffffff"
                                style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                <p style="margin: 0;">Dear <strong>${forgotData['name']}</strong>, you have opted for forgetting the password.
                                    Please find the code below to reset your customer account password. If you didn't
                                    request a new password, you can safely delete this email.</p>
                            </td>
                        </tr>
                        <tr>
                            <td align="left" bgcolor="#ffffff">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                            <table border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                                        <a href="javascript:void(0);"
                                                            style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 20px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                                                            ${forgotData['email_code']}
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="left" bgcolor="#ffffff"
                                style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                <p style="margin: 0;"><strong>Note: </strong>Please do not share it with anyone.</p><br>
                                <p style="margin: 0;">If you haven't done this, Please report us immediately on <a
                                        href="tel:+911244077634" style="    color: #b656e6;
                                    text-decoration: none;">+91-124-4077634</a> or <a href="mailto:info@nsgtaxi.com" style="    color: #b656e6;
                                    text-decoration: none;">info@nsgtaxi.com</a>.</p>
                            </td>
                        </tr>
                        <tr>
                            <td align="left" bgcolor="#ffffff"
                                style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                                <p style="margin: 0;">Cheers,<br> NSG TAXI</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td align="center" bgcolor="#e9ecef">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="center" valign="top" style="padding: 36px 24px;">
                                <a href="https://www.nsgtaxi.com/" target="_blank" style="display: inline-block;">
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>

    </html>`;
}

function returnRegisterAccountMailer(registerData) {
  return `<!DOCTYPE html>
    <html>

    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }

            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }

            img {
                -ms-interpolation-mode: bicubic;
            }

            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }

            table {
                border-collapse: collapse !important;
            }

            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
            }

            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }

            @media screen and (max-width: 480px) {
                .mobile-hide {
                    display: none !important;
                }

                .mobile-center {
                    text-align: center !important;
                }
            }

            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }
        </style>
    </head>

    <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                        <tr>
                            <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#ef6437">
                                <div
                                    style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                        style="max-width:300px;">
                                        <tr>
                                            <td align="left" valign="top"
                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;"
                                                class="mobile-center">
                                                <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">
                                                    Welcome</h1>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;"
                                    class="mobile-hide">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                        style="max-width:300px;">
                                        <tr>
                                            <td align="right" valign="top"
                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                                <table cellspacing="0" cellpadding="0" border="0" align="right">
                                                    <tr>
                                                        <td
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
                                                            <p
                                                                style="font-size: 18px; font-weight: 400; margin: 0; color: #ffffff;">
                                                                <a href="https://www.nsgtaxi.com/" target="_blank"
                                                                    style="color: #ffffff; text-decoration: none;">NSG TAXI
                                                                    &nbsp;</a></p>
                                                        </td>
                                                        <td
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;">
                                                            <img
                                                                    src="https://www.nsgtaxi.com/assets/images/mailer/car.png" width="27" height="23"
                                                                    style="display: block; border: 0px;" />
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;"
                                bgcolor="#ffffff">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:600px;">
                                    <tr>
                                        <td align="center"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 50px;">
                                            <img src="https://www.nsgtaxi.com/assets/images/mailer/check.png" width="150" height="120"
                                                style="display: block; border: 0px;" /><br>
                                            <h2
                                                style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">
                                                Thank You For Creating Account!
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                            <p
                                                style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;">
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                        Personal Details
                                                    </td>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                        Name
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                        ${registerData['first_name']} ${registerData['last_name']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Gender
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        ${registerData['gender']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Mobile
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        +91-${registerData['mobile']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Email
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        ${registerData['email']}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                           <div style="padding: 5px;font-family: Open Sans, Helvetica, Arial, sans-serif;color: #777777;"><strong>About: </strong>Welcome to NSG TAXI. NSG is an outstation taxi & cab service provider. We are present in more than 250+cities across India with 10000+ routes including cities where we provide outstation taxi services.</div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" height="100%" valign="top" width="100%"
                                style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:660px;">
                                    <tr>
                                        <td align="center" valign="top" style="font-size:0;">
                                            <div
                                                style="display:inline-block; min-width:240px; vertical-align:top; width:100%;">

                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                    style="max-width:300px;">
                                                    <tr>
                                                        <td align="left" valign="top"
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                            <p style="margin-bottom: 0px;">Thanks & Regards</p>
                                                            <p style="margin-top: 5px;">NSG Taxi Team</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style=" padding: 35px; background-color: #ef6437;" bgcolor="#ef6437">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:600px;">
                                    <tr>
                                        <td align="center"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 50px;">
                                            <h2
                                                style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;">
                                                ${registerData['user_type'] == 'customer' ? 'Planning Journey?' : 'Attach Your Taxi'}
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="padding: 50px 0 15px 0;">
                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center" style="border-radius: 5px;" bgcolor="#66b3b7">
                                                        <a href="https://www.nsgtaxi.com/${registerData['user_type']}-login" target="_blank"
                                                            style="font-size: 18px; font-family: Open Sans, Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 5px; background-color: #94b347; padding: 15px 30px; display: block;">
                                                            ${registerData['user_type'] == 'customer' ? 'Book Now' : 'Login Now'}
                                                            </a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:600px;">
                                    <tr>
                                        <td align="center">
                                            <img src="https://www.nsgtaxi.com/assets/images/company/logo-110-40.png" style="display: block; border: 0px;" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px; padding: 5px 0 10px 0;">
                                            <p
                                                style="font-size: 14px; font-weight: 800; line-height: 18px; color: #333333;">
                                                Address: Shop No. 209, Central Arcade, DLF-2<br>
                                Gurugram, Haryana 122002 - India
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;">
                                            <p
                                                style="font-size: 14px; font-weight: 400; line-height: 20px; color: #777777;">
                                                We are available 24X7. You can reach us at  <a href="mailto:info@nsgtaxi.com" style="    color: #b656e6;
                                                text-decoration: none;">info@nsgtaxi.com</a> or <a href="tel:+911244077634" style="    color: #b656e6;
        text-decoration: none;">+91-124-4077634</a>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td bgcolor="#ffffff" align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#ffffff" align="center"
                                style="padding: 30px 30px 30px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;">
                                <p style="margin: 0;"><a
                                        href="https://www.nsgtaxi.com/"
                                        style="color: #5db3ec;text-decoration: none;">NSG TAXI</a></p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>

    </html>`;
}

function returnContactMailer(contactData) {
  return `<!DOCTYPE html>
    <html>

    <body>
        <div style="width: 100%;">
            <div style="width: 70%;margin: auto;padding: 15px 15px 15px 30px;margin-top: 75px;">Hi, Someone has contacted through the website. Please see the message below.</div>
            <table style="width: 70%;margin: auto;border: 2px solid #e6dede;border-radius: 4px;padding: 15px;margin-top: 10px;">
                <tr>
                    <td style="text-align: left;    padding: 10px 0px;"><strong>Name</strong></td>
                    <td style="text-align: right;    padding: 10px 0px;">${contactData['name']}</td>
                </tr>
                <tr>
                    <td style="text-align: left;    padding: 10px 0px;"><strong>Mobile</strong></td>
                    <td style="text-align: right;    padding: 10px 0px;">+91-${contactData['mobile']}</td>
                </tr>
                <tr>
                    <td style="text-align: left;    padding: 10px 0px;"><strong>Email</strong></td>
                    <td style="text-align: right;    padding: 10px 0px;">${contactData['email']}</td>
                </tr>
                <tr>
                    <td style="text-align: left;    padding: 10px 0px;"><strong>Message</strong></td>
                    <td style="text-align: right;    padding: 10px 0px;">${contactData['message']}</td>
                </tr>
            </table>
            <div style="width: 70%;margin: auto;padding: 15px 15px 15px 30px;margin-top: 40px;">
                Cheers,<br><br> NSG TAXI
            </div>
        </div>
    </body>

    </html>`;
}

function returnMailVerificationMailer(userData) {
  return `<!DOCTYPE html>
    <html>

    <head>

        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Verify Email</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Source Sans Pro';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                }

                @font-face {
                    font-family: 'Source Sans Pro';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                }
            }

            body,
            table,
            td,
            a {
                -ms-text-size-adjust: 100%;
                /* 1 */
                -webkit-text-size-adjust: 100%;
                /* 2 */
            }

            table,
            td {
                mso-table-rspace: 0pt;
                mso-table-lspace: 0pt;
            }

            img {
                -ms-interpolation-mode: bicubic;
            }

            a[x-apple-data-detectors] {
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                color: inherit !important;
                text-decoration: none !important;
            }

            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }

            body {
                width: 100% !important;
                height: 100% !important;
                padding: 0 !important;
                margin: 0 !important;
            }

            table {
                border-collapse: collapse !important;
            }

            a {
                color: #1a82e2;
            }

            img {
                height: auto;
                line-height: 100%;
                text-decoration: none;
                border: 0;
                outline: none;
            }
        </style>

    </head>

    <body style="background-color: #e9ecef;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td align="center" bgcolor="#e9ecef">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="center" valign="top" style="padding: 36px 24px;">
                                <a href="https://www.nsgtaxi.com/" target="_blank" style="display: inline-block;">
                                    <img src="https://www.nsgtaxi.com/assets/images/company/logo-110-40.png" border="0"
                                        style="display: block;">
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td align="center" bgcolor="#e9ecef">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="left" bgcolor="#ffffff"
                                style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                                <h1
                                    style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                                    Verify Email</h1>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td align="center" bgcolor="#e9ecef">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="left" bgcolor="#ffffff"
                                style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                <p style="margin: 0;">Dear <strong>${userData['first_name']}</strong>, You have just signup with us. Please find the code below to verify your email address. If you haven't created an account, you can safely delete this email.</p>
                            </td>
                        </tr>
                        <tr>
                            <td align="left" bgcolor="#ffffff">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                            <table border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                                        <a href="javascript:void(0);"
                                                            style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 20px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                                                            ${userData['email_code']}
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="left" bgcolor="#ffffff"
                                style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                <p style="margin: 0;"><strong>Note: </strong>Please do not share it with anyone.</p><br>
                                <p style="margin: 0;">If you haven't done this, Please report us immediately on <a
                                        href="tel:+911244077634" style="    color: #b656e6;
                                    text-decoration: none;">+91-124-4077634</a> or <a href="mailto:info@nsgtaxi.com" style="    color: #b656e6;
                                    text-decoration: none;">info@nsgtaxi.com</a>.</p>
                            </td>
                        </tr>
                        <tr>
                            <td align="left" bgcolor="#ffffff"
                                style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                                <p style="margin: 0;">Cheers,<br> NSG TAXI</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td align="center" bgcolor="#e9ecef">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="center" valign="top" style="padding: 36px 24px;">
                                <a href="https://www.nsgtaxi.com/" target="_blank" style="display: inline-block;">
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>

    </html>`;
}

function returnVendorAgreementMailer(vendorData) {
  return base64Encode(`<!DOCTYPE html>
    <html>

    <head>

        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Vendor Agreement</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Source Sans Pro';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                }

                @font-face {
                    font-family: 'Source Sans Pro';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                }
            }

            body{
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
            }

            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }

            body {
                width: 100% !important;
                height: 100% !important;
                padding: 0 !important;
                margin: 0 !important;
            }
            table, tbody, thead, tr, td, th {
                border: 1px solid gray;
                border-collapse: collapse;
            }
            td, th {
                padding: 10px;
                text-align: center;
            }
            .privacy-section{
                padding: 40px;
            }
            *{
                font-size: 14px !important;
            }
        </style>

    </head>

    <body>
        <div class="privacy-section">
            <h4 class="p1"><strong>Vendor Agreement</strong></h4>

            <p><span style="font-weight: 400;">This </span><strong>Agreement</strong><span style="font-weight: 400;">&rsquo;
                    is agreed and entered on the </span><strong>Effective </strong><span style="font-weight: 400;">Date by
                    and between:</span></p>
            <p><strong>NSGA Travels Private Limited, </strong><span style="font-weight: 400;">a company registered under the
                    Companies Act, 1956, with its principal office at Address: Shop No. 209, Central Arcade, DLF-2, Gurugram, Haryana 122002 - India. including its
                    successors and assignees thereof, and</span> <strong>The Cab vendor</strong><span
                    style="font-weight: 400;">, as detailed further in Annexure 1.</p>
            <p><span style="font-weight: 400;">NSG TAXI &amp; the Cab vendor are individually referred to as
                    &lsquo;Party&rsquo; and collectively as &lsquo;Parties&rsquo;. NSG TAXI referred collectively as
                    &lsquo;Facilitators&rsquo;.</span></p>
            <h4><strong>PREAMBLE:</strong></h4>
            <ul>
                <li><strong><span style="font-weight: 400;">The Facilitators are engaged in the business of providing travel
                            and tourism related services.</span></strong></li>
            </ul>
            <ul>
                <li><span style="font-weight: 400;">The Cab vendor is engaged in the business of providing passenger
                        transportation services using vehicles (&ldquo;</span><strong>Cab Transportation
                        Services</strong><span style="font-weight: 400;">&rdquo;). The Cab vendor has represented to
                        Facilitators that it has the necessary legal, technical, and business setup to procure the
                        facilitation services as defined in this Agreement.</span></li>
            </ul>
            <ul>
                <li><span style="font-weight: 400;">The Facilitators and Cab vendor desire to enter into this Agreement to
                        bind themselves with their mutual obligations as prescribed hereunder.</span></li>
            </ul>
            <h4><strong>NOW THEREFORE THE&nbsp;VENDOR HERE TO AGREE TO THIS AGREEMENT TERMS AS FOLLOWS</strong><span
                    style="font-weight: 400;">:</span></h4>
            <p><strong>SCOPE OF SERVICES</strong></p>
            <ul>
                <li><strong><span style="font-weight: 400;">The Cab vendor will provide to the Facilitators information with
                            respect to the availability of Cab Transportation Services and their &ldquo;Gross Rate&rdquo; to
                            Facilitators on a direct connection (API Linking), or through any other mode as may be decided
                            between the Parties.</span></strong></li>
            </ul>
            <ul>
                <li><span style="font-weight: 400;">Facilitators may then host the availability of the Cab Transportation
                        Services on the websites and other online and offline sales channels (including mobile applications
                        or browsers, branch offices, b2b partners etc.) of the Facilitators and their Affiliates.</span>
                </li>
            </ul>
            <ul>
                <li><span style="font-weight: 400;">NSG TAXI would be rendering services as a facilitator arranging booking
                        of the Cab Transportation Services between Cab vendor and customers. Accordingly, only the Cab
                        vendor shall be responsible for provision of transportation services to the customers booking the
                        Cab.</span></li>
            </ul>
            <h4><strong>COMMERCIAL TERMS</strong></h4>
            <p><strong>GROSS RATE:</strong></p>
            <ul>
                <li><strong><strong>&ldquo;</strong><span style="font-weight: 400;">Gross Rate&rdquo; is the rate notified
                            by the Cab vendor to Facilitators as the listing price of the Cab Transportation Services
                            excluding any applicable government taxes and Goods and Services Tax (&ldquo;GST&rdquo;) unless
                            otherwise stated, at which the customer would confirm the Cab Transportation Services through
                            Facilitators.</span></strong></li>
            </ul>
            <ul>
                <li><strong><span style="font-weight: 400;">Facilitators shall not alter the Gross Rate notified by the Cab
                            vendor.</span></strong></li>
            </ul>
            <ul>
                <li><strong><span style="font-weight: 400;">Unless explicitly provided otherwise in this Agreement,
                            Facilitators shall provide customer reservations at the Gross Rate along with applicable
                            taxes..</span></strong></li>
            </ul>
            <h4><strong>PROMOTIONAL SCHEMES</strong></h4>
            <p><span style="font-weight: 400;">If the Cab vendor is offering any promotional sales of Cab Transportation
                    Services at discounted prices compared to usual Gross Rate, the Cab vendor shall ensure that the same
                    discounted prices shall be offered to the customers booking through Facilitators.</span></p>
            <p><span style="font-weight: 400;">The Facilitators may, at its sole discretion, offer certain promotions to the
                    customers, except on any specific dates duly informed by the Cab vendor to Facilitators at least 5
                    (five) working days in advance.</span></p>
            <h4><strong>COMMISSION</strong></h4>
            <p><span style="font-weight: 400;">The Parties may agree on the &ldquo;Commission&rdquo; for any transaction or
                    set of transactions. Such Commission shall be payable by the Cab vendor to the Facilitator, and shall
                    always be calculated as a percentage of the Gross Rate or as mutually agreed between the Parties. Any
                    promotional offers of the Facilitators shall not be reduced from the Gross Rate for the purpose of
                    calculation of Commission.</span></p>
            <p><span style="font-weight: 400;">The Commission shall be paid as a separate payment to Facilitators, or may be
                    set-off from payment collected from the customer, as may be decided by the Parties.</span></p>
            <h4><strong>EMAIL AGREEMENT OF THE COMMERCIAL TERMS</strong></h4>
            <p><span style="font-weight: 400;">The Parties can agree over email the above mentioned commercial terms
                    regarding Gross Rate.</span></p>
            <p><span style="font-weight: 400;">Commission and promotional schemes, on time to time basis.</span></p>
            <h4><strong>RIGHTS AND OBLIGATIONS OF THE CAB VENDOR</strong></h4>
            <p><span style="font-weight: 400;">The Cab vendor shall Ensure the availability of information with respect to
                    Cab Transportation Services on real-time basis.Be responsible for rates made available to the
                    Facilitator.Shall ensure rate parity, and service availability parity between Facilitators and other
                    travel agents, Cab vendor( Cab owner) will be responsible to any misshaping with the
                    travelers.&nbsp;</span><br /><span style="font-weight: 400;"></span></p>
            <p><strong>Provide Itself</strong></p>
            <p>Act in good faith and shall not in any way commit acts prejudicial to the interest of Facilitators or the
                customers booking through Facilitators including without limitation, acts which in Facilitators sole
                discretion may amount to defrauding Facilitators or its customers.</p>
            <ol style="padding: 0px 0px 5px 20px;">
                <ol style="padding: 0px 0px 5px 20px;">
                    <li style="font-weight: 400;"><span style="font-weight: 400;">Ensure that cancellation policy provided
                            in respect of bookings made through Facilitators shall be no less favourable than the policy
                            provided by the Cab vendor in respect of booking through any other third party or the Cab vendor
                            itself.</span></li>
                    <li style="font-weight: 400;"><span style="font-weight: 400;">Submit the necessary KYC documents as may
                            be required by the Facilitators from time to time.</span></li>
                    <li style="font-weight: 400;"><span style="font-weight: 400;">Not solicit reservations directly from
                            those customers booked through the Facilitators, and shall not market the Cab Transportation
                            Services to those customers directly.</span></li>
                    <li style="font-weight: 400;"><span style="font-weight: 400;">Resolve all customer grievances directly
                            with the customer. Facilitators may at its discretion operate a customer service facility to
                            resolve the grievances of the customers over phone and by co-ordinating with the Cab vendor, but
                            in all cases the ultimately responsibility remains with the Cab vendor to resolve the
                            grievances.Not charge any additional charges, taxes or levies (except where there is a statutory
                            change in the tax rate or any legislation governing taxation laws), over and above the Gross
                            Rate specified at the time of confirming the Cab Transportation Services.Provide services to the
                            customers booking through Facilitators as per best industry practice.It shall liable for
                            ensuring that the provisions of this Agreement including but not limited to the obligations of
                            Cab vendor shall be complied &lsquo;as is&rsquo; by any driver(s) operating the vehicles on
                            behalf of the Cab vendor.</span></li>
                </ol>
            </ol>
            <h4><strong>GENERAL OBLIGATIONS OF THE PARTIES</strong></h4>
            <p><span style="font-weight: 400;">The description of the Cab Transportation Services at Cab vendor&rsquo;s
                    website should be consistent with the information as provided by Cab vendor pursuant to this Agreement
                    and such Cab Transportation Services should be actually provided for by the Cab vendor in line with the
                    description. In case the specified Cab Transportation Services (as per the specification shared by the
                    Cab vendor) are not provided by the Cab vendor, the Cab vendor shall be solely responsible to the
                    customer for any complaint in respect of the same.Any adverse change(s) in the confirmation terms as
                    provided by the Cab vendor, including the cancellation policy, refund policy etc. shall only be
                    applicable with prospective effect for bookings made after the implementation of the revised
                    terms.</span><strong><br /></strong></p>
            <h4><strong>TERM AND TERMINATION</strong></h4>
            <ol style="padding: 0px 0px 5px 20px;">
                <ol style="padding: 0px 0px 5px 20px;">
                    <li style="font-weight: 400;"><span style="font-weight: 400;">The Agreement shall commence from the
                            Effective Date and be continue to be valid unless terminated by either Party with 30 (thirty)
                            days&rsquo; notice to the other Party anytime during the term of this Agreement.</span></li>
                    <li style="font-weight: 400;"><span style="font-weight: 400;">In addition, either Party may terminate
                            this Agreement with immediate notice for material breach of the terms of this Agreement by the
                            other Party or for any statutory reasons; in case of a breach by a Party capable of being cured,
                            the other Party may terminate this Agreement with immediate notice if the former Party fails to
                            cure the breach within 15 (fifteen) days&rsquo; from the date the latter Party notifies the
                            breach.</span></li>
                    <li style="font-weight: 400;"><span style="font-weight: 400;">The accrued obligations of a Party prior
                            to termination of this Agreement, for any reason whatsoever, shall continue to be binding on
                            that respective Party those are completely discharged. The Cab vendor shall continue to provide
                            the Cab Transportation Services for the confirmations accepted by it prior to the date of
                            termination.</span></li>
                </ol>
            </ol>
            <h4><strong>INDEMNITY</strong></h4>
            <ol style="padding: 0px 0px 5px 20px;">
                <ol style="padding: 0px 0px 5px 20px;">
                    <li style="font-weight: 400;"><span style="font-weight: 400;">Pursuant to assurance of Cab vendor, once
                            cab booking has been confirmed to the customer booking through Facilitators, the Cab vendor will
                            honor the booking without fail. In the extreme cases where the Cab vendor fails to honor the
                            booking for any reason whatsoever, the Cab vendor may directly arrange or authorise the
                            Facilitators (at the Cab vendor&rsquo;s expense) to arrange, an alternate transportation option,
                            in same or better vehicle category. In the event no alternate option is provided to the customer
                            or if the customer requests for a refund, the Cab vendor authorizes the Facilitators to refund
                            the Sell Rate along with compensation (1) extending up to 100% of the Gross Rate, or (2) above
                            100% of the Gross Rate with Cab vendor&rsquo;s approval. The Cab vendor further authorizes the
                            Facilitators to pay any cost as may be incurred by the Facilitators to settle the
                            customer&rsquo;s issue (including legal and litigation costs) in all cases where either a refund
                            was processed or an alternate transportation was provided to the customer under this
                            Clause.</span></li>
                    <li style="font-weight: 400;"><span style="font-weight: 400;">Each Party agrees to indemnify and hold
                            the other Party, its officers, directors, employees, successors, and assigns harmless against
                            all losses, damages, liabilities, costs or expenses of whatever form or nature, including,
                            without limitation, attorney's fees and expenses and other costs of legal defence whether direct
                            or indirect, that they, or any of them, may sustain or incur as a result of any acts or
                            omissions of the former Party or any of its directors, officers, employees, or agents,
                            including, but not limited to (1) breach of any of the provisions/obligations of this Agreement,
                            (2) negligence, misconduct or other tortuous conduct, or (3) misrepresentations made
                            herein.</span></li>
                    <li style="font-weight: 400;"><span style="font-weight: 400;">Neither Party shall be liable to the other
                            for any indirect, incidental, punitive, special or consequential damages or losses (including
                            without limitation loss of profit or revenue etc.), whether under contract or in tort, and even
                            if the other party had been advised of the possibility of such damage or loss. Notwithstanding
                            anything to the contrary in this contract, in case of any dispute (including third party claims)
                            the maximum liability of Facilitators under this Agreement is limited to the commission paid to
                            Facilitators by the Cab vendor during the period of 12 months preceding the date of dispute for
                            that specific Cab Transportation Service of the Cab.</span></li>
                </ol>
            </ol>
            <h4><strong>REPRESENTATIONS AND WARRANTIES</strong></h4>
            <p><span style="font-weight: 400;">Each Party represents and warrants to the other Party that:It has full legal
                    right, power and authority to carry on its business and to enter into this Agreement and perform all of
                    its obligations, terms and conditions hereunder; and Neither the execution nor delivery of this
                    Agreement, nor the fulfilment nor compliance with the terms and provisions hereof, will conflict with,
                    or result in a breach of terms, conditions or provisions of, or constitute a default under, or result in
                    any violation of its charter documents or by laws, if any, or any agreement, restrictions, instrument,
                    order, judgment, decree, statute, law, rule or regulation to which it is subject, or require any
                    consent, approval or other action by any court, tribunal, administrative or governmental body.The
                    information they have disclosed pursuant to the Agreement including the Annexures is true, accurate and
                    complete.</span></p>
            <p><span style="font-weight: 400;">The Cab vendor additionally represents and warrants that:</span></p>
            <ol style="padding: 0px 0px 5px 20px;">
                <ol style="padding: 0px 0px 5px 20px;">
                    <li style="font-weight: 400;"><span style="font-weight: 400;">It is operating in compliance with all
                            the applicable laws, regulations and statutes, and it has the requisite licenses in place to
                            operate its business;</span></li>
                    <li style="font-weight: 400;"><span style="font-weight: 400;">It has full right, title and interest
                            in and to all trade names, trademarks, service marks, logos, symbols, proprietary marks and
                            other intellectual property marks ("</span><strong>IPR</strong><span
                            style="font-weight: 400;">") which it provides to Facilitators, for use related to the
                            Services, and that IPR does not infringe the rights of any third party; and</span></li>
                    <li style="font-weight: 400;"><span style="font-weight: 400;">It shall at all times be subject to
                            compliance with the requirements set out in Annexure 2.</span></li>
                    <li style="font-weight: 400;"><span style="font-weight: 400;">It further warrants that it has
                            obtained necessary authorizations to act for and on behalf of such driver(s) operating the
                            vehicles on behalf of the Cab vendor as per the applicable laws.</span></li>
                </ol>
            </ol>
            <h4><strong>Taxes</strong></h4>
            <p><span style="font-weight: 400;">Each Party with respect to the services
                rendered in its individual capacity, would be solely responsible for the compliance of all
                applicable laws including but not limited to legislations regarding GST, central, state or local
                levies with respect to payment of tax, duties, levies, charges, cess, etc.The Cab vendor authorizes
                Facilitators to collect the taxes (under the Applicable Laws) on behalf of Cab vendor from customers
                booking through Facilitators&rsquo; Portals. Such tax collected by Facilitators shall be remitted
                to&nbsp; the Cab vendor and it shall be the responsibility of Cab vendor to deposit the same to the
                concerned authority under applicable law. Facilitators shall not be liable to deposit such amount of
                tax unless specifically mandated by law. In cases where the Applicable Law requires Facilitators to
                deposit tax, the Cab vendor shall not be eligible to collect such tax from the customer through
                Facilitators.Facilitators maintain and operate an online web platform to facilitate reservation of
                cabs, therefore, and each of them qualify as an &ldquo;ecommerce operator&rdquo; under the
                provisions of Indian GST laws,As per GST Laws, Facilitators are responsible as a supplier and liable
                for charging, paying and depositing applicable GST on amount charged for the cab service booked by
                customers through Facilitators.Accordingly, the Cab vendor would not be supplier and therefore, is
                not liable to charge, pay and deposit GST on amount collected by Facilitators from the customers
                booking cab services through Facilitators.</span></p>
            <p><span style="font-weight: 400;">Facilitators would be responsible for issuing GST invoices towards the amount
                    collected along with applicable GST from the customers booking cab services through Facilitators.For the
                    service fee (if any) charged by Facilitators, Facilitators shall issue tax invoice on the customers for
                    the amount of service fee along with applicable taxes.All payments under contract will be subject to
                    applicable withholding tax provisions. The Party withholding the tax would be responsible for providing
                    appropriate proof, certificate, documents, etc. to enable the other Party claim the benefit of the
                    same.The Commission payable to the Facilitators will be exclusive of taxes. The Facilitators shall raise
                    periodic invoice on the Cab vendor for the amount of Commission along with GST at applicable rate.The
                    Parties would be responsible for their own tax assessments, audits, inquires, etc. and would keep the
                    other Party indemnified from any additional tax demand arising out of the same.Each Party undertakes to
                    provide the other Party with necessary documents, as may be required by law from time to time, to prove
                    such Party&rsquo;s compliance with the applicable tax laws with respect to this Agreement including its
                    obligations to deposit the necessary taxes with the authorities. Any interest, penalties or recoveries
                    from the either Party by any authority on account of default by the other Party will be solely borne by
                    the other Party on its own account.</span></p>
            <h4><strong>Confidentiality</strong></h4>
            <p><span style="font-weight: 400;">The Parties agree that any information (including any written, tangible or
                    intangible information) exchanged between or disclosed by either Party to the other Party from time to
                    time, which by its inherent nature is confidential or is specifically mentioned as confidential, shall
                    be the confidential information of the said Party and either Party shall not disclose the same to the
                    public without taking the prior written approval of the other Party.</span></p>
            <p><span style="font-weight: 400;"><strong>General</strong></span></p>
            <p><span style="font-weight: 400;">All benefits and rights under the Agreement will be available to each
                    Affiliate of the Facilitator as if the Affiliate is a contracting party to the Agreement. Affiliates
                    includes persons which are Controlled by the Facilitator, or under common Control of a person who is
                    controlling the Facilitator. Control means ability to, directly or indirectly, direct or cause the
                    direction of the management or policies of a person, whether through the ownership of voting securities,
                    by contract or otherwise.</span></p>
            <p><span style="font-weight: 400;">The Cab Transportation Services will be made available on the platform of the
                    Facilitators at the sole discretion of Facilitators; and the Cab vendor shall not have any rights to
                    insist specific performance by Facilitators.This Agreement is governed by the laws of India and Parties
                    agree to the exclusive jurisdiction of courts of New Delhi, India.The waiver of any right in this
                    Agreement shall be in writing and signed by the Party against whom enforcement is sought, and shall not
                    be a waiver of any other right in this Agreement.The Cab vendor shall not assign this Agreement to any
                    other person without the Facilitator&rsquo;s prior written consent.Any notices under this Agreement by a
                    Party to the other Party shall be issued&nbsp; to&nbsp; the&nbsp; respective&nbsp; Party&rsquo;s&nbsp;
                    address&nbsp; mentioned&nbsp; in &nbsp; this &nbsp; Agreement.Modifications to this Agreement may be
                    done by means of a separate amendment as an agreement signed by both Parties, by means of a revised link
                    sent by Facilitators and acceptance of the same by the Cab vendor or by means of a written communication
                    via email or otherwise by Facilitators which shall be deemed as acceptance by means of conduct by the
                    Cab vendor.Unless as otherwise specified in the Agreement, neither Party shall be responsible for any
                    failure to comply with its respective obligations under this Agreement, where such failure or delay is
                    due to events of Force Majeure (as defined below) provided that the affected Party notifies the non-
                    affected Party within reasonable time of the commencement of the event of Force Majeure. Force Majeure
                    events shall mean any circumstances beyond the reasonable control of Parties like war, riot, flood,
                    fire, Acts of God, epidemic, explosion, disease, earthquake, hijacking, sabotage, crime.This Agreement
                    and Annexures constitute the complete and exclusive statement of the Agreement between the Parties, and
                    supersedes all proposals, and all other prior or contemporaneous communications between the Parties
                    relating to the subject matter hereof, whether written or oral.</span></p>
            <p><span style="font-weight: 400;">The Parties acknowledge and agree that the relationship between them is that
                    of principal and agent to the limited extent of collection of payment by the Facilitators from the
                    customers on behalf of the Cab vendor for further remittance by the Facilitators to the Cab vendor.
                    Subject to the above exception, the Parties are operating independently and nothing in this Agreement is
                    to be construed as employer/employee, franchise/franchisee, partners, joint ventures, co-owners, or
                    otherwise participants in joint or common undertaking. The Facilitators shall be responsible for
                    collecting the concerned amount from the customer as an intermediary in the fiduciary capacity, which
                    amount shall be duly remitted to Cab vendor as per the arrangement contained in this Agreement.</span>
            </p>
            <p><span style="font-weight: 400;">This Agreement shall be signed by the Cab vendor through filling the online
                    form with its details, and agreeing to these terms and agreements</span></p>
            <p><span style="font-weight: 400;">with Facilitators as a click wrap agreement. Accordingly, this Agreement is
                    legally valid between the Parties by virtue of their online acceptance.</span></p>
            <p></p>
            <h4><strong>Annexure 1</strong></h4>
            <table style="width: 100%;margin: auto;">
                <thead>
                    <tr>
                        <th><strong>Effective Date: ${new Date(vendorData['created_at'])}</strong></th>
                        <th><strong>Details of the Business Name: ${vendorData['business_name']}</strong></th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td>
                            <strong>Owner Name</strong>
                        </td>
                        <td>${vendorData['salutation']} ${vendorData['first_name']} ${vendorData['last_name']}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Legal Entity</strong>
                        </td>
                        <td>${vendorData['business_name']}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Address</strong>
                        </td>
                        <td>${vendorData['local_address']}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Contact Person</strong>
                        </td>
                        <td>${vendorData['salutation']} ${vendorData['first_name']} ${vendorData['last_name']}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Phone</strong>
                        </td>
                        <td>${vendorData['mobile']}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Email ID</strong>
                        </td>
                        <td>${vendorData['email']}</td>
                    </tr>
                </tbody>
            </table>
            <p><strong>The date on which you accepted the Agreement</strong></p>
            <p><strong>Annexure 2</strong></p>
            <p><span style="font-weight: 400;">The Cab vendor confirms the following:</span></p>
            <ol style="padding: 0px 0px 0px 20px;">
                <ol style="padding: 0px 0px 0px 20px;">
                    <li style="font-weight: 400;"><span style="font-weight: 400;">Any dispute pertaining to billing shall be raised by the Cab
                        vendor latest by 15th of subsequent month.</span>
                </li>
                <li style="font-weight: 400;"><span style="font-weight: 400;">The Facilitators shall only be liable for remitting the Gross
                    Rate for all utilised bookings of the customers booking through the
                    Facilitators.</span>
            </li>
            <li style="font-weight: 400;"><span style="font-weight: 400;">The Cab vendor shall be liable for ensuring that the driver(s)
                operating the vehicles on behalf of the Cab vendor shall.</span>
        </li>
                    <li style="font-weight: 400;"><span style="font-weight: 400;">Take all precautions (including but not
                            limited driving in a rash or negligent manner), follow traffic rules under applicable laws and
                            maintain adequate safety measures during the provision of Cab Transportation Services.</span>
                    </li>
                    <li style="font-weight: 400;"><span style="font-weight: 400;">Have a clean record without any criminal
                            history.</span></li>
                    <li style="font-weight: 400;"><span style="font-weight: 400;">Ensure that vehicle used is clean and well
                            maintained.</span></li>
                    <li style="font-weight: 400;"><span style="font-weight: 400;">Behave in an orderly manner and do not
                            misbehave or harass the passengers.</span></li>
                    <li style="font-weight: 400;"><span style="font-weight: 400;">Wear the prescribed uniform;</span></li>
                    <li style="font-weight: 400;"><span style="font-weight: 400;">Reach the pick-up point before the
                            designated pick-up time; and</span></li>
                    <li style="font-weight: 400;"><span style="font-weight: 400;">Stay logged in the Facilitator application
                            at all times during the provision of Cab Transportation Services.</span></li>
                    <li style="font-weight: 400;"><span style="font-weight: 400;"> NSG TAXI is not liable if something went
                            wrong between customer & vendor during the trip.</span></li>
                </ol>
            </ol>
            <p><span style="font-weight: 400;">The Cab vendor shall be liable for ensuring:</span></p>
            <ol style="padding: 0px 0px 5px 20px;">
                <ol style="padding: 0px 0px 5px 20px;">
                <li style="font-weight: 400;"><span style="font-weight: 400;">It imparts training to the driver(s) on a
                        regular basis.</span></li>
                <li style="font-weight: 400;"><span style="font-weight: 400;">It has a comprehensive insurance policy for
                        the vehicle.</span></li>
                <li style="font-weight: 400;"><span style="font-weight: 400;">Only commercial vehicle(s) are used in the
                        provision of Cab Transportation Services.</span></li>
                <li style="font-weight: 400;"><span style="font-weight: 400;">Vehicle and driver details are shared with the
                        customer before the trip.</span></li>
                <li style="font-weight: 400;"><span style="font-weight: 400;">The assigned driver and the designated vehicle
                        are used in the provision of Cab Transportation Services.</span></li>
                <li style="font-weight: 400;"><span style="font-weight: 400;">Resolution any disputes by the
                        customer/Facilitators, if raised (i) after the trip within 24 (twenty four) hours; and (ii) on-trip
                        within 30 (thirty) minutes.</span></li>
                <li style="font-weight: 400;"><span style="font-weight: 400;">The driver(s) are medically fit.</span></li>
            </ol></ol>
        </div>
    </body>

    </html>`);
}

function base64Encode(data) {
  return Buffer.from(data).toString('base64');
}

function returnHotelBookingMailer(hotelData) {
  return `<!DOCTYPE html>
    <html>

    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }

            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }

            img {
                -ms-interpolation-mode: bicubic;
            }

            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }

            table {
                border-collapse: collapse !important;
            }

            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
            }

            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }

            @media screen and (max-width: 480px) {
                .mobile-hide {
                    display: none !important;
                }

                .mobile-center {
                    text-align: center !important;
                }
            }

            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }
        </style>
    </head>

    <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                        <tr>
                            <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#ef6437">
                                <div
                                    style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                        style="max-width:300px;">
                                        <tr>
                                            <td align="left" valign="top"
                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;"
                                                class="mobile-center">
                                                <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">
                                                    NSG TAXI</h1>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;"
                                    class="mobile-hide">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                        style="max-width:300px;">
                                        <tr>
                                            <td align="right" valign="top"
                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                                <table cellspacing="0" cellpadding="0" border="0" align="right">
                                                    <tr>
                                                        <td
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
                                                            <p
                                                                style="font-size: 18px; font-weight: 400; margin: 0; color: #ffffff;">
                                                                <a href="https://www.nsgtaxi.com/" target="_blank"
                                                                    style="color: #ffffff; text-decoration: none;">Booking
                                                                    &nbsp;</a></p>
                                                        </td>
                                                        <td
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;">
                                                            <img src="https://www.nsgtaxi.com/assets/images/mailer/hotel.png"
                                                                width="27" height="23"
                                                                style="display: block; border: 0px;" />
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;"
                                bgcolor="#ffffff">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:600px;">
                                    <tr>
                                        <td align="center"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 50px;">
                                            <img src="https://www.nsgtaxi.com/assets/images/mailer/check.png" width="150"
                                                height="120" style="display: block; border: 0px;" /><br>
                                            <h2
                                                style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">
                                                Thank You For Your Booking!
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                            <p
                                                style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;">
                                                Dear Customer, Your booking has been confirmed on
                                                <strong>${hotelData['check_in_date']}</strong>. Your reference number is
                                                <strong>${hotelData['created_at']}</strong>.
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                        Personal Details
                                                    </td>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                        Name
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                        ${hotelData['salutation']} ${hotelData['first_name']}
                                                        ${hotelData['last_name']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Mobile
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        +91-${hotelData['mobile']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Email
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        ${hotelData['email']}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                        Hotel Details
                                                    </td>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                        Name
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                        ${hotelData['hotel_name']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Location
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        ${hotelData['hotel_location']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Room Type
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        ${hotelData['room_type']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Check In Date
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        ${hotelData['check_in_date']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Check Out Date
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        ${hotelData['check_out_date']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Rooms
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        ${hotelData['rooms']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Guest
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Adult(${hotelData['guests']}), Child(${hotelData['children']})
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Message
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        ${hotelData['message']}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                        Fare Details
                                                    </td>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Base Amount
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        &#8377;${hotelData['base_fare']}.00
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        GST Amount
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        &#8377;${hotelData['gst_charge']}.00
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Total Amount
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        &#8377;${hotelData['total_fare']}.00
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                                        Total Amount
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                                        &#8377;${hotelData['total_fare']}.00
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <div style="padding: 5px;font-size: 0.9rem;">
                                                <strong>Note:</strong>
                                                ${hotelData['hotel_quotation']}
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <div style="padding: 5px;">Enjoy Your Day!</div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" height="100%" valign="top" width="100%"
                                style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:660px;">
                                    <tr>
                                        <td align="center" valign="top" style="font-size:0;">
                                            <div
                                                style="display:inline-block; min-width:240px; vertical-align:top; width:100%;">

                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                    style="max-width:300px;">
                                                    <tr>
                                                        <td align="left" valign="top"
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                            <p style="margin-bottom: 0px;">Thanks & Regards</p>
                                                            <p style="margin-top: 5px;">NSG Taxi Team</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style=" padding: 35px; background-color: #ef6437;" bgcolor="#ef6437">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:600px;">
                                    <tr>
                                        <td align="center"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 50px;">
                                            <h2
                                                style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;">
                                                Planning another trip?
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="padding: 50px 0 15px 0;">
                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center" style="border-radius: 5px;" bgcolor="#66b3b7">
                                                        <a href="https://www.nsgtaxi.com/hotel" target="_blank"
                                                            style="font-size: 18px; font-family: Open Sans, Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 5px; background-color: #94b347; padding: 15px 30px; display: block;">Book
                                                            Now</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:600px;">
                                    <tr>
                                        <td align="center">
                                            <img src="https://www.nsgtaxi.com/assets/images/company/logo-110-40.png"
                                                style="display: block; border: 0px;" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px; padding: 5px 0 10px 0;">
                                            <p
                                                style="font-size: 14px; font-weight: 800; line-height: 18px; color: #333333;">
                                                Address: Shop No. 209, Central Arcade, DLF-2<br>
                                                Gurugram, Haryana 122002 - India
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;">
                                            <p
                                                style="font-size: 14px; font-weight: 400; line-height: 20px; color: #777777;">
                                                We are available 24X7. You can reach us at <a href="mailto:info@nsgtaxi.com"
                                                    style="    color: #b656e6;
                                                    text-decoration: none;">info@nsgtaxi.com</a> or <a
                                                    href="tel:+911244077634" style="    color: #b656e6;
            text-decoration: none;">+91-124-4077634</a>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td bgcolor="#ffffff" align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#ffffff" align="center"
                                style="padding: 30px 30px 30px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;">
                                <p style="margin: 0;"><a href="https://www.nsgtaxi.com/"
                                        style="color: #5db3ec;text-decoration: none;">NSG TAXI</a></p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>

    </html>`;
}

function returnPackageBookingMailer(packageData) {
  return `<!DOCTYPE html>
    <html>

    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }

            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }

            img {
                -ms-interpolation-mode: bicubic;
            }

            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }

            table {
                border-collapse: collapse !important;
            }

            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
            }

            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }

            @media screen and (max-width: 480px) {
                .mobile-hide {
                    display: none !important;
                }

                .mobile-center {
                    text-align: center !important;
                }
            }

            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }
        </style>
    </head>

    <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                        <tr>
                            <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#ef6437">
                                <div
                                    style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                        style="max-width:300px;">
                                        <tr>
                                            <td align="left" valign="top"
                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;"
                                                class="mobile-center">
                                                <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">
                                                    NSG TAXI</h1>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;"
                                    class="mobile-hide">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                        style="max-width:300px;">
                                        <tr>
                                            <td align="right" valign="top"
                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                                <table cellspacing="0" cellpadding="0" border="0" align="right">
                                                    <tr>
                                                        <td
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
                                                            <p
                                                                style="font-size: 18px; font-weight: 400; margin: 0; color: #ffffff;">
                                                                <a href="https://www.nsgtaxi.com/" target="_blank"
                                                                    style="color: #ffffff; text-decoration: none;">Booking
                                                                    &nbsp;</a></p>
                                                        </td>
                                                        <td
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;">
                                                            <img src="https://www.nsgtaxi.com/assets/images/mailer/hotel.png"
                                                                width="27" height="23"
                                                                style="display: block; border: 0px;" />
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;"
                                bgcolor="#ffffff">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:600px;">
                                    <tr>
                                        <td align="center"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 50px;">
                                            <img src="https://www.nsgtaxi.com/assets/images/mailer/check.png" width="150"
                                                height="120" style="display: block; border: 0px;" /><br>
                                            <h2
                                                style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">
                                                Thank You For Your Booking!
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                            <p
                                                style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;">
                                                Dear Customer, Your booking has been confirmed on
                                                <strong>${packageData['start_date']}</strong>. Your reference number is
                                                <strong>${packageData['created_at']}</strong>.
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                        Personal Details
                                                    </td>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                        Name
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                        ${packageData['salutation']} ${packageData['first_name']}
                                                        ${packageData['last_name']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Mobile
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        +91-${packageData['mobile']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Email
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        ${packageData['email']}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                        Package Details
                                                    </td>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                        Name
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                        ${packageData['package_name']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Location
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        ${packageData['package_location']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Package Type
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        ${packageData['package_type']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Start Date
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        ${packageData['start_date']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        End Date
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        ${packageData['end_date']}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Persons
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Adults(${packageData['adults']}), Children(${packageData['children']})
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Message
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        ${packageData['message']}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                        Fare Details
                                                    </td>
                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Base Amount
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        &#8377;${packageData['base_fare']}.00
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        GST Amount
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        &#8377;${packageData['gst_charge']}.00
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        Total Amount
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                        &#8377;${packageData['total_fare']}.00
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                                        Total Amount
                                                    </td>
                                                    <td width="50%" align="left"
                                                        style="text-align: right;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                                        &#8377;${packageData['total_fare']}.00
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <div style="padding: 5px;font-size: 0.9rem;">
                                                <strong>Note:</strong>
                                                ${packageData['package_quotation']}
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <div style="padding: 5px;">Enjoy Your Day!</div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" height="100%" valign="top" width="100%"
                                style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:660px;">
                                    <tr>
                                        <td align="center" valign="top" style="font-size:0;">
                                            <div
                                                style="display:inline-block; min-width:240px; vertical-align:top; width:100%;">

                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                    style="max-width:300px;">
                                                    <tr>
                                                        <td align="left" valign="top"
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                            <p style="margin-bottom: 0px;">Thanks & Regards</p>
                                                            <p style="margin-top: 5px;">NSG Taxi Team</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style=" padding: 35px; background-color: #ef6437;" bgcolor="#ef6437">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:600px;">
                                    <tr>
                                        <td align="center"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 50px;">
                                            <h2
                                                style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;">
                                                Planning another trip?
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="padding: 50px 0 15px 0;">
                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center" style="border-radius: 5px;" bgcolor="#66b3b7">
                                                        <a href="https://www.nsgtaxi.com/packages" target="_blank"
                                                            style="font-size: 18px; font-family: Open Sans, Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 5px; background-color: #94b347; padding: 15px 30px; display: block;">Book
                                                            Now</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:600px;">
                                    <tr>
                                        <td align="center">
                                            <img src="https://www.nsgtaxi.com/assets/images/company/logo-110-40.png"
                                                style="display: block; border: 0px;" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px; padding: 5px 0 10px 0;">
                                            <p
                                                style="font-size: 14px; font-weight: 800; line-height: 18px; color: #333333;">
                                                Address: Shop No. 209, Central Arcade, DLF-2<br>
                                                Gurugram, Haryana 122002 - India
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;">
                                            <p
                                                style="font-size: 14px; font-weight: 400; line-height: 20px; color: #777777;">
                                                We are available 24X7. You can reach us at <a href="mailto:info@nsgtaxi.com"
                                                    style="    color: #b656e6;
                                                        text-decoration: none;">info@nsgtaxi.com</a> or <a
                                                    href="tel:+911244077634" style="    color: #b656e6;
                text-decoration: none;">+91-124-4077634</a>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td bgcolor="#ffffff" align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#ffffff" align="center"
                                style="padding: 30px 30px 30px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;">
                                <p style="margin: 0;"><a href="https://www.nsgtaxi.com/"
                                        style="color: #5db3ec;text-decoration: none;">NSG TAXI</a></p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>

    </html>`;
}