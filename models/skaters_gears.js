'use strict';
    module.exports = function(sequelize, DataTypes) {
      var SkaterGears = sequelize.define('skaters_gears', {
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
            model: 'Gears',
            key: 'id'
          }
        },
        isCurrent: DataTypes.BOOLEAN
      }, {
        timestamps: true,
        // getterMethods: {
        //   current: function(){
        //     return this.isCurrent
        //   }
        // }
      });
      return SkaterGears;
    };
