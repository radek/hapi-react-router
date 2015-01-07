/*
 * hapi-react-router
 * https://github.com/radek/hapi-react-router
 *
 * Copyright (c) 2014 Radek
 * Licensed under the MIT license.
 *
 *
 */

'use strict';
var path = require('path');

var React = require('react');
var nodeJSX = require('node-jsx');
var Router = require('react-router');
var _merge = require('lodash.merge');

var DEFAULT_OPTIONS = {
  doctype: '<!DOCTYPE html>'
};

exports.register = function (server, options, next) {
  options = _merge (DEFAULT_OPTIONS, options);

  var routesFile = path.join(path.dirname(require.main.filename), options.reactRoutes);
  var rootComponent = path.join(path.dirname(require.main.filename), options.rootComponent);
  var routes;
  var component;

  try {
    routes = require(routesFile);
  }
  catch (e) {
    return function() {
      throw e;
    };
  }

  try {
    component = require(rootComponent);
  }
  catch (e) {
    return function() {
      throw e;
    };
  }

  server.ext('onPostHandler', function (request, replay) {

    Router.run(routes, request.url.path, function(Handler, state){
      if (!state.routes.length) {
        return replay.continue();
      }

      var handler = React.createFactory(Handler);
      var markup = React.renderToString(handler());
      var html   = React.renderToStaticMarkup(component({title: 'test', markup: markup }));

      return replay(options.doctype + html);
    });
  });
  next();
};

exports.register.attributes = {
  pkg: require('../package.json')
};
