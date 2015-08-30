/**
 * @file
 * Validate feed by plugins
 */
var _ = require('lodash');

/**
 * Validate by plugins
 * @param {Object} feedJson
 * @param {Object} options
 * @param {Function[]} options.plugins
 * @returns {Object}
 */
module.exports = function validateByPlugins(feedJson, options) {
    var result = {
        isValid: true,
        errors: [],
        warnings: [],
        info: []
    };

    if (!_.get(options, 'plugins.length')) {
        return result;
    }

    var pluginsResults = _(options.plugins)
        .map(function (plugin) {
            var res = plugin(_.cloneDeep(feedJson), _.cloneDeep(options));
            return res && [].concat(res);
        })
        .compact()
        .flatten()
        .run();

    var levelsTable = {
        error: 'errors',
        warning: 'warnings',
        info: 'info'
    };
    _.each(pluginsResults, function (pluginRes) {
        var listType = levelsTable[pluginRes.level];
        if (listType) {
            result[listType].push(pluginRes);
        }
    });

    result.isValid = result.errors.length == 0;
    return result;
};
