/*
 * CLI Related tasks
 *
 */

// Dependencies
var readline = require('readline');
var util = require('util');
var debug = util.debuglog('cli');
var events = require('events');
class _events extends events{};
var e = new _events();

// Instantiate CLI module obejct
var cli = {};

// Input processor
cli.processInput = function(str) {
  str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;

  // Only process the input when user entered something. Otherwise ignore
  if (str) {
    // Codify the unique allowed question strings
    var uniqueInputs = [
      'man',
      'help',
      'exit',
      'stats',
      'list users',
      'more user info',
      'list checks',
      'more check info',
      'list logs',
      'more log info'
    ];

    // Go through the possible inputs, emit an event when a match is found
    var matchFound = false;
    var counter = 0;
    uniqueInputs.some(function(input) {
      if (str.toLowerCase().indexOf(input) > -1) {
        matchFound = true;

        // Emit an event matching the unique input, and include the full string given
        e.emit(input, str);

        return true;
      }
    });

    // If no match is found, tell the user to try again
    if (!matchFound) {
      console.log("Command not found. Try again");
    }
  }
};

// Initialization script
cli.init = function() {

  // Send start message to console, in dark blue style
  console.log('\x1b[34m%s\x1b[0m', "The CLI is running");

  // Start the interface
  var _interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'NODEJS_CLI > '
  });

  // Create the prompt the user will see
  _interface.prompt();

  // Handle the input lines separately
  _interface.on('line', function(str) {
    // Send to the input processor
    cli.processInput(str);

    // Reinit the prompt
    _interface.prompt();
  });

  // If the user stops the CLI, kill the associated process
  _interface.on('close', function() {
    process.exit(0);
  });

};

// Export module
module.exports = cli;
