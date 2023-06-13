const { Op } = require("sequelize");
const sequelize = require('../models').sequelize;
const titleBasic = require('../models').TitleBasic;
const titlePrincipal = require('../models').TitlePrincipal;

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
  }
};
