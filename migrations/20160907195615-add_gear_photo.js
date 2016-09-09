'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'skaters_gears',
      'img',
      {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('skaters_gears','img')
  }
};
