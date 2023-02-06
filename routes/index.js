var express = require('express');
var router = express.Router();

const controllers = require('../controllers');
const airportsController = controllers.airports;
const flightsController = controllers.flights;

router.get('/airports', airportsController.getAirports);
router.get('/flights/departures/:airportCode', flightsController.findDepartures);
router.get('/flights/departuresIndexed/:airportCode', flightsController.findDeparturesIndexed);

module.exports = router;
