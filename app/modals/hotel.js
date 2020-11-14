const uuid = require('uuid');

const Hotel = {
    owner_mobile: null,
    document_id: null,
    page_url: null,
    page_title: null,
    page_description: null,
    page_keywords: null,
    hotel_name: null,
    hotel_type: null,
    hotel_room_type: null,
    hotel_rating: null,
    hotel_location: null,
    hotel_rooms: [],
    hotel_services: [],
    hotel_amount: null,
    hotel_description: null,
    hotel_quotation: null,
    hotel_image: null,
    hotel_image_name: null,
    hotel_image_collections: [],
    created_at: null,
    updated_at: null,
};

function returnUpdatedHotelCollectionField(receivedData) {
    const newObj = Object.assign({}, Hotel);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    return newObj;
}

function returnNewHotelData(receivedData) {
    const newObj = Object.assign({}, Hotel);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['document_id'] = uuid();
    newObj['created_at'] = (new Date()).getTime();
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

function returnUpdatedHotelData(previousData, receivedData) {
    const newObj = Object.assign({}, previousData);
    Object.keys(Hotel).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

module.exports = {
    returnUpdatedHotelCollectionField: returnUpdatedHotelCollectionField,
    returnNewHotelData: returnNewHotelData,
    returnUpdatedHotelData: returnUpdatedHotelData,
};