const express = require('express');
const routes = express.Router();
const stringify = require('json-stringify-safe');

const jwtRoutes = require('./jwt.routes');
const mailRoutes = require('./mail.routes');
const pincodeRoutes = require('./pincode.routes');
const locationRoutes = require('./location.routes');
const demoRoutes = require('./demo.routes');
const fileRoutes = require('./file.routes');
const userRoutes = require('./user.routes');
const smsRoutes = require('./sms.routes');
const bookingRoutes = require('./booking.routes');
const contactRoutes = require('./contact.routes');
const digitalMarketingRoutes = require('./digital-marketing.routes');
const fareRoutes = require('./fare.routes');
const routeFareRoutes = require('./route-fare.routes');
const transactionRoutes = require('./transaction.routes');
const blogRoutes = require('./blog.routes');
const videoRoutes = require('./video.routes');
const promoCodeRoutes = require('./promo-code.routes');
const sitemapRoutes = require('./sitemap.routes');
const hotelRoutes = require('./hotel.routes');
const hotelBookingRoutes = require('./hotel-booking.routes');
const packageRoutes = require('./package.routes');
const packageBookingRoutes = require('./package-booking.routes');
const carDetailsRoutes = require('./car-details.routes');
const vehicleRoutes = require('./vehicle.routes');
const routeRoutes = require('./route.routes');
const paymentRoutes = require('./payment.routes');

routes.use('/jwt', jwtRoutes);
routes.use('/mail', mailRoutes);
routes.use('/pincode', pincodeRoutes);
routes.use('/location', locationRoutes);
routes.use('/demo', demoRoutes);
routes.use('/file', fileRoutes);
routes.use('/user', userRoutes);
routes.use('/sms', smsRoutes);
routes.use('/booking', bookingRoutes);
routes.use('/contact', contactRoutes);
routes.use('/digital-marketing', digitalMarketingRoutes);
routes.use('/fare', fareRoutes);
routes.use('/route-fare', routeFareRoutes);
routes.use('/transaction', transactionRoutes);
routes.use('/blog', blogRoutes);
routes.use('/video', videoRoutes);
routes.use('/promo-code', promoCodeRoutes);
routes.use('/sitemap', sitemapRoutes);
routes.use('/hotel', hotelRoutes);
routes.use('/hotel-booking', hotelBookingRoutes);
routes.use('/package', packageRoutes);
routes.use('/package-booking', packageBookingRoutes);
routes.use('/car-details', carDetailsRoutes);
routes.use('/vehicle', vehicleRoutes);
routes.use('/route', routeRoutes);
routes.use('/payment', paymentRoutes);

routes.get('/', function (req, res) {
    res.status(200);
    res.json({
        success: true,
        message: 'Welcome to the coolest API on the earth!',
        data: base64Encode(stringify(req, null, 2)),
    });
});

module.exports = routes;

function base64Encode(data) {
    return Buffer.from(data).toString('base64');
}