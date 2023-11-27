require('dotenv').config();
const { startMetisInstrumentation } = require('../tracer');
const request = require('supertest');

describe('AppController (e2e)', function (){
  this.timeout(0);

  const endpoints = [
    '/titles/ratings/best',
    '/titles/ratingsIndexed/best',
    '/titles?title=Test',
    '/titlesForAnActor?nconst=nm1588970',
  ];

  let app;
  let models;

  before(async function() {
    this.timeout(0);
    startMetisInstrumentation();
    
    models = require('../models');
    await models.seedDatabase();
    app = require('../app');
  });

  endpoints.map(url => it(`${url} (GET)`, async function() {
    await request(app)
      .get(url)
      .expect(200);
  }));
});
