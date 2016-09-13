'use strict';
module.exports = function(sequelize, DataTypes) {
  var ranks = sequelize.define('ranks', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ranks;
};
