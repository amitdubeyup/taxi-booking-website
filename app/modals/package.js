const uuid = require('uuid');

const Package = {
    owner_mobile: null,
    document_id: null,
    page_url: null,
    page_title: null,
    page_description: null,
    page_keywords: null,
    package_name: null,
    package_rating: null,
    package_location: null,
    package_services: [],
    package_plans: [],
    package_content: null,
    package_quotation: null,
    package_image: null,
    package_image_name: null,
    package_image_collections: [],
    created_at: null,
    updated_at: null,
};

function returnUpdatedPackageCollectionField(receivedData) {
    const newObj = Object.assign({}, Package);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    return newObj;
}

function returnNewPackageData(receivedData) {
    const newObj = Object.assign({}, Package);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['document_id'] = uuid();
    newObj['created_at'] = (new Date()).getTime();
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

function returnUpdatedPackageData(previousData, receivedData) {
    const newObj = Object.assign({}, previousData);
    Object.keys(Package).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

module.exports = {
    returnUpdatedPackageCollectionField: returnUpdatedPackageCollectionField,
    returnNewPackageData: returnNewPackageData,
    returnUpdatedPackageData: returnUpdatedPackageData,
};