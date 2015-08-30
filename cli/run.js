/**
 * @file
 * Run validation by CLI
 */
var getOptions = require('../actions/cli/get-options');

function main() {
    getOptions()
        .then(function (options) {
            console.log(options);
        })
        .done();
}

if (require.main === module) {
    main();
}
