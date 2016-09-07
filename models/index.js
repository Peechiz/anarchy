'use strict'

var db = require('../db/sequelize');

// load all the sequelize models.
console.log('loading models...');
var models =  {
  Skaters: db.import(__dirname + '/' + 'skaters'),
  SkatersGear: db.import(__dirname + '/' + 'skaters_gear'),
  Reviews: db.import(__dirname + '/' + 'reviews'),
  Gear: db.import(__dirname + '/' + 'gear'),
  Brands: db.import(__dirname + '/' + 'brands')
};

// create relationships between models.
console.log('creating relationships...');
(function (m) {
  m.Skaters.hasMany(m.SkatersGear);
  m.SkatersGear.belongsTo(m.Skaters);

  m.Gear.hasMany(m.SkatersGear);
  m.SkatersGear.belongsTo(m.Gear);

  m.Brands.hasMany(m.Gear)
  m.Gear.belongsTo(m.Brands)

  m.Skaters.hasMany(m.Reviews)
  m.Reviews.belongsTo(m.Skaters)

  m.Reviews.belongsTo(m.Gear)
  m.Gear.hasMany(m.Reviews)
})(models);

module.exports = models;
// module.exports.Sequelize = db.sequelize;
// module.exports.Sequelize = db.Sequelize;
