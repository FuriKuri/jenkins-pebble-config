var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    port: 8080 
});

// Add the route
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
       reply({
        url: request.payload.url, 
        token: request.payload.token
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

// Start the server
server.start();