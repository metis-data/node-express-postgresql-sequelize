var express = require('express');
var router = express.Router();

const controllers = require('../controllers');
controllers.initialize(router);
module.exports = router;
