const Airport = require('../models').Airport;

module.exports = {
  getAirports(orderResults) {
    let airports;
    if(orderResults === "true"){
      airports = Airport
        .findAll({
          order: [
            ['airport_code', 'ASC'],
          ],
        });
    } else {
      console.log(Airport);
      airports = Airport
        .findAll();
    }

    return airports;
  }
};
