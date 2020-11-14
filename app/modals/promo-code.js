const uuid = require('uuid');

const PromoCode = {
    document_id: null,
    image: null,
    title: null,
    description: null,
    image: null,
    code: null,
    amount: null,
    public: null,
    mobile: null,
    status: null,
    created_at: null,
    updated_at: null,
};

function returnUpdatedPromoCodeCollectionField(receivedData) {
    const newObj = Object.assign({}, PromoCode);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    return newObj;
}

function returnNewPromoCodeData(receivedData) {
    const newObj = Object.assign({}, PromoCode);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['document_id'] = uuid();
    newObj['created_at'] = (new Date()).getTime();
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

function returnUpdatedPromoCodeData(previousData, receivedData) {
    const newObj = Object.assign({}, previousData);
    Object.keys(PromoCode).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

module.exports = {
    returnUpdatedPromoCodeCollectionField: returnUpdatedPromoCodeCollectionField,
    returnNewPromoCodeData: returnNewPromoCodeData,
    returnUpdatedPromoCodeData: returnUpdatedPromoCodeData,
};