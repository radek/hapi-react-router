'use strict';

var React         = require('react');
var Router        = require('react-router');

var places = [
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

function findPlace(id) {
  for (var i = 0; i < places.length; i++) {
    if (places[i].id === id) return places[i];
  }
}

var Place = React.createClass({
  mixins: [ Router.State ],

  render: function () {
    var place = findPlace(this.getParams().id);

    if (!place) return '<p>404 Not Found</p>';

    return (
      <div className="place">
        <h2>{ place.name }</h2>
        <img src={ '/images/' + place.id + '.jpg' }/>
      </div>
    );
  }
});

module.exports = Place;
