const Flight = require('../models').Flight;
const FlightIndexed = require('../models').FlightIndexed;

module.exports = {
  findDepartures(req, res) {
    return Flight
      .findAll({
        where: {
          departure_airport: req.params.airportCode
        }
      })
    .then((results) => res.status(200).send(results))
    .catch((error) => { res.status(400).send(error); });
  },

  findDeparturesIndexed(req, res) {
    return FlightIndexed
      .findAll({
        where: {
          departure_airport: req.params.airportCode
        }
      })
    .then((results) => res.status(200).send(results))
    .catch((error) => { res.status(400).send(error); });
  }
};
