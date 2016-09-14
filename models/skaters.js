'use strict';
    module.exports = function(sequelize, DataTypes) {
      var Skaters = sequelize.define('skaters', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true
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
        password: DataTypes.STRING
      }, {
        timestamps: true,
        // getterMethods: {
        //   getSkater: function(){
        //     return {
        //       userName: this.userName,
        //       derbyName: this.derbyName,
        //       number: this.number,
        //       team: this.team,
        //       favPosition: this.favPosition,
        //       photo: this.photo,
        //       rank: this.rank,
        //       summary: this.summary,
        //     }
        //   }
        // }
      });
      return Skaters;
    };
