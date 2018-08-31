/*
 * Primary file for the API
 */

// Dependencies
var http = require('http');

// The server should respond to requests with a String
var server = http.createServer(function(req,res){
  res.end("Hello World\n");
});

// Start server, listening on port 1234
server.listen(1234, function(){
  console.log("Server listening on port 1234");
});
