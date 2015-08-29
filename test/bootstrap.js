global.sinon = require('sinon');
global.chai = require('chai');
global.assert = global.chai.assert;

chai.use(require('chai-as-promised'));
sinon.assert.expose(chai.assert, {prefix: ''});
