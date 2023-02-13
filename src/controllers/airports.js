const Airport = require('../models').Airport;

module.exports = {
  getAirports(req, res) {
    let airports = null;
    if(req.query.orderResults === "true"){
      airports = Airport
        .findAll({
          order: [
            ['airport_code', 'ASC'],
          ],
        });
    } else {
      airports = Airport
        .findAll();
    }

    return airports
      .then((results) => res.status(200).send(results))
      .catch((error) => { res.status(400).send(error); });
  }
};
