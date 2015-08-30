// jscs:disable maximumLineLength

exports.invalidData = {
    feedJson: {
        OpenSearchDescription: {
            $: {xmlns: 'http://a9.com/-/spec/opensearch/1.1/'},
            ShortName: ['Яндекс'],
            Description: ['Воспользуйтесь Яндексом для поиска в Интернете.'],
            Image: [''],
            Url: ['', ''],
            InputEncoding: ['UTF-8']
        }
    },
    feedXml: '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">\n' +
    '<ShortName>Яндекс</ShortName>\n' +
    '<Description>Воспользуйтесь Яндексом для поиска в Интернете.</Description>\n' +
    '<Image width="16" height="16" type="image/x-icon">https://yastatic.net/lego/_/pDu9OWAQKB0s2J9IojKpiS_Eho.ico</Image>\n' +
    '<Url type="text/html" template="https://yandex.ru/yandsearch?text={searchTerms}&amp;from=os&amp;clid=1836588"/>\n' +
    '<Url type="application/x-suggestions+json" method="GET" template="https://suggest.yandex.ru/suggest-ff.cgi?part={searchTerms}&amp;uil=ru&amp;v=3&amp;sn=5&amp;lr=213&amp;yu=898324731404302355"/>\n' +
    '<InputEncoding>UTF-8</InputEncoding>\n' +
    '</OpenSearchDescription>',
    isValid: false,
    errors: [
        {
            level: 'error',
            type: 'MissingDescription',
            line: 23,
            column: 0,
            text: 'Missing channel element: description',
            msgcount: 1,
            backupcolumn: 0,
            backupline: 23,
            element: 'description',
            parent: 'channel'
        }
    ],
    warnings: [
        {
            level: 'warning',
            type: 'MissingDescription',
            line: 23,
            column: 0,
            text: 'Missing channel element: description',
            msgcount: 1,
            backupcolumn: 0,
            backupline: 23,
            element: 'description',
            parent: 'channel'
        }
    ],
    info: [
        {
            level: 'info',
            type: 'MissingDescription',
            line: 23,
            column: 0,
            text: 'Missing channel element: description',
            msgcount: 1,
            backupcolumn: 0,
            backupline: 23,
            element: 'description',
            parent: 'channel'
        }
    ]
};
