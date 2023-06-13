'use strict';

const Sequelize = require('sequelize');
const process = require('process');
const db = {};
const fsPromises = require('fs').promises;

let sequelize = new Sequelize(process.env['DATABASE_URL'], { dialect: 'postgres' });

let models = [
  '../titles/entities/title_rating.entity',
  '../titles/entities/title_rating_indexed.entity',
  '../titles/entities/title_basic.entity',
  '../titles/entities/title_principal.entity',
  '../names/entities/name_basic.entity',
];

(function createModels() {
  models.forEach((file) => {
    const model = require(file)(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
})();

(function createRelations() {
  (function joinTitleBasiclAndTitlePrincipal(){
    db.TitleBasic.hasMany(db.TitlePrincipal, {
      foreignKey: 'tconst',
      targetKey: 'tconst'
    });

    db.TitlePrincipal.belongsTo(db.TitleBasic, {
      foreignKey: 'tconst',
      targetKey: 'tconst'
    });
  })();

  (function joinTitlePrincipalAndNameBasic() {
    db.TitlePrincipal.hasOne(db.NameBasic, {
      foreignKey: 'nconst',
      targetKey: 'nconst'
    });

    db.NameBasic.belongsTo(db.TitlePrincipal, {
      foreignKey: 'nconst',
      targetKey: 'nconst'
    });
  })();

  (function joinTitleRatingAndTitleBasic() {
    db.TitleBasic.hasOne(db.TitleRating, {
      foreignKey: 'tconst',
      targetKey: 'tconst'
    });

    db.TitleRating.belongsTo(db.TitleBasic, {
      foreignKey: 'tconst',
      targetKey: 'tconst'
    });
  })();
})();

(function seed(){
  db.seedDatabase = async () => {
    let files = await fsPromises.readdir('src/models/migrations/');
    for(let id in files) {
      if(files[id].endsWith(".sql")){
        let data = await fsPromises.readFile('src/models/migrations/' + files[id], 'utf8');
        console.log("Running " + data);
        console.log(await sequelize.query(data));
      }
    }

    console.log("Done migrating");
  };
})();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
