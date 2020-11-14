const uuid = require('uuid');

const PackageBooking = {
    document_id: null,

    salutation: null,
    first_name: null,
    last_name: null,
    mobile: null,
    email: null,

    package_document_id: null,
    package_owner_mobile: null,
    package_name: null,
    package_location: null,
    package_quotation: null,
    start_date: null,
    end_date: null,
    package_type: null,
    adults: 0,
    children: 0,
    message: null,

    base_fare: 0,
    gst_charge: 0,
    total_days: 0,
    total_fare: 0,

    payment_gateway: null,
    payment_description: null,
    payment_reference_number: null,
    payment_amount: null,
    payment_status: null,

    status: null,
    created_at: null,
    updated_at: null,
};

function returnUpdatedPackageBookingCollectionField(receivedData) {
    const newObj = Object.assign({}, PackageBooking);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    return newObj;
}

function returnNewPackageBookingData(receivedData) {
    const newObj = Object.assign({}, PackageBooking);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['document_id'] = uuid();
    newObj['mobile'] = newObj['mobile'] ? parseInt(newObj['mobile']) : newObj['mobile'];
    newObj['status'] = 'booked';
    newObj['created_at'] = (new Date()).getTime();
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

function returnUpdatedPackageBookingData(previousData, receivedData) {
    const previousObj = Object.assign({}, previousData);
    Object.keys(previousObj).forEach((index) => {
        previousObj[index] = receivedData[index] ? receivedData[index] : previousObj[index];
    });
    previousObj['mobile'] = previousObj['mobile'] ? parseInt(previousObj['mobile']) : previousObj['mobile'];
    previousObj['updated_at'] = (new Date()).getTime();
    return previousObj;
}

module.exports = {
    returnUpdatedPackageBookingCollectionField: returnUpdatedPackageBookingCollectionField,
    returnNewPackageBookingData: returnNewPackageBookingData,
    returnUpdatedPackageBookingData: returnUpdatedPackageBookingData,
};