const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const config = require('../config');

router.post('/upload', (req, res) => {
    const folder_name = req.body.folder_name ? req.body.folder_name : 'public';
    const base_64_text = (req.body.image_data).split(';base64,').pop();
    const image_buffer = Buffer.from(base_64_text, 'base64');
    const content_type = (req.body.image_data).split(';base64,')[0].split(':')[1];
    const file_name = `${uuid()}.${content_type.split('/')[1]}`;
    const image_url = `https://storage.googleapis.com/nsg-taxi-india-files/${folder_name}/${file_name}`;
    const bucket_option = {
        public: true,
        gzip: true,
        metadata: {
            content_type,
            cacheControl: 'public, max-age=31536000',
        }
    };
    (config.admin).storage().bucket('nsg-taxi-india-files').file(`${folder_name}/` + file_name).save(image_buffer, bucket_option).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'File uploaded successfully!',
            data: image_url
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to upload file!',
        });
    });
});

router.post('/delete', (req, res) => {
    if (req.body.folder_name && req.body.file_name) {
        (config.admin).storage().bucket('nsg-taxi-india-files').file(`${req.body.folder_name}/${req.body.file_name}`).delete().then((response) => {
            res.status(200);
            return res.json({
                success: true,
                message: 'File deleted successfully!',
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to delete file!',
            });
        });
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to delete file, required field error!',
        });
    }
});

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;

