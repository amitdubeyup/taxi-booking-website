const uuid = require('uuid');

const Route = {
    document_id: null,
    page_url: null,
    page_title: null,
    page_description: null,
    page_keywords: null,
    page_offer_title: null,
    page_offer_description: null,
    route_name: null,
    created_at: null,
    updated_at: null,
};

function returnUpdatedRouteCollectionField(receivedData) {
    const newObj = Object.assign({}, Route);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    return newObj;
}

function returnNewRouteData(receivedData) {
    const newObj = Object.assign({}, Route);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['document_id'] = uuid();
    newObj['created_at'] = (new Date()).getTime();
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

function returnUpdatedRouteData(previousData, receivedData) {
    const newObj = Object.assign({}, previousData);
    Object.keys(Route).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

module.exports = {
    returnUpdatedRouteCollectionField: returnUpdatedRouteCollectionField,
    returnNewRouteData: returnNewRouteData,
    returnUpdatedRouteData: returnUpdatedRouteData,
};