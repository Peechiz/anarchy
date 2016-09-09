'use strict';
    module.exports = function(sequelize, DataTypes) {
      var Gears = sequelize.define('gears', {
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
        freezeTableName: true,
        classMethods: {
          associate: function(models) {
            // associations can be defined here
          }
        }
      });
      return Gears;
    };
