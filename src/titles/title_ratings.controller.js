const titleRatingService = require('./title_ratings.service');

module.exports = {
  initialize(router) {
    router.get('/titles/ratings/best', this.getBestMovies);
    router.get('/titles/ratingsIndexed/best', this.getBestMoviesIndexed);
  },

  getBestMovies(req, res) {
    return titleRatingService.getBestMovies(req.params.airportCode)
      .then((results) => res.status(200).send(results))
      .catch((error) => { res.status(400).send(error); });
  },

  getBestMoviesIndexed(req, res) {
    return titleRatingService.getBestMoviesIndexed(req.params.airportCode)
      .then((results) => res.status(200).send(results))
      .catch((error) => { res.status(400).send(error); });
  }
};
