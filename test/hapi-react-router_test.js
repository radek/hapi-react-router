'use strict';

var assert = require('assert'),
  Hapi = require('hapi'),
  React = require('react'),
  plugin = require('../');

require('node-jsx').install({extension: '.jsx'});

var  routes = require('../example/routes.jsx');

describe('hapi-react-router', function() {

  var server;
  var heloRoute = [{
    method: 'GET',
    path: '/hello',
    handler: function(request, reply) {
      return reply('don\'t worry, be hapi!');
    }
  }];

  beforeEach(function () {
    server = new Hapi.Server();
    server.connection({ port: 8000});
    server.route(heloRoute);
  });

  it('loads successfully', function(done) {
    server.register(plugin, function(err) {
      assert.ok(!err);
      done();
    });
  });

  it('adds a route to /hello', function(done) {
    var table;

    server.register(plugin, function() {

      table = server.table();
      assert.ok(table);
      assert.equal(table.length, 1);
      assert.equal(table[0].table[0].path, '/hello');

      done();
    });
  });

  it('responses to GET request on /hello', function(done) {
    var request = {
      method: 'GET',
      url: '/hello'
    };

    server.register(plugin, function() {

      server.inject(request, function(res) {

        assert.equal(res.statusCode, 200);
        assert.equal(res.result, 'don\'t worry, be hapi!');

        done();
      });
    });
  });

  it('adds react-route', function(done) {
    var table;

    server.register(plugin, function() {

      var exrouteHandler = React.createFactory(routes.props.handler);
      var exroute = {
        method: 'GET',
        path: routes.props.path,
        handler: function(request, reply) {
          return reply(exrouteHandler);
        }
      };

      server.route(exroute);

      table = server.table();
      assert.ok(table);
      assert.equal(table.length, 1);
      console.log('HANDLER: ', table[0].table[1].path);
      assert.equal(table[0].table[1].path, '/places');
      console.log('HANDLER: ', table[0].table[1].settings.handler);
//      assert.equal(table[0].table[1].handler, );

      done();
    });
  });

});
