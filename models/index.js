'use strict'

var db = require('../db/sequelize');

// load all the sequelize models.
var models =  {
  Skaters: db.sequelize.import(__dirname + '/' + 'skater'),
  SkatersGear: db.sequelize.import(__dirname + '/' + 'skaters_gear'),
  Reviews: db.sequelize.import(__dirname + '/' + 'reviews'),
  Gear: db.sequelize.import(__dirname + '/' + 'gear'),

};

// create relationships between models.
(function (m) {
  m.Skaters.hasMany(m.SkatersGear);
  m.SkatersGear.belongsTo(m.Skaters);
  m.SkatersGear.hasOne(m.Gear);
  m.Skaters.hasMany(m.Reviews);
  m.Reviews.belongsTo(m.Skaters);

})(models);

module.exports = models;
module.exports.Sequelize = db.sequelize;
module.exports.Sequelize = db.Sequelize;
