const uuid = require('uuid');

const HotelBooking = {
    document_id: null,

    salutation: null,
    first_name: null,
    last_name: null,
    mobile: null,
    email: null,

    hotel_document_id: null,
    hotel_owner_mobile: null,
    hotel_name: null,
    hotel_location: null,
    hotel_quotation: null,
    check_in_date: null,
    check_out_date: null,
    room_type: null,
    rooms: 0,
    guests: 0,
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

function returnUpdatedHotelBookingCollectionField(receivedData) {
    const newObj = Object.assign({}, HotelBooking);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    return newObj;
}

function returnNewHotelBookingData(receivedData) {
    const newObj = Object.assign({}, HotelBooking);
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

function returnUpdatedHotelBookingData(previousData, receivedData) {
    const previousObj = Object.assign({}, previousData);
    Object.keys(previousObj).forEach((index) => {
        previousObj[index] = receivedData[index] ? receivedData[index] : previousObj[index];
    });
    previousObj['mobile'] = previousObj['mobile'] ? parseInt(previousObj['mobile']) : previousObj['mobile'];
    previousObj['updated_at'] = (new Date()).getTime();
    return previousObj;
}

module.exports = {
    returnUpdatedHotelBookingCollectionField: returnUpdatedHotelBookingCollectionField,
    returnNewHotelBookingData: returnNewHotelBookingData,
    returnUpdatedHotelBookingData: returnUpdatedHotelBookingData,
};