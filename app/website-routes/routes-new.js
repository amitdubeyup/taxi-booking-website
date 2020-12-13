const express = require('express');
const router = express.Router();
const config = require('../config');
const Booking = require('../controllers/booking');
const DigitalMarketingCollection = config.db.collection('DigitalMarketing');
const RouteCollection = config.db.collection('Route');
const BlogCollection = config.db.collection('Blog');
const BookingCollection = config.db.collection('Booking');
const CarDetailsCollection = config.db.collection('CarDetails');
const TransactionCollection = config.db.collection('Transaction');
const HotelCollection = config.db.collection('Hotel');
const PackageCollection = config.db.collection('Package');
const _ = require('lodash');
const https = require('https');
const moment = require('moment');
const PaytmChecksum = require('../paytm-checksum');

router.get('/', function (req, res) {
  RouteCollection.get().then((routeSnapShot) => {
    const routeData = [];
    routeSnapShot.forEach((doc) => {
      routeData.push(doc.data());
    });
    DigitalMarketingCollection.doc('index_page').get().then((pageDataResponse) => {
      if (!pageDataResponse.exists) {
        res.render('under-maintenance.ejs');
      } else {
        const pageData = pageDataResponse.data();
        CarDetailsCollection.get().then((carDetailsSnapshot) => {
          const carDetailsData = [];
          carDetailsSnapshot.forEach((doc) => {
            carDetailsData.push(doc.data());
          });
          res.render('index', {
            api_key: config.google_api_key,
            base_url: "https://www.nsgtaxi.com" + req.originalUrl,
            title: pageData.title,
            description: pageData.description,
            keywords: pageData.keywords,
            page_offer_title: pageData.page_offer_title,
            page_offer_description: pageData.page_offer_description,
            page: 'index',
            total_cars: _.groupBy(_.sortBy(carDetailsData, 'car_type'), 'car_type'),
            total_routes: routeData
          });
        }).catch((error) => {
          res.render('under-maintenance.ejs');
        });
      }
    }).catch((error) => {
      res.render('under-maintenance.ejs');
    });
  }).catch((error) => {
    res.render('under-maintenance.ejs');
  });
});

router.get('/taxi-booking/*', function (req, res) {
  const page_url = ((req.originalUrl).split('/').reverse())[0];
  RouteCollection.get().then((routeSnapShot) => {
    const routeData = [];
    routeSnapShot.forEach((doc) => {
      routeData.push(doc.data());
    });
    let pageData = null;
    routeData.forEach((element) => {
      if (element['page_url'] == page_url) {
        pageData = element;
      }
    });
    CarDetailsCollection.get().then((carDetailsSnapshot) => {
      const carDetailsData = [];
      carDetailsSnapshot.forEach((doc) => {
        carDetailsData.push(doc.data());
      });
      res.render('index', {
        api_key: config.google_api_key,
        base_url: "https://www.nsgtaxi.com" + req.originalUrl,
        title: pageData.page_title,
        description: pageData.page_description,
        keywords: pageData.page_keywords,
        page_offer_title: pageData.page_offer_title,
        page_offer_description: pageData.page_offer_description,
        page: 'index',
        total_cars: _.groupBy(_.sortBy(carDetailsData, 'car_type'), 'car_type'),
        total_routes: routeData
      });
    }).catch((error) => {
      res.render('under-maintenance.ejs');
    });
  }).catch((error) => {
    res.render('under-maintenance.ejs');
  });
});


router.get('/about', function (req, res) {

  DigitalMarketingCollection.doc('about_page').get().then((response) => {
    if (!response.exists) {
      res.render('under-maintenance.ejs');
    } else {
      const pageData = response.data();
      res.render('about', {
        base_url: "https://www.nsgtaxi.com" + req.originalUrl,
        title: pageData.title,
        description: pageData.description,
        keywords: pageData.keywords,
        page: 'about',
      });
    }
  }).catch((error) => {
    res.render('under-maintenance.ejs');
  });
});

router.get('/contact', function (req, res) {
  DigitalMarketingCollection.doc('contact_page').get().then((response) => {
    if (!response.exists) {
      res.render('under-maintenance.ejs');
    } else {
      const pageData = response.data();
      res.render('contact', {
        base_url: "https://www.nsgtaxi.com" + req.originalUrl,
        title: pageData.title,
        description: pageData.description,
        keywords: pageData.keywords,
        page: 'contact',
      });
    }
  }).catch((error) => {
    res.render('under-maintenance.ejs');
  });
});

router.get('/blogs', function (req, res) {
  DigitalMarketingCollection.doc('blog_page').get().then((response) => {
    if (!response.exists) {
      res.render('under-maintenance.ejs');
    } else {
      const pageData = response.data();
      BlogCollection.get().then((snapshot) => {
        let blogData = [];
        snapshot.forEach((doc) => {
          blogData.push(doc.data());
        });
        blogData = (_.sortBy(blogData, 'created_at')).reverse();
        res.render('blogs', {
          base_url: "https://www.nsgtaxi.com" + req.originalUrl,
          title: pageData.title,
          description: pageData.description,
          keywords: pageData.keywords,
          blogData: blogData,
          moment: moment,
          page: 'blogs',
        });
      }).catch((error) => {
        res.render('under-maintenance.ejs');
      });
    }
  }).catch((error) => {
    res.render('under-maintenance.ejs');
  });
});

router.get('/blog-details/*', function (req, res) {
  const page_url = ((req.originalUrl).split('/').reverse())[0];
  BlogCollection.where('page_url', '==', page_url).get().then((response) => {
    if (response.empty) {
      res.render('under-maintenance.ejs');
    } else {
      const blogData = [];
      response.forEach((doc) => {
        blogData.push(doc.data());
      });
      res.render('blog-detail', {
        base_url: "https://www.nsgtaxi.com" + req.originalUrl,
        title: blogData[0].page_title,
        description: blogData[0].page_description,
        keywords: blogData[0].page_keywords,
        document_id: blogData[0].document_id,
        page_url: blogData[0].page_url,
        blog_heading: blogData[0].blog_heading,
        blog_description: blogData[0].blog_description,
        blog_content: blogData[0].blog_content,
        blog_image: blogData[0].blog_image,
        blog_image_name: blogData[0].blog_image_name,
        created_at: blogData[0].created_at,
        updated_at: blogData[0].updated_at,
        moment: moment,
        page: 'blogs',
      });
    }
  }).catch((error) => {
    res.render('under-maintenance.ejs');
  });
});

router.get('/customer-agreement', function (req, res) {
  DigitalMarketingCollection.doc('customer_agreement_page').get().then((response) => {
    if (!response.exists) {
      res.render('under-maintenance.ejs');
    } else {
      const pageData = response.data();
      res.render('customer-agreement', {
        base_url: "https://www.nsgtaxi.com" + req.originalUrl,
        title: pageData.title,
        description: pageData.description,
        keywords: pageData.keywords,
        page: 'customer-agreement',
      });
    }
  }).catch((error) => {
    res.render('under-maintenance.ejs');
  });
});

router.get('/vendor-agreement', function (req, res) {
  DigitalMarketingCollection.doc('vendor_agreement_page').get().then((response) => {
    if (!response.exists) {
      res.render('under-maintenance.ejs');
    } else {
      const pageData = response.data();
      res.render('vendor-agreement', {
        base_url: "https://www.nsgtaxi.com" + req.originalUrl,
        title: pageData.title,
        description: pageData.description,
        keywords: pageData.keywords,
        page: 'vendor-agreement',
      });
    }
  }).catch((error) => {
    res.render('under-maintenance.ejs');
  });
});

router.get('/hotels', function (req, res) {
  DigitalMarketingCollection.doc('hotel_page').get().then((response) => {
    if (!response.exists) {
      res.render('under-maintenance.ejs');
    } else {
      const pageData = response.data();
      HotelCollection.get().then((snapshot) => {
        let hotelData = [];
        snapshot.forEach((doc) => {
          hotelData.push(doc.data());
        });
        blogData = (_.sortBy(hotelData, 'created_at')).reverse();
        res.render('hotels', {
          base_url: "https://www.nsgtaxi.com" + req.originalUrl,
          title: pageData.title,
          description: pageData.description,
          keywords: pageData.keywords,
          hotelData: hotelData,
          moment: moment,
          page: 'hotels',
        });
      }).catch((error) => {
        res.render('under-maintenance.ejs');
      });
    }
  }).catch((error) => {
    res.render('under-maintenance.ejs');
  });
});

router.get('/hotel-booking/*', function (req, res) {
  const url_data = (req.originalUrl).split('/').reverse();
  const page_url = url_data[1] ? url_data[1] : '';
  const hotel_location = url_data[0] ? url_data[0] : '';
  HotelCollection.where('page_url', '==', page_url).where('hotel_location', '==', hotel_location).get().then((hotelResponse) => {
    if (hotelResponse.empty) {
      res.render('under-maintenance.ejs');
    } else {
      const hotelData = [];
      hotelResponse.forEach((doc) => {
        hotelData.push(doc.data());
      });
      if (hotelData.length) {
        res.render('hotel-booking', {
          base_url: "https://www.nsgtaxi.com" + req.originalUrl,
          title: hotelData[0]['page_title'],
          description: hotelData[0]['page_description'],
          keywords: hotelData[0]['page_keywords'],
          document_id: hotelData[0]['document_id'],
          page_url: hotelData[0]['page_url'],
          owner_mobile: hotelData[0]['owner_mobile'],
          hotel_name: hotelData[0]['hotel_name'],
          hotel_type: hotelData[0]['hotel_type'],
          hotel_room_type: hotelData[0]['hotel_room_type'],
          hotel_rating: hotelData[0]['hotel_rating'],
          hotel_location: hotelData[0]['hotel_location'],
          hotel_rooms: hotelData[0]['hotel_rooms'],
          hotel_services: hotelData[0]['hotel_services'],
          hotel_amount: hotelData[0]['hotel_amount'],
          hotel_description: hotelData[0]['hotel_description'],
          hotel_quotation: hotelData[0]['hotel_quotation'],
          hotel_image: hotelData[0]['hotel_image'],
          hotel_image_name: hotelData[0]['hotel_image_name'],
          hotel_image_collections: hotelData[0]['hotel_image_collections'],
          created_at: hotelData[0]['created_at'],
          updated_at: hotelData[0]['updated_at'],
          page: 'hotels',
        });
      } else {
        res.render('under-maintenance.ejs');
      }
    }
  }).catch((error) => {
    res.render('under-maintenance.ejs');
  });
});

router.get('/hotel-agreement', function (req, res) {
  DigitalMarketingCollection.doc('hotel_agreement_page').get().then((response) => {
    if (!response.exists) {
      res.render('under-maintenance.ejs');
    } else {
      const pageData = response.data();
      res.render('hotel-agreement', {
        base_url: "https://www.nsgtaxi.com" + req.originalUrl,
        title: pageData.title,
        description: pageData.description,
        keywords: pageData.keywords,
        page: 'hotel-agreement',
      });
    }
  }).catch((error) => {
    res.render('under-maintenance.ejs');
  });
});

router.get('/packages', function (req, res) {
  DigitalMarketingCollection.doc('package_page').get().then((response) => {
    if (!response.exists) {
      res.render('under-maintenance.ejs');
    } else {
      const pageData = response.data();
      PackageCollection.get().then((snapshot) => {
        let packageData = [];
        snapshot.forEach((doc) => {
          packageData.push(doc.data());
        });
        blogData = (_.sortBy(packageData, 'created_at')).reverse();
        res.render('packages', {
          base_url: "https://www.nsgtaxi.com" + req.originalUrl,
          title: pageData.title,
          description: pageData.description,
          keywords: pageData.keywords,
          packageData: packageData,
          moment: moment,
          page: 'packages',
        });
      }).catch((error) => {
        res.render('under-maintenance.ejs');
      });
    }
  }).catch((error) => {
    res.render('under-maintenance.ejs');
  });
});

router.get('/package-booking/*', function (req, res) {
  const url_data = (req.originalUrl).split('/').reverse();
  const page_url = url_data[1] ? url_data[1] : '';
  const package_location = url_data[0] ? url_data[0] : '';
  PackageCollection.where('page_url', '==', page_url).where('package_location', '==', package_location).get().then((packageResponse) => {
    if (packageResponse.empty) {
      res.render('under-maintenance.ejs');
    } else {
      const packageData = [];
      packageResponse.forEach((doc) => {
        packageData.push(doc.data());
      });
      if (packageData.length) {
        res.render('package-booking', {
          base_url: "https://www.nsgtaxi.com" + req.originalUrl,
          title: packageData[0]['page_title'],
          description: packageData[0]['page_description'],
          keywords: packageData[0]['page_keywords'],
          document_id: packageData[0]['document_id'],
          page_url: packageData[0]['page_url'],
          owner_mobile: packageData[0]['owner_mobile'],
          package_name: packageData[0]['package_name'],
          package_rating: packageData[0]['package_rating'],
          package_location: packageData[0]['package_location'],
          package_services: packageData[0]['package_services'],
          package_plans: packageData[0]['package_plans'],
          package_content: packageData[0]['package_content'],
          package_quotation: packageData[0]['package_quotation'],
          package_image: packageData[0]['package_image'],
          package_image_name: packageData[0]['package_image_name'],
          package_image_collections: packageData[0]['package_image_collections'],
          created_at: packageData[0]['created_at'],
          updated_at: packageData[0]['updated_at'],
          page: 'packages'
        });
      } else {
        res.render('under-maintenance.ejs');
      }
    }
  }).catch((error) => {
    res.render('under-maintenance.ejs');
  });
});

router.get('/package-agreement', function (req, res) {
  DigitalMarketingCollection.doc('package_agreement_page').get().then((response) => {
    if (!response.exists) {
      res.render('under-maintenance.ejs');
    } else {
      const pageData = response.data();
      res.render('package-agreement', {
        base_url: "https://www.nsgtaxi.com" + req.originalUrl,
        title: pageData.title,
        description: pageData.description,
        keywords: pageData.keywords,
        page: 'package-agreement',
      });
    }
  }).catch((error) => {
    res.render('under-maintenance.ejs');
  });
});

router.get('/privacy-policy', function (req, res) {
  DigitalMarketingCollection.doc('privacy_policy_page').get().then((response) => {
    if (!response.exists) {
      res.render('under-maintenance.ejs');
    } else {
      const pageData = response.data();
      res.render('privacy-policy', {
        base_url: "https://www.nsgtaxi.com" + req.originalUrl,
        title: pageData.title,
        description: pageData.description,
        keywords: pageData.keywords,
        page: 'privacy-policy',
      });
    }
  }).catch((error) => {
    res.render('under-maintenance.ejs');
  });
});

router.get('/terms-and-conditions', function (req, res) {
  DigitalMarketingCollection.doc('terms_and_conditions_page').get().then((response) => {
    if (!response.exists) {
      res.render('under-maintenance.ejs');
    } else {
      const pageData = response.data();
      res.render('terms-and-conditions', {
        base_url: "https://www.nsgtaxi.com" + req.originalUrl,
        title: pageData.title,
        description: pageData.description,
        keywords: pageData.keywords,
        page: 'terms-and-conditions',
      });
    }
  }).catch((error) => {
    res.render('under-maintenance.ejs');
  });
});

router.get('/cancellation-and-refund-policy', function (req, res) {
  DigitalMarketingCollection.doc('cancellation_and_refund_policy_page').get().then((response) => {
    if (!response.exists) {
      res.render('under-maintenance.ejs');
    } else {
      const pageData = response.data();
      res.render('cancellation-and-refund-policy', {
        base_url: "https://www.nsgtaxi.com" + req.originalUrl,
        title: pageData.title,
        description: pageData.description,
        keywords: pageData.keywords,
        page: 'cancellation-and-refund-policy',
      });
    }
  }).catch((error) => {
    res.render('under-maintenance.ejs');
  });
});

// Payment section start
router.get('/payment/*', function (req, res) {
  const url_data = (req.originalUrl).split('/').reverse();
  const document_id = url_data[0] ? url_data[0] : '';
  BookingCollection.where('document_id', '==', document_id).where('payment_status', '==', null).get().then((bookingResponse) => {
    if (bookingResponse.empty) {
      res.render('under-maintenance.ejs');
    } else {
      const bookingData = [];
      bookingResponse.forEach((doc) => {
        bookingData.push(doc.data());
      });
      if (bookingData.length) {
        res.render('payment', {
          base_url: "https://www.nsgtaxi.com" + req.originalUrl,
          title: 'Payment Confirmation',
          description: 'Pay booking amount to NSG TAXI. Best taxi service provider in india.',
          keywords: 'Booking Payment, Customer Payment, Bill Payment, Trip Payment',
          first_name: bookingData[0]['first_name'],
          last_name: bookingData[0]['last_name'],
          email: bookingData[0]['email'],
          mobile: bookingData[0]['mobile'],
          trip_type: (bookingData[0]['round_way_trip'] == '1') ? 'Round Way' : 'One Way',
          car_type: bookingData[0]['car_type'],
          pickup_address: bookingData[0]['pickup_address'],
          drop_off_address: bookingData[0]['drop_off_address'],
          actual_distance: bookingData[0]['actual_distance'],
          drop_off_date: bookingData[0]['drop_off_date'],
          pickup_time: bookingData[0]['pickup_time'],
          pickup_date: bookingData[0]['pickup_date'],
          total_fare: bookingData[0]['total_fare'],
          discount_code: bookingData[0]['discount_code'],
          discount_amount: bookingData[0]['discount_amount'],
          cash_payment: parseInt((parseInt(bookingData[0]['total_fare'], 10) - parseInt(bookingData[0]['discount_amount'], 10)) * 0.20, 10),
          full_payment: parseInt(bookingData[0]['total_fare'], 10) - parseInt(bookingData[0]['discount_amount'], 10),
          created_at: bookingData[0]['created_at'],
          document_id: bookingData[0]['document_id'],
          page: 'index',
        });
      } else {
        res.render('under-maintenance.ejs');
      }
    }
  }).catch((error) => {
    res.render('under-maintenance.ejs');
  });
});

router.get('/payment-initiate/*', function (req, res) {
  const url_data = (req.originalUrl).split('/').reverse();
  const document_id = url_data[0] ? url_data[0] : '';
  TransactionCollection.where('document_id', '==', document_id).where('payment_transaction_id', '==', null).get().then((transactionResponse) => {
    if (transactionResponse.empty) {
      res.render('under-maintenance.ejs');
    } else {
      const transactionData = [];
      transactionResponse.forEach((doc) => {
        transactionData.push(doc.data());
      });
      if (transactionData.length) {
        res.render('payment-initiate', {
          base_url: "https://www.nsgtaxi.com" + req.originalUrl,
          merchant_id: config.merchant_id,
          transaction_url: config.transaction_url,
          document_id: transactionData[0]['document_id'],
          order_id: transactionData[0]['order_id'],
          order_amount: transactionData[0]['order_amount'],
          transaction_token: transactionData[0]['transaction_token'],
          page: 'index',
        });
      } else {
        res.render('under-maintenance.ejs');
      }
    }
  }).catch((error) => {
    res.render('under-maintenance.ejs');
  });
});

function transactionStatus(type) {
  if (type == 'TXN_SUCCESS') {
    return 'success';
  }
  if (type == 'TXN_FAILURE') {
    return 'failed';
  }
  if (type == 'PENDING') {
    return 'pending';
  }
  return type;
}

function gatewayName(type) {
  if (type == 'WALLET') {
    return 'Paytm Wallet';
  }
  if (type == 'PAYTMCC') {
    return 'Paytm Postpaid';
  }
  return type;
}

function bankName(type) {
  if (type == 'Wallet' || type == 'WALLET') {
    return 'Paytm Wallet';
  }
  return type;
}

function paymentMode(type) {
  if (type == 'CC') {
    return 'Credit Card';
  }
  if (type == 'DC') {
    return 'Debit Card';
  }
  if (type == 'NB') {
    return 'Net Banking';
  }
  if (type == 'UPI') {
    return 'UPI';
  }
  if (type == 'PPI') {
    return 'Paytm Wallet';
  }
  if (type == 'PAYTMCC') {
    return 'Paytm Postpaid';
  }
  return type;
}

function verifyChecksum(data) {
  const checksum = data.CHECKSUMHASH;
  delete data.CHECKSUMHASH;
  let isVerifySignature = PaytmChecksum.verifySignature(data, config.merchant_key, checksum);
  if (isVerifySignature) {
    return true;
  } else {
    return false;
  }
}

function verifyTransactionStatus(order_id) {
  return new Promise((resolve, reject) => {
    let paytmParams = {};
    paytmParams.body = {
      mid: config.merchant_id,
      orderId: order_id
    };
    PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), config.merchant_key).then(function (checksum) {
      paytmParams.head = {
        signature: checksum
      };
      var post_data = JSON.stringify(paytmParams);
      var options = {
        hostname: config.hostname,
        port: 443,
        path: '/v3/order/status',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': post_data.length
        }
      };
      var response = "";
      var post_req = https.request(options, function (post_res) {
        post_res.on('data', function (chunk) {
          response += chunk;
        });
        post_res.on('end', function () {
          const transaction_status = JSON.parse(response);
          console.log(transaction_status);
          if (transaction_status['body']['resultInfo']['resultStatus'] == 'TXN_SUCCESS') {
            resolve(true);
          } else {
            reject(false);
          }
        });
      });
      post_req.write(post_data);
      post_req.end();
    });
  });
}

function returnBookingTransactionData(data) {
  return new Promise((resolve, reject) => {
    BookingCollection.where('document_id', '==', data.ORDERID).get().then((bookingResponse) => {
      if (bookingResponse.empty) {
        reject({});
      } else {
        TransactionCollection.where('order_id', '==', data.ORDERID).get().then((transactionResponse) => {
          if (transactionResponse.empty) {
            reject({});
          } else {
            const bookingData = [];
            const transactionData = [];
            bookingResponse.forEach((doc) => {
              bookingData.push(doc.data());
            });
            transactionResponse.forEach((doc) => {
              transactionData.push(doc.data());
            });
            if (bookingData.length && transactionData.length) {
              if ((data['ORDERID'] == bookingData[0]['document_id']) && (data['ORDERID'] == transactionData[0]['order_id'])) {
                verifyTransactionStatus(transactionData[0]['order_id']).then(() => {
                  resolve(Object.assign({}, bookingData[0]));
                }).catch(() => {
                  reject({});
                });
              } else {
                reject({});
              }
            } else {
            }
          }
        }).catch((error) => {
          reject({});
        });
      }
    }).catch((error) => {
      reject({});
    });
  });
}

router.post('/payment-status', function (req, res) {
  const paymentResponse = req.body;
  if (verifyChecksum(Object.assign({}, paymentResponse))) {
    returnBookingTransactionData(paymentResponse).then((response) => {
      console.log(response);
      updatePaymentStatus(paymentResponse);
      res.render('payment-status', {
        base_url: "https://www.nsgtaxi.com" + req.originalUrl,
        title: 'Payment Status',
        description: 'Booking payment status of NSG TAXI. Best taxi service provider in india.',
        keywords: 'Booking Payment Status, Customer Payment Status, Bill Payment Status, Trip Payment Status',
        transaction_status: 'success',
        merchant_id: paymentResponse.MID,
        transaction_id: paymentResponse.TXNID,
        order_id: (paymentResponse.ORDERID).toUpperCase(),
        bank_transaction_id: paymentResponse.BANKTXNID,
        transaction_amount: paymentResponse.TXNAMOUNT,
        currency: paymentResponse.CURRENCY,
        status: transactionStatus(paymentResponse.STATUS),
        response_code: paymentResponse.RESPCODE,
        response_message: paymentResponse.RESPMSG,
        transaction_date: new Date(paymentResponse.TXNDATE),
        gateway_name: gatewayName(paymentResponse.GATEWAYNAME),
        bank_name: bankName(paymentResponse.BANKNAME),
        payment_mode: paymentMode(paymentResponse.PAYMENTMODE),
        checksum_hash: paymentResponse.CHECKSUMHASH,
        first_name: response.first_name,
        last_name: response.last_name,
        gender: response.gender,
        mobile: response.mobile,
        email: response.email,
        pickup_address: response.pickup_address,
        drop_off_address: response.drop_off_address,
        trip_type: parseInt(response.round_way_trip, 10) ? 'Round Way' : 'One Way',
        car_type: response.car_type,
        actual_distance: response.actual_distance,
        pickup_date: response.pickup_date,
        pickup_time: response.pickup_time,
        booking_id: response.created_at,
        page: 'index',
      });
    }).catch((error) => {
      res.render('payment-status', {
        base_url: "https://www.nsgtaxi.com" + req.originalUrl,
        title: 'Payment Status',
        description: 'Booking payment status of NSG TAXI. Best taxi service provider in india.',
        keywords: 'Booking Payment Status, Customer Payment Status, Bill Payment Status, Trip Payment Status',
        transaction_status: 'failed',
        page: 'index',
      });
    });
  } else {
    res.render('payment-status', {
      base_url: "https://www.nsgtaxi.com" + req.originalUrl,
      title: 'Payment Status',
      description: 'Booking payment status of NSG TAXI. Best taxi service provider in india.',
      keywords: 'Booking Payment Status, Customer Payment Status, Bill Payment Status, Trip Payment Status',
      transaction_status: 'failed',
      page: 'index',
    });
  }
});

function updatePaymentStatus(paymentResponse) {
  BookingCollection.where('document_id', '==', paymentResponse.ORDERID).get().then((response) => {
    if (!response.empty) {
      const bookingData = [];
      response.forEach((doc) => {
        bookingData.push(doc.data());
        const updateData = {
          payment_gateway: gatewayName(paymentResponse.GATEWAYNAME ? paymentResponse.GATEWAYNAME : 'Not Received From Gateway'),
          payment_description: paymentResponse.RESPMSG ? paymentResponse.RESPMSG : 'Not Received From Gateway',
          payment_reference_number: paymentResponse.BANKTXNID ? paymentResponse.BANKTXNID : 'Not Received From Gateway',
          payment_amount: parseInt(paymentResponse.TXNAMOUNT ? paymentResponse.TXNAMOUNT : 0, 10),
          payment_status: (transactionStatus(paymentResponse.STATUS ? paymentResponse.STATUS : 'Not Received From Gateway')).toLowerCase(),
        };
        doc.ref.update(updateData).then((response) => {
          console.log('Booking data updated after payment!');
          if (paymentResponse.STATUS == 'TXN_SUCCESS') {
            const bookingDetails = bookingData[0];
            bookingDetails['total_fare'] = parseInt(bookingDetails['total_fare'], 10);
            bookingDetails['discount_amount'] = parseInt(bookingDetails['discount_amount'], 10);
            bookingDetails['payment_amount'] = parseInt(paymentResponse.TXNAMOUNT ? paymentResponse.TXNAMOUNT : 0, 10);
            Booking.sendBookingSMSEmail(bookingDetails);
          }
        }).catch((error) => {
          console.log('Unable to update booking data after payment!');
        });
      });
    }
  }).catch((error) => {
    console.log('Unable to update booking data after payment!');
  });
  TransactionCollection.where('order_id', '==', paymentResponse.ORDERID).get().then((response) => {
    if (!response.empty) {
      response.forEach((doc) => {
        const updateData = {
          merchant_id: paymentResponse.MID ? paymentResponse.MID : 'Not Received From Gateway',
          payment_currency: paymentResponse.CURRENCY ? paymentResponse.CURRENCY : 'Not Received From Gateway',
          gateway_used_by_paytm: paymentResponse.GATEWAYNAME ? paymentResponse.GATEWAYNAME : 'Not Received From Gateway',
          paytm_response_message_description: paymentResponse.RESPMSG ? paymentResponse.RESPMSG : 'Not Received From Gateway',
          bank_name_of_issuing_payment_mode: paymentResponse.BANKNAME ? paymentResponse.BANKNAME : 'Not Received From Gateway',
          payment_mode_used_by_customer: paymentResponse.PAYMENTMODE ? paymentResponse.PAYMENTMODE : 'Not Received From Gateway',
          paytm_response_code: paymentResponse.RESPCODE ? paymentResponse.RESPCODE : 'Not Received From Gateway',
          payment_transaction_id: paymentResponse.TXNID ? paymentResponse.TXNID : 'Not Received From Gateway',
          order_transaction_amount: paymentResponse.TXNAMOUNT ? paymentResponse.TXNAMOUNT : 'Not Received From Gateway',
          paytm_transaction_status: paymentResponse.STATUS ? paymentResponse.STATUS : 'Not Received From Gateway',
          bank_transaction_id: paymentResponse.BANKTXNID ? paymentResponse.BANKTXNID : 'Not Received From Gateway',
          transaction_date_time: paymentResponse.TXNDATE ? paymentResponse.TXNDATE : 'Not Received From Gateway',
          paytm_generated_checksum_value: paymentResponse.CHECKSUMHASH ? paymentResponse.CHECKSUMHASH : 'Not Received From Gateway',
        };
        console.log(updateData);
        doc.ref.update(updateData).then((response) => {
          console.log('Transaction data updated after payment!');
        }).catch((error) => {
          console.log('Unable to update transaction data after payment!');
        });
      });
    }
  }).catch((error) => {
    console.log('Unable to update transaction data after payment!');
  });
}
// Payment section end

// Handle 404 Page Start
router.get('/*', function (req, res) {
  RouteCollection.get().then((routeSnapShot) => {
    const routeData = [];
    routeSnapShot.forEach((doc) => {
      routeData.push(doc.data());
    });
    DigitalMarketingCollection.doc('index_page').get().then((pageDataResponse) => {
      if (!pageDataResponse.exists) {
        res.render('under-maintenance.ejs');
      } else {
        const pageData = pageDataResponse.data();
        CarDetailsCollection.get().then((carDetailsSnapshot) => {
          const carDetailsData = [];
          carDetailsSnapshot.forEach((doc) => {
            carDetailsData.push(doc.data());
          });
          res.render('index', {
            api_key: config.google_api_key,
            base_url: "https://www.nsgtaxi.com" + req.originalUrl,
            title: pageData.title,
            description: pageData.description,
            keywords: pageData.keywords,
            page_offer_title: pageData.page_offer_title,
            page_offer_description: pageData.page_offer_description,
            page: 'index',
            total_cars: _.groupBy(_.sortBy(carDetailsData, 'car_type'), 'car_type'),
            total_routes: routeData
          });
        }).catch((error) => {
          res.render('under-maintenance.ejs');
        });
      }
    }).catch((error) => {
      res.render('under-maintenance.ejs');
    });
  }).catch((error) => {
    res.render('under-maintenance.ejs');
  });
});
// Handle 404 Page End

module.exports = router;
