const GeneralError = require('../util/GeneralError');
const REQUIRED = 'FIELD_REQUIRED';
const INVALID = 'FIELD_NOT_VALID';

/**
 * Created by Growexx on 04/06/2020
 * @name alidator
 */
class Validator {
    constructor (locale) {
        this.NOT_VALID = INVALID;
        this.REQUIRED = REQUIRED;

        if (locale) {
            this.__ = locale;
        }
    }
    
    /**
     * @desc This function is used to validate part number for multipart upload.
     * @param {number} partNumber Part number of the file
     */
    partNumber(partNumber) {
        if (typeof partNumber !== 'number' || partNumber <= 0) {
            throw new GeneralError(this.__(INVALID, 'Part number'), 400);
        }
    }

    /**
     * @desc This function is used to validate parts array for completing multipart upload.
     * @param {Array} parts Array of parts containing ETag and part number
     */
    validateParts(parts) {
        if (!Array.isArray(parts) || parts.length === 0) {
            throw new GeneralError(this.__(INVALID, 'Parts'), 400);
        }

        for (const part of parts) {
            if (!part.ETag || typeof part.partNumber !== 'number') {
                throw new GeneralError(this.__(INVALID, 'Part data'), 400);
            }
        }
    }
}

module.exports = Validator;