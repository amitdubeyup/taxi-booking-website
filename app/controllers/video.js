const config = require('../config');
const VideoCollection = config.db.collection('Video');
const VideoModal = require('../modals/video');
const UserCollection = config.db.collection('User');
const _ = require('lodash');

module.exports = {
    updateField: updateField,
    addVideo: addVideo,
    setVideo: setVideo,
    fetchOneVideo: fetchOneVideo,
    fetchCustomVideo: fetchCustomVideo,
    fetchAllVideo: fetchAllVideo,
    fetchTotalVideo: fetchTotalVideo,
    updateVideo: updateVideo,
    deleteVideo: deleteVideo,
    loginUser: loginUser
};

function updateField(req, res) {
    VideoCollection.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const updatedData = VideoModal.returnUpdatedVideoCollectionField(doc.data());
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

function addVideo(req, res) {
    const params = VideoModal.returnNewVideoData(req.body);
    VideoCollection.doc(params.document_id).set(params).then((response) => {
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

function setVideo(req, res) {
    const params = VideoModal.returnNewVideoData(req.body);
    if (params.document_id) {
        VideoCollection.doc(params.document_id).set(params).then((response) => {
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

function fetchOneVideo(req, res) {
    if (req.body.document_id) {
        VideoCollection.doc(req.body.document_id).get().then((response) => {
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

function fetchCustomVideo(req, res) {
    const params = req.body;
    VideoCollection.where(params.key, params.condition, params.value).get().then((response) => {
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

function fetchAllVideo(req, res) {
    const limit = req.body.limit ? req.body.limit : 10;
    const order_by = req.body.order_by ? req.body.order_by : null;
    const start_index = req.body.start_index ? req.body.start_index : null;
    let Query = VideoCollection;
    if ((order_by != null) && (start_index == null)) {
        Query = VideoCollection.orderBy(order_by.key, order_by.value);
    }
    if ((order_by != null) && (start_index != null)) {
        Query = VideoCollection.orderBy(order_by.key, order_by.value).startAfter(start_index);
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

function fetchTotalVideo(req, res) {
    VideoCollection.get().then((snapshot) => {
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

function updateVideo(req, res) {
    if (req.body.document_id) {
        VideoCollection.doc((req.body.document_id).toString()).get().then((response) => {
            if (!response.exists) {
                res.status(400);
                return res.json({
                    success: false,
                    message: 'Unable to update data, please try again!',
                });
            } else {
                const VideoData = VideoModal.returnUpdatedVideoData(response.data(), req.body);
                VideoCollection.doc((req.body.document_id).toString()).update(VideoData).then((response) => {
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

function deleteVideo(req, res) {
    if (req.body.document_id) {
        VideoCollection.doc(req.body.document_id).delete().then((response) => {
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

function loginUser(req, res) {
    if (req.body.mobile && req.body.password) {
        UserCollection.doc((parseInt(req.body.mobile)).toString()).get().then((response) => {
            if (!response.exists) {
                res.status(400);
                return res.json({
                    success: false,
                    message: `Account doesn't exist, please register!`,
                });
            } else {
                const userData = response.data();
                if (userData['status'] == 'active') {
                    if (req.body.password == userData['password']) {
                        const payload = {
                            salutation: userData['salutation'],
                            first_name: userData['first_name'],
                            last_name: userData['last_name'],
                            gender: userData['gender'],
                            mobile: userData['mobile'],
                            email: userData['email'],
                            login_time: new Date()
                        };
                        res.status(200);
                        return res.json({
                            success: true,
                            message: 'Logged in successfully!',
                            data: payload
                        });
                    } else {
                        res.status(400);
                        return res.json({
                            success: false,
                            message: `Unable to login, password doesn't match!`,
                        });
                    }
                } else {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: `Account suspended, Please contact administrator!`,
                    });
                }
            }
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to login, please try again!',
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to login, mobile & password is required!',
        });
    }
}
