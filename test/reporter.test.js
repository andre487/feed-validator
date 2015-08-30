var getReporter = require('../reporter');
var data = require('./reporter.data.js');

describe('reporter/type-text', function () {
    var reporter;

    before(function () {
        reporter = getReporter('text');
    });

    it('should form correct sections with invalid data', function () {
        var text = reporter(data.invalidData);

        assert.include(text, 'Validation results');
        assert.include(text, 'Feed:');
        assert.include(text, 'Errors:');
        assert.include(text, 'Warnings:');
        assert.include(text, 'Info:');
    });

    it('should form correct sections with valid data', function () {
        var text = reporter(data.validData);

        assert.include(text, 'Validation results');
        assert.include(text, 'Feed:');
        assert.include(text, 'All correct');

        assert.notInclude(text, 'Errors:');
        assert.notInclude(text, 'Warnings:');
        assert.notInclude(text, 'Info:');
    });
});
