const titlesService = require('./titles.service');

module.exports = {
  initialize(router) {
    router.get('/titles', this.getTitles);
  },

  getTitles(req, res) {
    return titlesService.getTitles(req.query.title)
      .then((results) => res.status(200).send(results))
      .catch((error) => { console.log(error); res.status(400).send(error); });
  }
};
