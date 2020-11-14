const admin = require('firebase-admin');
const serviceAccount = require('./google-config.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

module.exports = {
  admin: admin,
  db: db,
  server_secret: '$2y$12$4A2phQdjCl9fFvcuTHpn3.l7mZTBNagz4HrApfnY1tJYcyHgalifK',
  token_expire: '30d',
  mail: 'info@nsgtaxi.com',
  google_api_key: 'AIzaSyCJnen-AB1eM6aoGKKLSnA1cyDIQknzD5Q',

  //Testing Credentials
  // request_type: 'Payment',
  // merchant_id: 'nUuswO43569342193043',
  // merchant_key: 'R86OGnmG7ippgq_m',
  // website_name: 'WEBSTAGING',
  // currency: 'INR',
  // hostname: 'securegw-stage.paytm.in',
  // transaction_url: 'https://securegw-stage.paytm.in',
  // transaction_order_process_url: 'https://securegw-stage.paytm.in/order/process',
  // transaction_order_status_url: 'https://securegw-stage.paytm.in/order/status',
  // callback_url: 'http://localhost:3000/payment-status',

  //Live Credentials
  request_type: 'Payment',
  merchant_id: 'RrjpTX26296194961608',
  merchant_key: 'Oip_i7cYPlwXFmqS',
  website_name: 'DEFAULT',
  currency: 'INR',
  hostname: 'securegw.paytm.in',
  transaction_url: 'https://securegw.paytm.in',
  transaction_order_process_url: 'https://securegw.paytm.in/order/process',
  transaction_order_status_url: 'https://securegw.paytm.in/order/status',
  callback_url: 'https://www.nsgtaxi.com/payment-status',
};