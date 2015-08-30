/**
 * @file
 * Text reporter
 */
var Colors = require('colors/safe');
var _ = require('lodash');

/**
 * Text reporter
 * @param {Object} validationData
 * @param {Object} [options]
 * @param {Boolean} options.noColors
 * @returns {String}
 */
module.exports = function textReporter(validationData, options) {
    options = options || {};

    function mapItem(item) {
        return [
            item.line ?
                'At line: ' + item.line + ', column: ' + item.column :
                'At path: ' + item.path,
            item.type,
            item.text
        ].join('\t');
    }

    function prepareString(str, color) {
        return options.noColors ? str : Colors[color](str);
    }

    return _([
        prepareString('Validation results', 'magenta'),
        prepareString('Feed:', 'green'),
        validationData.feedXml,
        '',
        validationData.errors.length ? [
            prepareString('Errors:', 'red'),
            _.map(validationData.errors, mapItem).join('\n'),
            ''
        ] : null,
        validationData.warnings.length ? [
            prepareString('Warnings:', 'blue'),
            _.map(validationData.warnings, mapItem).join('\n'),
            ''
        ] : null,
        validationData.info.length ? [
            prepareString('Info:', 'yellow'),
            _.map(validationData.info, mapItem).join('\n'),
            ''
        ] : null,
        validationData.isValid ? prepareString('All correct', 'green') : null
    ])
        .flatten()
        .filter(function (item) { return item !== null; })
        .run()
        .join('\n');
};
