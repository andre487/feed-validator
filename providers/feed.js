/**
 * @file
 * Feed data provider
 */
var Q = require('q');
var Http = require('q-io/http');
var parseXml = require('xml2js').parseString;
var thr = require('throw');
var validUrl = require('valid-url');
var readFile = require('fs-readfile-promise');

/**
 * Get feed from URL or local file
 * @param {String} url URI of local file path
 * @returns {Promise<Object>} Feed JSON representation
 */
module.exports = function feedProvider(url) {
    return (validUrl.isUri(url) ? Http.read(url) : readFile(url))
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
