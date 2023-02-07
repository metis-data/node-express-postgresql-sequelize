const TicketFlight = require('../models').TicketFlight;

module.exports = {
  getFares(req, res) {
    return TicketFlight
      .findAll({
        where: {
          flight_id: req.params.flightId
        }
      })
      .then((tickets) => [...new Set(tickets.map(t => t.fare_conditions))])
    .then((results) => res.status(200).send(results))
    .catch((error) => { res.status(400).send(error); });
  },

  getTickets(req, res) {
    return TicketFlight
      .findAll({
        where: {
          flight_id: req.params.flightId,
          fare_conditions: req.params.fare,
        }
      })
    .then((results) => res.status(200).send(results))
    .catch((error) => { res.status(400).send(error); });
  },

  updatePrices(req, res) {
    return TicketFlight
      .update({
        amount: req.body.newPrice
      },
      {
        where: {
          flight_id: req.params.flightId,
          fare_conditions: req.params.fare,
        }
      })
    .then((results) => res.status(200).send(results))
    .catch((error) => { res.status(400).send(error); });
  }
};
