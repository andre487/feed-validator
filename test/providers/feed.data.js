// jscs:disable maximumLineLength

exports.correctXml = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">' +
    '<ShortName>Яндекс</ShortName>' +
    '<Description>Воспользуйтесь Яндексом для поиска в Интернете.</Description>' +
    '<Image width="16" height="16" type="image/x-icon">https://yastatic.net/lego/_/pDu9OWAQKB0s2J9IojKpiS_Eho.ico</Image>' +
    '<Url type="text/html" template="https://yandex.ru/yandsearch?text={searchTerms}&amp;from=os&amp;clid=1836588"/>' +
    '<Url type="application/x-suggestions+json" method="GET" template="https://suggest.yandex.ru/suggest-ff.cgi?part={searchTerms}&amp;uil=ru&amp;v=3&amp;sn=5&amp;lr=213&amp;yu=898324731404302355"/>' +
    '<InputEncoding>UTF-8</InputEncoding>' +
    '</OpenSearchDescription>';

exports.invalidXml = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">' +
    '<ShortName>Яндекс</ShortName>';
