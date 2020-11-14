const uuid = require('uuid');

const Fare = {
    document_id: null,
    one_way_suv: 0,
    one_way_sedan: 0,
    round_way_suv: 0,
    round_way_sedan: 0,
    one_way_minimum_distance: 0,
    round_way_minimum_distance: 0,
    driver_base_charge: 0,
    day: null,
    festival_date: null,
    festival_name: null,
    created_at: null,
    updated_at: null,
};

function returnUpdatedFareCollectionField(receivedData) {
    const newObj = Object.assign({}, Fare);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    return newObj;
}

function returnNewFareData(receivedData) {
    const newObj = Object.assign({}, Fare);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['document_id'] = uuid();
    newObj['created_at'] = (new Date()).getTime();
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

function returnUpdatedFareData(receivedData) {
    const newObj = Object.create({});
    Object.keys(receivedData).forEach((receivedIndex) => {
        Object.keys(Fare).forEach((FareIndex) => {
            if (receivedIndex == FareIndex) {
                newObj[receivedIndex] = receivedData[receivedIndex];
            }
        });
    });
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

module.exports = {
    returnUpdatedFareCollectionField: returnUpdatedFareCollectionField,
    returnNewFareData: returnNewFareData,
    returnUpdatedFareData: returnUpdatedFareData,
};