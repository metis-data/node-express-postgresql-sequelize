const { Op } = require("sequelize");
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
      })
  }
};
