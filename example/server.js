/*
 * hapi-react-router
 * https://github.com/radek/hapi-react-router
 *
 * Copyright (c) 2014 Radek
 * Licensed under the MIT license.
 */

'use strict';

var React = require('react');
var Hapi = require('hapi');
require('node-jsx').install({extension: '.jsx'});

var plugin = require('../');

var routes = require('./routes.jsx');

var server = new Hapi.Server();
server.connection({port: 8000});

server.route({
  method: 'GET',
  path: '/hello',
  handler: function (request, reply) {
    reply('don\'t worry, be hapi!');
  }
});

server.route({
  method: 'GET',
  path: '/js/{param*}',
  handler: {
    directory: {
      path: './public/js',
      listing: true,
      index: true
    }
  }
});

server.route({
  method: 'GET',
  path: '/images/{param*}',
  handler: {
    directory: {
      path: './public/images',
      listing: true,
      index: true
    }
  }
});

var options = {
  rootComponent: 'components/Html.jsx',
  reactRoutes: 'routes.jsx'
};

server.register({register: plugin, options: options}, function( err ) {
  if (err) {
    throw err;
  }
});

var reactRoutesHandler = React.createFactory(routes.props.handler);

var rroute = {
  method: 'GET',
  path: routes.props.path,
  handler: function(request, reply) {
    return reply(reactRoutesHandler());
  }
};

server.route(rroute);

server.start(function () {
  console.log('Server running at: ' + server.info.uri);
});

