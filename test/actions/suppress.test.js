var data = require('./suppress.data');

describe('actions/suppress', function () {
    var suppress;

    before(function () {
        suppress = require('../../actions/suppress');
    });

    it('should suppress all message types by spec', function () {
        var suppressed = suppress(data.invalidData, {
            suppress: [
                {level: 'error', type: 'MissingDescription'},
                {level: 'info', line: 23}
            ]
        });

        assert.lengthOf(suppressed.errors, 0);
        assert.lengthOf(suppressed.info, 0);

        assert.deepPropertyVal(suppressed, 'warnings.0.type', 'MissingDescription');
    });

    it('should modify isValid flag', function () {
        var suppressed = suppress(data.invalidData, {
            suppress: [{level: 'error'}, {level: 'warning'}]
        });

        assert.lengthOf(suppressed.errors, 0);
        assert.lengthOf(suppressed.warnings, 0);

        assert.ok(suppressed.isValid, 'isValid must be ok');
    });
});
