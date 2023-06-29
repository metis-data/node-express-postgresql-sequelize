require('dotenv').config();
const { startMetisInstrumentation } = require('./tracer');

startMetisInstrumentation();

const models = require('./models');
const app = require('./app');

async function bootstrap() {
  await models.resetExtensions();
  await models.seedDatabase();
  app.listen(process.env.PORT || 3000);
}

bootstrap();