const fileUploadService = require('./fileUploadService');

const fileUploadController = {
    initiateUpload: async (req, res) => {
        try {
            const { bucketName, key } = req.body;
            const data = await fileUploadService.initiateUpload(bucketName, key);
            res.status(200).json(data);
        } catch (error) {
            console.log("initiateUpload Error", error);
            res.status(500).json({ error: error.message });
        }
    },

    generatePresignedUrls: async (req, res) => {
        try {
            const { bucketName, key, uploadId, partNumbers } = req.body;
            const presignedUrls = await fileUploadService.generatePresignedUrls(bucketName, key, uploadId, partNumbers);
            res.status(200).json({ presignedUrls });
        } catch (error) {
            console.log("generatePresignedUrls Error", error);
            res.status(500).json({ error: error.message });
        }
    },
    completeUpload: async (req, res) => {
        try {
            const { bucketName, key, uploadId, parts } = req.body;
            const data = await fileUploadService.completeMultipartUpload(bucketName, key, uploadId, parts);
            res.status(200).json(data);
        } catch (error) {
            console.log("completeUpload Error", error);
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = fileUploadController;
