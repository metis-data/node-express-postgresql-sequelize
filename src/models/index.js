'use strict';

const Sequelize = require('sequelize');
const process = require('process');
const db = {};

let sequelize = new Sequelize(process.env['DATABASE_URL'], { dialect: 'postgres' });
let { setPgConnection } = require('@metis-data/pg-interceptor');
setPgConnection(process.env['DATABASE_URL']);

let models = [
  '../airports/airport'
];

models.forEach((file) => {
  const model = require(file)(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.seedDatabase = async () => {
  sequelize.query(`DO $done$
    BEGIN
    
    IF NOT EXISTS (
        SELECT
        FROM pg_catalog.pg_tables 
        WHERE
            schemaname = 'bookings'
            AND tablename  = 'flights_indexed'
    ) THEN
      CREATE TABLE flights_indexed AS (SELECT * FROM flights);
    
      CREATE INDEX departure_aiport_idx ON flights_indexed(departure_airport);
    END IF;
    
    END;
    $done$`);
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
