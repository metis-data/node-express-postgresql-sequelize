const ticketsService = require('./tickets.service');

module.exports = {
  initialize(router) {
    router.get('/tickets/fares/:flightId', this.getFares);
    router.get('/tickets/:flightId/:fare', this.getTickets);
    router.patch('/tickets/:flightId/:fare', this.updatePrices);
  },


  getFares(req, res) {
    return ticketsService.getFares(req.params.flightId)
      .then((results) => res.status(200).send(results))
      .catch((error) => { res.status(400).send(error); });
  },

  getTickets(req, res) {
    return ticketsService.getTickets(req.params.flightId, req.params.fare)
      .then((results) => res.status(200).send(results))
      .catch((error) => { res.status(400).send(error); });
  },

  updatePrices(req, res) {
    return ticketsService.updatePrices(req.params.flightId, req.params.fare, req.body.newPrice)
      .then((results) => res.status(200).send(results))
      .catch((error) => { res.status(400).send(error); });
  }
};
