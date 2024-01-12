const titleRatingsController = require('./title_ratings.controller');
const titlesService = require('./titles.service');

module.exports = {
  initialize(router) {
    router.get('/titles', titleRatingsController.handleResult(this.getTitles));
    router.get('/titlesForAnActor', titleRatingsController.handleResult(this.titlesForAnActor));
    router.get('/highestRatedMoviesForAnActor', titleRatingsController.handleResult(this.highestRatedMoviesForAnActor));
    router.get('/highestRatedMovies', titleRatingsController.handleResult(this.highestRatedMovies));
    router.get('/commonMoviesForTwoActors', titleRatingsController.handleResult(this.commonMoviesForTwoActors));
    router.get('/crewOfGivenMovie', titleRatingsController.handleResult(this.crewOfGivenMovie));
    router.get('/mostProlificActorInPeriod', titleRatingsController.handleResult(this.mostProlificActorInPeriod));
    router.get('/mostProlificActorInGenre', titleRatingsController.handleResult(this.mostProlificActorInGenre));
    router.get('/mostCommonTeammates', titleRatingsController.handleResult(this.mostCommonTeammates));
  },

  getTitles(req, res) {
    return titlesService.getTitles(req.query.title);
  },

  titlesForAnActor(req, res) {
    return titlesService.titlesForAnActor(req.query.nconst, req.query.method);
  },

  highestRatedMoviesForAnActor(req, res) {
    return titlesService.highestRatedMoviesForAnActor(req.query.nconst, req.query.method);
  },

  highestRatedMovies(req, res) {
    return titlesService.highestRatedMovies(req.query.numvotes, req.query.method);
  },

  commonMoviesForTwoActors(req, res) {
    return titlesService.commonMoviesForTwoActors(req.query.actor1, req.query.actor2, req.query.method);
  },

  crewOfGivenMovie(req, res) {
    return titlesService.crewOfGivenMovie(req.query.tconst, req.query.method);
  },

  mostProlificActorInPeriod(req, res) {
    return titlesService.mostProlificActorInPeriod(req.query.startYear, req.query.endYear, req.query.method);
  },

  mostProlificActorInGenre(req, res) {
    return titlesService.mostProlificActorInGenre(req.query.genre, req.query.method);
  },

  mostCommonTeammates(req, res) {
    return titlesService.mostCommonTeammates(req.query.nconst, req.query.method);
  }
};
