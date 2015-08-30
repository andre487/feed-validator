/**
 * @file
 * Config example for Yandex opensearch.xml file
 */
module.exports = {
    reporter: 'text',
    noColors: false,
    suppress: [
        {level: 'error', text: 'Unexpected method attribute on Url element'},
        {level: 'warning', type: 'ShouldIncludeExample'}
    ],
    plugins: [
    ]
};
