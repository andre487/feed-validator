/**
 * @file
 * Run validation by CLI
 */
var Q = require('q');

var getOptions = require('../actions/cli/get-options');
var suppressMessages = require('../actions/suppress');
var validateByPlugins = require('../actions/validate-by-plugins');
var validateByW3c = require('../actions/validate-by-w3c');

var getReporter = require('../reporter');

function main() {
    getOptions()
        .then(function (options) {
            return Q.all([
                {options: options},
                validateByW3c(options.url)
            ]);
        })
        .then(function (data) {
            var ctx = data[0];
            var validationResult = data[1];

            var pluginsResult = validateByPlugins(validationResult.feedJson, ctx.options);
            validationResult.isValid = validationResult.isValid && pluginsResult.isValid;
            ['errors', 'warnings', 'info'].forEach(function (listName) {
                [].push.apply(validationResult[listName], pluginsResult[listName]);
            });

            return [ctx, validationResult];
        })
        .then(function (data) {
            var ctx = data[0];
            var validationData = suppressMessages(data[1], ctx.options);

            var reporter = getReporter(ctx.options.reporter);
            console.log(reporter(validationData, ctx.options));

            process.exit(validationData.isValid ? 0 : 1);
        })
        .done();
}

if (module === require.main) {
    main();
}
