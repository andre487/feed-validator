var Q = require('q');
var Http = require('q-io/http');
var _ = require('lodash');

var getFeed = require('../../providers/feed');
var data = require('./feed.data.js');

describe('providers/feed', function () {
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

            return assert.isFulfilled(getFeed('http://yandex.ru/opensearch.xml'));
        });

        it('should reject when HTTP error', function () {
            sandbox.stub(Http, 'read', _.constant(Q.reject('HTTP error')));

            return assert.isRejected(getFeed('http://yandex.ru/opensearch.xml'), /Transport error: HTTP error/);
        });

        it('should reject when data is invalid', function () {
            sandbox.stub(Http, 'read', _.constant(Q(data.invalidXml)));

            return assert.isRejected(getFeed('http://yandex.ru/opensearch.xml'), /Parse error:/);
        });
    });

    describe('parsing', function () {
        it('should provide data JSON representation', function () {
            sandbox.stub(Http, 'read', _.constant(Q(data.correctXml)));

            return getFeed('http://yandex.ru/opensearch.xml')
                .then(function (data) {
                    assert.deepPropertyVal(data, 'OpenSearchDescription.ShortName.0', 'Яндекс');
                });
        });
    });
});
