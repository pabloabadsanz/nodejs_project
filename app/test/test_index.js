/*
 * Test runner
 *
 */

// Dependencies
var helpers = require('./../lib/helpers');
var assert = require('assert');

// Application logic for the test runner
_app = {};

// Container for the tests
_app.tests = {
  'unit': {}
};

// Assert that the get number function is returning a number
_app.tests.unit['helpers.getNumber should return a number'] = function(done) {
  var val = helpers.getNumber();
  assert.equal(typeof(val), 'number');
  done();
};

// Assert that the get number function is returning one
_app.tests.unit['helpers.getNumber should return 1'] = function(done) {
  var val = helpers.getNumber();
  assert.equal(val, 1);
  done();
};

// Assert that the get number function is returning two
_app.tests.unit['helpers.getNumber should return 2'] = function(done) {
  var val = helpers.getNumber();
  assert.equal(val, 2);
  done();
};

// Count all the tests
_app.countTests = function() {
  var counter = 0;
  for (var key in _app.tests) {
    if (_app.tests.hasOwnProperty(key)) {
      var subTests = _app.tests[key];
      for (var testName in subTests) {
        if (subTests.hasOwnProperty(testName)) {
          counter++;
        }
      }
    }
  }

  return counter;
};

_app.produceTestReport = function(limit, succeses, errors) {
  console.log("");
  console.log("-------------- BEGIN TEST REPORT --------------");
  console.log("");
  console.log("Total tests: ", limit);
  console.log("Passed: ", succeses);
  console.log("Fails: ", errors.length);
  console.log("");

  // If there are errors, print them in detail
  if (errors.length > 0) {
    console.log("");
    console.log("-------------- BEGIN ERROR DETAILS --------------");
    console.log("");
    errors.forEach(function(testError) {
      console.log('\x1b[31m%s\x1b[0m', testError.name);
      console.log(testError.error);
      console.log("");
    });
    console.log("-------------- END ERROR DETAILS --------------");
    console.log("");
  }

  console.log("");
  console.log("-------------- END TEST REPORT --------------");
};

// Runs all the tests collecting all the errors and successes
_app.runTests = function() {
  var errors = [];
  var successes = 0;
  var limit = _app.countTests();
  var counter = 0;
  for (var key in _app.tests) {
    if (_app.tests.hasOwnProperty(key)) {
      var subTests = _app.tests[key];
      for (var testName in subTests) {
        if (subTests.hasOwnProperty(testName)) {
          (function() {
            var tmpTestName = testName;
            var testValue = subTests[testName];

            // Call the test
            try {
              testValue(function() {
                // If it calls back without throwing, then it succeeded, so log it in green
                console.log('\x1b[32m%s\x1b[0m', tmpTestName);
                counter++;
                successes++;
                if (counter == limit) {
                  _app.produceTestReport(limit, successes, errors);
                }
              });
            } catch(e) {
              // If it throws then it failed. Capture the error and log it in red
              errors.push({
                'name': tmpTestName,
                'error': e
              });
              console.log('\x1b[31m%s\x1b[0m', tmpTestName);
              counter++;
              if (counter == limit) {
                _app.produceTestReport(limit, successes, errors);
              }
            }
          })();
        }
      }
    }
  }
};

// Run a test
_app.runTests();
