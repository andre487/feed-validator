var Q = require('q');
var Http = require('q-io/http');
var feedValidator = require('../../providers/feed-validator');
var _ = require('lodash');

var data = require('./feed-validator.data');

describe('providers/feed-validator', function () {
    var sandbox;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('#stringifyXml()', function () {
        it('should stringify correct data', function () {
            var res = feedValidator.stringifyXml(data.dataJson);
            assert.include(res, '<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">');
        });
    });

    describe('#makeValidationRequest()', function () {
        it('should provide validator response as JSON', function () {
            useFakeValidatorResponse();

            return feedValidator.makeValidationRequest(data.correctXml)
                .then(function (data) {
                    assert.deepPropertyVal(data, 'env:Envelope.env:Body.0.m:feedvalidationresponse.0.m:uri.0',
                        'http://www.w3.org/QA/news.rss');
                });
        });
    });

    describe('#extractSenseFromResponse()', function () {
        it('should throw error when no container', function () {
            assert.throws(_.partial(feedValidator.extractSenseFromResponse, {}), /No container/);
        });

        it('should extract errors from JSON representation os SOAP response', function () {
            var res = feedValidator.extractSenseFromResponse(data.validatorResponseJson);

            assert.propertyVal(res, 'isValid', false);
            assert.deepPropertyVal(res, 'errors.0.level', 'error');
            assert.deepPropertyVal(res, 'warnings.0.level', 'warning');
            assert.deepPropertyVal(res, 'info.0.level', 'info');
        });
    });

    function useFakeValidatorResponse() {
        sandbox.stub(Http, 'request', function () {
            return Q(_.set({}, 'body.read', _.constant(data.validatorResponse)));
        });
    }
});
