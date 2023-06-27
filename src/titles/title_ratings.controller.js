const titleRatingService = require('./title_ratings.service');

module.exports = {
  initialize(router) {
    router.get('/titles/ratings/best', this.handleResult(this.getBestMovies));
    router.get('/titles/ratingsIndexed/best', this.handleResult(this.getBestMoviesIndexed));
  },

  getBestMovies(req, res) {
    return titleRatingService.getBestMovies();
  },

  getBestMoviesIndexed(req, res) {
    return titleRatingService.getBestMoviesIndexed();
  },

  handleResult(lambda) {
    return (req, res) => lambda(req, res)
      .then((results) => res.status(200).send(results))
      .catch((error) => { console.log(error); res.status(400).send(error); });
  }
};
