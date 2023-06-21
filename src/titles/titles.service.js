const { Op } = require("sequelize");
const sequelize = require('../models').sequelize;
const titleBasic = require('../models').TitleBasic;
const titlePrincipal = require('../models').TitlePrincipal;
const titleRating = require('../models').TitleRating;
const titleCrew = require('../models').TitleCrew;
const nameBasic = require('../models').NameBasic;

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
    function titlesForAnActorNaive() {
      return titleBasic 
        .findAll({
          include: [{
            model: titlePrincipal,
            required: true,
            as: 'titleBasicTitlePrincipal',
            where: {
              'nconst': nconst
            },
          }],
          order: [
            ['startyear', 'DESC']
          ],
          limit: 10
        });
    }

    function titlesForAnActorWithoutExplosion() {
      return titleBasic 
        .findAll({
          include: [{
            model: titlePrincipal,
            required: true,
            duplicating: false,
            as: 'titleBasicTitlePrincipal',
            where: {
              'nconst': nconst
            },
          }],
          order: [
            ['startyear', 'DESC']
          ],
          limit: 10
        });
    }

    function titlesForAnActorManual() {
      return sequelize.query(`CREATE INDEX IF NOT EXISTS title_principals_nconst_idx ON imdb.title_principals(nconst) INCLUDE (tconst)`).then(() => 
        sequelize.query(`
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
        })
      );
    }

    return titlesForAnActorNaive();
    //return titlesForAnActorWithoutExplosion();
    //return titlesForAnActorManual();
  },
  
  highestRatestMoviesForAnActor(nconst) {
    function highestRatestMoviesForAnActorNaive(){
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
              as: 'titleBasicTitlePrincipal',
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
    }

    function highestRatestMoviesForAnActorWithIndex() {
      return sequelize.query(`CREATE INDEX IF NOT EXISTS title_principals_nconst_idx ON imdb.title_principals(nconst) INCLUDE (tconst)`).then(() => 
        titleBasic 
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
                as: 'titleBasicTitlePrincipal',
                where: {
                  'nconst': nconst
                },
              },
            ],
            order: [
              [ titleRating, 'averagerating', 'DESC'], 
            ],
            limit: 10
          })
      );
    }

    return highestRatestMoviesForAnActorNaive();
    //return highestRatestMoviesForAnActorWithIndex();
  },
  
  highestRatestMovies(numvotes) {
    function highestRatestMoviesNaive() {
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
    }

    function highestRatestMoviesWithIndex() {
      return sequelize.query(`CREATE INDEX IF NOT EXISTS IDX_title_ratings_637d5836 ON imdb.title_ratings (numvotes)`).then(() => 
        titleBasic 
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
          })
      );
    }

    return highestRatestMoviesNaive();
    //return highestRatestMoviesWithIndex();
  },
  
  commonMoviesForTwoActors(actor1, actor2) {
    function commonMoviesForTwoActorsNaive() {
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
    }
    
    function commonMoviesForTwoActorsManual() {
      return sequelize.query(`CREATE INDEX IF NOT EXISTS title_principals_nconst_idx ON imdb.title_principals(nconst) INCLUDE (tconst)`).then(() => 
        sequelize.query(`
          SELECT TB.*
          FROM imdb.title_basics AS TB
          JOIN imdb.title_principals AS TP1 ON TP1.tconst = TB.tconst
          JOIN imdb.title_principals AS TP2 ON TP2.tconst = TB.tconst
          WHERE TP1.nconst = :actor1 AND TP2.nconst = :actor2
        `, {
          model: titleBasic,
          mapToModel: true,
          replacements: {
            actor1: actor1,
            actor2: actor2
          },
        })
      );
    }
    
    return commonMoviesForTwoActorsNaive();
    //return commonMoviesForTwoActorsManual();
  },
  
  crewOfGivenMove(tconst) {
    function crewOfGivenMoveManualSlow(){
        return sequelize.query(`
          SELECT DISTINCT NB.*
          FROM imdb.title_basics AS TB
          LEFT JOIN imdb.title_principals AS TP ON TP.tconst = TB.tconst
          LEFT JOIN imdb.title_crew AS TC ON TC.tconst = TB.tconst
          LEFT JOIN imdb.name_basics AS NB ON 
                  NB.nconst = TP.nconst 
                  OR TC.directors = NB.nconst
                  OR TC.directors LIKE NB.nconst || ',%'::text
                  OR TC.directors LIKE '%,'::text || NB.nconst || ',%'::text
                  OR TC.directors LIKE '%,'::text || NB.nconst
                  OR TC.writers = NB.nconst
                  OR TC.writers LIKE NB.nconst || ',%'::text
                  OR TC.writers LIKE '%,'::text || NB.nconst || ',%'::text
                  OR TC.writers LIKE '%,'::text || NB.nconst
          WHERE TB.tconst = :tconst
        `, {
          model: nameBasic,
          mapToModel: true,
          replacements: {
            tconst: tconst
          }
      });
    }

    function crewOfGivenMoveWithUnions() {
      return sequelize.query(`
        SELECT DISTINCT NB.*
        FROM imdb.title_principals AS TP
        JOIN (
          SELECT tconst, directors, writers
          FROM imdb.title_crew
          WHERE tconst = :tconst
        ) AS TC ON TC.tconst = TP.tconst
        LEFT JOIN imdb.name_basics AS NB ON NB.nconst = TP.nconst
      UNION
        SELECT DISTINCT NB.*
        FROM imdb.title_principals AS TP
        JOIN (
          SELECT tconst, directors, writers
          FROM imdb.title_crew
          WHERE tconst = :tconst
        ) AS TC ON TC.tconst = TP.tconst
        LEFT JOIN imdb.name_basics AS NB ON TC.directors LIKE NB.nconst || ',%'::text
      UNION
        SELECT DISTINCT NB.*
        FROM imdb.title_principals AS TP
        JOIN (
          SELECT tconst, directors, writers
          FROM imdb.title_crew
          WHERE tconst = :tconst
        ) AS TC ON TC.tconst = TP.tconst
        LEFT JOIN imdb.name_basics AS NB ON TC.directors LIKE '%,'::text || NB.nconst || ',%'::text
      UNION
        SELECT DISTINCT NB.*
        FROM imdb.title_principals AS TP
        JOIN (
          SELECT tconst, directors, writers
          FROM imdb.title_crew
          WHERE tconst = :tconst
        ) AS TC ON TC.tconst = TP.tconst
        LEFT JOIN imdb.name_basics AS NB ON TC.directors LIKE '%,'::text || NB.nconst
      UNION
        SELECT DISTINCT NB.*
        FROM imdb.title_principals AS TP
        JOIN (
          SELECT tconst, directors, writers
          FROM imdb.title_crew
          WHERE tconst = :tconst
        ) AS TC ON TC.tconst = TP.tconst
        LEFT JOIN imdb.name_basics AS NB ON TC.writers = NB.nconst
      UNION
        SELECT DISTINCT NB.*
        FROM imdb.title_principals AS TP
        JOIN (
          SELECT tconst, directors, writers
          FROM imdb.title_crew
          WHERE tconst = :tconst
        ) AS TC ON TC.tconst = TP.tconst
        LEFT JOIN imdb.name_basics AS NB ON TC.writers LIKE NB.nconst || ',%'::text
      UNION
        SELECT DISTINCT NB.*
        FROM imdb.title_principals AS TP
        JOIN (
          SELECT tconst, directors, writers
          FROM imdb.title_crew
          WHERE tconst = :tconst
        ) AS TC ON TC.tconst = TP.tconst
        LEFT JOIN imdb.name_basics AS NB ON TC.writers LIKE '%,'::text || NB.nconst || ',%'::text
      UNION
        SELECT DISTINCT NB.*
        FROM imdb.title_principals AS TP
        JOIN (
          SELECT tconst, directors, writers
          FROM imdb.title_crew
          WHERE tconst = :tconst
        ) AS TC ON TC.tconst = TP.tconst
        LEFT JOIN imdb.name_basics AS NB ON TC.writers LIKE '%,'::text || NB.nconst
      `, {
        model: nameBasic,
        mapToModel: true,
        replacements: {
          tconst: tconst
        }
      });
    }

    function crewOfGivenMoveInAppCode() {
      const crewViaTitlePrincipals = titlePrincipal 
        .findAll({
          attributes: ['nconst'],
          where: {
            'tconst': tconst
          }
        }).then(crew => crew.map(c => c.nconst));

      const crewViaTitleCrew = titleCrew
        .findAll({
          where: {
            'tconst': tconst
          }
        });

      const crewMatchingNames = crewViaTitleCrew.then(crew => crew.flatMap(c => [
          c.directors.split(','),
          c.writers.split(',')
        ].flat()));

      const allMatchingNames = crewViaTitlePrincipals.then(crew1 => crewMatchingNames.then(crew2 => new Set([crew1, crew2].flat())));

      return allMatchingNames.then(names => nameBasic
        .findAll({
          where: {
            'nconst': { [Op.in]: [...names] }
          }
        }));
    }

    function crewOfGivenMoveManualFast() {
      return sequelize.query(`
        WITH RECURSIVE numbers AS (
          SELECT 1 AS number
          UNION ALL
          SELECT number + 1 AS number FROM numbers WHERE number < 1500
        ),
        split_associations AS (
            SELECT SPLIT_PART(TC.directors, ',', N.number) AS nconst
            FROM imdb.title_crew AS TC
            CROSS JOIN numbers AS N
            WHERE tconst = :tconst AND directors IS NOT NULL AND CHAR_LENGTH(directors) - CHAR_LENGTH(REPLACE(directors, ',', '')) + 1 >= N.number
          UNION
            SELECT SPLIT_PART(TC.writers, ',', N.number) AS nconst
            FROM imdb.title_crew AS TC
            CROSS JOIN numbers AS N
            WHERE tconst = :tconst AND writers IS NOT NULL AND CHAR_LENGTH(writers) - CHAR_LENGTH(REPLACE(writers, ',', '')) + 1 >= N.number
        ),
        all_associations AS (
          SELECT SA.nconst
          FROM split_associations AS SA
          UNION
          SELECT TP.nconst
          FROM imdb.title_principals AS TP
          WHERE TP.tconst = :tconst
        )
        SELECT NB.*
        FROM imdb.name_basics AS NB
        JOIN all_associations AS AA ON AA.nconst = NB.nconst
        `, {
          model: nameBasic,
          mapToModel: true,
          replacements: {
            tconst: tconst
          }
        });
    }

    return crewOfGivenMoveManualSlow();
    //return crewOfGivenMoveWithUnions();
    //return crewOfGivenMoveInAppCode();
    //return crewOfGivenMoveManualFast();
  },
};
