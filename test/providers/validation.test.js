var validationProvider = require('../../providers/validation');

var data = require('./validation.data');

describe('providers/validation', function () {
    describe('stringifyXml', function () {
        it('should stringify correct data', function () {
            var res = validationProvider.stringifyXml(data.dataJson);
            assert.include(res, '<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">');
        });
    });
});
