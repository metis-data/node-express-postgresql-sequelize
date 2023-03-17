const request = require('supertest');
const { startMetisInstrumentation, shudownhook } = require('../tracer');
const app = require('express')();

describe('AppController (e2e)', () => {
  beforeAll(async () => {
    startMetisInstrumentation();
  });

  it('/flights/departures/AAQ (GET)', async () => {
    await request(app.getHttpServer())
      .get('/flights/departures/AAQ')
      .expect(200);
  });

  it('/flights/departuresIndexed/AAQ (GET)', async () => {
    //await request(app.getHttpServer())
    //  .get('/flights/departuresIndexed/AAQ')
    //  .expect(200);
  });

  afterAll(async () => {
    await shudownhook();
  });
});
