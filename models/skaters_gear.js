'use strict';
    module.exports = function(sequelize, DataTypes) {
      var SkaterGear = sequelize.define('skaters_gear', {
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
        isCurrent: DataTypes.BOOLEAN
      }, {
        timestamps: true,
        classMethods: {
          associate: function(models) {
            // associations can be defined here
          }
        }
      });
      return SkaterGear;
    };
