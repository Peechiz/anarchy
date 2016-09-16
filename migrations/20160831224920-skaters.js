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
        password: {
          type: Sequelize.STRING,
        },
        derbyName: {
          type: Sequelize.STRING,
        },
        number: Sequelize.STRING,
        team: Sequelize.STRING,
        favPosition: Sequelize.STRING,
        photo: {
          type: Sequelize.STRING,
          defaultValue: '/img/logo.png'
        },
        admin: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        rank: Sequelize.STRING,
        summary: Sequelize.TEXT
      }
    )
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('skaters');
  }
};
