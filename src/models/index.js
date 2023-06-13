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

function createModels() {
  models.forEach((file) => {
    const model = require(file)(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
}

function createRelations() {
  (function joinTitlePrincipalAndTitleBasic(){
    db.TitlePrincipal.hasOne(db.TitleBasic, {
      foreignKey: 'tconst'
    });
  })();
  
  (function joinTitleBasiclAndTitlePrincipal(){
    db.TitleBasic.hasMany(db.TitlePrincipal, {
      foreignKey: 'tconst'
    });
  })();

  (function joinTitlePrincipalAndNameBasic() {
    db.TitlePrincipal.hasOne(db.NameBasic, {
      foreignKey: 'nconst'
    });
  })();
}

function seed(){
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
}

createModels();
createRelations();
seed();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
