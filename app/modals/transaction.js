const uuid = require('uuid');

const Transaction = {
    document_id: null, //DOCUMENT ID
    order_id: null, //YOUR_ORDER_ID
    order_amount: null, //YOUR_ORDER_AMOUNT
    customer_id: null, //YOUR_CUSTOMER_ID
    transaction_token: null, //TRANSACTION_TOKEN
    payment_currency: null, //PAYMENT_CURRENCY
    gateway_used_by_paytm: null, //GATEWAY_USED_BY_PAYTM
    paytm_response_message_description: null, //PAYTM_RESPONSE_MESSAGE_DESCRIPTION
    bank_name_of_issuing_payment_mode: null, // BANK_NAME_OF_ISSUING_PAYMENT_MODE
    payment_mode_used_by_customer: null, //PAYMENT_MODE_USED_BY_CUSTOMER
    merchant_id: null, //YOUR_MID_HERE
    paytm_response_code: null, //PAYTM_RESPONSE_CODE
    payment_transaction_id: null, //PAYTM_TRANSACTION_ID
    order_transaction_amount: null, //ORDER_TRANSACTION_AMOUNT
    paytm_transaction_status: null, //PAYTM_TRANSACTION_STATUS
    bank_transaction_id: null, //BANK_TRANSACTION_ID
    transaction_date_time: null, //TRANSACTION_DATE_TIME
    paytm_generated_checksum_value: null, //PAYTM_GENERATED_CHECKSUM_VALUE
    created_at: null,
    updated_at: null,
};

function returnUpdatedTransactionCollectionField(receivedData) {
    const newObj = Object.assign({}, Transaction);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    return newObj;
}

function returnNewTransactionData(receivedData) {
    const newObj = Object.assign({}, Transaction);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['document_id'] = uuid();
    newObj['created_at'] = (new Date()).getTime();
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

function returnUpdatedTransactionData(previousData, receivedData) {
    const previousObj = Object.assign({}, previousData);
    Object.keys(previousObj).forEach((index) => {
        previousObj[index] = receivedData[index] ? receivedData[index] : previousObj[index];
    });
    previousObj['updated_at'] = (new Date()).getTime();
    return previousObj;
}

module.exports = {
    returnUpdatedTransactionCollectionField: returnUpdatedTransactionCollectionField,
    returnNewTransactionData: returnNewTransactionData,
    returnUpdatedTransactionData: returnUpdatedTransactionData,
};