# Feed validator
Simple validator for feeds like RSS or Atom. Supports opensearch.xml validation. 
Based on validator.w3.org/feed

Supports plugins for custom checks

## Installation
```
npm install [-g] feed-validator
```

## Usage
```
usage: feed-validator [-h] [-v] [-c FILE_PATH] [-r REPORTER_NAME]
                      [--no-colors]
                      url

Simple validator for RSS, Atom or opensearch.xml that using validator.w3.
org/feed and plugins

Positional arguments:
  url                   Feed url to validate

Optional arguments:
  -h, --help            Show this help message and exit.
  -v, --version         Show program's version number and exit.
  -c FILE_PATH, --config FILE_PATH
                        Config file path
  -r REPORTER_NAME, --reporter REPORTER_NAME
                        Reporter name: text, json
  --no-colors           Don't use colors
```

## Arguments and options
Options can be defined by command line and configuration file.

### url
URL of the validated feed.

### config
Configuration file. Can be passed from command line. Example of config file see in `examples` folder.

### reporter
Reporter type: text or JSON. Can be defined in command line: `--reporter json` or in config file: `reporter: 'json'`

### noColors
Don't use colors in report. Can be passed from command line: `--no-colors` and from config file: `noColors: true`.

### suppress
You can suppress some messages by defining objects that contains fields to match in config file. 
Example of suppressing:
```js
suppress: [
    {level: 'error', text: 'Unexpected method attribute on Url element'},
    {level: 'warning', type: 'ShouldIncludeExample'}
],
```

### plugins
Can be defined in config file (see `examples`). Each plugin is function that take JSON feed representation and returns errors, 
warnings and information messages list.
 
Plugin function example:
```js
/**
 * Check HTTPS in urls from opensearch.xml
 * @param {Object} feedJson Feed JSON representation
 * @param {Object} options Program options
 */
function checkHttps(feedJson, options) {
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
```
You should define `level` and `text` fields. And you can define your own custom `type` field. 
