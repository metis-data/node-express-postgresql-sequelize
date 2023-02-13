'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    static associate(models) {
    }
  }
  Flight.init(
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
      modelName: 'Flight',
      tableName: 'flights',
      timestamps: false,
    }
  );
  return Flight;
};
