var Q = require('q');
var Http = require('q-io/http');
var validationProvider = require('../../providers/validation');
var _ = require('lodash');

var data = require('./validation.data');

describe('providers/validation', function () {
    var sandbox;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('#stringifyXml()', function () {
        it('should stringify correct data', function () {
            var res = validationProvider.stringifyXml(data.dataJson);
            assert.include(res, '<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">');
        });
    });

    describe('#makeValidationRequest()', function () {
        it('should provide validator response as JSON', function () {
            useFakeValidatorResponse();

            return validationProvider.makeValidationRequest(data.correctXml)
                .then(function (data) {
                    assert.deepPropertyVal(data, 'env:Envelope.env:Body.0.m:feedvalidationresponse.0.m:uri.0',
                        'http://www.w3.org/QA/news.rss');
                });
        });
    });

    function useFakeValidatorResponse() {
        sandbox.stub(Http, 'request', function () {
            return Q(_.set({}, 'body.read', _.constant(data.validatorResponse)));
        });
    }
});
