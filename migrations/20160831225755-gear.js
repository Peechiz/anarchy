'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('gear', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE
      },
      brand: Sequelize.STRING,
      name: Sequelize.STRING,
      type: Sequelize.STRING
    },
    {
      freezeTableName: true
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('gear');
  }
};
