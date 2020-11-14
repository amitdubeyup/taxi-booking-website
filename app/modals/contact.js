const Contact = {
    name: null,
    mobile: null,
    email: null,
    message: null,
    created_at: null,
    updated_at: null,
};

function returnUpdatedContactCollectionField(receivedData) {
    const newObj = Object.assign({}, Contact);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    return newObj;
}

function returnNewContactData(receivedData) {
    const newObj = Object.assign({}, Contact);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['created_at'] = (new Date()).getTime();
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

function returnUpdatedContactData(receivedData) {
    const newObj = Object.create({});
    Object.keys(receivedData).forEach((receivedIndex) => {
        Object.keys(Contact).forEach((ContactIndex) => {
            if (receivedIndex == ContactIndex) {
                newObj[receivedIndex] = receivedData[receivedIndex];
            }
        });
    });
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

module.exports = {
    returnUpdatedContactCollectionField: returnUpdatedContactCollectionField,
    returnNewContactData: returnNewContactData,
    returnUpdatedContactData: returnUpdatedContactData,
};