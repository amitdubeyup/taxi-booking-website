const admin = require('firebase-admin');
const serviceAccount = require('./google-config.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

require('dotenv').config();

module.exports = {
  admin: admin,
  db: db,
  server_secret: process.env.SERVER_SECRET,
  token_expire: process.env.TOKEN_EXPIRE,
  mail: process.env.MAIL,
  google_api_key: process.env.GOOGLE_API_KEY,
  google_server_key: process.env.GOOGLE_SERVER_KEY,

  //PayTM Live Credentials
  request_type: 'Payment',
  merchant_id: process.env.PAYTM_MERCHANT_ID,
  merchant_key: process.env.PAYTM_MERCHANT_KEY,
  website_name: 'DEFAULT',
  currency: 'INR',
  hostname: 'securegw.paytm.in',
  transaction_url: 'https://securegw.paytm.in',
  transaction_order_process_url: 'https://securegw.paytm.in/order/process',
  transaction_order_status_url: 'https://securegw.paytm.in/order/status',
  callback_url: 'https://www.nsgtaxi.com/payment-status',

  // Razorpay Live Credentials
  key: process.env.RAZORPAY_KEY,
  secret: process.env.RAZORPAY_SECRET,
  name: 'NSGA TRAVELS PVT LTD',
  description: 'We plan for your travel!',
  image: 'https://www.nsgtaxi.com/assets/images/company/logo-110-40.png',
  url: 'https://www.nsgtaxi.com/payment-status',
  address: `Shop No. 209, Central Arcade, DLF-2, Gurugram, Haryana 122002 - India`,
  color: '#F78536'
};