'use strict';
    module.exports = function(sequelize, DataTypes) {
      var Gear = sequelize.define('gear', {
        brandId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Brands',
            key: 'id'
          }
        },
        name: DataTypes.STRING,
        type: DataTypes.STRING
      }, {
        timestamps: true,
        classMethods: {
          associate: function(models) {
            // associations can be defined here
          }
        }
      });
      return Gear;
    };
