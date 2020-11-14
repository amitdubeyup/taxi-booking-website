
module.exports = {
    addPinCode: addPinCode,
    searchPinCode: searchPinCode,
    searchCustomPinCode: searchCustomPinCode,
};
function addPinCode(req, res) {
    res.status(200);
    return res.json({
        success: true,
        message: 'Pin code added successfully!',
    });
}

function searchPinCode(req, res) {
    res.status(200);
    return res.json({
        success: true,
        message: 'Pin code added successfully!',
    });
}

function searchCustomPinCode(value) {
    res.status(200);
    return res.json({
        success: true,
        message: 'Pin code added successfully!',
    });
}