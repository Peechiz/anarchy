'use strict';
module.exports = function(sequelize, DataTypes) {
  var Teams = sequelize.define('teams', {
    teamName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Teams;
};
