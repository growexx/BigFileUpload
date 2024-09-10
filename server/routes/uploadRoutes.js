const router = require('express').Router();
const fileUploadController = require('../services/fileUpload/fileUploadController');


router.post('/initiate-upload', fileUploadController.initiateUpload);
router.post('/generate-presigned-urls', fileUploadController.generatePresignedUrls);
router.post('/uploadParts',fileUploadController.uploadParts);
router.post('/complete-upload', fileUploadController.completeUpload);
module.exports = router;