/**
 * @file
 * Provider for feed validator data
 * @see https://validator.w3.org/feed/docs/soap.html
 */
var Http = require('q-io/http');
var Q = require('q');
var thr = require('throw');
var Xml2js = require('xml2js');
var _ = require('lodash');

var VALIDATOR_URL = 'http://validator.w3.org/feed/check.cgi';

/**
 * Validate feed by validator.w3.org/feed
 * @type {Function}
 * @param {Object} dataJson Feed JSON representation
 * @returns {Promise<Object>} Validation result
 */
var feedValidator = module.exports = function feedValidator(dataJson) {
    var xml = feedValidator.stringifyXml(dataJson);
    return feedValidator.makeValidationRequest(xml)
        .then(function (resp) {
            return _.assign({feedXml: xml}, feedValidator.extractSenseFromResponse(resp));
        });
};

/**
 * Stringify XML JSON representation
 * @param {Object} dataJson
 * @returns {String} XML
 */
feedValidator.stringifyXml = function (dataJson) {
    var builder = new Xml2js.Builder();
    return builder.buildObject(dataJson);
};

/**
 * Send validation request
 * @param {String} xml
 * @returns {Promise<Object>} Response data as JSON
 */
feedValidator.makeValidationRequest = function (xml) {
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

/**
 * Extract important information from validator response
 * @param {Object} response Validator response JSON representation
 * @returns {{isValid: Boolean, errors: Object[], warnings: Object[], info: Object[]}}
 */
feedValidator.extractSenseFromResponse = function (response) {
    var container = _.get(response, 'env:Envelope.env:Body.0.m:feedvalidationresponse.0') || thr('No container');
    var validity = _.get(container, 'm:validity.0');

    function mapItem(item) {
        return _.transform(item, function (res, arr, name) {
            var val = arr[0];
            if (/^\d+$/.test(val)) {
                val = Number(val);
            }
            res[name] = val;
            return res;
        });
    }

    return {
        isValid: validity == 'true' || validity == 'false' ? validity == 'true' : null,
        errors: _.map(_.get(container, 'm:errors.0.m:errorlist.0.error'), mapItem),
        warnings: _.map(_.get(container, 'm:warnings.0.m:warninglist.0.warning'), mapItem),
        info: _.map(_.get(container, 'm:informations.0.m:infolist.0.info'), mapItem)
    };
};
