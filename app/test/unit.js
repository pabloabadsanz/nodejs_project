/*
 * Unit tests
 *
 */

// Dependencies
var helpers = require('./../lib/helpers');
var assert = require('assert');
var logs = require('./../lib/logs');
var exampleDebuggingProblem = require('./../lib/exampledebuggingproblem');

// Holder for the tests
var unit = {};

// Assert that the get number function is returning a number
unit['helpers.getNumber should return a number'] = function(done) {
  var val = helpers.getNumber();
  assert.equal(typeof(val), 'number');
  done();
};

// Assert that the get number function is returning one
unit['helpers.getNumber should return 1'] = function(done) {
  var val = helpers.getNumber();
  assert.equal(val, 1);
  done();
};

// Assert that the get number function is returning two
unit['helpers.getNumber should return 2'] = function(done) {
  var val = helpers.getNumber();
  assert.equal(val, 2);
  done();
};

// Logs.list should callback an array and a false error
unit['logs.list should callback a false error and an array of log names'] = function(done) {
  logs.list(true, function(err, logFileNames) {
    assert.equal(err, null);
    assert.ok(logFileNames instanceof Array);
    done();
  });
};

// Logs truncate should not throw if the logId doesnt exist
unit['logs.truncate should not throw if the logId does not exist. It should call back an error instead'] = function(done) {
  assert.doesNotThrow(function() {
    logs.truncate('I do not exist', function(err) {
      assert.ok(err);
      done();
    });
  }, TypeError);
};

// Example exampleDebuggingProblem.init should not throw but it does
unit['exampleDebuggingProblem.init should not throw when called'] = function(done) {
  assert.doesNotThrow(function() {
    exampleDebuggingProblem.init();
    done();
  }, TypeError);
};

// Export the tests to the runner
module.exports = unit;
