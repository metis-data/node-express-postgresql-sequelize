const airports = require('../airports/airports.controller');
const flights = require('../flights/flights.controller');
const tickets = require('../tickets/tickets.controller');

function initialize(router) {
  airports.initialize(router);
  flights.initialize(router);
  tickets.initialize(router);
}

module.exports = {
  initialize,
};
