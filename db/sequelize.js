var Sequelize = require('sequelize');
var db = process.env.DATABASE_URL || 'postgres://localhost/anarchy'
var sequelize = new Sequelize(db);

module.exports = sequelize;
