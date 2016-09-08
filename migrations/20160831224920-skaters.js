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
        userName: {
          type: Sequelize.STRING,
          unique: true
        },
        derbyName: Sequelize.STRING,
        number: Sequelize.STRING,
        team: Sequelize.STRING,
        favPosition: Sequelize.STRING,
        photo: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
        rank: Sequelize.STRING,
        summary: Sequelize.TEXT
      }
    )
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('skaters');
  }
};
