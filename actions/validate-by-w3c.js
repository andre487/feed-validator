/**
 * @file
 * Validate feed by W3C validator
 */
var Q = require('q');
var _ = require('lodash');

var getFeed = require('../providers/feed');
var validateFeed = require('../providers/feed-validator');

/**
 * Validate
 * @param {String} url
 * @return {Promise<Object>}
 */
module.exports = function (url) {
    return getFeed(url)
        .then(function (feed) {
            return Q.all([
                {feed: feed},
                validateFeed(feed)
            ]);
        })
        .then(function (results) {
            return _.assign({feedJson: results[0].feed}, results[1]);
        });
};
