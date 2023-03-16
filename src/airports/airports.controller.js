const airportsService = require('./airports.service');

module.exports = {
  initialize(router) {
    router.get('/airports', this.getAirports);
  },
  getAirports(req, res) {
    return airportsService.getAirports(req.query.orderResults)
      .then((results) => res.status(200).send(results))
      .catch((error) => { res.status(400).send(error); });
  }
};
