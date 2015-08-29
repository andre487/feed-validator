var xml2js = require('xml2js');

var validationProvider = module.exports = function validationProvider() {

};

/**
 * Stringify XML JSON representation
 * @param {Object} dataJson
 * @returns {String} XML
 */
validationProvider.stringifyXml = function (dataJson) {
    var builder = new xml2js.Builder();
    return builder.buildObject(dataJson);
};
