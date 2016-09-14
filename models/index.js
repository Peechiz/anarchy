'use strict'

var db = require('../db/sequelize');

// load all the sequelize models.
console.log('loading models...');
var models =  {
  Skaters: db.import(__dirname + '/' + 'skaters'),
  SkatersGears: db.import(__dirname + '/' + 'skaters_gears'),
  Reviews: db.import(__dirname + '/' + 'reviews'),
  Gears: db.import(__dirname + '/' + 'gears'),
  Brands: db.import(__dirname + '/' + 'brands'),
  Teams: db.import(__dirname + '/' + 'teams'),
  Ranks: db.import(__dirname + '/' + 'ranks')
};

// create relationships between models.
console.log('creating relationships...');
(function (m) {
  m.Teams.hasMany(m.Skaters);
  m.Skaters.belongsTo(m.Teams);

  m.Ranks.hasMany(m.Skaters, {foreignKey: 'rankId'});
  m.Skaters.belongsTo(m.Ranks, {foreignKey: 'rankId'});

  m.Skaters.hasMany(m.SkatersGears,{foreignKey: 'skaterId'});
  m.SkatersGears.belongsTo(m.Skaters,{foreignKey: 'skaterId'});

  m.Gears.hasMany(m.SkatersGears);
  m.SkatersGears.belongsTo(m.Gears);

  m.Brands.hasMany(m.Gears)
  m.Gears.belongsTo(m.Brands)

  m.Skaters.hasMany(m.Reviews)
  m.Reviews.belongsTo(m.Skaters)

  m.Reviews.belongsTo(m.Gears)
  m.Gears.hasMany(m.Reviews)
})(models);

module.exports = models;
module.exports.db = db;
