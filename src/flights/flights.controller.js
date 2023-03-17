const flightsService = require('./flights.service');

module.exports = {
  initialize(router) {
    router.get('/flights/departures/:airportCode', this.findDepartures);
    router.get('/flights/departuresIndexed/:airportCode', this.findDeparturesIndexed);
  },

  findDepartures(req, res) {
    return flightsService.findDepartures(req.params.airportCode)
      .then((results) => res.status(200).send(results))
      .catch((error) => { res.status(400).send(error); });
  },

  findDeparturesIndexed(req, res) {
    return flightsService.findDeparturesIndexed(req.params.airportCode)
      .then((results) => res.status(200).send(results))
      .catch((error) => { res.status(400).send(error); });
  }
};
