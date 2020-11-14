const uuid = require('uuid');

const Vehicle = {
    document_id: null,
    vehicle_owner_mobile: null,
    vehicle_type: null,
    vehicle_brand: null,
    vehicle_name: null,
    vehicle_number: null,
    vehicle_image: null,
    vehicle_rc_number: null,
    vehicle_rc_image: null,
    vehicle_insurance_expiry_date: null,
    vehicle_insurance_image: null,
    created_at: null,
    updated_at: null,
};

function returnUpdatedVehicleCollectionField(receivedData) {
    const newObj = Object.assign({}, Vehicle);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    return newObj;
}

function returnNewVehicleData(receivedData) {
    const newObj = Object.assign({}, Vehicle);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['document_id'] = uuid();
    newObj['created_at'] = (new Date()).getTime();
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

function returnUpdatedVehicleData(previousData, receivedData) {
    const newObj = Object.assign({}, previousData);
    Object.keys(Vehicle).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

module.exports = {
    returnUpdatedVehicleCollectionField: returnUpdatedVehicleCollectionField,
    returnNewVehicleData: returnNewVehicleData,
    returnUpdatedVehicleData: returnUpdatedVehicleData,
};