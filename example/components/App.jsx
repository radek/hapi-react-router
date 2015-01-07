"use strict";

var React         = require('react');
var Router        = require('react-router');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

var data  = [
  { "id": "alghero", "name": "Alghero (Sardinia)"},
  { "id": "appennino", "name": "Appennini (Umbria)"},
  { "id": "argentiera", "name": "Argentiera (Sardinia)"},
  { "id": "assisi", "name": "Assisi (Umbria)"},
  { "id": "firenze", "name": "Firenze (Tuscany)"},
  { "id": "funes", "name": "Funes (South Tyrol)"},
  { "id": "lessinia", "name": "Lessinia (Veneto)"},
  { "id": "milano", "name": "Milan (Lombardy)"},
  { "id": "palau", "name": "Palau (Sardinia)"},
  { "id": "portoferro", "name": "Portoferro (Sardinia)"},
  { "id": "sanpantaleo", "name": "San Pantaleo (Sardinia)"},
  { "id": "sanzeno", "name": "San Zeno (Verona)"},
  { "id": "verona", "name": "Lasagna (Verona)" }
];
var title = "Some places in Italy";

var App = React.createClass({

  getDefaultProps: function () {
    return { places: data };
  },

  render: function () {
    var links = this.props.places.map(function (place) {
      return (
        <li key={"place-" + place.id}>
          <Link to="place" params={{ id: place.id }}>{place.name}</Link>
        </li>
      );
    });

    return (
      <div className="app">
        <h1>{ title }</h1>
        <ul className="master">
          { links }
          <Link to="index"><small>(back to index)</small></Link>
        </ul>
        <div className="detail">
          <RouteHandler />
        </div>
      </div>
    );
  }
});

module.exports = App;
