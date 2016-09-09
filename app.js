'use strict';

const Hapi = require('hapi');
const Path = require('path');


// const sequelize = require('db/sequelize');

const server = new Hapi.Server();

server.connection({ port: process.env.PORT || 3000 });

server.app.models = require('./models/index')

server.register(require('inert'), (err) => {

  if (err) {
    throw err;
  }

  const skaters = require('./api/skaters')
  const auth = require('./api/auth')
  const teams = require('./api/teams')
  // const thing = require('./api/thing')

  server.route(skaters);
  server.route(teams);
  server.route(auth);
  // server.route(thing);

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public',
            listing: false
        }
    }
});

  server.start((err) => {

    if (err) {
      throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
  });

});


module.exports = server;
