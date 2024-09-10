const fileUploadService = require('./fileUploadService');

const fileUploadController = {
    initiateUpload: async (req, res) => {
        try {
            const { bucketName, key } = req.body;
            const data = await fileUploadService.initiateUpload(bucketName, key);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    generatePresignedUrls: async (req, res) => {
        try {
            const { bucketName, key, uploadId, partNumbers } = req.body;
            const presignedUrls = await fileUploadService.generatePresignedUrls(bucketName, key, uploadId, partNumbers);
            res.status(200).json({ presignedUrls });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    uploadParts: async (req, res) => {
        try {
            const { presignedUrls, fileParts } = req.body;
            const partsData = await fileUploadService.uploadParts(presignedUrls, fileParts);
            res.status(200).json({ partsData });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    completeUpload: async (req, res) => {
        try {
            const { bucketName, key, uploadId, parts } = req.body;
            const data = await fileUploadService.completeMultipartUpload(bucketName, key, uploadId, parts);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = fileUploadController;
