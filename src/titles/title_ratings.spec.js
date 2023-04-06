require('dotenv').config();
const { startMetisInstrumentation, shudownhook } = require('../tracer');
const request = require('supertest');

describe('AppController (e2e)', () => {
  let app;

  before(async () => {
    startMetisInstrumentation();
    
    app = require('../app');
  });

  it('/titles/ratings/best (GET)', async () => {
    await request(app)
      .get('/titles/ratings/best')
      .expect(200);
  });

  it('/titles/ratingsIndexed/best (GET)', async () => {
    await request(app)
      .get('/titles/ratingsIndexed/best')
      .expect(200);
  });

  after(async () => {
    await shudownhook();
  });
});
