const uuid = require('uuid');

const Offer = {
    document_id: null,
    message: null,
    status: null,
    created_at: null,
    updated_at: null,
};

function returnUpdatedOfferCollectionField(receivedData) {
    const newObj = Object.assign({}, Offer);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    return newObj;
}

function returnNewOfferData(receivedData) {
    const newObj = Object.assign({}, Offer);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['document_id'] = uuid();
    newObj['created_at'] = (new Date()).getTime();
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

function returnUpdatedOfferData(previousData, receivedData) {
    const newObj = Object.assign({}, previousData);
    Object.keys(Offer).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

module.exports = {
    returnUpdatedOfferCollectionField: returnUpdatedOfferCollectionField,
    returnNewOfferData: returnNewOfferData,
    returnUpdatedOfferData: returnUpdatedOfferData,
};