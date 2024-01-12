'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TitleRatingIndexed extends Model {
    static associate(models) {
    }
  }
  TitleRatingIndexed.init(
    {
      tconst: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
      averagerating: { type: DataTypes.DECIMAL},
      numvotes: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'TitleRatingIndexed',
      tableName: 'title_ratings_indexed',
      schema: 'imdb',
      timestamps: false,
    }
  );
  return TitleRatingIndexed;
};
