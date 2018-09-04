/*
 * Primary file for the API
 */

// Dependencies
var server = require('./lib/server');
var workers = require('./lib/workers');

// Declare the application
var app = {};

// Initialization function
app.init = function() {
  // Start the server
  server.init();

  // Start the workers
  workers.init();

};

// Execute
app.init();

// Export the application
module.exports = app;
