require('dotenv').config()
const app = require('./app');
const models = require('./models');
const http = require('http');

async function bootstrap() {
  await models.seedDatabase();
  const server = http.createServer(app);
  server.listen(process.env.PORT || 3000);
}

bootstrap();