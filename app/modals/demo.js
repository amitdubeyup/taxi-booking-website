const Demo = {
    salutation: null,
    first_name: null,
    last_name: null,
    gender: null,
    mobile: null,
    email: null,
    status: null,
    created_at: null,
    updated_at: null,
};

function returnUpdatedDemoCollectionField(receivedData) {
    const newObj = Object.assign({}, Demo);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    return newObj;
}
function returnNewDemoData(receivedData) {
    const newObj = Object.assign({}, Demo);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['created_at'] = (new Date()).getTime();
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

function returnUpdatedDemoData(receivedData) {
    const newObj = Object.create({});
    Object.keys(receivedData).forEach((receivedIndex) => {
        Object.keys(Demo).forEach((demoIndex) => {
            if (receivedIndex == demoIndex) {
                newObj[receivedIndex] = receivedData[receivedIndex];
            }
        });
    });
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

module.exports = {
    returnUpdatedDemoCollectionField: returnUpdatedDemoCollectionField,
    returnNewDemoData: returnNewDemoData,
    returnUpdatedDemoData: returnUpdatedDemoData,
};