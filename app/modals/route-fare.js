const uuid = require('uuid');

const RouteFare = {
    document_id: null,

    page_url: null,
    page_title: null,
    page_description: null,
    page_keywords: null,
    page_offer_title: null,
    page_offer_description: null,
    page_offer_amount: 0,
    route_name: null,

    drop_off_address: null,
    drop_off_latitude: 0,
    drop_off_longitude: 0,
    pickup_address: null,
    pickup_latitude: 0,
    pickup_longitude: 0,
    actual_distance: 0,

    one_way_suv: 0,
    one_way_sedan: 0,
    round_way_suv: 0,
    round_way_sedan: 0,
    one_way_minimum_distance: 0,
    round_way_minimum_distance: 0,
    driver_base_charge: 0,

    created_at: null,
    updated_at: null,
};

function returnUpdatedRouteFareCollectionField(receivedData) {
    const newObj = Object.assign({}, RouteFare);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    return newObj;
}

function returnNewRouteFareData(receivedData) {
    const newObj = Object.assign({}, RouteFare);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['document_id'] = uuid();
    newObj['created_at'] = (new Date()).getTime();
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

function returnUpdatedRouteFareData(receivedData) {
    const newObj = Object.create({});
    Object.keys(receivedData).forEach((receivedIndex) => {
        Object.keys(RouteFare).forEach((RouteFareIndex) => {
            if (receivedIndex == RouteFareIndex) {
                newObj[receivedIndex] = receivedData[receivedIndex];
            }
        });
    });
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

module.exports = {
    returnUpdatedRouteFareCollectionField: returnUpdatedRouteFareCollectionField,
    returnNewRouteFareData: returnNewRouteFareData,
    returnUpdatedRouteFareData: returnUpdatedRouteFareData,
};