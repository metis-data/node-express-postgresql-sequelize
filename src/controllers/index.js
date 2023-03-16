const airports = require('../airports/airports.controller');
const flights = require('./flights');
const tickets = require('./tickets');

function initialize(router) {
  airports.initialize(router);
}

module.exports = {
  initialize,
  flights,
  tickets,
};
