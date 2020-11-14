const uuid = require('uuid');

const Video = {
    document_id: null,
    title: null,
    video: null,
    image: null,
    duration: null,
    created_at: null,
    updated_at: null,
};

function returnUpdatedVideoCollectionField(receivedData) {
    const newObj = Object.assign({}, Video);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    return newObj;
}

function returnNewVideoData(receivedData) {
    const newObj = Object.assign({}, Video);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['document_id'] = uuid();
    newObj['created_at'] = (new Date()).getTime();
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

function returnUpdatedVideoData(receivedData) {
    const newObj = Object.create({});
    Object.keys(receivedData).forEach((receivedIndex) => {
        Object.keys(Video).forEach((VideoIndex) => {
            if (receivedIndex == VideoIndex) {
                newObj[receivedIndex] = receivedData[receivedIndex];
            }
        });
    });
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

module.exports = {
    returnUpdatedVideoCollectionField: returnUpdatedVideoCollectionField,
    returnNewVideoData: returnNewVideoData,
    returnUpdatedVideoData: returnUpdatedVideoData,
};