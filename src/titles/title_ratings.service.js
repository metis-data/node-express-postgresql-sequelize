const titleRating = require('../models').TitleRating;
const titleRatingIndexed = require('../models').TitleRatingIndexed;

module.exports = {
  getBestMovies() {
    return titleRating
      .findAll({
        where: {
          averagerating: 10.0
        }
      });
  },
  getBestMoviesIndexed() {
    return titleRatingIndexed
      .findAll({
        where: {
          averagerating: 10.0
        }
      });
  }
};
