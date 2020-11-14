const uuid = require('uuid');

const CarDetails = {
    document_id: null,
    car_type: null,
    car_brand: null,
    car_name: null,
    car_image: null,
    one_way_fare: 0,
    round_way_fare: 0,
    rental_fare: 0,
    one_way_minimum_distance: 0,
    round_way_minimum_distance: 0,
    driver_base_charge: 0,
    created_at: null,
    updated_at: null,
};

function returnUpdatedCarDetailsCollectionField(receivedData) {
    const newObj = Object.assign({}, CarDetails);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    return newObj;
}

function returnNewCarDetailsData(receivedData) {
    const newObj = Object.assign({}, CarDetails);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['document_id'] = uuid();
    newObj['created_at'] = (new Date()).getTime();
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

function returnUpdatedCarDetailsData(previousData, receivedData) {
    const newObj = Object.assign({}, previousData);
    Object.keys(CarDetails).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

module.exports = {
    returnUpdatedCarDetailsCollectionField: returnUpdatedCarDetailsCollectionField,
    returnNewCarDetailsData: returnNewCarDetailsData,
    returnUpdatedCarDetailsData: returnUpdatedCarDetailsData,
};