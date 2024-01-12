require('dotenv').config();
const { GenericContainer, Network } = require("testcontainers");
const request = require('supertest');

describe('AppController (e2e)', function (){
  this.timeout(0);

  const endpoints = [
    '/titles/ratings/best',
    '/titles/ratingsIndexed/best',
    '/titles?title=Test',
    '/titlesForAnActor?nconst=nm1588970',
    '/titlesForAnActor?nconst=nm1588970&method=2',
    '/titlesForAnActor?nconst=nm1588970&method=3',
    '/highestRatedMoviesForAnActor?nconst=nm1588970',
    '/highestRatedMoviesForAnActor?nconst=nm1588970&method=2',
    '/highestRatedMovies?numvotes=10000',
    '/highestRatedMovies?numvotes=10000&method=2',
    '/commonMoviesForTwoActors?actor1=nm0302368&actor2=nm0001908',
    '/commonMoviesForTwoActors?actor1=nm0302368&actor2=nm0001908&method=2',
    '/commonMoviesForTwoActors?actor1=nm0302368&actor2=nm0001908&method=3',
    '/commonMoviesForTwoActors?actor1=nm0302368&actor2=nm0001908&method=4',
    '/crewOfGivenMovie?tconst=tt0000439',
    '/crewOfGivenMovie?tconst=tt0000439&method=2',
    '/crewOfGivenMovie?tconst=tt0000439&method=3',
    '/crewOfGivenMovie?tconst=tt0000439&method=4',
    '/mostProlificActorInPeriod?startYear=1900&endYear=1912',
    '/mostProlificActorInPeriod?startYear=1900&endYear=1912&method=2',
    '/mostProlificActorInPeriod?startYear=1900&endYear=1912&method=3',
    '/mostProlificActorInGenre?genre=Action',
    '/mostProlificActorInGenre?genre=Action&method=2',
    '/mostProlificActorInGenre?genre=Action&method=3',
    '/mostCommonTeammates?nconst=nm0000428',
    '/mostCommonTeammates?nconst=nm0000428&method=2',
  ];

  let app;
  let models;
  let databasecontainer;
  let otelCollectorContainer;

  before(async function() {
    this.timeout(0);

    if(process.env.MOCK_CONTAINER_DEPENDENCIES){
      const network = await new Network().start();
      const dbPort = 5432;
      const otelPort = 4318;
      databasecontainer = await new GenericContainer("public.ecr.aws/o2c0x5x8/metis-demo-mini-db:latest")
        .withExposedPorts(dbPort)
        .withNetwork(network)
        .withNetworkAliases("database")
        .start();
      
      process.env.DATABASE_URL = process.env.DATABASE_URL.replace(dbPort, databasecontainer.getMappedPort(dbPort));

      otelCollectorContainer = await new GenericContainer("public.ecr.aws/o2c0x5x8/metis-otel-collector:latest")
        .withExposedPorts(otelPort)
        .withNetwork(network)
        .withEnvironment({
          METIS_API_KEY: process.env.METIS_API_KEY,
          CONNECTION_STRING: "postgresql://postgres:postgres@database:5432/demo?schema=imdb",
          LOG_LEVEL: "debug"
        })
        .start();

      await new Promise(resolve => setTimeout(resolve, 10000));

      const { startOtelInstrumentation } = require('../tracer');
      startOtelInstrumentation(otelCollectorContainer.getMappedPort(otelPort));
    }
    
    models = require('../models');
    await models.seedDatabase();
    app = require('../app');
  });

  after(async () => {
    await new Promise(resolve => setTimeout(resolve, 30000));
    await otelCollectorContainer?.stop();
    await databasecontainer?.stop();
  });

  endpoints.map(url => it(`${url} (GET)`, async function() {
    await request(app)
      .get(url)
      .expect(200);
  }));
});
