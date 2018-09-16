/*
 * Primary file for the API
 */

// Dependencies
var server = require('./lib/server');
var workers = require('./lib/workers');
var cli = require('./lib/cli');
var exampleDebuggingProblem = require('./lib/exampledebuggingproblem');
// Declare the application
var app = {};

// Initialization function
app.init = function() {
  // Start the server
  debugger;
  server.init();
  debugger;

  // Start the workers
  debugger;
  workers.init();
  debugger;

  // Start the CLI, but make sure it starts last
  debugger;
  setTimeout(function() {
    debugger;
    cli.init();
  }, 50);
  debugger;

  debugger;
  var foo = 1;
  console.log("Assigned 1 to foo");
  debugger;
  foo++;
  console.log("Incremented foo");
  debugger;

  foo = foo * foo;
  console.log("Squared foo");
  debugger;

  foo = foo.toString();
  console.log("Converted foo to string");
  debugger;

  // Called the init script that will throw
  exampleDebuggingProblem.init();
  console.log("Called the library");
  debugger;

};

// Execute
app.init();

// Export the application
module.exports = app;
