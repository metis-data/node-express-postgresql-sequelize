require('dotenv').config();
const { startMetisInstrumentation, shudownhook } = require('../tracer');
const request = require('supertest');

startMetisInstrumentation();

describe('AppController (e2e)', () => {
  let app;

  beforeAll(async () => {
    app = require('../app');
  });

  it('/flights/departures/AAQ (GET)', async () => {
    await request(app)
      .get('/flights/departures/AAQ')
      .expect(200);
  });

  it('/flights/departuresIndexed/AAQ (GET)', async () => {
    await request(app)
      .get('/flights/departuresIndexed/AAQ')
      .expect(200);
  });

  afterAll(async () => {
    await shudownhook();
  });
});
