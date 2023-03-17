'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FlightIndexed extends Model {
    static associate(models) {
    }
  }
  FlightIndexed.init(
    {
      flight_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
      flight_no: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
      scheduled_departure: DataTypes.DATE,
      scheduled_arrival: DataTypes.DATE,
      departure_airport: DataTypes.STRING,
      arrival_airport: DataTypes.STRING,
      status: DataTypes.STRING,
      aircraft_code: DataTypes.STRING,
      actual_departure: DataTypes.DATE,
      actual_arrival: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'FlightIndexed',
      tableName: 'flights_indexed',
      timestamps: false,
    }
  );
  return FlightIndexed;
};
