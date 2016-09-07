'use strict';
    module.exports = function(sequelize, DataTypes) {
      var Brands = sequelize.define('brands', {
        name: DataTypes.STRING
      }, {
        timestamps: true,
        classMethods: {
          associate: function(models) {
            // associations can be defined here
            // Brand.
          }
        }
      });
      return Brands;
    };
