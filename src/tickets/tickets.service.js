const TicketFlight = require('../models').TicketFlight;

module.exports = {
  getFares(flightId) {
    return TicketFlight
      .findAll({
        where: {
          flight_id: flightId
        }
      })
      .then((tickets) => [...new Set(tickets.map(t => t.fare_conditions))]);
  },

  getTickets(flightId, fare) {
    return TicketFlight
      .findAll({
        where: {
          flight_id: flightId,
          fare_conditions: fare,
        }
      });
  },

  updatePrices(flightId, fare, newPrice) {
    return TicketFlight
      .update({
        amount: newPrice
      },
      {
        where: {
          flight_id: flightId,
          fare_conditions: fare,
        }
      });
  }
};
