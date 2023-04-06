const titleRatings = require('../titles/title_ratings.controller');

function initialize(router) {
  titleRatings.initialize(router);
}

module.exports = {
  initialize,
};
