const fs = require('fs');
const config = require('../config');
const RouteCollection = config.db.collection('Route');
const BlogCollection = config.db.collection('Blog');
const HotelCollection = config.db.collection('Hotel');
const PackageCollection = config.db.collection('Package');

module.exports = {
    generateSitemap: generateSitemap
};

function formatDate(value, format) {
    if (value) {
        const fullDate = new Date(value);
        const year = fullDate.getFullYear();
        const month = fullDate.getMonth() + 1 < 10 ? '0' + (fullDate.getMonth() + 1) : fullDate.getMonth() + 1;
        const date = fullDate.getDate() < 10 ? '0' + fullDate.getDate() : fullDate.getDate();
        if (format === 'dd-mm-yyyy') {
            return date + '-' + month + '-' + year;
        }
        if (format === 'mm-dd-yyyy') {
            return month + '-' + date + '-' + year;
        }
        if (format === 'dd/mm/yyyy') {
            return date + '/' + month + '/' + year;
        }
        if (format === 'mm/dd/yyyy') {
            return month + '/' + date + '/' + year;
        }
        if (format === 'yyyy-mm-dd') {
            return year + '-' + month + '-' + date;
        }
        if (format === 'yyyy-dd-mm') {
            return year + '-' + date + '-' + month;
        }
        if (format === 'yyyy/mm/dd') {
            return year + '/' + month + '/' + date;
        }
        if (format === 'yyyy/dd/mm') {
            return year + '/' + date + '/' + month;
        }
        return fullDate;
    } else {
        return null;
    }
}

function generateSitemap(req, res) {
    RouteCollection.get().then((routeSnapShot) => {
        const routeData = [];
        routeSnapShot.forEach((routeDoc) => {
            routeData.push(routeDoc.data());
        });
        BlogCollection.get().then((blogSnapShot) => {
            const blogData = [];
            blogSnapShot.forEach((blogDoc) => {
                blogData.push(blogDoc.data());
            });
            HotelCollection.get().then((hotelSnapShot) => {
                const hotelData = [];
                hotelSnapShot.forEach((hotelDoc) => {
                    hotelData.push(hotelDoc.data());
                });
                PackageCollection.get().then((packageSnapShot) => {
                    const packageData = [];
                    packageSnapShot.forEach((packageDoc) => {
                        packageData.push(packageDoc.data());
                    });
                    returnSitemap(req, res, routeData, blogData, hotelData, packageData);
                }).catch((error) => {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'Unable to generate sitemap!',
                    });
                });
            }).catch((error) => {
                res.status(400);
                return res.json({
                    success: false,
                    message: 'Unable to generate sitemap!',
                });
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to generate sitemap!',
            });
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to generate sitemap!',
        });
    });
}

function returnSitemap(req, res, routeData, blogData, hotelData, packageData) {
    let pages = '';
    routeData.forEach((element) => {
        pages = pages + `
        <url>
            <loc>https://www.nsgtaxi.com/taxi-booking/${element.page_url}</loc>
            <lastmod>${formatDate(new Date(), 'yyyy-mm-dd')}</lastmod>
            <priority>0.64</priority>
            <changefreq>daily</changefreq>
        </url>
        `;
    });
    blogData.forEach((element) => {
        pages = pages + `
        <url>
            <loc>https://www.nsgtaxi.com/blog-details/${element.page_url}</loc>
            <lastmod>${formatDate(new Date(), 'yyyy-mm-dd')}</lastmod>
            <priority>0.64</priority>
            <changefreq>daily</changefreq>
        </url>
        `;
    });
    hotelData.forEach((element) => {
        pages = pages + `
        <url>
            <loc>https://www.nsgtaxi.com/hotel-booking/${element.page_url}</loc>
            <lastmod>${formatDate(new Date(), 'yyyy-mm-dd')}</lastmod>
            <priority>0.64</priority>
            <changefreq>daily</changefreq>
        </url>
        `;
    });
    packageData.forEach((element) => {
        pages = pages + `
        <url>
            <loc>https://www.nsgtaxi.com/package-booking/${element.page_url}</loc>
            <lastmod>${formatDate(new Date(), 'yyyy-mm-dd')}</lastmod>
            <priority>0.64</priority>
            <changefreq>daily</changefreq>
        </url>
        `;
    });
    const finalXML = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
        <url>
            <loc>https://www.nsgtaxi.com</loc>
            <lastmod>${formatDate(new Date(), 'yyyy-mm-dd')}</lastmod>
            <priority>1.00</priority>
            <changefreq>daily</changefreq>
        </url>
        <url>
            <loc>https://www.nsgtaxi.com/about</loc>
            <lastmod>${formatDate(new Date(), 'yyyy-mm-dd')}</lastmod>
            <priority>0.80</priority>
            <changefreq>daily</changefreq>
        </url>
        <url>
            <loc>https://www.nsgtaxi.com/contact</loc>
            <lastmod>${formatDate(new Date(), 'yyyy-mm-dd')}</lastmod>
            <priority>0.80</priority>
            <changefreq>daily</changefreq>
        </url>
        <url>
            <loc>https://www.dashboard.nsgtaxi.com/session/login</loc>
            <lastmod>${formatDate(new Date(), 'yyyy-mm-dd')}</lastmod>
            <priority>0.80</priority>
            <changefreq>daily</changefreq>
        </url>
        <url>
            <loc>https://www.nsgtaxi.com/customer-agreement</loc>
            <lastmod>${formatDate(new Date(), 'yyyy-mm-dd')}</lastmod>
            <priority>0.80</priority>
            <changefreq>daily</changefreq>
        </url>
        <url>
            <loc>https://www.nsgtaxi.com/vendor-agreement</loc>
            <lastmod>${formatDate(new Date(), 'yyyy-mm-dd')}</lastmod>
            <priority>0.80</priority>
            <changefreq>daily</changefreq>
        </url>
        <url>
            <loc>https://www.nsgtaxi.com/terms-and-conditions</loc>
            <lastmod>${formatDate(new Date(), 'yyyy-mm-dd')}</lastmod>
            <priority>0.80</priority>
            <changefreq>daily</changefreq>
        </url>
        <url>
            <loc>https://www.nsgtaxi.com/privacy-policy</loc>
            <lastmod>${formatDate(new Date(), 'yyyy-mm-dd')}</lastmod>
            <priority>0.80</priority>
            <changefreq>daily</changefreq>
        </url>
        <url>
            <loc>https://www.nsgtaxi.com/cancellation-and-refund-policy</loc>
            <lastmod>${formatDate(new Date(), 'yyyy-mm-dd')}</lastmod>
            <priority>0.80</priority>
            <changefreq>daily</changefreq>
        </url>
        <url>
            <loc>https://www.nsgtaxi.com/blogs</loc>
            <lastmod>${formatDate(new Date(), 'yyyy-mm-dd')}</lastmod>
            <priority>0.80</priority>
            <changefreq>daily</changefreq>
        </url>
        <url>
            <loc>https://www.nsgtaxi.com/hotels</loc>
            <lastmod>${formatDate(new Date(), 'yyyy-mm-dd')}</lastmod>
            <priority>0.80</priority>
            <changefreq>daily</changefreq>
        </url>
        <url>
            <loc>https://www.nsgtaxi.com/hotel-agreement</loc>
            <lastmod>${formatDate(new Date(), 'yyyy-mm-dd')}</lastmod>
            <priority>0.80</priority>
            <changefreq>daily</changefreq>
        </url>
        <url>
            <loc>https://www.nsgtaxi.com/packages</loc>
            <lastmod>${formatDate(new Date(), 'yyyy-mm-dd')}</lastmod>
            <priority>0.80</priority>
            <changefreq>daily</changefreq>
        </url>
        <url>
            <loc>https://www.nsgtaxi.com/package-agreement</loc>
            <lastmod>${formatDate(new Date(), 'yyyy-mm-dd')}</lastmod>
            <priority>0.80</priority>
            <changefreq>daily</changefreq>
        </url>
        ${pages}
    </urlset>
    `;

    fs.writeFile('public/sitemap.xml', finalXML, function (err) {
        res.status(200);
        return res.json({
            success: true,
            message: 'Sitemap generated successfully!',
            data: finalXML
        });
    });
}