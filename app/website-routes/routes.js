const express = require('express');
const router = express.Router();
const config = require('../config');
const Booking = require('../controllers/booking');
const DigitalMarketingCollection = config.db.collection('DigitalMarketing');
const RouteCollection = config.db.collection('Route');
const BlogCollection = config.db.collection('Blog');
const BookingCollection = config.db.collection('Booking');
const CarDetailsCollection = config.db.collection('CarDetails');
const PaymentCollection = config.db.collection('Payment');
const HotelCollection = config.db.collection('Hotel');
const PackageCollection = config.db.collection('Package');
const _ = require('lodash');
const moment = require('moment');
const Razorpay = require('razorpay');
const instance = new Razorpay({ key_id: config.key, key_secret: config.secret });
const crypto = require("crypto");

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

function returnBookingTransactionData(data) {
  return new Promise((resolve, reject) => {
    instance.orders.fetchPayments(data.razorpay_order_id).then((orderResponse) => {
      if (orderResponse['items'].length) {
        const orderData = orderResponse['items'][0];
        PaymentCollection.where('id', '==', data.razorpay_order_id).get().then((paymentResponse) => {
          if (paymentResponse.empty) {
            reject({});
          } else {
            const paymentData = [];
            paymentResponse.forEach((doc) => {
              paymentData.push(doc.data());
            });
            BookingCollection.where('document_id', '==', paymentData[0]['receipt']).get().then((bookingResponse) => {
              if (bookingResponse.empty) {
                reject({});
              } else {
                const bookingData = [];
                bookingResponse.forEach((doc) => {
                  bookingData.push(doc.data());
                });
                resolve({
                  order: orderData,
                  payment: paymentData[0],
                  booking: bookingData[0],
                });
              }
            }).catch((error) => {
              reject({});
            });
          }
        }).catch((error) => {
          reject({});
        });
      } else {
        reject({});
      }
    }).catch((error) => {
      console.log(error);
      reject({});
    });
  });
}

function generateValidateSignature(signatureData) {
  const generatedSignature = crypto.createHmac("SHA256", config.secret)
    .update(signatureData.razorpay_order_id + "|" + signatureData.razorpay_payment_id)
    .digest("hex");
  const isSignatureValid = generatedSignature == signatureData.razorpay_signature;
  return isSignatureValid;
}

router.post('/payment-status', function (req, res) {
  if (generateValidateSignature(req.body)) {
    returnBookingTransactionData(req.body).then((response) => {
      updatePaymentStatus(response);
      if (response.order.status == 'authorized') {
        res.render('payment-status', {
          base_url: "https://www.nsgtaxi.com" + req.originalUrl,
          title: 'Payment Status',
          description: 'Booking payment status of NSG TAXI. Best taxi service provider in india.',
          keywords: 'Booking Payment Status, Customer Payment Status, Bill Payment Status, Trip Payment Status',
          transaction_status: 'success',
          transaction_amount: parseInt(response.order.amount/100, 10),
          transaction_id: response.payment.id,
          first_name: response.booking.first_name,
          last_name: response.booking.last_name,
          gender: response.booking.gender,
          mobile: response.booking.mobile,
          email: response.booking.email,
          pickup_address: response.booking.pickup_address,
          drop_off_address: response.booking.drop_off_address,
          trip_type: parseInt(response.booking.round_way_trip, 10) ? 'Round Way' : 'One Way',
          car_type: response.booking.car_type,
          actual_distance: response.booking.actual_distance,
          pickup_date: response.booking.pickup_date,
          pickup_time: response.booking.pickup_time,
          booking_id: response.booking.created_at,
          page: 'index',
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

function updatePaymentStatus(gatewayData) {
  const bookingData = gatewayData.booking;
  bookingData['payment_gateway'] = 'Razorpay Softwares Pvt. Ltd.';
  bookingData['payment_description'] = 'Booking Payment';
  bookingData['payment_reference_number'] = gatewayData.payment.id;
  bookingData['payment_amount'] = parseInt(gatewayData.order.amount/100, 10);
  bookingData['payment_status'] = (gatewayData.order.status == 'authorized') ? 'success' : 'failed';
  BookingCollection.doc(bookingData.document_id).update(bookingData).then((response) => {
    console.log('Booking updated after payment!');
    Booking.sendBookingSMSEmail(bookingData);
  }).catch((error) => {
    console.log('Unable to update booking after payment!');
  });
  const paymentData = gatewayData.payment;
  
  paymentData['amount'] = parseInt(gatewayData.order.amount/100, 10);
  paymentData['status'] = (gatewayData.order.status == 'authorized') ? 'success' : 'failed';
  paymentData['updated_at'] = gatewayData.order.created_at;
  PaymentCollection.doc(paymentData.document_id).update(paymentData).then((response) => {
    console.log('Payment updated after payment!');
  }).catch((error) => {
    console.log('Unable to update payment after payment!');
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
