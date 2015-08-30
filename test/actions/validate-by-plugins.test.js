describe('actions/validate-by-plugins', function () {
    var validate;

    before(function () {
        validate = require('../../actions/validate-by-plugins');
    });

    it('should form correct structure from plugins optput', function () {
        var result = validate({}, {
            plugins: [
                function () {
                    return {level: 'error', text: 'Test error'};
                },
                function () {
                    return [{level: 'warning', text: 'Test warning'}];
                },
                function () {
                    return {level: 'info', text: 'Test info'};
                }
            ]
        });

        assert.deepPropertyVal(result, 'errors.0.text', 'Test error');
        assert.deepPropertyVal(result, 'warnings.0.text', 'Test warning');
        assert.deepPropertyVal(result, 'info.0.text', 'Test info');

        assert.notOk(result.isValid, 'isValid must be falsy when there is errors');
    });
});
