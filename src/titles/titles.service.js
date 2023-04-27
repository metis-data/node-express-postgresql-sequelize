const { Op } = require("sequelize");
const titleBasic = require('../models').TitleBasic;

module.exports = {
  getTitles(title) {
    console.log(title);
    console.log(titleBasic);

    return titleBasic 
      .findAll({
        where: {
          primarytitle: { [Op.like]: '%' + title + '%' }
        }
      });
  }
};
