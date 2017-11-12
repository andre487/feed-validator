/**
 * @file
 * Config example for Yandex opensearch.xml file
 */
var _ = require('lodash');

module.exports = {
    reporter: 'text',
    noColors: false,
    noShowFeed: false,
    suppress: [
        {level: 'error', text: 'Unexpected method attribute on Url element'},
        {level: 'warning', type: 'ShouldIncludeExample'}
    ],
    plugins: [
        /**
         * Check HTTPS in urls
         * @param {Object} feedJson
         */
        function checkHttps(feedJson) {
            var path = 'OpenSearchDescription.Url';
            var urls = _.get(feedJson, path);

            var errors = [];
            if (!urls) {
                errors.push({level: 'error', path: path, text: 'No urls'});
            }

            _.each(urls, function (item, i) {
                var url = _.get(item, '$.template');
                var type = _.get(item, '$.type');

                var errPath = [path, i, '$.template'].join('.');
                if (!url) {
                    errors.push({level: 'error', path: errPath, text: 'No url template for type ' + type});
                } else if (!/(https:)?\/\//.test(url)) {
                    errors.push({level: 'error', path: errPath, text: 'Non HTTPS schema in type ' + type});
                }
            });
            return errors;
        }
    ]
};
