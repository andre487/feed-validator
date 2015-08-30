/**
 * @file
 * Suppress errors, warnings and info by config
 */
var _ = require('lodash');

/**
 * Suppress
 * @param {Object} validationData
 * @param {Object} options
 * @param {Array} [options.suppress]
 * @returns {Object} New validation data without suppressed messages
 */
module.exports = function suppress(validationData, options) {
    validationData = _.cloneDeep(validationData);
    if (!options.suppress) {
        return validationData;
    }

    var suppressRules = [].concat(options.suppress);

    ['errors', 'warnings', 'info'].forEach(function (field) {
        validationData[field] = _.filter(validationData[field], checkMessage);
    });

    validationData.isValid = validationData.isValid || validationData.errors.length == 0;

    function checkMessage(message) {
        var matchMessage = _.partial(matchRule, message);
        return !_.some(suppressRules, matchMessage);
    }

    function matchRule(message, rule) {
        return _.every(_.keys(rule), function (field) {
            return rule[field] === message[field];
        });
    }

    return validationData;
};
