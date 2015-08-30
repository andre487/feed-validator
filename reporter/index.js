/**
 * @file
 * Get reporter by options
 */
var thr = require('throw');

/**
 * Get reporter
 * @param {String} [type=text]
 * @returns {Function} Reporter
 */
module.exports = function getReporter(type) {
    type = type || 'text';
    try {
        return require('./type-' + type);
    } catch (e) {
        thr('Reporter %s not found', type);
    }
};
