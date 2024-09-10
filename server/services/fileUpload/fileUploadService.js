const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const fileUploadService = {
    initiateUpload: async (bucketName, key) => {
        const params = {
            Bucket: bucketName,
            Key: key,
        };
        return s3.createMultipartUpload(params).promise();
    },

    generatePresignedUrls: async (bucketName, key, uploadId, partNumbers) => {
        const presignedUrls = await Promise.all(partNumbers.map(partNumber => {
            const params = {
                Bucket: bucketName,
                Key: key,
                UploadId: uploadId,
                PartNumber: partNumber,
                Expires: 3600, 
            };

            return s3.getSignedUrlPromise('uploadPart', params);
        }));

        return presignedUrls;
    },

    uploadParts: async (presignedUrls, fileParts) => {
        const axios = require('axios');

        const uploadResults = await Promise.all(presignedUrls.map((url, index) => {
            const options = {
                method: 'PUT',
                url: url,
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
                data: fileParts[index]
            };
            return axios(options);
        }));

        return uploadResults.map((result, index) => ({
            PartNumber: index + 1,
            ETag: result.headers.etag
        }));
    },

    completeMultipartUpload: async (bucketName, key, uploadId, parts) => {
        const params = {
            Bucket: bucketName,
            Key: key,
            UploadId: uploadId,
            MultipartUpload: {
                Parts: parts,
            },
        };

        return s3.completeMultipartUpload(params).promise();
    }
};

module.exports = fileUploadService;
