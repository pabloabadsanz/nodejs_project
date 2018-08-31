/*
 * Primary file for the API
 */

// Dependencies
var http = require('http');
var url = require('url');

// The server should respond to requests with a String
var server = http.createServer(function(req,res){

  // Get and parse url
  var parsedURL = url.parse(req.url, true);

  // Get path
  var path = parsedURL.pathname;
  var trimmedpath = path.replace(/^\/+|\/+$/g,'');

  // Get HTTP method
  var method = req.method.toLowerCase();

  // Send response
  res.end("Hello World\n");

  // Log request path
  console.log(method + ' /' + trimmedpath);

});

// Start server, listening on port 1234
server.listen(1234, function(){
  console.log("Server listening on port 1234");
});
