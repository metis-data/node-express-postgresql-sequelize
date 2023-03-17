const Flight = require('../models').Flight;
const FlightIndexed = require('../models').FlightIndexed;

module.exports = {
  findDepartures(airportCode) {
    return Flight
      .findAll({
        where: {
          departure_airport: airportCode
        }
      });
  },

  findDeparturesIndexed(airportCode) {
    return FlightIndexed
      .findAll({
        where: {
          departure_airport: airportCode
        }
      });
  }
};
