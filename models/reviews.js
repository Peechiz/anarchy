'use strict';
    module.exports = function(sequelize, DataTypes) {
      var Reviews = sequelize.define('reviews', {
        skaterId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Skaters',
            key: 'id'
          }
        },
        gearId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Gear',
            key: 'id'
          }
        },
        text: DataTypes.STRING,
        rating: DataTypes.INTEGER
      }, {
        timestamps: true,
        classMethods: {
          associate: function(models) {
            // associations can be defined here
          }
        }
      });
      return Reviews;
    };
