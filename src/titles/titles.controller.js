const titlesService = require('./titles.service');

module.exports = {
  initialize(router) {
    router.get('/titles', this.getTitles);
    router.get('/titlesForAnActor', this.titlesForAnActor);
    router.get('/highestRatestMoviesForAnActor', this.highestRatestMoviesForAnActor);
  },

  getTitles(req, res) {
    return titlesService.getTitles(req.query.title)
      .then((results) => res.status(200).send(results))
      .catch((error) => { console.log(error); res.status(400).send(error); });
  },

  titlesForAnActor(req, res) {
    return titlesService.titlesForAnActor(req.query.nconst)
      .then((results) => res.status(200).send(results))
      .catch((error) => { console.log(error); res.status(400).send(error); });
  },

  highestRatestMoviesForAnActor(req, res) {
    return titlesService.highestRatestMoviesForAnActor(req.query.nconst)
      .then((results) => res.status(200).send(results))
      .catch((error) => { console.log(error); res.status(400).send(error); });
  }
};
