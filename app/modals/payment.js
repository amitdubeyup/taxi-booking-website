const uuid = require('uuid');

const Payment = {
    document_id: null,
    customer_name: null,
    customer_email: null,
    customer_contact: null,
    amount: 0,
    amount_due: 0,
    amount_paid: 0,
    attempts: 0,
    currency: null,
    entity: null,
    id: null,
    notes: null,
    offer_id: null,
    receipt: null,

    razorpay_payment_id: null,
    razorpay_order_id: null,
    razorpay_signature: null,
    org_logo: null,
    org_name: null,
    checkout_logo: null,
    custom_branding: null,

    status: null,
    created_at: null,
    updated_at: null,
};

function returnUpdatedPaymentCollectionField(receivedData) {
    const newObj = Object.assign({}, Payment);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    return newObj;
}

function returnNewPaymentData(receivedData) {
    const newObj = Object.assign({}, Payment);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['document_id'] = uuid();
    newObj['created_at'] = (new Date()).getTime();
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

function returnUpdatedPaymentData(previousData, receivedData) {
    const previousObj = Object.assign({}, previousData);
    Object.keys(previousObj).forEach((index) => {
        previousObj[index] = receivedData[index] ? receivedData[index] : previousObj[index];
    });
    previousObj['updated_at'] = (new Date()).getTime();
    return previousObj;
}

module.exports = {
    returnUpdatedPaymentCollectionField: returnUpdatedPaymentCollectionField,
    returnNewPaymentData: returnNewPaymentData,
    returnUpdatedPaymentData: returnUpdatedPaymentData,
};