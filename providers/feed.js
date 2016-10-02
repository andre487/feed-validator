/**
 * @file
 * Feed data provider
 */
var Q = require('q');
var Http = require('q-io/http');
var parseXml = require('xml2js').parseString;

/**
 * Get feed from URL
 * @param {String} url
 * @returns {Promise<Object>} Feed JSON representation
 */
module.exports = function feedProvider(url) {
    var deferred = Q.defer();
    Http.read(url)
        .catch(function (err) {
            return deferred.reject(new Error('Transport error: %s', err));
        })
        .then(function (res) {
            parseXml(res.toString(), function (err, result) {
                if(err) return deferred.reject(err);
                return deferred.resolve(result);
            });
        })
        .catch(function (err) {
            return deferred.reject(new Error('Parse error:\n%s', err));
        });
    return deferred.promise;
};

