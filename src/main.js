require('dotenv').config();
const tracer = require('./tracer');

tracer.startMetisInstrumentation();

const models = require('./models');
const app = require('./app');

async function bootstrap() {
  await models.seedDatabase();
  app.listen(process.env.PORT || 3000);
}

bootstrap();