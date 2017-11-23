'use strict';

// Register the Babel require hook
require('babel-core/register');

var chai = require('chai');

// Load Chai assertions
global.expect = chai.expect;
global.assert = chai.assert;
chai.should();

chai.use(require('chai-as-promised'));
