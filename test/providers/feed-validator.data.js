// jscs:disable maximumLineLength

exports.dataJson = {
    OpenSearchDescription: {
        $: {xmlns: 'http://a9.com/-/spec/opensearch/1.1/'},
        ShortName: ['Яндекс'],
        Description: ['Воспользуйтесь Яндексом для поиска в Интернете.'],
        Image: [''],
        Url: ['', ''],
        InputEncoding: ['UTF-8']
    }
};

exports.correctXml = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">' +
    '<ShortName>Яндекс</ShortName>' +
    '<Description>Воспользуйтесь Яндексом для поиска в Интернете.</Description>' +
    '<Image width="16" height="16" type="image/x-icon">https://yastatic.net/lego/_/pDu9OWAQKB0s2J9IojKpiS_Eho.ico</Image>' +
    '<Url type="text/html" template="https://yandex.ru/yandsearch?text={searchTerms}&amp;from=os&amp;clid=1836588"/>' +
    '<Url type="application/x-suggestions+json" method="GET" template="https://suggest.yandex.ru/suggest-ff.cgi?part={searchTerms}&amp;uil=ru&amp;v=3&amp;sn=5&amp;lr=213&amp;yu=898324731404302355"/>' +
    '<InputEncoding>UTF-8</InputEncoding>' +
    '</OpenSearchDescription>';

exports.validatorResponse = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">' +
    '<env:Body>' +
    '<m:feedvalidationresponse ' +
    'env:encodingStyle="http://www.w3.org/2003/05/soap-encoding" ' +
    'xmlns:m="http://www.w3.org/2005/10/feed-validator">' +
    '<m:uri>http://www.w3.org/QA/news.rss</m:uri>' +
    '<m:checkedby>http://qa-dev.w3.org/feed/check.cgi</m:checkedby>' +
    '<m:date>2005-11-11T11:48:24.491627</m:date>' +
    '<m:validity>false</m:validity>' +
    '<m:errors>' +
    '<m:errorcount>2</m:errorcount>' +
    '<m:errorlist>' +
    '<error>' +
    '<level>error</level>' +
    '<type>MissingDescription</type>' +
    '<line>23</line>' +
    '<column>0</column>' +
    '<text>Missing channel element: description</text>' +
    '<msgcount>1</msgcount>' +
    '<backupcolumn>0</backupcolumn>' +
    '<backupline>23</backupline>' +
    '<element>description</element>' +
    '<parent>channel</parent>' +
    '</error>' +
    '</m:errorlist>' +
    '</m:errors>' +
    '<m:warnings>' +
    '<m:warningcount>0</m:warningcount>' +
    '<m:warninglist />' +
    '</m:warnings>' +
    '<m:informations > ' +
    '<m:infocount>0</m:infocount>' +
    '<m:infolist />' +
    '</m:informations>' +
    '</m:feedvalidationresponse>' +
    '</env:Body>' +
    '</env:Envelope>';
