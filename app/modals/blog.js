const uuid = require('uuid');

const Blog = {
    document_id: null,
    page_url: null,
    page_title: null,
    page_description: null,
    page_keywords: null,
    blog_heading: null,
    blog_description: null,
    blog_content: null,
    blog_image: null,
    blog_image_name: null,
    created_at: null,
    updated_at: null,
};

function returnUpdatedBlogCollectionField(receivedData) {
    const newObj = Object.assign({}, Blog);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    return newObj;
}

function returnNewBlogData(receivedData) {
    const newObj = Object.assign({}, Blog);
    Object.keys(newObj).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['document_id'] = uuid();
    newObj['created_at'] = (new Date()).getTime();
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

function returnUpdatedBlogData(previousData, receivedData) {
    const newObj = Object.assign({}, previousData);
    Object.keys(Blog).forEach((index) => {
        newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
    });
    newObj['updated_at'] = (new Date()).getTime();
    return newObj;
}

module.exports = {
    returnUpdatedBlogCollectionField: returnUpdatedBlogCollectionField,
    returnNewBlogData: returnNewBlogData,
    returnUpdatedBlogData: returnUpdatedBlogData,
};