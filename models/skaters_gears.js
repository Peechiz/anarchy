'use strict';
    module.exports = function(sequelize, DataTypes) {
      var SkaterGears = sequelize.define('skaters_gears', {
        // id: {
        //   type: DataTypes.INTEGER,
        //   primaryKey: true,
        //   autoIncrement: true
        // },
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
        img: {
          type: DataTypes.STRING,
          validate: {
            isUrl: true
          }
        },
        isCurrent: DataTypes.BOOLEAN
      }, {
        timestamps: true,
      });
      return SkaterGears;
    };
