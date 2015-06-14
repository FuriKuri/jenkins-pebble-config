var Hapi = require('hapi');
var Base64 = require('js-base64').Base64;

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
    port: 8080
});

// Add the route
server.route({
  method: 'GET',
  path: '/test',
  handler: function(rquest, reply) {
    reply('Works');
  }
});

server.route({
    method: 'GET',
    path:'/config',
    handler: function (request, reply) {
       reply.file('files/index.html');
    }
});

server.route({
    method: 'POST',
    path:'/config',
    handler: function (request, reply) {
        var authHeader = Base64.encode(request.payload.user + ':' + request.payload.token);
       reply({
        url: request.payload.url,
        auth: authHeader
       });
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'files'
        }
    }
});
console.log('Server started');
// Start the server
server.start();