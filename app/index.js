/*
 * Primary file for the API
 */

// Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');

// The server should respond to requests with a String
var server = http.createServer(function(req,res){

  // Get and parse url
  var parsedURL = url.parse(req.url, true);

  // Get path
  var path = parsedURL.pathname;
  var trimmedpath = path.replace(/^\/+|\/+$/g,'');

  // Get query String
  var querystring = parsedURL.query;

  // Get HTTP method
  var method = req.method.toLowerCase();

  // Get headers as an object
  var headers = req.headers;

  // Get payload, if there's any
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data', function(data){
    buffer += decoder.write(data);
  });
  req.on('end',function(){
    buffer += decoder.end();

    // Choose the handler request should go to. If not found, use the notFound one
    var chosenhandler = typeof(router[trimmedpath]) !== 'undefined' ? router[trimmedpath] : handlers.notFound;

    // Construct data object to send to handler
    var data = {
      'trimmedPath' : trimmedpath,
      'queryStringObject': querystring,
      'method': method,
      'headers': headers,
      'payload': buffer
    };

    // Route request to handler specified in the router
    chosenhandler(data,function(statuscode,payload){
      // Use the status code called back by handler, or default to 200
      statuscode = typeof(statuscode) == 'number' ? statuscode : 200;

      // Use the payload called back by the handler, or default to empty object
      payload = typeof(payload) == 'object' ? payload : {};

      // Convert the payload to string
      var payloadstring = JSON.stringify(payload);

      // Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statuscode);
      res.end(payloadstring);

      console.log("Response: ", statuscode, payloadstring);

    });

  });

});

// Start server
server.listen(config.port, function(){
  console.log("Started " + config.envName + " server listening on port " + config.port);
});

// Handlers
var handlers = {};

// Defining Sample handler
handlers.sample = function(data,callback){
  // Callback http status code, and a payload
  callback(406,{'name': 'sample handler'});
};

// The not found handler
handlers.notFound = function(data,callback){
  callback(404);
};

// Defining a request router
var router = {
  'sample': handlers.sample
}