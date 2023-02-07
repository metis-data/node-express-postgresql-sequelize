'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TicketFlight extends Model {
    static associate(models) {
    }
  }
  TicketFlight.init(
    {
      ticket_no: { type: DataTypes.STRING, primaryKey: true, },
      flight_id: DataTypes.INTEGER,
      fare_conditions: DataTypes.STRING,
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'TicketFlight',
      tableName: 'ticket_flights',
      timestamps: false,
    }
  );
  return TicketFlight;
};
