'use strict';

var React         = require('react');
var Router        = require('react-router');

var routes = require('./routes.jsx');
var Html   = require('./components/Html.jsx');

module.exports = Router.run(routes, '/places', function (Handler, state) {

    var title  = 'Places';
    var markup = React.renderToString(<Handler />);
    var html   = React.renderToStaticMarkup(<Html title={title} markup={markup} />);

    // TODO: send 404 status code
    // (see: https://github.com/gpbl/isomorphic-react-template/issues/3)
    return ('<!DOCTYPE html>' + html);
    //res(title);
});
