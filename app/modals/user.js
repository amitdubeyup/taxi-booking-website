const User = {
    parent: null,
    user_type: null,
    business_name: null,
    salutation: null,
    first_name: null,
    last_name: null,
    gender: null,
    mobile: null,
    email: null,
    password: null,
    uid_number: null,
    uid_number_image: null,
    pan_number: null,
    pan_number_image: null,
    driving_license_number: null,
    driving_license_image: null,
    police_verification_number: null,
    police_verification_image: null,
    bank_name: null,
    bank_ifsc_code: null,
    bank_account_number: null,
    profile_picture: null,
    local_address: null,
    landmark: null,
    city: null,
    state: null,
    country: null,
    pin_code: null,
    email_code: null,
    mobile_code: null,
    email_verified: false,
    mobile_verified: false,
    status: null,
    created_at: null,
    updated_at: null,
};

function returnUpdatedUserCollectionField(receivedData) {
    const newObj = Object.assign({}, User);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['parent'] = newObj['parent'] ? parseInt(newObj['parent']) : newObj['parent'];
    newObj['mobile'] = newObj['mobile'] ? parseInt(newObj['mobile']) : newObj['mobile'];
    newObj['uid_number'] = newObj['uid_number'] ? parseInt(newObj['uid_number']) : newObj['uid_number'];
    return newObj;
}

function generateCode(n) {
    return Math.floor(Math.random() * (9 * Math.pow(10, n - 1))) + Math.pow(10, n - 1);
}

function returnNewUserData(receivedData) {
    const newObj = Object.assign({}, User);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['parent'] = newObj['parent'] ? parseInt(newObj['parent']) : newObj['parent'];
    newObj['mobile'] = newObj['mobile'] ? parseInt(newObj['mobile']) : newObj['mobile'];
    newObj['uid_number'] = newObj['uid_number'] ? parseInt(newObj['uid_number']) : newObj['uid_number'];
    newObj['email_code'] = generateCode(6);
    newObj['mobile_code'] = generateCode(6);
    newObj['created_at'] = (new Date()).getTime();
    newObj['updated_at'] = (new Date()).getTime();
    newObj['status'] = 'inactive';
    return newObj;
}

function returnUpdatedUserData(previousData, receivedData) {
    const previousObj = Object.assign({}, previousData);
    Object.keys(previousObj).forEach((index) => {
        previousObj[index] = receivedData[index] ? receivedData[index] : previousObj[index];
    });
    previousObj['parent'] = previousObj['parent'] ? parseInt(previousObj['parent']) : previousObj['parent'];
    previousObj['mobile'] = previousObj['mobile'] ? parseInt(previousObj['mobile']) : previousObj['mobile'];
    previousObj['uid_number'] = previousObj['uid_number'] ? parseInt(previousObj['uid_number']) : previousObj['uid_number'];
    previousObj['updated_at'] = (new Date()).getTime();
    return previousObj;
}

module.exports = {
    returnUpdatedUserCollectionField: returnUpdatedUserCollectionField,
    returnNewUserData: returnNewUserData,
    returnUpdatedUserData: returnUpdatedUserData
};