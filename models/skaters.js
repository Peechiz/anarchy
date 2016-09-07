'use strict';
    module.exports = function(sequelize, DataTypes) {
      var Skaters = sequelize.define('skaters', {
        userName: DataTypes.STRING,
        derbyName: DataTypes.STRING,
        number: DataTypes.STRING,
        team: DataTypes.STRING,
        favPosition: DataTypes.STRING,
        photo: DataTypes.STRING,
        admin: DataTypes.BOOLEAN,
        rank: DataTypes.STRING,
        summary: DataTypes.TEXT
      }, {
        timestamps: true,
        classMethods: {
          associate: function(models) {
            // associations can be defined here
          }
        }
      });
      return Skaters;
    };
