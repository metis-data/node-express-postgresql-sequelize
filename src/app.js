var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var tracer = require('./tracer');

tracer.startMetisInstrumentation();

var indexRouter = require('./routes/index');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.use('/', indexRouter);

app.use(function(req, res, next) {
  res.status(404).send({ error: 'Not found' })
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).send({ error: err })
});

module.exports = app;
