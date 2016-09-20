'use strict';
    module.exports = function(sequelize, DataTypes) {
      var Skaters = sequelize.define('skaters', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userName: DataTypes.STRING,
        derbyName: DataTypes.STRING,
        number: DataTypes.STRING,
        teamId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Teams',
            key: 'id'
          }
        },
        favPosition: DataTypes.STRING,
        photo: DataTypes.STRING,
        admin: DataTypes.BOOLEAN,
        rankId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Ranks',
            key: 'id'
          }
        },
        summary: DataTypes.TEXT,
        password: DataTypes.STRING,
        tel: DataTypes.STRING,
        email: DataTypes.STRING
      }, {
        // paranoid: true,
        timestamps: true,
      });
      return Skaters;
    };
