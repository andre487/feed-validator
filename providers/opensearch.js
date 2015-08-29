var Q = require('q');
var Http = require('q-io/http');
var parseXml = require('xml2js').parseString;
var thr = require('throw');

/**
 * Get OpenSearch.xml from URL
 * @param {String} url
 * @returns {Promise<Object>} OpenSearch JSON representation
 */
module.exports = function openSearchProvider(url) {
    return Http.read(url)
        .catch(function (err) {
            thr('Transport error: %s', err);
        })
        .then(function (res) {
            return Q.nfcall(parseXml, res.toString());
        })
        .catch(function (err) {
            thr('Parse error:\n%s', err);
        });
};
