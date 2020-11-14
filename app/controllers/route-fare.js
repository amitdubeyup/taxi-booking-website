const config = require('../config');
const RouteFareCollection = config.db.collection('RouteFare');
const RouteFareModal = require('../modals/route-fare');

module.exports = {
    updateField: updateField,
    addRouteFare: addRouteFare,
    setRouteFare: setRouteFare,
    fetchOneRouteFare: fetchOneRouteFare,
    fetchCustomRouteFare: fetchCustomRouteFare,
    fetchAllRouteFare: fetchAllRouteFare,
    fetchTotalRouteFare: fetchTotalRouteFare,
    updateRouteFare: updateRouteFare,
    deleteRouteFare: deleteRouteFare,
};

function updateField(req, res) {
    RouteFareCollection.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const updatedData = RouteFareModal.returnUpdatedRouteFareCollectionField(doc.data());
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
            error: error
        });
    });
}

function addRouteFare(req, res) {
    const params = RouteFareModal.returnNewRouteFareData(req.body);
    RouteFareCollection.doc(params.document_id).set(params).then((response) => {
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

function setRouteFare(req, res) {
    if (req.body.document_id) {
        const params = RouteFareModal.returnNewRouteFareData(req.body);
        RouteFareCollection.doc(req.body.document_id).set(params).then((response) => {
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

function fetchOneRouteFare(req, res) {
    if (req.body.document_id) {
        RouteFareCollection.doc(req.body.document_id).get().then((response) => {
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

function fetchCustomRouteFare(req, res) {
    const params = req.body;
    RouteFareCollection.where(params.key, params.condition, params.value).get().then((response) => {
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

function fetchAllRouteFare(req, res) {
    const limit = req.body.limit ? req.body.limit : 10;
    const order_by = req.body.order_by ? req.body.order_by : null;
    const start_index = req.body.start_index ? req.body.start_index : null;
    let Query = RouteFareCollection;
    if ((order_by != null) && (start_index == null)) {
        Query = RouteFareCollection.orderBy(order_by.key, order_by.value);
    }
    if ((order_by != null) && (start_index != null)) {
        Query = RouteFareCollection.orderBy(order_by.key, order_by.value).startAfter(start_index);
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

function fetchTotalRouteFare(req, res) {
    RouteFareCollection.get().then((snapshot) => {
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

function updateRouteFare(req, res) {
    if (req.body.document_id) {
        const params = RouteFareModal.returnUpdatedRouteFareData(req.body);
        RouteFareCollection.doc(req.body.document_id).update(params).then((response) => {
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

function deleteRouteFare(req, res) {
    if (req.body.document_id) {
        RouteFareCollection.doc(req.body.document_id).delete().then((response) => {
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
