var Q = require('q');
var Http = require('q-io/http');
var _ = require('lodash');

var getOpenSearch = require('../../providers/opensearch');
var data = require('./opensearch.data');

describe('providers/opensearch', function () {
    var sandbox;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('transport', function () {
        it('should return fulfilled promise with correct response', function () {
            sandbox.stub(Http, 'read', _.constant(Q(data.correctXml)));

            return assert.isFulfilled(getOpenSearch('http://yandex.ru/opensearch.xml'));
        });

        it('should reject when HTTP error', function () {
            sandbox.stub(Http, 'read', _.constant(Q.reject('HTTP error')));

            return assert.isRejected(getOpenSearch('http://yandex.ru/opensearch.xml'), /Transport error: HTTP error/);
        });

        it('should reject when data is invalid', function () {
            sandbox.stub(Http, 'read', _.constant(Q(data.invalidXml)));

            return assert.isRejected(getOpenSearch('http://yandex.ru/opensearch.xml'), /Parse error:/);
        });
    });

    describe('parsing', function () {
        it('should provide data JSON representation', function () {
            sandbox.stub(Http, 'read', _.constant(Q(data.correctXml)));

            return getOpenSearch('http://yandex.ru/opensearch.xml')
                .then(function (data) {
                    assert.deepPropertyVal(data, 'OpenSearchDescription.ShortName.0', 'Яндекс');
                });
        });
    });
});
