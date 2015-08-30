/**
 * @file
 * Run validation by CLI
 */
var Q = require('q');

var getOptions = require('../actions/cli/get-options');
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
            var validationData = data[1];

            var reporter = getReporter();
            console.log(reporter(validationData, ctx.options));
        })
        .done();
}

if (module === require.main) {
    main();
}
