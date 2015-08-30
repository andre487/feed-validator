/**
 * @file
 * Run validation by CLI
 */
var Q = require('q');

var getOptions = require('../actions/cli/get-options');
var validateByW3c = require('../actions/validate-by-w3c');

function main() {
    getOptions()
        .then(function (options) {
            return Q.all([
                {options: options},
                validateByW3c(options.url)
            ]);
        })
        .then(function (data) {
            console.log(data);
        })
        .done();
}

if (require.main === module) {
    main();
}
