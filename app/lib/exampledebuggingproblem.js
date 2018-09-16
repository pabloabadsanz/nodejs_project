/*
 * Library which demonstrates something's throwing when its init() is called
 *
 */

// Container of the module
var example = {};

// Init function
example.init = function() {
  // This is an error created intentionally. Var is not defined
  var foo = bar;
  
};

// Export the module
module.exports = example;
