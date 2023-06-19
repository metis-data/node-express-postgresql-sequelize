const { Op } = require("sequelize");
const sequelize = require('../models').sequelize;
const titleBasic = require('../models').TitleBasic;
const titlePrincipal = require('../models').TitlePrincipal;
const titleRating = require('../models').TitleRating;

module.exports = {
  getTitles(title) {
    return titleBasic 
      .findAll({
        where: {
          primarytitle: { [Op.like]: '%' + title + '%' }
        }
      });
  },
  
  titlesForAnActor(nconst) {
    return titleBasic 
      .findAll({
        include: [{
          model: titlePrincipal,
          required: true,
          where: {
            'nconst': nconst
          },
        }],
        order: [
          ['startyear', 'DESC']
        ],
        limit: 10
      });

    /*
    return titleBasic 
      .findAll({
        include: [{
          model: titlePrincipal,
          required: true,
          duplicating: false,
          where: {
            'nconst': nconst
          },
        }],
        order: [
          ['startyear', 'DESC']
        ],
        limit: 10
      });
    */

    /*  
    CREATE INDEX IF NOT EXISTS title_principals_nconst_idx ON imdb.title_principals(nconst) INCLUDE (tconst);

    return sequelize.query(`
      SELECT TitleBasic.*
      FROM imdb.title_basics AS TitleBasic
      JOIN imdb.title_principals AS TitlePrincipals ON TitlePrincipals.tconst = TitleBasic.tconst
      WHERE TitlePrincipals.nconst = :nconst
      ORDER BY TitleBasic.startyear DESC
      LIMIT 10
    `, {
      model: titleBasic,
      mapToModel: true,
      replacements: {
        nconst: nconst
      },
    });
    */
  },
  
  highestRatestMoviesForAnActor(nconst) {
    return titleBasic 
      .findAll({
        include: [
          {
            model: titleRating,
            required: true,
            duplicating: false,
          },
          {
            model: titlePrincipal,
            required: true,
            duplicating: false,
            where: {
              'nconst': nconst
            },
          },
        ],
        order: [
          [ titleRating, 'averagerating', 'DESC'], 
        ],
        limit: 10
      });

    /*  
    CREATE INDEX IF NOT EXISTS title_principals_nconst_idx ON imdb.title_principals(nconst) INCLUDE (tconst);

    return titleBasic 
      .findAll({
        include: [
          {
            model: titleRating,
            required: true,
            duplicating: false,
          },
          {
            model: titlePrincipal,
            required: true,
            duplicating: false,
            where: {
              'nconst': nconst
            },
          },
        ],
        order: [
          [ titleRating, 'averagerating', 'DESC'], 
        ],
        limit: 10
      });
    */
  },
  
  highestRatestMovies(numvotes) {
    return titleBasic 
      .findAll({
        include: [
          {
            model: titleRating,
            required: true,
            duplicating: false,
            where: {
              'numvotes': { [Op.gte]: numvotes }
            }
          },
        ],
        order: [
          [ titleRating, 'averagerating', 'DESC'], 
        ]
      });

    /*  
    CREATE INDEX IDX_title_ratings_637d5836 ON title_ratings (numvotes)

    return titleBasic 
      .findAll({
        include: [
          {
            model: titleRating,
            required: true,
            duplicating: false,
            where: {
              'numvotes': { [Op.gte]: numvotes }
            }
          },
        ],
        order: [
          [ titleRating, 'averagerating', 'DESC'], 
        ]
      });
    */
  },
  
  commonMoviesForTwoActors(actor1, actor2) {
    // We had to configure second association in models to make this work
    return titleBasic 
      .findAll({
        include: [
          {
            model: titlePrincipal,
            required: true,
            duplicating: false,
            as: 'titleBasicTitlePrincipal',
            where: {
              'nconst': actor1
            }
          },
          {
            model: titlePrincipal,
            required: true,
            duplicating: false,
            as: 'titleBasicTitlePrincipal2',
            where: {
              'nconst': actor2
            }
          },
        ]
      });

    /*
    CREATE INDEX IF NOT EXISTS title_principals_nconst_idx ON imdb.title_principals(nconst) INCLUDE (tconst);

    return sequelize.query(`
      SELECT TB.*
      FROM title_basics AS TB
      JOIN title_principals AS TP1 ON TP1.tconst = TB.tconst
      JOIN title_principals AS TP2 ON TP2.tconst = TB.tconst
      WHERE TP1.nconst = :actor1 AND TP2.nconst = :actor2
    `, {
      model: titleBasic,
      mapToModel: true,
      replacements: {
        actor1: actor1,
        actor2: actor2
      },
    });
    */
  },
};
