const config = require('../config');
const BookingCollection = config.db.collection('Booking');
const PromoCodeCollection = config.db.collection('PromoCode');
const PromoCodeModal = require('../modals/promo-code');
const _ = require('lodash');

module.exports = {
    updateField: updateField,
    addPromoCode: addPromoCode,
    setPromoCode: setPromoCode,
    fetchOnePromoCode: fetchOnePromoCode,
    fetchTotalPromoCode: fetchTotalPromoCode,
    fetchActiveCode: fetchActiveCode,
    updatePromoCode: updatePromoCode,
    deletePromoCode: deletePromoCode,
    applyPromoCode: applyPromoCode,
    removePromoCode: removePromoCode,
};

function updateField(req, res) {
    PromoCodeCollection.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const updatedData = PromoCodeModal.returnUpdatedPromoCodeCollectionField(doc.data());
            doc.ref.set(updatedData);
        });
        res.status(200);
        return res.json({
            success: true,
            message: 'Collection field updated successfully!',
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to update collection field!',
        });
    });
}

function addPromoCode(req, res) {
    const params = PromoCodeModal.returnNewPromoCodeData(req.body);
    PromoCodeCollection.doc(params.document_id).set(params).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Data saved successfully!',
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to save data!',
            data: error
        });
    });
}

function setPromoCode(req, res) {
    const params = PromoCodeModal.returnNewPromoCodeData(req.body);
    if (params.document_id) {
        PromoCodeCollection.doc(params.document_id).set(params).then((response) => {
            res.status(200);
            return res.json({
                success: true,
                message: 'Data saved successfully!',
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to save data!',
                data: error
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to save data, document_id is required!',
        });
    }
}

function fetchOnePromoCode(req, res) {
    if (req.body.document_id) {
        PromoCodeCollection.doc(req.body.document_id).get().then((response) => {
            if (!response.exists) {
                res.status(400);
                return res.json({
                    success: false,
                    message: 'Unable to fetch data, No record found!',
                });
            } else {
                res.status(200);
                return res.json({
                    success: true,
                    message: 'Data fetched successfully!',
                    data: response.data()
                });
            }
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to fetch data!',
                data: error
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch data, document_id is required!',
        });
    }
}

function fetchTotalPromoCode(req, res) {
    PromoCodeCollection.get().then((snapshot) => {
        const finalData = [];
        snapshot.forEach((doc) => {
            finalData.push(doc.data());
        });
        res.status(200);
        return res.json({
            success: true,
            message: 'Data fetched successfully!',
            data: (_.sortBy(finalData, 'created_at')).reverse()
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch data!',
            data: error
        });
    });
}

function fetchActiveCode(req, res) {
    PromoCodeCollection.where('status', '==', 'active').get().then((response) => {
        if (response.empty) {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to fetch promo code!',
            });
        } else {
            const finalData = [];
            response.forEach((doc) => {
                finalData.push(doc.data());
            });
            const promoCode = finalData[0];
            res.status(200);
            return res.json({
                success: true,
                message: 'Promo code fetched successfully!',
                data: promoCode
            });
        }
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch promo code!',
        });
    });
}

function updatePromoCode(req, res) {
    if (req.body.document_id) {
        PromoCodeCollection.doc((req.body.document_id).toString()).get().then((response) => {
            if (!response.exists) {
                res.status(400);
                return res.json({
                    success: false,
                    message: 'Unable to update data, please try again!',
                });
            } else {
                const PromoCodeData = PromoCodeModal.returnUpdatedPromoCodeData(response.data(), req.body);
                PromoCodeCollection.doc((req.body.document_id).toString()).update(PromoCodeData).then((response) => {
                    res.status(200);
                    return res.json({
                        success: true,
                        message: 'Data updated successfully!',
                    });
                }).catch((error) => {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'Unable to update data, please try again!',
                    });
                });
            }
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to update data, please try again!',
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to update data, document_id is required!',
        });
    }
}

function deletePromoCode(req, res) {
    if (req.body.document_id) {
        PromoCodeCollection.doc(req.body.document_id).delete().then((response) => {
            res.status(200);
            return res.json({
                success: true,
                message: 'Data deleted successfully!',
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to delete data!',
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to delete data, document_id is required!',
        });
    }
}

function applyPromoCode(req, res) {
    PromoCodeCollection.where('code', '==', req.body.code).get().then((response) => {
        if (response.empty) {
            res.status(400);
            return res.json({
                success: false,
                message: 'Invalid promo code!',
            });
        } else {
            const finalData = [];
            response.forEach((doc) => {
                finalData.push(doc.data());
            });
            const promoCode = finalData[0];
            if (promoCode['status'] == 'active') {
                const updateData = {
                    discount_code: promoCode['code'],
                    discount_amount: promoCode['amount'],
                };
                BookingCollection.doc(req.body.document_id).update(updateData).then((response) => {
                    res.status(200);
                    return res.json({
                        success: true,
                        message: 'Promo code applied successfully!',
                    });
                }).catch((error) => {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'Invalid promo code!',
                    });
                });
            } else {
                res.status(400);
                return res.json({
                    success: false,
                    message: 'Invalid promo code!',
                });
            }
        }
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Invalid promo code!',
        });
    });
}

function removePromoCode(req, res) {
    const updateData = {
        discount_code: null,
        discount_amount: 0,
    };
    BookingCollection.doc(req.body.document_id).update(updateData).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Promo code removed successfully!',
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to remove promo code!',
        });
    });
}