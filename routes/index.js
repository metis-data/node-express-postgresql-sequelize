var express = require('express');
var router = express.Router();

const controllers = require('../controllers');
const airportsController = controllers.airports;
const flightsController = controllers.flights;
const ticketsController = controllers.tickets;

router.get('/airports', airportsController.getAirports);
router.get('/flights/departures/:airportCode', flightsController.findDepartures);
router.get('/flights/departuresIndexed/:airportCode', flightsController.findDeparturesIndexed);
router.get('/tickets/fares/:flightId', ticketsController.getFares);
router.get('/tickets/:flightId/:fare', ticketsController.getTickets);
router.patch('/tickets/:flightId/:fare', ticketsController.updatePrices);

module.exports = router;
