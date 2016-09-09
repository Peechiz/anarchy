'use strict';
    module.exports = function(sequelize, DataTypes) {
      var Skaters = sequelize.define('skaters', {
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
        rank: DataTypes.STRING,
        summary: DataTypes.TEXT
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
