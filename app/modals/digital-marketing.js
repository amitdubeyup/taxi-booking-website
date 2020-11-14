const DigitalMarketing = {
    document_id: null,
    page_url: null,
    title: null,
    description: null,
    keywords: null,
    page_offer_title: null,
    page_offer_description: null,
    created_at: null,
    updated_at: null,
};

function returnUpdatedDigitalMarketingCollectionField(receivedData) {
    const newObj = Object.assign({}, DigitalMarketing);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    return newObj;
}

function returnNewDigitalMarketingData(receivedData) {
    const newObj = Object.assign({}, DigitalMarketing);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['created_at'] = (new Date()).getTime();
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

function returnUpdatedDigitalMarketingData(receivedData) {
    const newObj = Object.create({});
    Object.keys(receivedData).forEach((receivedIndex) => {
        Object.keys(DigitalMarketing).forEach((DigitalMarketingIndex) => {
            if (receivedIndex == DigitalMarketingIndex) {
                newObj[receivedIndex] = receivedData[receivedIndex];
            }
        });
    });
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

module.exports = {
    returnUpdatedDigitalMarketingCollectionField: returnUpdatedDigitalMarketingCollectionField,
    returnNewDigitalMarketingData: returnNewDigitalMarketingData,
    returnUpdatedDigitalMarketingData: returnUpdatedDigitalMarketingData,
};