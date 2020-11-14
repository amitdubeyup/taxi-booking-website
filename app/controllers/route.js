const config = require('../config');
const RouteCollection = config.db.collection('Route');
const RouteModal = require('../modals/route');
const _ = require('lodash');

module.exports = {
    updateField: updateField,
    addRoute: addRoute,
    setRoute: setRoute,
    fetchOneRoute: fetchOneRoute,
    fetchCustomRoute: fetchCustomRoute,
    fetchAllRoute: fetchAllRoute,
    fetchTotalRoute: fetchTotalRoute,
    updateRoute: updateRoute,
    deleteRoute: deleteRoute,
};

function updateField(req, res) {
    RouteCollection.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const updatedData = RouteModal.returnUpdatedRouteCollectionField(doc.data());
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

function addRoute(req, res) {
    const params = RouteModal.returnNewRouteData(req.body);
    RouteCollection.doc(params.document_id).set(params).then((response) => {
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

function setRoute(req, res) {
    const params = RouteModal.returnNewRouteData(req.body);
    if (params.document_id) {
        RouteCollection.doc(params.document_id).set(params).then((response) => {
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

function fetchOneRoute(req, res) {
    if (req.body.document_id) {
        RouteCollection.doc(req.body.document_id).get().then((response) => {
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

function fetchCustomRoute(req, res) {
    const params = req.body;
    RouteCollection.where(params.key, params.condition, params.value).get().then((response) => {
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

function fetchAllRoute(req, res) {
    const limit = req.body.limit ? req.body.limit : 10;
    const order_by = req.body.order_by ? req.body.order_by : null;
    const start_index = req.body.start_index ? req.body.start_index : null;
    let Query = RouteCollection;
    if ((order_by != null) && (start_index == null)) {
        Query = RouteCollection.orderBy(order_by.key, order_by.value);
    }
    if ((order_by != null) && (start_index != null)) {
        Query = RouteCollection.orderBy(order_by.key, order_by.value).startAfter(start_index);
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

function fetchTotalRoute(req, res) {
    RouteCollection.get().then((snapshot) => {
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

function updateRoute(req, res) {
    if (req.body.document_id) {
        RouteCollection.doc((req.body.document_id).toString()).get().then((response) => {
            if (!response.exists) {
                res.status(400);
                return res.json({
                    success: false,
                    message: 'Unable to update data, please try again!',
                });
            } else {
                const RouteData = RouteModal.returnUpdatedRouteData(response.data(), req.body);
                RouteCollection.doc((req.body.document_id).toString()).update(RouteData).then((response) => {
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

function deleteRoute(req, res) {
    if (req.body.document_id) {
        RouteCollection.doc(req.body.document_id).delete().then((response) => {
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
