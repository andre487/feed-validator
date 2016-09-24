/**
 * Created by Alexey Gordeyev on 9/24/2016.
 */
var Q = require('q');
var _ = require('lodash');
var thr = require('throw');
var v = require('validator');
var pkg = require('./package.json');

exports.suppressMessages = require('./actions/suppress');
exports.validateByPlugins = require('./actions/validate-by-plugins');
exports.validateByW3c = require('./actions/validate-by-w3c');
exports.getReporter = require('./reporter');
exports.version = pkg.version;

exports.validate = function (options, callback) {
    if (!options || typeof options === 'function') {
        thr('Argument options is not found');
    }
    if (!v.isURL(options.url)) {
        thr('Invalid URL %s', options.url);
    }
    options.reporter = options.reporter ? options.reporter : 'json';
    if (!v.isIn(options.reporter, ['text', 'json'])) {
        thr('Invalid reporter %s', options.reporter);
    }

    Q.all([
        {options: options},
        exports.validateByW3c(options.url)
    ])
        .then(function (data) {
            var ctx = data[0];
            var validationResult = data[1];
            var pluginsResult = exports.validateByPlugins(validationResult.feedJson, ctx.options);
            validationResult.isValid = validationResult.isValid && pluginsResult.isValid;
            _.each(['errors', 'warnings', 'info'], function (listName) {
                [].push.apply(validationResult[listName], pluginsResult[listName]);
            });
            return [ctx, validationResult];
        })
        .then(function (data) {
            var ctx = data[0];
            var validationData = exports.suppressMessages(data[1], ctx.options);
            var reporter = exports.getReporter(ctx.options.reporter);
            callback && callback(reporter(validationData, ctx.options));
        })
        .done();
};
