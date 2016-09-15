'use strict';

const Hapi = require('hapi');
const Path = require('path');
require('dotenv').config();


const server = new Hapi.Server();

server.connection({ port: process.env.PORT || 3000 });

server.app.models = require('./models/index')


const skaters = require('./api/skaters')
const auth = require('./api/auth')
const teams = require('./api/teams')
const ranks = require('./api/ranks')
const brands = require('./api/brands')
const gear = require('./api/gear')
const reviews = require('./api/reviews')
// const thing = require('./api/thing')


// server.route(admin);


// validate assumes token exists
var validate = function (decoded, req, callback) {

    // do your checks to see if the person is valid
    // decoded is the JWT(decoded)

    // if ('not valid') {
    //   return callback(null, false);
    // }
    // else {
    //   return callback(null, true);
    // }
};

var author = function(decoded, req, cb) {
  if (req.params.id == decoded.id || decoded.admin ) {
    return cb(null, true)
  }
  else {
    return cb(null, false)
  }
}

var isAdmin = function (decoded, req, cb) {
  if (decoded.admin){
    return cb(null, true)
  }
  else {
    return cb(null, false)
  }
}

server.register(require('hapi-auth-jwt2'), err => {

  if (err) {
    throw err;
  }

  server.auth.strategy('admin', 'jwt',
    { key: process.env.JWTKEY,
      validateFunc: isAdmin, // validate function defined above
      verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
    });

  server.auth.strategy('author', 'jwt',
    { key: process.env.JWTKEY,
      validateFunc: author, // validate function defined above
      verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
    });

    server.route(auth);
    server.route(skaters);
    server.route(teams);
    server.route(ranks);
    server.route(brands);
    server.route(gear);
    server.route(reviews);

  // server.auth.default('jwt');
})

server.register(require('inert'), err => {

  if (err) {
    throw err;
  }

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
