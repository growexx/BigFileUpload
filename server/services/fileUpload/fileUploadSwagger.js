const message = require('../../locales/en.json');

module.exports = swaggerJson => {
    swaggerJson.paths['/file/upload/initiate'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'File Upload'
            ],
            description: 'Initiate Multipart Upload',
            summary: 'Initiate Multipart Upload',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Initiate upload by specifying bucket and key',
                required: true,
                schema: {
                    type: 'object',
                    properties: {
                        bucketName: {
                            type: 'string',
                            example: 'your-bucket-name'
                        },
                        key: {
                            type: 'string',
                            example: 'your-file-key'
                        }
                    }
                }
            }],
            responses: {
                200: {
                    description: 'Upload initiated successfully',
                    schema: {
                        $ref: '#/definitions/successInitiateUpload'
                    }
                },
                500: {
                    description: 'Something went wrong',
                    schema: {
                        $ref: '#/definitions/unexpectedError'
                    }
                }
            }
        }
    };

    swaggerJson.paths['/file/upload/presigned-urls'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'File Upload'
            ],
            description: 'Generate Presigned URLs for Multipart Upload',
            summary: 'Generate Presigned URLs',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Generate presigned URLs by specifying upload ID and part numbers',
                required: true,
                schema: {
                    type: 'object',
                    properties: {
                        bucketName: {
                            type: 'string',
                            example: 'your-bucket-name'
                        },
                        key: {
                            type: 'string',
                            example: 'your-file-key'
                        },
                        uploadId: {
                            type: 'string',
                            example: 'your-upload-id'
                        },
                        partNumbers: {
                            type: 'array',
                            items: {
                                type: 'number',
                                example: 1
                            },
                            description: 'List of part numbers for the upload'
                        }
                    }
                }
            }],
            responses: {
                200: {
                    description: 'Presigned URLs generated successfully',
                    schema: {
                        $ref: '#/definitions/successGeneratePresignedUrls'
                    }
                },
                500: {
                    description: 'Something went wrong',
                    schema: {
                        $ref: '#/definitions/unexpectedError'
                    }
                }
            }
        }
    };

    swaggerJson.paths['/file/upload/complete'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'File Upload'
            ],
            description: 'Complete Multipart Upload',
            summary: 'Complete Multipart Upload',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Complete upload by specifying upload ID and parts',
                required: true,
                schema: {
                    type: 'object',
                    properties: {
                        bucketName: {
                            type: 'string',
                            example: 'your-bucket-name'
                        },
                        key: {
                            type: 'string',
                            example: 'your-file-key'
                        },
                        uploadId: {
                            type: 'string',
                            example: 'your-upload-id'
                        },
                        parts: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    ETag: {
                                        type: 'string',
                                        example: 'your-etag'
                                    },
                                    PartNumber: {
                                        type: 'number',
                                        example: 1
                                    }
                                }
                            }
                        }
                    }
                }
            }],
            responses: {
                200: {
                    description: 'Multipart upload completed successfully',
                    schema: {
                        $ref: '#/definitions/successCompleteUpload'
                    }
                },
                500: {
                    description: 'Something went wrong',
                    schema: {
                        $ref: '#/definitions/unexpectedError'
                    }
                }
            }
        }
    };

    swaggerJson.definitions.successInitiateUpload = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            uploadId: {
                type: 'string',
                example: 'your-upload-id'
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    swaggerJson.definitions.successGeneratePresignedUrls = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            urls: {
                type: 'array',
                items: {
                    type: 'string',
                    example: 'https://example-signed-url'
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    swaggerJson.definitions.successCompleteUpload = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    swaggerJson.definitions.unexpectedError = {
        properties: {
            status: {
                type: 'number',
                example: 0
            },
            message: {
                example: message.ERROR_MSG
            }
        }
    };

    return swaggerJson;
};
