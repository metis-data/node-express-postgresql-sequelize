const titlesService = require('./titles.service');

module.exports = {
  initialize(router) {
    router.get('/titles', this.getTitles);
    router.get('/titlesForAnActor', this.titlesForAnActor);
    router.get('/highestRatestMoviesForAnActor', this.highestRatestMoviesForAnActor);
    router.get('/highestRatestMovies', this.highestRatestMovies);
    router.get('/commonMoviesForTwoActors', this.commonMoviesForTwoActors);
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
  },

  highestRatestMovies(req, res) {
    return titlesService.highestRatestMovies(req.query.numvotes)
      .then((results) => res.status(200).send(results))
      .catch((error) => { console.log(error); res.status(400).send(error); });
  },

  commonMoviesForTwoActors(req, res) {
    return titlesService.commonMoviesForTwoActors(req.query.actor1, req.query.actor2)
      .then((results) => res.status(200).send(results))
      .catch((error) => { console.log(error); res.status(400).send(error); });
  },
};
