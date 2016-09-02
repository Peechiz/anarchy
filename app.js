'use strict';

const Hapi = require('hapi');
// const sequelize = require('db/sequelize');

const server = new Hapi.Server();

server.connection({ port: process.env.PORT || 3000 });



server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (req, res) {
        res('Hello, world!');
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});

module.exports = server;
