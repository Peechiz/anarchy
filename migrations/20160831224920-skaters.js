'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'skaters',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        userName: Sequelize.STRING,
        derbyName: Sequelize.STRING,
        number: Sequelize.STRING,
        team: Sequelize.STRING,
        favPosition: Sequelize.STRING,
        photo: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
        summary: Sequelize.TEXT
      }
    )
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('skaters');
  }
};
