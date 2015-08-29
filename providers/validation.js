var Http = require('q-io/http');
var Q = require('q');
var Xml2js = require('xml2js');

var VALIDATOR_URL = 'http://validator.w3.org/feed/check.cgi';

var validationProvider = module.exports = function validationProvider(dataJson) {
    var xml = validationProvider.stringifyXml(dataJson);
    return validationProvider.makeValidationRequest(xml);
};

/**
 * Stringify XML JSON representation
 * @param {Object} dataJson
 * @returns {String} XML
 */
validationProvider.stringifyXml = function (dataJson) {
    var builder = new Xml2js.Builder();
    return builder.buildObject(dataJson);
};

/**
 * Send validation request
 * @param {String} xml
 * @returns {Promise<Object>} Response data as JSON
 */
validationProvider.makeValidationRequest = function (xml) {
    return Http
        .request({
            url: VALIDATOR_URL,
            method: 'POST',
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            body: ['manual=1&output=soap12&rawdata=' + encodeURIComponent(xml)]
        })
        .then(function (res) {
            return res.body.read();
        })
        .then(function (body) {
            return Q.nfcall(Xml2js.parseString, body);
        });
};
