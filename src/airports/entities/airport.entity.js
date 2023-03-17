'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    static associate(models) {
    }
  }

  Airport.init(
    {
      airport_code: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
      airport_name: DataTypes.JSONB,
      city: DataTypes.JSONB,
      coordinates: DataTypes.GEOMETRY('POINT'),
      timezone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Airport',
      tableName: 'airports_data',
      timestamps: false,
    }
  );

  return Airport;
};
