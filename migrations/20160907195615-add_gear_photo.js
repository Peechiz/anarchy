'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'skaters_gear',
      'img',
      {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('skaters_gear','img')
  }
};
