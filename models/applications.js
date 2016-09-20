'use strict';
module.exports = function(sequelize, DataTypes) {
  var Applications = sequelize.define('applications', {
    skaterId: DataTypes.INTEGER,
    xp: DataTypes.TEXT,
    hasSkates: DataTypes.BOOLEAN,
    hasPads: DataTypes.BOOLEAN
  }, {
    timestamps: true,
  });
  return Applications;
};
