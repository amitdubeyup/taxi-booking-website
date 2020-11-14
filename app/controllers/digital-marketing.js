const config = require('../config');
const DigitalMarketingCollection = config.db.collection('DigitalMarketing');
const DigitalMarketingModal = require('../modals/digital-marketing');

module.exports = {
    updateField: updateField,
    addDigitalMarketing: addDigitalMarketing,
    setDigitalMarketing: setDigitalMarketing,
    fetchOneDigitalMarketing: fetchOneDigitalMarketing,
    fetchCustomDigitalMarketing: fetchCustomDigitalMarketing,
    fetchAllDigitalMarketing: fetchAllDigitalMarketing,
    fetchTotalDigitalMarketing: fetchTotalDigitalMarketing,
    updateDigitalMarketing: updateDigitalMarketing,
    deleteDigitalMarketing: deleteDigitalMarketing,
};

function updateField(req, res) {
    DigitalMarketingCollection.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const updatedData = DigitalMarketingModal.returnUpdatedDigitalMarketingCollectionField(doc.data());
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

function addDigitalMarketing(req, res) {
    const params = DigitalMarketingModal.returnNewDigitalMarketingData(req.body);
    DigitalMarketingCollection.add(params).then((response) => {
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

function setDigitalMarketing(req, res) {
    if (req.body.document_id) {
        const params = DigitalMarketingModal.returnNewDigitalMarketingData(req.body);
        DigitalMarketingCollection.doc(req.body.document_id).set(params).then((response) => {
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

function fetchOneDigitalMarketing(req, res) {
    if (req.body.document_id) {
        DigitalMarketingCollection.doc(req.body.document_id).get().then((response) => {
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

function fetchCustomDigitalMarketing(req, res) {
    const params = req.body;
    DigitalMarketingCollection.where(params.key, params.condition, params.value).get().then((response) => {
        if (response.empty) {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to fetch data, No matching record found!',
            });
        } else {
            const finalData = [];
            response.forEach((doc) => {
                finalData.push(doc.data());
            });
            res.status(200);
            return res.json({
                success: true,
                message: 'Data fetched successfully!',
                data: finalData
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
}

function fetchAllDigitalMarketing(req, res) {
    const limit = req.body.limit ? req.body.limit : 10;
    const order_by = req.body.order_by ? req.body.order_by : null;
    const start_index = req.body.start_index ? req.body.start_index : null;
    let Query = DigitalMarketingCollection;
    if ((order_by != null) && (start_index == null)) {
        Query = DigitalMarketingCollection.orderBy(order_by.key, order_by.value);
    }
    if ((order_by != null) && (start_index != null)) {
        Query = DigitalMarketingCollection.orderBy(order_by.key, order_by.value).startAfter(start_index);
    }
    Query.limit(limit).get().then((response) => {
        const finalData = [];
        response.forEach((doc) => {
            finalData.push(doc.data());
        });
        res.status(200);
        return res.json({
            success: true,
            message: 'Data fetched successfully!',
            data: finalData
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

function fetchTotalDigitalMarketing(req, res) {
    DigitalMarketingCollection.get().then((snapshot) => {
        const finalData = [];
        snapshot.forEach((doc) => {
            finalData.push(doc.data());
        });
        res.status(200);
        return res.json({
            success: true,
            message: 'Data fetched successfully!',
            data: finalData
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

function updateDigitalMarketing(req, res) {
    if (req.body.document_id) {
        const params = DigitalMarketingModal.returnUpdatedDigitalMarketingData(req.body);
        DigitalMarketingCollection.doc(req.body.document_id).update(params).then((response) => {
            res.status(200);
            return res.json({
                success: true,
                message: 'Data updated successfully!',
                data: params
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to update data!',
                data: error
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

function deleteDigitalMarketing(req, res) {
    if (req.body.document_id) {
        DigitalMarketingCollection.doc(req.body.document_id).delete().then((response) => {
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
