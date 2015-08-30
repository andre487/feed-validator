/**
 * @file
 * Text reporter
 */
var Colors = require('colors/safe');
var Table = require('cli-table');
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
            String(item.type || 'CustomMessage'),
            String(item.text || '')
        ];
    }

    function prepareString(str, color) {
        return options.noColors ? str : Colors[color](str);
    }

    function createTable(items) {
        var table = new Table({
            chars: {
                top: '', 'top-mid': '', 'top-left': '', 'top-right': '',
                bottom: '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '',
                left: '', 'left-mid': '', mid: '', 'mid-mid': '',
                right: '', 'right-mid': '', middle: ''
            },
            style: {
                'padding-top': 0, 'padding-bottom': 0,
                'padding-left': 2, 'padding-right': 2
            }
        });
        _.each(items, function (item) {
            table.push(item);
        });
        return table.toString();
    }

    return _([
        prepareString('Validation results', 'magenta'),
        prepareString('Feed:', 'green'),
        validationData.feedXml,
        '',
        validationData.errors.length ? [
            prepareString('Errors:', 'red'),
            createTable(_.map(validationData.errors, mapItem)),
            ''
        ] : null,
        validationData.warnings.length ? [
            prepareString('Warnings:', 'blue'),
            createTable(_.map(validationData.warnings, mapItem)),
            ''
        ] : null,
        validationData.info.length ? [
            prepareString('Info:', 'yellow'),
            createTable(_.map(validationData.info, mapItem)),
            ''
        ] : null,
        validationData.isValid ? prepareString('All correct', 'green') : null
    ])
        .flatten()
        .filter(function (item) { return item !== null; })
        .run()
        .join('\n');
};
