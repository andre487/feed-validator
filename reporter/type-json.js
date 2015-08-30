/**
 * @file
 * JSON reporter
 */

/**
 * Reporter
 * @param {Object} validationData
 * @returns {String}
 */
module.exports = function (validationData) {
    return JSON.stringify(validationData, null, 2);
};
